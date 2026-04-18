const monthlyData = [
  {
    id: "jan",
    year: 2025,
    month: 1,
    label: "Janeiro",
    revenueTotal: 29752.32,
    revenueOrdinary: 15732.35,
    revenueExtra: 14019.97,
    condoFee: 15476.25,
    expenseTotal: 15836.87,
    expenseOrdinary: 15436.87,
    expenseExtra: 400.0,
    expenseCategories: { personnel: 3817.02, contracts: 3911.24, materials: 250.8 },
  },
  {
    id: "fev",
    year: 2025,
    month: 2,
    label: "Fevereiro",
    revenueTotal: 30212.42,
    revenueOrdinary: 16214.46,
    revenueExtra: 13997.96,
    condoFee: 16123.31,
    expenseTotal: 15003.33,
    expenseOrdinary: 14166.08,
    expenseExtra: 837.25,
    expenseCategories: { personnel: 2878.32, contracts: 3742.54, materials: 805.0 },
  },
  {
    id: "mar",
    year: 2025,
    month: 3,
    label: "Março",
    revenueTotal: 16807.82,
    revenueOrdinary: 16167.62,
    revenueExtra: 640.2,
    condoFee: 16087.3,
    expenseTotal: 22029.57,
    expenseOrdinary: 13849.57,
    expenseExtra: 8180.0,
    expenseCategories: { personnel: 2918.38, contracts: 3992.54, materials: 199.9 },
  },
  {
    id: "abr",
    year: 2025,
    month: 4,
    label: "Abril",
    revenueTotal: 15447.43,
    revenueOrdinary: 15447.43,
    revenueExtra: 0.0,
    condoFee: 14709.24,
    expenseTotal: 17959.57,
    expenseOrdinary: 13036.11,
    expenseExtra: 4923.46,
    expenseCategories: { personnel: 2875.07, contracts: 3992.54, materials: 199.95 },
  },
  {
    id: "mai",
    year: 2025,
    month: 5,
    label: "Maio",
    revenueTotal: 15407.88,
    revenueOrdinary: 15407.88,
    revenueExtra: 0.0,
    condoFee: 15380.6,
    expenseTotal: 19172.85,
    expenseOrdinary: 17113.85,
    expenseExtra: 2059.0,
    expenseCategories: { personnel: 2969.75, contracts: 3992.54, materials: 1780.79 },
  },
  {
    id: "jun",
    year: 2025,
    month: 6,
    label: "Junho",
    revenueTotal: 29447.52,
    revenueOrdinary: 14738.48,
    revenueExtra: 14709.04,
    condoFee: 14709.24,
    expenseTotal: 21580.98,
    expenseOrdinary: 14880.98,
    expenseExtra: 6700.0,
    expenseCategories: { personnel: 2811.55, contracts: 6804.08, materials: 86.68 },
  },
  {
    id: "jul",
    year: 2025,
    month: 7,
    label: "Julho",
    revenueTotal: 32537.2,
    revenueOrdinary: 16268.71,
    revenueExtra: 16268.49,
    condoFee: 16268.71,
    expenseTotal: 19355.88,
    expenseOrdinary: 16855.88,
    expenseExtra: 2500.0,
    expenseCategories: { personnel: 2801.15, contracts: 6864.33, materials: 840.86 },
  },
  {
    id: "ago",
    year: 2025,
    month: 8,
    label: "Agosto",
    revenueTotal: 30690.03,
    revenueOrdinary: 15526.39,
    revenueExtra: 15163.64,
    condoFee: 15199.19,
    expenseTotal: 11743.68,
    expenseOrdinary: 11743.68,
    expenseExtra: 0.0,
    expenseCategories: { personnel: 692.56, contracts: 5584.33, materials: 624.4 },
  },
  {
    id: "set",
    year: 2025,
    month: 9,
    label: "Setembro",
    revenueTotal: 30907.99,
    revenueOrdinary: 15527.6,
    revenueExtra: 15380.39,
    condoFee: 15380.6,
    expenseTotal: 17600.21,
    expenseOrdinary: 17600.21,
    expenseExtra: 0.0,
    expenseCategories: { personnel: 4920.14, contracts: 8263.22, materials: 181.9 },
  },
  {
    id: "out",
    year: 2025,
    month: 10,
    label: "Outubro",
    revenueTotal: 32103.7,
    revenueOrdinary: 16051.96,
    revenueExtra: 16051.74,
    condoFee: 16051.96,
    expenseTotal: 39207.0,
    expenseOrdinary: 15292.7,
    expenseExtra: 23914.3,
    expenseCategories: { personnel: 3519.39, contracts: 6983.22, materials: 402.25 },
  },
  {
    id: "nov",
    year: 2025,
    month: 11,
    label: "Novembro",
    revenueTotal: 27979.92,
    revenueOrdinary: 13942.23,
    revenueExtra: 14037.69,
    condoFee: 14084.62,
    expenseTotal: 37933.13,
    expenseOrdinary: 18802.65,
    expenseExtra: 19130.48,
    expenseCategories: { personnel: 3783.48, contracts: 6983.22, materials: 555.6 },
  },
  {
    id: "dez",
    year: 2025,
    month: 12,
    label: "Dezembro",
    revenueTotal: 32447.62,
    revenueOrdinary: 16179.13,
    revenueExtra: 16268.49,
    condoFee: 16304.05,
    expenseTotal: 38070.51,
    expenseOrdinary: 18940.03,
    expenseExtra: 19130.48,
    expenseCategories: { personnel: 4276.02, contracts: 6983.22, materials: 352.2 },
  },
  {
    id: "jan",
    year: 2026,
    month: 1,
    label: "Janeiro",
    revenueTotal: 28603.53,
    revenueOrdinary: 14111.24,
    revenueExtra: 14492.29,
    condoFee: 14492.49,
    expenseTotal: 35811.29,
    expenseOrdinary: 16680.81,
    expenseExtra: 19130.48,
    expenseCategories: { personnel: 2920.75, contracts: 7055.32, materials: 159.4 },
    source: "dados/202602.pdf",
  },
  {
    id: "fev",
    year: 2026,
    month: 2,
    label: "Fevereiro",
    revenueTotal: 30600.47,
    revenueOrdinary: 15220.08,
    revenueExtra: 15380.39,
    condoFee: 15415.94,
    expenseTotal: 36120.35,
    expenseOrdinary: 16989.87,
    expenseExtra: 19130.48,
    expenseCategories: { personnel: 2942.51, contracts: 7107.54, materials: 760.88 },
    source: "dados/202603.pdf",
  },
];

const budgetData = {
  monthlyBase: 17824.0,
  reserveFund: 891.2,
  optionalMaintenanceFund: 0.0,
  monthlyTotal: 18715.2,
  annualTotal: 224582.4,
  adjustment: "Ajuste de 21,68%",
  categories: [
    { label: "Contratos Fixos", value: 7376.0 },
    { label: "Despesa com Pessoal", value: 3481.0 },
    { label: "Empresas Públicas e Privadas", value: 3450.0 },
    { label: "Impostos e Tarifas", value: 1863.0 },
    { label: "Serviços de Conservação", value: 800.0 },
    { label: "Materiais de Conservação", value: 500.0 },
    { label: "Imobilizado", value: 250.0 },
    { label: "Despesas Diversas Ordinárias", value: 104.0 },
  ],
};

const currentAvailableBalance = {
  period: "FEV 2026",
  account: "Conta Corrente SICOOB Creduni",
  checking: 39695.08,
  financialTotal: 46357.79,
  source: "dados/202603.pdf",
};

const currentCondoAssessment = {
  monthlyTotal: 16190.14,
  source: "Composição da cobrança 2026 nos PDFs mensais",
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

const typeLabels = {
  all: "todas as movimentações",
  ordinary: "somente rotinas ordinárias",
  extra: "somente movimentos de taxa extra",
};

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
const typeFilter = document.getElementById("typeFilter");
const expenseCategoryFilter = document.getElementById("expenseCategoryFilter");
const tabButtons = Array.from(document.querySelectorAll("[data-tab-target]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

const expenseCategorySeries = {
  total: {
    label: "Total de despesas",
    description: "Soma completa das saídas registradas no balancete.",
  },
  ordinary: {
    label: "Despesas ordinárias",
    description: "Custos recorrentes e operacionais do condomínio.",
  },
  extra: {
    label: "Despesas extraordinárias",
    description: "Saídas cobertas por taxa extra e intervenções fora da rotina.",
  },
  personnel: {
    label: "Pessoal / funcionários",
    description: "Folha, encargos e custos de equipe registrados como despesa com pessoal.",
  },
  contracts: {
    label: "Contratos fixos",
    description: "Piscina, administração, elevador, síndico e contratos recorrentes.",
  },
  materials: {
    label: "Materiais de conservação",
    description: "Materiais de limpeza, manutenção, piscina, pintura e insumos afins.",
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

function sum(items, selector) {
  return items.reduce((total, item) => total + selector(item), 0);
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
  const monthValue = monthFilter.value;
  const data = currentYearData();
  if (monthValue === "all") return data;
  return data.filter((item) => String(item.month) === monthValue);
}

function currentType() {
  return typeLabels[typeFilter.value] ? typeFilter.value : "all";
}

function averageOrdinaryRevenue(data = currentYearData()) {
  return sum(data, (item) => item.revenueOrdinary) / data.length;
}

function averageCondoFee(data = currentYearData()) {
  return sum(data, (item) => item.condoFee) / data.length;
}

function expenseCategoryValue(item, categoryKey) {
  if (categoryKey === "total") return item.expenseTotal;
  if (categoryKey === "ordinary") return item.expenseOrdinary;
  if (categoryKey === "extra") return item.expenseExtra;
  return item.expenseCategories?.[categoryKey] ?? 0;
}

function expenseComposition(data) {
  const personnel = sum(data, (item) => expenseCategoryValue(item, "personnel"));
  const contracts = sum(data, (item) => expenseCategoryValue(item, "contracts"));
  const materials = sum(data, (item) => expenseCategoryValue(item, "materials"));
  const extra = sum(data, (item) => expenseCategoryValue(item, "extra"));
  const total = sum(data, (item) => item.expenseTotal);
  const mappedTotal = personnel + contracts + materials + extra;
  const other = Math.max(total - mappedTotal, 0);

  return [
    { label: "Pessoal / funcionários", value: personnel, color: "#1b8c88" },
    { label: "Contratos fixos", value: contracts, color: "#c79c34" },
    { label: "Materiais de conservação", value: materials, color: "#6f9f4f" },
    { label: "Extraordinárias", value: extra, color: "#cc5a37" },
    { label: "Outras despesas", value: other, color: "#6d7f83" },
  ].filter((item) => item.value > 0);
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

function renderFilterSummary(data, type) {
  const totalRevenue = sum(data, (item) => selectedRevenue(item, type));
  const totalExpense = sum(data, (item) => selectedExpense(item, type));
  const balance = totalRevenue - totalExpense;
  const periodLabel =
    data.length === 1 ? `${data[0].label} ${data[0].year}` : `${currentYear()} (${data.length} meses)`;

  document.getElementById(
    "filterSummary"
  ).textContent = `${periodLabel} | ${typeLabels[type]} | saldo ${formatSignedCurrency(
    balance
  )}`;
}

function renderMetrics(data, type) {
  const revenue = sum(data, (item) => selectedRevenue(item, type));
  const expense = sum(data, (item) => selectedExpense(item, type));
  const balance = revenue - expense;
  const monthsInScope = data.length;
  const yearData = currentYearData();
  const actualAverage = averageOrdinaryRevenue(yearData);
  const condoAverage = averageCondoFee(yearData);
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
          : `Média ordinária de ${currentYear()}: ${formatCurrency(actualAverage)}. Taxa condominial pura: ${formatCurrency(
              condoAverage
            )}.`,
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

  document.getElementById("expenseDetailList").innerHTML = data
    .map((item, index) => {
      const categoryValue = scopedSeries[index].value;
      const width = (categoryValue / maxExpense) * 100;
      const shareOfMonth = item.expenseTotal === 0 ? 0 : (categoryValue / item.expenseTotal) * 100;
      return `
        <div class="expense-detail-row">
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
}

function renderBudget() {
  const maxCategory = Math.max(...budgetData.categories.map((item) => item.value), 1);

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
  )} no ano. A linha "${budgetData.adjustment}" aparece na planilha, mas sem valor aplicado.`;
}

function renderAdjustmentImpact() {
  const adjustmentRate =
    (budgetData.monthlyTotal / currentCondoAssessment.monthlyTotal - 1) * 100;
  const totalFractions = idealFractionBands.reduce(
    (total, band) => total + band.count * band.fraction,
    0
  );

  document.getElementById("adjustmentImpact").innerHTML = `
    <div class="adjustment-summary">
      <article class="adjustment-card">
        <strong>Arrecadação ordinária atual</strong>
        <span>${formatCurrency(currentCondoAssessment.monthlyTotal)}</span>
        <p>${currentCondoAssessment.source}</p>
      </article>
      <article class="adjustment-card">
        <strong>Previsão mensal 2026</strong>
        <span>${formatCurrency(budgetData.monthlyTotal)}</span>
        <p>Total mensal conferido com a planilha.</p>
      </article>
      <article class="adjustment-card highlight">
        <strong>Ajuste global necessário</strong>
        <span>${formatPercent(adjustmentRate)}</span>
        <p>Aplicado linearmente sobre a taxa condominial atual.</p>
      </article>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Unidades</th>
            <th>Fração ideal</th>
            <th>Taxa atual</th>
            <th>Após ajuste</th>
            <th>Diferença</th>
          </tr>
        </thead>
        <tbody>
          ${[...idealFractionBands]
            .sort(
              (left, right) =>
                currentCondoAssessment.monthlyTotal * left.fraction -
                currentCondoAssessment.monthlyTotal * right.fraction
            )
            .map((band) => {
              const currentFee = currentCondoAssessment.monthlyTotal * band.fraction;
              const adjustedFee = budgetData.monthlyTotal * band.fraction;
              return `
                <tr>
                  <td>${band.type}</td>
                  <td>${band.units}</td>
                  <td>${band.fraction.toFixed(6).replace(".", ",")}</td>
                  <td>${formatCurrency(currentFee)}</td>
                  <td>${formatCurrency(adjustedFee)}</td>
                  <td class="status-negative">+${formatCurrency(adjustedFee - currentFee)}</td>
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
        .replace(".", ",")}. A linha duplicada do Tipo E no documento de especificação foi considerada uma única vez para fechar 100% das frações.
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
  yearFilter.innerHTML = years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
  yearFilter.value = years.includes(2025) ? "2025" : String(Math.min(...years));
}

function populateMonthFilter() {
  monthFilter.innerHTML =
    '<option value="all">Ano completo</option>' +
    currentYearData()
      .map((item) => `<option value="${item.month}">${item.label}</option>`)
    .join("");
  monthFilter.value = "all";
}

function render() {
  const data = scopedData();
  const type = currentType();

  renderFilterSummary(data, type);
  renderMetrics(data, type);
  renderExpenseDetail(data);
  renderBudget();
  renderInsights(data);
  renderTypeMix(data);
  renderMonthlyBarChart(data, type);
  renderTable(data, type);
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

populateYearFilter();
populateMonthFilter();
yearFilter.addEventListener("change", () => {
  populateMonthFilter();
  render();
});
typeFilter.addEventListener("change", render);
monthFilter.addEventListener("change", render);
expenseCategoryFilter.addEventListener("change", render);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
});
render();
