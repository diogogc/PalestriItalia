const DATA_CSV_PATH = "./dados/dados_extraidos.csv";

let csvRows = [];
let monthlyData = [];
let detailedExpenseData = {};
let budgetData = {
  monthlyBase: 0,
  reserveFund: 0,
  optionalMaintenanceFund: 0,
  monthlyTotal: 0,
  annualTotal: 0,
  adjustment: "Ajuste de 21,68%",
  categories: [],
};
let currentAvailableBalance = {
  period: "",
  account: "Conta Corrente",
  checking: 0,
  financialTotal: 0,
  source: "",
};
let currentCondoAssessment = {
  monthlyTotal: 0,
  source: "",
};
let dashboardInitialized = false;

const onTimePaymentDiscountRate = 0.05;
const onTimePaymentFactor = 1 - onTimePaymentDiscountRate;

const ipcaAdjustment = {
  label: "IPCA acumulado jan/2024 a mar/2026",
  rate: 11.401822519460826,
  source: "Banco Central do Brasil - SGS serie 433",
};

const idealFractionBands = [
  {
    type: "A",
    units: "101, 201, 301 e 401",
    count: 4,
    fraction: 0.061343,
  },
  {
    type: "B",
    units: "102 e 202",
    count: 2,
    fraction: 0.056601,
  },
  {
    type: "C",
    units: "302, 402 e 502",
    count: 3,
    fraction: 0.057742,
  },
  {
    type: "D",
    units: "103, 203, 303, 403, 503 e 603",
    count: 6,
    fraction: 0.04365,
  },
  {
    type: "E Duplex",
    units: "501",
    count: 1,
    fraction: 0.088141,
  },
  {
    type: "F Duplex",
    units: "602",
    count: 1,
    fraction: 0.118159,
  },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const percent = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const yearFilter = document.getElementById("yearFilter");
const monthFilter = document.getElementById("monthFilter");
const expenseCategoryFilter = document.getElementById("expenseCategoryFilter");
const expenseFloatingBox = document.getElementById("expenseFloatingBox");
const tabButtons = Array.from(document.querySelectorAll("[data-tab-target]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

const expenseCategorySeries = {
  total: {
    label: "Total de despesas",
    description: "Soma completa das saídas registradas no balancete.",
    prefixes: ["02."],
    color: "#6d7f83",
  },
  personnel: {
    label: "Despesa com Pessoal",
    description: "Folha, encargos e custos de equipe registrados como despesa com pessoal.",
    prefixes: ["02.01."],
    color: "#1b8c88",
  },
  utilities: {
    label: "Empresas Públicas e Privadas",
    description: "Contas de consumo, seguro e prestadores classificados nesta conta.",
    prefixes: ["02.02."],
    color: "#4f8f9f",
  },
  taxes: {
    label: "Impostos e Tarifas",
    description: "Encargos, impostos sobre serviços e despesas bancárias.",
    prefixes: ["02.03."],
    color: "#9b7c2f",
  },
  fixedAssets: {
    label: "Imobilizado",
    description: "Compras e aquisições patrimoniais registradas no balancete.",
    prefixes: ["02.04."],
    color: "#816f5f",
  },
  conservationServices: {
    label: "Serviços de Conservação",
    description: "Serviços de manutenção, reparos e conservação predial.",
    prefixes: ["02.05."],
    color: "#6f9f4f",
  },
  materials: {
    label: "Materiais de Conservação",
    description: "Materiais de limpeza, manutenção, piscina, pintura e insumos afins.",
    prefixes: ["02.06."],
    color: "#b58f3a",
  },
  contracts: {
    label: "Contratos Fixos",
    description: "Piscina, administração, elevador, síndico e contratos recorrentes.",
    prefixes: ["02.07."],
    color: "#c79c34",
  },
  ordinaryMisc: {
    label: "Despesas Diversas Ordinárias",
    description: "Despesas ordinárias diversas registradas no balancete.",
    prefixes: ["02.08."],
    color: "#7f8a58",
  },
  extraMisc: {
    label: "Despesas Diversas Extraordinárias",
    description: "Despesas pagas com taxa extra e intervenções fora da rotina.",
    prefixes: ["02.09."],
    color: "#cc5a37",
  },
  financial: {
    label: "Despesas Financeiras",
    description: "Juros, multas e demais lançamentos financeiros.",
    prefixes: ["02.10."],
    color: "#8f5f4c",
  },
};

function formatCurrency(value) {
  return currency.format(value);
}

function formatSignedCurrency(value) {
  if (value > 0) {
    return `+${formatCurrency(value)}`;
  }
  if (value < 0) {
    return `-${formatCurrency(Math.abs(value))}`;
  }
  return formatCurrency(0);
}

function formatPercent(value) {
  return `${percent.format(value)}%`;
}

function applyOnTimePaymentDiscount(value) {
  return value * onTimePaymentFactor;
}

function grossUpOnTimePaymentDiscount(value) {
  return value / onTimePaymentFactor;
}

function onTimePaymentDiscountLabel() {
  return formatPercent(onTimePaymentDiscountRate * 100);
}

function sum(items, selector) {
  return items.reduce((total, item) => total + selector(item), 0);
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  return Number(String(value).replace(/\./g, "").replace(",", ".")) || 0;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const headers = lines.shift().split(";");

  return lines
    .filter(Boolean)
    .map((line) => {
      const values = [];
      let current = "";
      let inQuotes = false;

      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ";" && !inQuotes) {
          values.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current);

      return headers.reduce((row, header, index) => {
        row[header] = values[index] || "";
        return row;
      }, {});
    });
}

function monthLabel(month) {
  return [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ][month - 1];
}

function buildMonthlyData(rows) {
  const metricKeys = new Set([
    "receita_total",
    "receita_ordinaria",
    "taxa_condominial",
    "receita_extra",
    "despesa_total",
    "despesa_ordinaria",
    "despesa_extra",
    "despesa_categoria_personnel",
    "despesa_categoria_contracts",
    "despesa_categoria_materials",
  ]);
  const grouped = new Map();

  rows
    .filter((row) => row.tipo_documento === "resumo_mensal_dashboard")
    .filter((row) => metricKeys.has(row.metrica))
    .filter((row) => row.ano && row.mes)
    .forEach((row) => {
      const year = Number(row.ano);
      const month = Number(row.mes);
      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          year,
          month,
          label: monthLabel(month),
          revenueTotal: 0,
          revenueOrdinary: 0,
          revenueExtra: 0,
          condoFee: 0,
          condoFeeGross: 0,
          condoFeeDiscount: 0,
          expenseTotal: 0,
          expenseOrdinary: 0,
          expenseExtra: 0,
          expenseCategories: {},
          source: row.arquivo_fonte,
        });
      }

      const item = grouped.get(key);
      const value = parseNumber(row.valor);
      const fields = {
        receita_total: "revenueTotal",
        receita_ordinaria: "revenueOrdinary",
        taxa_condominial: "condoFee",
        receita_extra: "revenueExtra",
        despesa_total: "expenseTotal",
        despesa_ordinaria: "expenseOrdinary",
        despesa_extra: "expenseExtra",
      };

      if (fields[row.metrica]) {
        item[fields[row.metrica]] = value;
      }
      if (row.metrica === "taxa_condominial") {
        item.condoFeeGross = grossUpOnTimePaymentDiscount(value);
        item.condoFeeDiscount = item.condoFeeGross - value;
      }
      if (row.metrica === "despesa_categoria_personnel") {
        item.expenseCategories.personnel = value;
      }
      if (row.metrica === "despesa_categoria_contracts") {
        item.expenseCategories.contracts = value;
      }
      if (row.metrica === "despesa_categoria_materials") {
        item.expenseCategories.materials = value;
      }
    });

  return [...grouped.values()].sort((left, right) => left.year - right.year || left.month - right.month);
}

function buildDetailedExpenseData(rows) {
  const grouped = {};
  const seen = new Set();

  rows
    .filter((row) => row.secao === "despesa")
    .filter((row) => row.metrica === "realizado")
    .filter((row) => row.ano && row.mes)
    .filter((row) => (row.codigo_conta.match(/\./g) || []).length >= 2)
    .forEach((row) => {
      const year = Number(row.ano);
      const month = Number(row.mes);
      const key = `${year}-${String(month).padStart(2, "0")}`;
      const dedupeKey = `${key}|${row.codigo_conta}|${row.nome_conta}`;

      if (seen.has(dedupeKey)) return;
      seen.add(dedupeKey);

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({
        code: row.codigo_conta,
        label: row.nome_conta,
        value: parseNumber(row.valor),
      });
    });

  Object.values(grouped).forEach((entries) => entries.sort((left, right) => left.code.localeCompare(right.code)));
  return grouped;
}

function buildBudgetData(rows) {
  const budgetRows = rows.filter((row) => row.tipo_documento === "previsao_orcamentaria_dashboard");
  const categories = budgetRows
    .filter((row) => row.metrica === "previsao_mensal_categoria")
    .map((row) => ({ label: row.nome_conta, value: parseNumber(row.valor) }));

  function valueByName(pattern, metric = "previsao_mensal") {
    const row = budgetRows.find(
      (item) => item.metrica === metric && normalizeText(item.nome_conta).includes(pattern)
    );
    return row ? parseNumber(row.valor) : 0;
  }

  return {
    monthlyBase: valueByName("total geral despesas"),
    reserveFund: valueByName("fundo de reserva"),
    optionalMaintenanceFund: valueByName("fundo de manutencao opcional"),
    monthlyTotal: valueByName("total despesas mensal"),
    annualTotal: valueByName("total despesas anual", "previsao_anual"),
    adjustment: "Ajuste de 21,68%",
    categories,
  };
}

function buildCurrentAvailableBalance(rows) {
  const checking = rows.find((row) => row.metrica === "saldo_conta_corrente");
  const financialTotal = rows.find((row) => row.metrica === "saldo_total_financeiro");

  return {
    period: checking?.periodo_origem || "",
    account: checking?.nome_conta || "Conta Corrente",
    checking: parseNumber(checking?.valor),
    financialTotal: parseNumber(financialTotal?.valor),
    source: checking?.arquivo_fonte || "",
  };
}

function buildCurrentCondoAssessment(rows) {
  const row = rows.find((item) => item.metrica === "arrecadacao_ordinaria_atual");

  return {
    monthlyTotal: parseNumber(row?.valor),
    source: row?.observacao || row?.arquivo_fonte || "",
  };
}

function buildDashboardData(rows) {
  csvRows = rows;
  monthlyData = buildMonthlyData(rows);
  detailedExpenseData = buildDetailedExpenseData(rows);
  budgetData = buildBudgetData(rows);
  currentAvailableBalance = buildCurrentAvailableBalance(rows);
  currentCondoAssessment = buildCurrentCondoAssessment(rows);
}

async function loadDashboardData() {
  const response = await fetch(DATA_CSV_PATH);
  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${DATA_CSV_PATH}`);
  }
  buildDashboardData(parseCsv(await response.text()));
}

function showDataLoadError(error) {
  document.querySelector("main").insertAdjacentHTML(
    "afterbegin",
    `
      <article class="panel data-load-error">
        <div class="panel-heading">
          <p class="eyebrow">Dados</p>
          <h2>Não foi possível carregar o CSV</h2>
        </div>
        <p>Abra o dashboard por um servidor local para permitir a leitura de <code>${DATA_CSV_PATH}</code>.</p>
        <p class="metric-note">${escapeHtml(error.message)}</p>
      </article>
    `
  );
}

function selectedRevenue(item, type) {
  if (type === "ordinary") return item.revenueOrdinary;
  if (type === "extra") return item.revenueExtra;
  return item.revenueTotal;
}

function selectedExpense(item, type) {
  if (type === "ordinary") return item.expenseOrdinary;
  if (type === "extra") return item.expenseExtra;
  return item.expenseTotal;
}

function availableYears() {
  return [...new Set(monthlyData.map((item) => item.year))].sort((a, b) => a - b);
}

function currentYear() {
  return Number(yearFilter.value);
}

function currentYearData() {
  return monthlyData.filter((item) => item.year === currentYear());
}

function scopedData() {
  return currentYearData();
}

function expenseScopedData() {
  const monthValue = monthFilter.value;
  const data = currentYearData();
  if (monthValue === "all") return data;
  return data.filter((item) => String(item.month) === monthValue);
}

function averageOrdinaryRevenue(data = currentYearData()) {
  return sum(data, (item) => item.revenueOrdinary) / data.length;
}

function averageCondoFee(data = currentYearData()) {
  return sum(data, (item) => item.condoFee) / data.length;
}

function averageCondoFeeGross(data = currentYearData()) {
  return sum(data, (item) => item.condoFeeGross || grossUpOnTimePaymentDiscount(item.condoFee)) / data.length;
}

function expenseCategoryValue(item, categoryKey) {
  const detailedEntries = detailedExpenseEntries(item, categoryKey);

  if (detailedEntries.length) {
    return sum(detailedEntries, (entry) => entry.value);
  }

  if (categoryKey === "total") return item.expenseTotal;
  if (categoryKey === "personnel") return item.expenseCategories?.personnel ?? 0;
  if (categoryKey === "contracts") return item.expenseCategories?.contracts ?? 0;
  if (categoryKey === "materials") return item.expenseCategories?.materials ?? 0;
  if (categoryKey === "extraMisc") return item.expenseExtra;
  return 0;
}

function expenseComposition(data, type = "all") {
  const categories = Object.entries(expenseCategorySeries).filter(([key]) => {
    if (key === "total") return false;
    if (type === "ordinary") return key !== "extraMisc";
    if (type === "extra") return key === "extraMisc";
    return true;
  });
  const mappedItems = categories.map(([key, category]) => ({
    label: category.label,
    value: sum(data, (item) => expenseCategoryValue(item, key)),
    color: category.color,
  }));
  const total = sum(data, (item) => selectedExpense(item, type));
  const mappedTotal = sum(mappedItems, (item) => item.value);
  const other = Math.max(total - mappedTotal, 0);

  return [
    ...mappedItems,
    { label: "Outras despesas", value: other, color: "#6d7f83" },
  ].filter((item) => item.value > 0);
}

function visibleExpenseEntries(entries) {
  const visible = entries.filter((entry) => entry.value > 0);
  return visible.length ? visible : entries.slice(0, 1);
}

function detailedExpenseKey(item) {
  return `${item.year}-${String(item.month).padStart(2, "0")}`;
}

function detailedExpenseMatchesCategory(entry, categoryKey) {
  if (categoryKey === "ordinary") return !entry.code.startsWith("02.09.");
  const category = expenseCategorySeries[categoryKey] || expenseCategorySeries.total;
  return category.prefixes.some((prefix) => entry.code.startsWith(prefix));
}

function detailedExpenseEntries(item, categoryKey) {
  const details = detailedExpenseData[detailedExpenseKey(item)] || [];
  return details
    .filter((entry) => detailedExpenseMatchesCategory(entry, categoryKey))
    .map((entry) => ({
      label: entry.label,
      value: entry.value,
      code: entry.code,
    }));
}

function fallbackExpenseEntries(item, categoryKey) {
  const categories = item.expenseCategories || {};
  const personnel = categories.personnel || 0;
  const contracts = categories.contracts || 0;
  const materials = categories.materials || 0;
  const extra = item.expenseExtra || 0;
  const mappedOrdinary = personnel + contracts + materials;
  const otherTotal = Math.max(item.expenseTotal - mappedOrdinary - extra, 0);

  if (categoryKey === "total") {
    return visibleExpenseEntries([
      { label: expenseCategorySeries.personnel.label, value: personnel },
      { label: expenseCategorySeries.contracts.label, value: contracts },
      { label: expenseCategorySeries.materials.label, value: materials },
      { label: expenseCategorySeries.extraMisc.label, value: extra },
      { label: "Outras despesas", value: otherTotal },
    ]);
  }

  if (categoryKey === "extraMisc") {
    return [{ label: expenseCategorySeries.extraMisc.label, value: extra }];
  }

  return [
    {
      label: expenseCategorySeries[categoryKey].label,
      value: expenseCategoryValue(item, categoryKey),
    },
  ];
}

function expenseDetailBreakdown(item, categoryKey) {
  const detailedEntries = detailedExpenseEntries(item, categoryKey);

  if (detailedEntries.length) {
    return {
      entries: detailedEntries,
      note: "Subcontas extraídas do balancete mensal.",
    };
  }

  return {
    entries: fallbackExpenseEntries(item, categoryKey),
    note: "Subcontas não disponíveis para este mês; exibindo o valor agregado do filtro.",
  };
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pointOnCircle(center, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
}

function pieSlicePath(startPercent, endPercent) {
  const center = 50;
  const radius = 48;
  const startAngle = startPercent * 3.6;
  const endAngle = endPercent * 3.6;
  const start = pointOnCircle(center, radius, startAngle);
  const end = pointOnCircle(center, radius, endAngle);
  const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function bindPieTooltip(container) {
  const tooltip = container.querySelector(".pie-tooltip");
  const slices = container.querySelectorAll(".pie-slice");

  slices.forEach((slice) => {
    slice.addEventListener("mousemove", (event) => {
      tooltip.textContent = slice.dataset.tooltip;
      tooltip.style.left = `${event.offsetX}px`;
      tooltip.style.top = `${event.offsetY}px`;
      tooltip.hidden = false;
    });

    slice.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
}

function bindMonthlyBarTooltip(container) {
  const tooltip = container.querySelector(".monthly-bar-tooltip");
  const bars = container.querySelectorAll(".monthly-bar-fill");

  function showTooltip(bar, left, top) {
    tooltip.textContent = bar.dataset.tooltip;
    tooltip.style.left = `${left + 12}px`;
    tooltip.style.top = `${top - 12}px`;
    tooltip.hidden = false;
  }

  bars.forEach((bar) => {
    bar.addEventListener("mousemove", (event) => {
      showTooltip(bar, event.clientX, event.clientY);
    });

    bar.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });

    bar.addEventListener("focus", () => {
      const rect = bar.getBoundingClientRect();
      showTooltip(bar, rect.left + rect.width, rect.top);
    });

    bar.addEventListener("blur", () => {
      tooltip.hidden = true;
    });
  });
}

function hideExpenseFloatingBox() {
  if (expenseFloatingBox) {
    expenseFloatingBox.hidden = true;
  }
}

function positionExpenseFloatingBox(row, event) {
  expenseFloatingBox.style.removeProperty("left");
  expenseFloatingBox.style.removeProperty("top");
  expenseFloatingBox.hidden = false;
}

function showExpenseFloatingBox(row, item, categoryKey, category, event) {
  if (!expenseFloatingBox) return;

  const total = expenseCategoryValue(item, categoryKey);
  const breakdown = expenseDetailBreakdown(item, categoryKey);
  const entries = breakdown.entries;
  const entriesTotal = sum(entries, (entry) => entry.value);

  expenseFloatingBox.innerHTML = `
    <button class="expense-floating-close" type="button" data-close-expense-box>Fechar</button>
    <p class="eyebrow">Detalhes do mês</p>
    <h3>${escapeHtml(item.label)} ${item.year}</h3>
    <p class="expense-floating-subtitle">Filtro aplicado: ${escapeHtml(category.label)}</p>
    <div class="expense-floating-total">
      <span>Total do filtro</span>
      <strong>${formatCurrency(total)}</strong>
    </div>
    <p class="expense-floating-source">${escapeHtml(breakdown.note)}</p>
    <div class="expense-floating-list">
      ${entries
        .map((entry) => {
          const share = entriesTotal === 0 ? 0 : (entry.value / entriesTotal) * 100;
          return `
            <div class="expense-floating-row">
              <span>${escapeHtml(entry.label)}</span>
              <strong>${formatCurrency(entry.value)}</strong>
              <small>${entry.code ? `${escapeHtml(entry.code)} · ` : ""}${share.toFixed(0)}% do detalhamento</small>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  expenseFloatingBox
    .querySelector("[data-close-expense-box]")
    .addEventListener("click", hideExpenseFloatingBox);
  positionExpenseFloatingBox(row, event);
}

function bindExpenseDetailRows(list, data, categoryKey, category) {
  list.querySelectorAll(".expense-detail-row").forEach((row, index) => {
    row.addEventListener("click", (event) => {
      event.stopPropagation();
      showExpenseFloatingBox(row, data[index], categoryKey, category, event);
    });

    row.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      showExpenseFloatingBox(row, data[index], categoryKey, category, event);
    });
  });
}

function renderFilterSummary(data, type) {
  const totalRevenue = sum(data, (item) => item.revenueTotal);
  const totalExpense = sum(data, (item) => item.expenseTotal);
  const balance = totalRevenue - totalExpense;
  const periodLabel = `${currentYear()} (${data.length} meses)`;

  document.getElementById(
    "filterSummary"
  ).textContent = `${periodLabel} | saldo ${formatSignedCurrency(balance)}`;
}

function renderMetrics(data, type) {
  const revenue = sum(data, (item) => selectedRevenue(item, type));
  const expense = sum(data, (item) => selectedExpense(item, type));
  const balance = revenue - expense;
  const monthsInScope = data.length;
  const yearData = currentYearData();
  const actualAverage = averageOrdinaryRevenue(yearData);
  const condoAverage = averageCondoFee(yearData);
  const condoAverageGross = averageCondoFeeGross(yearData);
  const monthlyBudgetGap =
    monthsInScope === 1
      ? data[0].revenueOrdinary - budgetData.monthlyTotal
      : actualAverage - budgetData.monthlyTotal;
  const budgetMetricValue =
    monthsInScope === 1
      ? formatSignedCurrency(monthlyBudgetGap)
      : `${formatSignedCurrency(monthlyBudgetGap)}/mês`;

  const metrics = [
    {
      title: "Receitas",
      value: formatCurrency(revenue),
      note:
        type === "all"
          ? "Entradas totais registradas no periodo selecionado."
          : "Filtro aplicado sobre o tipo de arrecadação.",
      tone: "positive",
    },
    {
      title: "Despesas",
      value: formatCurrency(expense),
      note:
        type === "extra"
          ? "Despesa extraordinária associada à taxa extra."
          : "Saídas efetivas registradas no balancete.",
      tone: "",
    },
    {
      title: "Resultado",
      value: formatSignedCurrency(balance),
      note:
        balance >= 0
          ? "O caixa fechou positivo dentro do recorte exibido."
          : "O recorte exibido consumiu mais caixa do que arrecadou.",
      tone: balance >= 0 ? "positive" : "negative",
    },
    {
      title: "Saldo disponível",
      value: formatCurrency(currentAvailableBalance.checking),
      note: `${currentAvailableBalance.account} em ${currentAvailableBalance.period}. Total financeiro: ${formatCurrency(
        currentAvailableBalance.financialTotal
      )}.`,
      tone: currentAvailableBalance.checking >= 0 ? "positive" : "negative",
    },
    {
      title: "Previsão 2026 x arrecadação ordinária",
      value: budgetMetricValue,
      note:
        monthsInScope === 1
          ? "Comparação do mês escolhido com a necessidade mensal da planilha."
          : `Média ordinária de ${currentYear()}: ${formatCurrency(actualAverage)}. Taxa condominial em dia: ${formatCurrency(
              condoAverage
            )} (cheia: ${formatCurrency(condoAverageGross)}).`,
      tone: monthlyBudgetGap >= 0 ? "positive" : "negative",
    },
  ];

  const target = document.getElementById("metricsGrid");
  target.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card ${metric.tone}">
          <h3>${metric.title}</h3>
          <div class="metric-value">${metric.value}</div>
          <p class="metric-note">${metric.note}</p>
        </article>
      `
    )
    .join("");
}

function renderFlowChart(data, type) {
  const maxValue = Math.max(
    ...data.map((item) => Math.max(selectedRevenue(item, type), selectedExpense(item, type))),
    1
  );

  document.getElementById("monthlyFlowChart").innerHTML = data
    .map((item) => {
      const revenueWidth = (selectedRevenue(item, type) / maxValue) * 100;
      const expenseWidth = (selectedExpense(item, type) / maxValue) * 100;
      return `
        <div class="chart-row">
          <span class="chart-label">${item.label}</span>
          <div class="flow-stack">
            <div class="flow-track">
              <div class="flow-fill-revenue" style="width:${revenueWidth}%"></div>
            </div>
            <div class="flow-track">
              <div class="flow-fill-expense" style="width:${expenseWidth}%"></div>
            </div>
          </div>
          <span class="chart-value">${formatSignedCurrency(
            selectedRevenue(item, type) - selectedExpense(item, type)
          )}</span>
        </div>
      `;
    })
    .join("");
}

function renderBalanceChart(data, type) {
  const maxBalance = Math.max(
    ...data.map((item) => Math.abs(selectedRevenue(item, type) - selectedExpense(item, type))),
    1
  );

  document.getElementById("balanceChart").innerHTML = data
    .map((item) => {
      const balance = selectedRevenue(item, type) - selectedExpense(item, type);
      const width = (Math.abs(balance) / maxBalance) * 50;
      return `
        <div class="chart-row">
          <span class="chart-label">${item.label}</span>
          <div class="balance-track">
            <div class="balance-fill ${balance >= 0 ? "positive" : "negative"}" style="width:${width}%"></div>
          </div>
          <span class="chart-value ${balance >= 0 ? "status-positive" : "status-negative"}">${formatSignedCurrency(
            balance
          )}</span>
        </div>
      `;
    })
    .join("");
}

function renderExpenseDetail(data) {
  const categoryKey = expenseCategorySeries[expenseCategoryFilter.value]
    ? expenseCategoryFilter.value
    : "total";
  const category = expenseCategorySeries[categoryKey];
  const scopedSeries = data.map((item) => ({
    label: item.label,
    value: expenseCategoryValue(item, categoryKey),
    totalExpense: item.expenseTotal,
  }));
  const categoryTotal = sum(scopedSeries, (item) => item.value);
  const periodTotalExpense = sum(data, (item) => item.expenseTotal);
  const monthsInScope = data.length;
  const averageExpense = categoryTotal / monthsInScope;
  const maxExpense = Math.max(...scopedSeries.map((item) => item.value), 1);
  const peakMonth = scopedSeries.reduce((best, item) => {
    if (!best || item.value > best.value) {
      return item;
    }
    return best;
  }, null);
  const participation = periodTotalExpense === 0 ? 0 : (categoryTotal / periodTotalExpense) * 100;

  document.getElementById("expenseDetailSummary").innerHTML = `
    <article class="expense-summary-card">
      <strong>${category.label}</strong>
      <span>${formatCurrency(categoryTotal)}</span>
      <p>${category.description}</p>
    </article>
    <article class="expense-summary-card">
      <strong>Participação</strong>
      <span>${participation.toFixed(0)}%</span>
      <p>${monthsInScope === 1 ? "Dentro da despesa do mês." : "Dentro da despesa do período filtrado."}</p>
    </article>
    <article class="expense-summary-card">
      <strong>Pico do período</strong>
      <span>${peakMonth ? peakMonth.label : "-"}</span>
      <p>Média de ${formatCurrency(averageExpense)} por ${monthsInScope === 1 ? "mês." : "mês no recorte."}</p>
    </article>
  `;

  const composition = expenseComposition(data);
  const compositionTotal = sum(composition, (item) => item.value);
  let cursor = 0;
  const slices = composition.map((item) => {
    const start = cursor;
    const size = compositionTotal === 0 ? 0 : (item.value / compositionTotal) * 100;
    cursor += size;
    const share = compositionTotal === 0 ? 0 : (item.value / compositionTotal) * 100;
    const tooltip = `${item.label} | ${share.toFixed(1)}% | ${formatCurrency(item.value)}`;
    const safeTooltip = escapeAttribute(tooltip);

    if (size >= 99.999) {
      return `
        <circle
          class="pie-slice"
          cx="50"
          cy="50"
          r="48"
          fill="${item.color}"
          data-tooltip="${safeTooltip}"
        >
          <title>${safeTooltip}</title>
        </circle>
      `;
    }

    return `
      <path
        class="pie-slice"
        d="${pieSlicePath(start, cursor)}"
        fill="${item.color}"
        data-tooltip="${safeTooltip}"
      >
        <title>${safeTooltip}</title>
      </path>
    `;
  });

  const compositionTarget = document.getElementById("expenseCompositionChart");
  compositionTarget.innerHTML = `
    <div class="pie-stage">
      <svg
      class="pie-chart"
      role="img"
      aria-label="Composição das despesas do período"
      viewBox="0 0 100 100"
      focusable="false"
      >
        ${slices.join("")}
      </svg>
      <div class="pie-tooltip" hidden></div>
    </div>
    <div class="pie-legend">
      <h3>Composição das despesas</h3>
      ${composition
        .map((item) => {
          const share = compositionTotal === 0 ? 0 : (item.value / compositionTotal) * 100;
          return `
            <div class="pie-legend-row">
              <i class="pie-swatch" style="--slice-color:${item.color}"></i>
              <span>${item.label}</span>
              <strong>${share.toFixed(0)}% · ${formatCurrency(item.value)}</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
  bindPieTooltip(compositionTarget);

  const expenseList = document.getElementById("expenseDetailList");
  expenseList.innerHTML = data
    .map((item, index) => {
      const categoryValue = scopedSeries[index].value;
      const width = (categoryValue / maxExpense) * 100;
      const shareOfMonth = item.expenseTotal === 0 ? 0 : (categoryValue / item.expenseTotal) * 100;
      return `
        <div
          class="expense-detail-row"
          role="button"
          tabindex="0"
          data-hover-message="Clique para mais detalhes"
          title="Clique para mais detalhes"
        >
          <span class="chart-label">${item.label}</span>
          <div class="expense-stack">
            <div class="expense-track">
              <div class="expense-fill-ordinary" style="width:${width}%"></div>
            </div>
            <div class="expense-meta">
              ${category.label} ${formatCurrency(categoryValue)} | ${shareOfMonth.toFixed(0)}% da despesa do mês
            </div>
          </div>
          <strong>${formatCurrency(categoryValue)}</strong>
        </div>
      `;
    })
    .join("");
  bindExpenseDetailRows(expenseList, data, categoryKey, category);
}

function renderBudget() {
  const maxCategory = Math.max(...budgetData.categories.map((item) => item.value), 1);
  const requiredAssessmentBeforeDiscount = grossUpOnTimePaymentDiscount(budgetData.monthlyTotal);

  document.getElementById("budgetBreakdown").innerHTML = budgetData.categories
    .map((item) => {
      const width = (item.value / maxCategory) * 100;
      return `
        <div class="budget-row">
          <span class="chart-label">${item.label}</span>
          <div class="budget-track">
            <div class="budget-fill" style="width:${width}%"></div>
          </div>
          <strong>${formatCurrency(item.value)}/mes</strong>
        </div>
      `;
    })
    .join("");

  const checkRows = [
    ["Categorias previstas", budgetData.monthlyBase],
    ["Fundo de reserva (5%)", budgetData.reserveFund],
    ["Fundo de manutenção opcional", budgetData.optionalMaintenanceFund],
    ["Total Mensal", budgetData.monthlyTotal],
  ];

  document.getElementById("budgetCheckTable").innerHTML = checkRows
    .map(
      ([label, value]) => `
        <tr>
          <td>${label}</td>
          <td>${formatCurrency(value)}</td>
        </tr>
      `
    )
    .join("");

  document.getElementById(
    "budgetFootnote"
  ).textContent = `A conferência fecha em ${formatCurrency(
    budgetData.monthlyTotal
  )} por mes e ${formatCurrency(
    budgetData.annualTotal
  )} no ano. A nova arrecadação com desconto em dia deve ser ${formatCurrency(
    budgetData.monthlyTotal
  )}, igual à previsão. Para isso, os boletos antes do desconto precisam somar ${formatCurrency(
    requiredAssessmentBeforeDiscount
  )} por mes.`;
}

function renderAdjustmentImpact() {
  const currentAssessmentBeforeDiscount = currentCondoAssessment.monthlyTotal;
  const currentAssessmentPaidOnTime = applyOnTimePaymentDiscount(currentAssessmentBeforeDiscount);
  const plannedAssessmentPaidOnTime = budgetData.monthlyTotal;
  const requiredAssessmentBeforeDiscount = grossUpOnTimePaymentDiscount(plannedAssessmentPaidOnTime);
  const adjustmentRate =
    (plannedAssessmentPaidOnTime / currentAssessmentPaidOnTime - 1) * 100;
  const totalFractions = idealFractionBands.reduce(
    (total, band) => total + band.count * band.fraction,
    0
  );

  document.getElementById("adjustmentImpact").innerHTML = `
    <div class="adjustment-summary">
      <article class="adjustment-card">
        <strong>Arrecadação atual em dia</strong>
        <span>${formatCurrency(currentAssessmentPaidOnTime)}</span>
        <p>Taxa cheia atual: ${formatCurrency(currentAssessmentBeforeDiscount)}. ${currentCondoAssessment.source}</p>
      </article>
      <article class="adjustment-card highlight">
        <strong>Nova arrecadação em dia</strong>
        <span>${formatCurrency(plannedAssessmentPaidOnTime)}</span>
        <p>Igual à previsão mensal 2026, já com desconto de ${onTimePaymentDiscountLabel()}.</p>
      </article>
      <article class="adjustment-card highlight">
        <strong>Ajuste global necessário</strong>
        <span>${formatPercent(adjustmentRate)}</span>
        <p>Compara a arrecadação atual em dia com a nova arrecadação em dia.</p>
      </article>
      <article class="adjustment-card ipca-card">
        <strong>IPCA do período</strong>
        <span>${formatPercent(ipcaAdjustment.rate)}</span>
        <p>${ipcaAdjustment.label}.</p>
      </article>
    </div>

    <div class="table-wrap">
      <table class="adjustment-table">
        <colgroup>
          <col class="col-type" />
          <col class="col-units" />
          <col class="col-fraction" />
          <col class="col-money" />
          <col class="col-money" />
          <col class="col-money" />
          <col class="col-money" />
          <col class="col-diff" />
          <col class="col-money" />
          <col class="col-money" />
        </colgroup>
        <thead>
          <tr>
            <th rowspan="2">Tipo</th>
            <th rowspan="2">Unidades</th>
            <th rowspan="2">Fração ideal</th>
            <th rowspan="2">Taxa cheia atual</th>
            <th rowspan="2">Atual em dia</th>
            <th class="forecast-group" colspan="3">Reajuste pela previsão</th>
            <th class="ipca-group" colspan="2">Reajuste pelo IPCA</th>
          </tr>
          <tr>
            <th class="forecast-group">Em dia</th>
            <th class="forecast-group">Taxa cheia</th>
            <th class="forecast-group">Diferença em dia</th>
            <th class="ipca-group">Em dia</th>
            <th class="ipca-group">Taxa cheia</th>
          </tr>
        </thead>
        <tbody>
          ${[...idealFractionBands]
            .sort(
              (left, right) =>
                currentAssessmentBeforeDiscount * left.fraction -
                currentAssessmentBeforeDiscount * right.fraction
            )
            .map((band) => {
              const currentFeeBeforeDiscount = currentAssessmentBeforeDiscount * band.fraction;
              const currentFeePaidOnTime = applyOnTimePaymentDiscount(currentFeeBeforeDiscount);
              const adjustedFeePaidOnTime = plannedAssessmentPaidOnTime * band.fraction;
              const adjustedFeeBeforeDiscount = grossUpOnTimePaymentDiscount(adjustedFeePaidOnTime);
              const forecastDifference = adjustedFeePaidOnTime - currentFeePaidOnTime;
              const ipcaAdjustedFeeBeforeDiscount = currentFeeBeforeDiscount * (1 + ipcaAdjustment.rate / 100);
              const ipcaAdjustedFeePaidOnTime = applyOnTimePaymentDiscount(ipcaAdjustedFeeBeforeDiscount);
              return `
                <tr>
                  <td>${band.type}</td>
                  <td>${band.units}</td>
                  <td>${band.fraction.toFixed(6).replace(".", ",")}</td>
                  <td>${formatCurrency(currentFeeBeforeDiscount)}</td>
                  <td>${formatCurrency(currentFeePaidOnTime)}</td>
                  <td class="forecast-group">${formatCurrency(adjustedFeePaidOnTime)}</td>
                  <td class="forecast-group">${formatCurrency(adjustedFeeBeforeDiscount)}</td>
                  <td class="forecast-group status-negative">${formatSignedCurrency(forecastDifference)}</td>
                  <td class="ipca-group">${formatCurrency(ipcaAdjustedFeePaidOnTime)}</td>
                  <td class="ipca-group">${formatCurrency(ipcaAdjustedFeeBeforeDiscount)}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    <p class="adjustment-note">
      A soma das frações consideradas é ${totalFractions
        .toFixed(6)
        .replace(".", ",")}. Os valores "em dia" aplicam desconto de ${onTimePaymentDiscountLabel()} sobre a taxa cheia. O grupo "Reajuste pela previsão" distribui a nova arrecadação em dia de ${formatCurrency(
    plannedAssessmentPaidOnTime
  )}, exatamente igual à previsão, e informa a taxa cheia necessária de ${formatCurrency(
    requiredAssessmentBeforeDiscount
  )} antes do desconto. O grupo "Reajuste pelo IPCA" usa ${ipcaAdjustment.label}, equivalente a ${formatPercent(
    ipcaAdjustment.rate
  )}, conforme ${ipcaAdjustment.source}. A linha duplicada do Tipo E no documento de especificação foi considerada uma única vez para fechar 100% das frações.
    </p>
  `;
}

function renderInsights(data) {
  const ordinaryRevenue = sum(data, (item) => item.revenueOrdinary);
  const ordinaryExpense = sum(data, (item) => item.expenseOrdinary);
  const extraRevenue = sum(data, (item) => item.revenueExtra);
  const extraExpense = sum(data, (item) => item.expenseExtra);
  const totalBalance = ordinaryRevenue + extraRevenue - ordinaryExpense - extraExpense;
  const biggestDeficit = data.reduce((worst, item) => {
    const balance = item.revenueTotal - item.expenseTotal;
    if (!worst || balance < worst.balance) {
      return { label: item.label, balance };
    }
    return worst;
  }, null);

  const items = [
    {
      title: "Operação ordinária quase empatada",
      text: `Receitas ordinarias fecharam o ano em ${formatCurrency(
        ordinaryRevenue
      )}, contra ${formatCurrency(
        ordinaryExpense
      )} de despesas ordinarias. O saldo ficou em ${formatSignedCurrency(
        ordinaryRevenue - ordinaryExpense
      )}.`,
    },
    {
      title: "Taxa extra sustentou a folga do caixa",
      text: `A arrecadacao extra somou ${formatCurrency(
        extraRevenue
      )} e bancou ${formatCurrency(
        extraExpense
      )} de saidas extraordinarias, deixando ${formatSignedCurrency(
        extraRevenue - extraExpense
      )}.`,
    },
    {
      title: "Previsão de 2026 pede reforço mensal",
      text: `A planilha aponta ${formatCurrency(
        budgetData.monthlyTotal
      )} por mês. A média ordinária de ${currentYear()} ficou em ${formatCurrency(
        averageOrdinaryRevenue(data)
      )}, abaixo em ${formatCurrency(Math.max(budgetData.monthlyTotal - averageOrdinaryRevenue(data), 0))}.`,
    },
    {
      title: "Pior mês do realizado",
      text: `${biggestDeficit.label} registrou ${formatSignedCurrency(
        biggestDeficit.balance
      )}. Ainda assim, o ano fechou com ${formatSignedCurrency(totalBalance)}.`,
    },
  ];

  document.getElementById("insightsList").innerHTML = items
    .map(
      (item) => `
        <article class="insight-item">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderTypeMix(data) {
  const mix = [
    {
      label: "Receitas ordinarias",
      value: sum(data, (item) => item.revenueOrdinary),
      tone: "revenue",
    },
    {
      label: "Receitas extras",
      value: sum(data, (item) => item.revenueExtra),
      tone: "revenue",
    },
    {
      label: "Despesas ordinarias",
      value: sum(data, (item) => item.expenseOrdinary),
      tone: "expense",
    },
    {
      label: "Despesas extras",
      value: sum(data, (item) => item.expenseExtra),
      tone: "expense",
    },
  ];

  const maxValue = Math.max(...mix.map((item) => item.value), 1);

  document.getElementById("typeMix").innerHTML = mix
    .map((item) => {
      const width = (item.value / maxValue) * 100;
      return `
        <div class="mix-row">
          <span class="chart-label">${item.label}</span>
          <div class="mix-track">
            <div class="mix-fill ${item.tone}" style="width:${width}%"></div>
          </div>
          <strong>${formatCurrency(item.value)}</strong>
        </div>
      `;
    })
    .join("");
}

function statusChip(balance) {
  if (balance > 0) {
    return '<span class="status-chip positive">Superavit</span>';
  }
  if (balance < 0) {
    return '<span class="status-chip negative">Deficit</span>';
  }
  return '<span class="status-chip neutral">Empate</span>';
}

function renderMonthlyBarChart(data, type) {
  const chart = document.getElementById("monthlyBarChart");
  const rows = data.map((item) => {
    const revenue = selectedRevenue(item, type);
    const expense = selectedExpense(item, type);
    return {
      label: item.label,
      revenue,
      expense,
      balance: revenue - expense,
    };
  });
  const maxValue = Math.max(
    ...rows.flatMap((item) => [item.revenue, item.expense]),
    1
  );

  chart.innerHTML = `
    <div class="monthly-bar-legend" aria-hidden="true">
      <span><i class="legend-dot revenue"></i>Receitas</span>
      <span><i class="legend-dot expense"></i>Despesas</span>
    </div>
    <div class="monthly-bar-list">
      ${rows
        .map((item) => {
          const revenueHeight = (item.revenue / maxValue) * 100;
          const expenseHeight = (item.expense / maxValue) * 100;
          const tooltip = `${item.label} | Receitas: ${formatCurrency(item.revenue)} | Despesas: ${formatCurrency(
            item.expense
          )} | Resultado: ${formatSignedCurrency(item.balance)}`;
          const safeTooltip = escapeAttribute(tooltip);
          return `
            <div class="monthly-bar-row">
              <div class="monthly-bar-pair" aria-label="${item.label}: receitas ${formatCurrency(
            item.revenue
          )}, despesas ${formatCurrency(item.expense)}, resultado ${formatSignedCurrency(
            item.balance
          )}" title="${item.label}: resultado ${formatSignedCurrency(item.balance)}">
                <div class="monthly-bar-line">
                  <span
                    class="monthly-bar-fill revenue"
                    style="height:${revenueHeight}%"
                    data-tooltip="${safeTooltip}"
                    tabindex="0"
                    title="${safeTooltip}"
                  ></span>
                </div>
                <div class="monthly-bar-line">
                  <span
                    class="monthly-bar-fill expense"
                    style="height:${expenseHeight}%"
                    data-tooltip="${safeTooltip}"
                    tabindex="0"
                    title="${safeTooltip}"
                  ></span>
                </div>
              </div>
              <div class="monthly-bar-head">
                <strong>${item.label}</strong>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
    <div class="monthly-bar-tooltip" hidden></div>
  `;

  bindMonthlyBarTooltip(chart);
}

function renderTable(data, type) {
  document.getElementById("monthlyTableBody").innerHTML = data
    .map((item) => {
      const revenue = selectedRevenue(item, type);
      const expense = selectedExpense(item, type);
      const balance = revenue - expense;
      return `
        <tr>
          <td>${item.label}</td>
          <td>${formatCurrency(revenue)}</td>
          <td>${formatCurrency(expense)}</td>
          <td class="${balance >= 0 ? "status-positive" : "status-negative"}">${formatSignedCurrency(
            balance
          )}</td>
          <td>${statusChip(balance)}</td>
        </tr>
      `;
    })
    .join("");
}

function populateYearFilter() {
  const years = availableYears();
  if (!years.length) {
    yearFilter.innerHTML = "";
    return;
  }
  yearFilter.innerHTML = years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  yearFilter.value = years.includes(2025) ? "2025" : String(Math.min(...years));
}

function populateMonthFilter() {
  if (!yearFilter.value) {
    monthFilter.innerHTML = '<option value="all">Ano completo</option>';
    return;
  }
  monthFilter.innerHTML =
    '<option value="all">Ano completo</option>' +
    currentYearData()
      .map((item) => `<option value="${item.month}">${item.label}</option>`)
    .join("");
  monthFilter.value = "all";
}

function render() {
  const yearData = currentYearData();
  const expenseData = expenseScopedData();

  hideExpenseFloatingBox();
  renderFilterSummary(yearData);
  renderMetrics(yearData, "all");
  renderExpenseDetail(expenseData);
  renderBudget();
  renderInsights(yearData);
  renderTypeMix(yearData);
  renderMonthlyBarChart(yearData, "all");
  renderTable(yearData, "all");
  renderAdjustmentImpact();
}

function activateTab(target) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === target;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

yearFilter.addEventListener("change", () => {
  populateMonthFilter();
  render();
});
monthFilter.addEventListener("change", render);
expenseCategoryFilter.addEventListener("change", render);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
});
if (expenseFloatingBox) {
  expenseFloatingBox.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", (event) => {
    if (
      expenseFloatingBox.hidden ||
      expenseFloatingBox.contains(event.target) ||
      event.target.closest(".expense-detail-row")
    ) {
      return;
    }
    hideExpenseFloatingBox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideExpenseFloatingBox();
    }
  });
}

async function initDashboard() {
  if (dashboardInitialized) return;
  dashboardInitialized = true;

  try {
    await loadDashboardData();
    populateYearFilter();
    populateMonthFilter();
    render();
  } catch (error) {
    console.error(error);
    showDataLoadError(error);
  }
}

initDashboard();
