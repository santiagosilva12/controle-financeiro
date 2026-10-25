/**
 * ==========================================================================
 * Finanças Vitor & Andressa - Lógica da Aplicação
 * ==========================================================================
 */

// Chaves de armazenamento local
const STORAGE_KEY = 'VA_FINANCAS_V1';
const THEME_KEY = 'VA_FINANCAS_THEME';
const NEON_CONFIG_KEY = 'VA_NEON_CONFIG_V1';

// Configuração padrão da nuvem Neon (AWS São Paulo)
const DEFAULT_NEON_CONFIG = {
  enabled: true,
  endpoint: 'https://ep-dry-glitter-b6oe872n-pooler.c-2.sa-east-1.aws.neon.tech/sql',
  connectionString: 'postgresql://neondb_owner:npg_3zLyACZHBph8@ep-dry-glitter-b6oe872n-pooler.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require',
  projectName: 'controle-financeiro',
  region: 'São Paulo (aws-sa-east-1)'
};

// Formatação monetária BRL
const formatMoney = (val) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(val || 0);
};

// Formatação de data
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

// Dados padrão iniciais (Realistas para o casal)
const defaultData = {
  salaries: {
    vitor: 0,
    dia15: 2900.00,
    dia30: 2900.00,
    andressa: 5800.00
  },
  savingsGoal: 2500.00,
  fgts: {
    vitor: 0,
    andressa: 14200.00
  },
  accounts: [
    {
      id: 'acc_nubank_vitor',
      name: 'Nubank Vitor',
      holder: 'Vitor',
      institution: 'nubank',
      balance: 3850.50,
      type: 'Conta Corrente'
    },
    {
      id: 'acc_nubank_andressa',
      name: 'Nubank Andressa',
      holder: 'Andressa',
      institution: 'nubank',
      balance: 2940.20,
      type: 'Conta Corrente'
    },
    {
      id: 'acc_rico_andressa',
      name: 'Rico Investimentos',
      holder: 'Andressa',
      institution: 'rico',
      balance: 15400.00,
      type: 'Investimentos'
    },
    {
      id: 'acc_bradesco',
      name: 'Bradesco Conjunta',
      holder: 'Casal',
      institution: 'bradesco',
      balance: 4120.80,
      type: 'Conta Corrente'
    }
  ],
  creditCards: [
    {
      id: 'card_nubank',
      name: 'Cartão Nubank',
      institution: 'nubank',
      invoiceAmount: 1850.40,
      dueDay: 10,
      limit: 8000.00,
      isPaid: false,
      monthlyInvoices: {
        '2026-10': { amount: 1850.40, isPaid: false },
        '2026-11': { amount: 1200.00, isPaid: false },
        '2026-12': { amount: 950.00, isPaid: false }
      }
    },
    {
      id: 'card_rico',
      name: 'Cartão Rico',
      institution: 'rico',
      invoiceAmount: 890.00,
      dueDay: 15,
      limit: 6000.00,
      isPaid: false,
      monthlyInvoices: {
        '2026-10': { amount: 890.00, isPaid: false },
        '2026-11': { amount: 650.00, isPaid: false },
        '2026-12': { amount: 400.00, isPaid: false }
      }
    },
    {
      id: 'card_bradesco',
      name: 'Cartão Bradesco',
      institution: 'bradesco',
      invoiceAmount: 1340.50,
      dueDay: 25,
      limit: 7500.00,
      isPaid: false,
      monthlyInvoices: {
        '2026-10': { amount: 1340.50, isPaid: false },
        '2026-11': { amount: 1100.00, isPaid: false },
        '2026-12': { amount: 800.00, isPaid: false }
      }
    }
  ],
  consultancies: [
    {
      id: 'c1',
      client: 'Startup Tech Soluções',
      person: 'Vitor',
      description: 'Consultoria de Arquitetura de Sistemas',
      amount: 2800.00,
      date: '2026-10-14',
      status: 'recebido'
    },
    {
      id: 'c2',
      client: 'Agência Digital Impulse',
      person: 'Vitor',
      description: 'Assessoria de Automação de Processos',
      amount: 1500.00,
      date: '2026-10-25',
      status: 'pendente'
    },
    {
      id: 'c3',
      client: 'Clínica Saúde Plena',
      person: 'Andressa',
      description: 'Consultoria de Gestão e Planejamento',
      amount: 1200.00,
      date: '2026-10-18',
      status: 'recebido'
    }
  ],
  expenses: [
    {
      id: 'e1',
      description: 'Aluguel & Condomínio',
      type: 'fixa',
      category: 'Moradia',
      amount: 2600.00,
      dueDate: '2026-10-10',
      isPaid: true
    },
    {
      id: 'e2',
      description: 'Conta de Energia Elétrica',
      type: 'fixa',
      category: 'Moradia',
      amount: 280.00,
      dueDate: '2026-10-15',
      isPaid: true
    },
    {
      id: 'e3',
      description: 'Internet Fibra Óptica',
      type: 'fixa',
      category: 'Serviços',
      amount: 149.90,
      dueDate: '2026-10-18',
      isPaid: true
    },
    {
      id: 'e4',
      description: 'Plano de Saúde Familiar',
      type: 'fixa',
      category: 'Saúde',
      amount: 850.00,
      dueDate: '2026-10-22',
      isPaid: false
    },
    {
      id: 'e5',
      description: 'Supermercado Mensal',
      type: 'variavel',
      category: 'Alimentação',
      amount: 1450.00,
      dueDate: '2026-10-12',
      isPaid: true
    },
    {
      id: 'e6',
      description: 'Combustível & Estacionamentos',
      type: 'variavel',
      category: 'Transporte',
      amount: 420.00,
      dueDate: '2026-10-20',
      isPaid: false
    },
    {
      id: 'e7',
      description: 'Lazer, Jantares e Restaurantes',
      type: 'variavel',
      category: 'Lazer',
      amount: 550.00,
      dueDate: '2026-10-26',
      isPaid: false
    },
    {
      id: 'e8',
      description: 'Farmácia e Medicamentos',
      type: 'variavel',
      category: 'Saúde',
      amount: 130.00,
      dueDate: '2026-10-16',
      isPaid: true
    }
  ]
};

// Objeto de Aplicação
const app = {
  data: null,
  activeFilter: 'all',
  currentDate: new Date(2026, 9, 1), // Outubro 2026
  cashflowChartInstance: null,
  distributionChartInstance: null,
  neonConfig: null,
  neonStatus: 'checking',
  lastSyncTime: null,

  init() {
    this.loadData();
    this.initTheme();
    this.initNeon();
    this.setupEventListeners();
    this.updatePeriodDisplay();
    this.renderAll();
  },

  // Normalização de Salários
  normalizeSalaries(salaries) {
    if (!salaries) return { vitor: 0, dia15: 2900.00, dia30: 2900.00, andressa: 5800.00 };
    salaries.vitor = 0;
    const totalAndressa = Number(salaries.andressa) || 5800.00;
    if (salaries.dia15 === undefined || salaries.dia30 === undefined) {
      salaries.dia15 = totalAndressa / 2;
      salaries.dia30 = totalAndressa - salaries.dia15;
    }
    salaries.dia15 = Number(salaries.dia15) || 0;
    salaries.dia30 = Number(salaries.dia30) || 0;
    salaries.andressa = salaries.dia15 + salaries.dia30;
    return salaries;
  },

  // Persistência
  loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        this.data = JSON.parse(saved);
        if (this.data) {
          this.data.salaries = this.normalizeSalaries(this.data.salaries);
          if (this.data.fgts) this.data.fgts.vitor = 0;
          if (this.data.creditCards) {
            this.data.creditCards.forEach(c => {
              if (!c.monthlyInvoices) {
                c.monthlyInvoices = {};
              }
              if (!c.monthlyInvoices['2026-10'] && c.invoiceAmount !== undefined) {
                c.monthlyInvoices['2026-10'] = {
                  amount: Number(c.invoiceAmount) || 0,
                  isPaid: !!c.isPaid
                };
              }
            });
          }
        }
      } catch (e) {
        console.error('Erro ao ler dados salvos, usando padrão:', e);
        this.data = JSON.parse(JSON.stringify(defaultData));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(defaultData));
      this.saveData();
    }
  },

  saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    this.syncToNeon(true);
  },

  // Alternância de Tema Claro / Escuro
  initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'theme-dark';
    document.body.className = savedTheme;
    this.updateThemeButton();
  },

  toggleTheme() {
    if (document.body.classList.contains('theme-dark')) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem(THEME_KEY, 'theme-light');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem(THEME_KEY, 'theme-dark');
    }
    this.updateThemeButton();
    this.renderCharts();
  },

  updateThemeButton() {
    const isDark = document.body.classList.contains('theme-dark');
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    if (isDark) {
      icon.className = 'ph ph-moon';
      text.textContent = 'Modo Escuro';
    } else {
      icon.className = 'ph ph-sun';
      text.textContent = 'Modo Claro';
    }
  },

  // Event Listeners
  setupEventListeners() {
    // Abas de navegação
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Alternar tema
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      this.toggleTheme();
    });

    // Seletor de período
    document.getElementById('btnPrevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updatePeriodDisplay();
      this.renderAll();
    });

    document.getElementById('btnNextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.updatePeriodDisplay();
      this.renderAll();
    });

    // Backup & Restore
    document.getElementById('btnExportData').addEventListener('click', () => this.exportBackup());
    document.getElementById('btnImportData').addEventListener('click', () => {
      document.getElementById('fileImportInput').click();
    });
    document.getElementById('fileImportInput').addEventListener('change', (e) => this.importBackup(e));
    document.getElementById('btnResetDemoData').addEventListener('click', () => this.resetDemoData());

    // Sincronização em Nuvem com Neon
    const btnNeonSync = document.getElementById('btnNeonSync');
    if (btnNeonSync) btnNeonSync.addEventListener('click', () => this.openNeonModal());
    const btnTopNeonSync = document.getElementById('btnTopNeonSync');
    if (btnTopNeonSync) btnTopNeonSync.addEventListener('click', () => this.openNeonModal());

    // Botões de Ação
    document.getElementById('btnQuickAdd').addEventListener('click', () => this.openQuickAddModal());
    document.getElementById('btnEditAccounts').addEventListener('click', () => this.openAccountsModal());
    document.getElementById('btnEditFgts').addEventListener('click', () => this.openFgtsModal());
    document.getElementById('btnNewCreditCard').addEventListener('click', () => this.openNewCardModal());
    const btnManageMonthlyInvoices = document.getElementById('btnManageMonthlyInvoices');
    if (btnManageMonthlyInvoices) {
      btnManageMonthlyInvoices.addEventListener('click', () => this.openCreditCardModal());
    }
    document.getElementById('btnEditSalaries').addEventListener('click', () => this.openSalariesModal());
    document.getElementById('btnNewConsultancy').addEventListener('click', () => this.openConsultancyModal());
    document.getElementById('btnNewExpense').addEventListener('click', () => this.openExpenseModal());
    document.getElementById('btnEditarMeta').addEventListener('click', () => this.openSavingsGoalModal());
    document.getElementById('btnConfigPoupanca').addEventListener('click', () => this.openSavingsGoalModal());

    // Fechar Modal
    document.getElementById('modalCloseBtn').addEventListener('click', () => this.closeModal());
    document.getElementById('mainModal').addEventListener('click', (e) => {
      if (e.target.id === 'mainModal') this.closeModal();
    });

    // Filtros de despesas
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.getAttribute('data-filter');
        this.renderExpensesTable();
      });
    });
  },

  getCurrentMonthKey() {
    const y = this.currentDate.getFullYear();
    const m = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  },

  getMonthName(date = this.currentDate) {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[date.getMonth()];
  },

  formatMonthKeyLabel(monthKey) {
    if (!monthKey) return '';
    const [y, m] = monthKey.split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    return `${this.getMonthName(d)} / ${y}`;
  },

  setPeriod(monthKey) {
    const [y, m] = monthKey.split('-').map(Number);
    this.currentDate = new Date(y, m - 1, 1);
    this.updatePeriodDisplay();
    this.renderAll();
    this.showToast(`Visualizando período: ${this.formatMonthKeyLabel(monthKey)}`);
  },

  getCardInvoice(card, monthKey = this.getCurrentMonthKey()) {
    if (!card.monthlyInvoices) {
      card.monthlyInvoices = {};
    }
    if (!card.monthlyInvoices[monthKey]) {
      const defaultAmount = (monthKey === '2026-10') ? (Number(card.invoiceAmount) || 0) : 0;
      card.monthlyInvoices[monthKey] = {
        amount: defaultAmount,
        isPaid: false
      };
    }
    return card.monthlyInvoices[monthKey];
  },

  getAvailableMonthOptions(selectedKey) {
    const options = [];
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    [2026, 2027].forEach(year => {
      months.forEach((name, idx) => {
        const k = `${year}-${String(idx + 1).padStart(2, '0')}`;
        const isSel = (k === selectedKey) ? 'selected' : '';
        options.push(`<option value="${k}" ${isSel}>${name} / ${year}</option>`);
      });
    });

    return options.join('');
  },

  updateModalInvoiceTotal() {
    let sum = 0;
    this.data.creditCards.forEach(c => {
      const el = document.getElementById(`cardInv_${c.id}`);
      if (el) sum += parseFloat(el.value) || 0;
    });
    const totalEl = document.getElementById('modalInvoicesTotalDisplay');
    if (totalEl) totalEl.textContent = formatMoney(sum);
  },

  updatePeriodDisplay() {
    const month = this.getMonthName();
    const year = this.currentDate.getFullYear();
    document.getElementById('currentPeriodDisplay').textContent = `${month} / ${year}`;
  },

  switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.content-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`section-${tabId}`);
    if (targetSec) {
      targetSec.classList.add('active');
    }

    // Fechar menu mobile se aberto
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
    }

    // Se mudou para dashboard, atualizar gráficos
    if (tabId === 'dashboard') {
      setTimeout(() => this.renderCharts(), 50);
    }
  },

  // Helper para verificar se uma despesa está paga no mês selecionado
  isExpensePaid(expense, monthKey = this.getCurrentMonthKey()) {
    if (expense.paidMonths && expense.paidMonths[monthKey] !== undefined) {
      return !!expense.paidMonths[monthKey];
    }
    // Se for variável do próprio mês e marcada como isPaid
    if (expense.type === 'variavel' && expense.dueDate && expense.dueDate.startsWith(monthKey)) {
      return !!expense.isPaid;
    }
    // Fallback inicial para mês de referência 2026-10
    if (monthKey === '2026-10') {
      return !!expense.isPaid;
    }
    return false;
  },

  // Helper para obter a data de vencimento da despesa adequada ao mês selecionado
  getExpenseDueDateForMonth(expense, monthKey = this.getCurrentMonthKey()) {
    if (expense.type === 'fixa') {
      const origDay = expense.dueDate ? expense.dueDate.split('-')[2] : '10';
      return `${monthKey}-${String(origDay).padStart(2, '0')}`;
    }
    return expense.dueDate || `${monthKey}-10`;
  },

  // ==========================================
  // CÁLCULOS PRINCIPAIS
  // ==========================================
  getTotals() {
    // Saldo em Contas (Nubank Vitor, Nubank Andressa, Rico, Bradesco)
    const saldoContas = this.data.accounts.reduce((acc, a) => acc + (Number(a.balance) || 0), 0);

    // Saldo Rico isolado (investimento)
    const saldoRico = this.data.accounts
      .filter(a => a.institution === 'rico')
      .reduce((acc, a) => acc + (Number(a.balance) || 0), 0);

    // FGTS (Apenas Andressa)
    const fgtsVitor = 0;
    const fgtsAndressa = Number(this.data.fgts?.andressa) || 0;
    const fgtsTotal = fgtsAndressa;

    // Mês Selecionado na Barra de Navegação
    const monthKey = this.getCurrentMonthKey();

    // Faturas de Cartões do Mês Selecionado
    const currentInvoices = this.data.creditCards.map(c => {
      const inv = this.getCardInvoice(c, monthKey);
      return { card: c, invoice: inv };
    });

    const totalFaturas = currentInvoices.reduce((acc, item) => acc + (Number(item.invoice.amount) || 0), 0);
    const faturasPendentes = currentInvoices
      .filter(item => !item.invoice.isPaid)
      .reduce((acc, item) => acc + (Number(item.invoice.amount) || 0), 0);

    // Salários Fixos (Dia 15 e Dia 30)
    const salarioVitor = 0;
    const salarioDia15 = Number(this.data.salaries?.dia15) ?? 2900.00;
    const salarioDia30 = Number(this.data.salaries?.dia30) ?? 2900.00;
    const salarioAndressa = salarioDia15 + salarioDia30;
    const salariosTotal = salarioAndressa;

    // Consultorias (PUXAR APENAS AS DO MÊS SELECIONADO)
    const consultoriasDoMes = this.data.consultancies.filter(c => c.date && c.date.startsWith(monthKey));
    const consultoriasRecebidas = consultoriasDoMes
      .filter(c => c.status === 'recebido')
      .reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const consultoriasPendentes = consultoriasDoMes
      .filter(c => c.status === 'pendente')
      .reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const consultoriasTotal = consultoriasRecebidas + consultoriasPendentes;

    // Total de Entradas no Mês (Salários Fixos + Consultorias Recebidas)
    const totalEntradas = salariosTotal + consultoriasRecebidas;
    const totalEntradasPrevistas = salariosTotal + consultoriasTotal;

    // Despesas do Mês:
    // 1. Contas Fixas (ocorrem todo mês)
    const despesasFixas = this.data.expenses
      .filter(e => e.type === 'fixa')
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    // 2. Despesas Variáveis (SOMENTE as que vencem no mês selecionado)
    const despesasVariaveis = this.data.expenses
      .filter(e => e.type === 'variavel' && e.dueDate && e.dueDate.startsWith(monthKey))
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    const totalDespesasCadastradas = despesasFixas + despesasVariaveis;

    // Despesas Totais do Mês = Contas Cadastradas + Faturas de Cartão
    const totalDespesasComFaturas = totalDespesasCadastradas + totalFaturas;

    // Sobra Líquida do Mês
    const sobraMes = totalEntradas - totalDespesasComFaturas;

    // Contas Pendentes a Pagar no Mês Selecionado
    const contasFixasPendentes = this.data.expenses
      .filter(e => e.type === 'fixa' && !this.isExpensePaid(e, monthKey))
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    const despesasVariaveisPendentes = this.data.expenses
      .filter(e => e.type === 'variavel' && e.dueDate && e.dueDate.startsWith(monthKey) && !this.isExpensePaid(e, monthKey))
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    const totalDespesasPendentes = contasFixasPendentes + despesasVariaveisPendentes + faturasPendentes;

    // Patrimônio Líquido Total Consolidado
    // (Saldo em Contas + FGTS) - Faturas de Cartões Pendentes
    const patrimonioTotal = (saldoContas + fgtsTotal) - faturasPendentes;

    return {
      saldoContas,
      saldoRico,
      fgtsVitor,
      fgtsAndressa,
      fgtsTotal,
      totalFaturas,
      faturasPendentes,
      salarioVitor,
      salarioDia15,
      salarioDia30,
      salarioAndressa,
      salariosTotal,
      consultoriasDoMes,
      consultoriasRecebidas,
      consultoriasPendentes,
      consultoriasTotal,
      totalEntradas,
      totalEntradasPrevistas,
      despesasFixas,
      despesasVariaveis,
      totalDespesasCadastradas,
      totalDespesasComFaturas,
      totalDespesasPendentes,
      sobraMes,
      patrimonioTotal
    };
  },

  // ==========================================
  // RENDERIZAÇÃO GERAL
  // ==========================================
  renderAll() {
    this.renderKPIs();
    this.renderSavingsGoal();
    this.renderQuickSummaries();
    this.renderAccountsSection();
    this.renderCreditCardsSection();
    this.renderIncomeSection();
    this.renderConsolidatedExpensesSummary();
    this.renderExpensesTable();
    this.renderSavingsSection();
    this.renderCharts();
  },

  // KPIs
  renderKPIs() {
    const t = this.getTotals();

    document.getElementById('kpiSaldoContas').textContent = formatMoney(t.saldoContas);
    document.getElementById('kpiFgts').textContent = formatMoney(t.fgtsTotal);
    document.getElementById('kpiEntradas').textContent = formatMoney(t.totalEntradas);
    document.getElementById('kpiDespesas').textContent = formatMoney(t.totalDespesasComFaturas);
    
    const sobraEl = document.getElementById('kpiSobraMes');
    sobraEl.textContent = formatMoney(t.sobraMes);
    if (t.sobraMes >= 0) {
      sobraEl.className = 'kpi-value text-success';
    } else {
      sobraEl.className = 'kpi-value text-danger';
    }

    document.getElementById('kpiPatrimonioTotal').textContent = formatMoney(t.patrimonioTotal);

    // Badges dos KPIs
    document.getElementById('kpiConsultoriaBadge').textContent = `Consultorias Recebidas: ${formatMoney(t.consultoriasRecebidas)}`;
    document.getElementById('kpiFaturasBadge').textContent = `Faturas: ${formatMoney(t.totalFaturas)}`;
  },

  // Barra de Progresso da Poupança no Topo
  renderSavingsGoal() {
    const t = this.getTotals();
    const meta = Number(this.data.savingsGoal) || 2000.00;
    // O valor poupável real é a sobra do mês (se positiva)
    const guardadoReal = Math.max(0, t.sobraMes);
    const percent = Math.min(100, Math.round((guardadoReal / meta) * 100));
    const restante = Math.max(0, meta - guardadoReal);

    const barEl = document.getElementById('metaProgressBar');
    barEl.style.width = `${percent}%`;

    document.getElementById('metaStatusText').innerHTML = 
      `Meta de economizar <strong>${formatMoney(meta)}</strong> com base no salário e consultorias conjuntas.`;
    document.getElementById('metaGuardadoLabel').innerHTML = `Sobra p/ Guardar: <strong>${formatMoney(guardadoReal)}</strong>`;
    document.getElementById('metaPercentLabel').textContent = `${percent}% Atingido`;
    document.getElementById('metaRestanteLabel').innerHTML = `Faltam: <strong>${formatMoney(restante)}</strong>`;
  },

  // Resumos Rápidos da Dashboard
  renderQuickSummaries() {
    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();

    // 1. Faturas Rápidas do Mês
    const cardsListEl = document.getElementById('quickCardsList');
    cardsListEl.innerHTML = this.data.creditCards.map(c => {
      const inv = this.getCardInvoice(c, monthKey);
      return `
        <div class="mini-list-item">
          <div class="mini-list-info">
            <div class="mini-icon bg-${c.institution}">
              <i class="ph ph-credit-card"></i>
            </div>
            <div>
              <div class="mini-name">${c.name}</div>
              <div class="mini-sub">Vence dia ${c.dueDay} • ${inv.isPaid ? 'Pago' : 'Em aberto'}</div>
            </div>
          </div>
          <div class="mini-value ${inv.isPaid ? 'text-success' : 'text-danger'}">
            ${formatMoney(inv.amount)}
          </div>
        </div>
      `;
    }).join('');

    // 2. Consultorias do Mês Ativo
    const consultancyListEl = document.getElementById('quickConsultancyList');
    const consultoriasMes = this.data.consultancies.filter(c => c.date && c.date.startsWith(monthKey));
    if (consultoriasMes.length === 0) {
      consultancyListEl.innerHTML = `<p class="text-xs text-muted">Nenhuma consultoria lançada em ${monthName}.</p>`;
    } else {
      consultancyListEl.innerHTML = consultoriasMes.slice(0, 3).map(c => `
        <div class="mini-list-item">
          <div class="mini-list-info">
            <div class="mini-icon" style="background: linear-gradient(135deg, #10B981, #059669);">
              <i class="ph ph-hand-coins"></i>
            </div>
            <div>
              <div class="mini-name">${c.client}</div>
              <div class="mini-sub">${c.person} • ${formatDate(c.date)}</div>
            </div>
          </div>
          <div class="mini-value ${c.status === 'recebido' ? 'text-success' : 'text-gold'}">
            ${formatMoney(c.amount)}
          </div>
        </div>
      `).join('');
    }

    // 3. Próximos Vencimentos de Despesas Pendentes do Mês
    const dueListEl = document.getElementById('quickDueExpensesList');
    
    // Contas fixas pendentes no mês + variáveis do mês pendentes
    const pendentesFixas = this.data.expenses
      .filter(e => e.type === 'fixa' && !this.isExpensePaid(e, monthKey))
      .map(e => ({
        ...e,
        dueDate: this.getExpenseDueDateForMonth(e, monthKey)
      }));

    const pendentesVariaveis = this.data.expenses
      .filter(e => e.type === 'variavel' && e.dueDate && e.dueDate.startsWith(monthKey) && !this.isExpensePaid(e, monthKey));

    const todasPendentes = [...pendentesFixas, ...pendentesVariaveis].sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));

    if (todasPendentes.length === 0) {
      dueListEl.innerHTML = `<p class="text-xs text-success"><i class="ph ph-check-circle"></i> Todas as contas de ${monthName} já estão pagas!</p>`;
    } else {
      dueListEl.innerHTML = todasPendentes.slice(0, 3).map(e => `
        <div class="mini-list-item">
          <div class="mini-list-info">
            <div class="mini-icon" style="background: rgba(239, 68, 68, 0.2); color: #EF4444;">
              <i class="ph ph-calendar"></i>
            </div>
            <div>
              <div class="mini-name">${e.description}</div>
              <div class="mini-sub">Venc: ${formatDate(e.dueDate)} • ${e.type === 'fixa' ? 'Fixa' : 'Variável'}</div>
            </div>
          </div>
          <div class="mini-value text-danger">
            ${formatMoney(e.amount)}
          </div>
        </div>
      `).join('');
    }
  },

  // ==========================================
  // SEÇÃO: BANCOS & FGTS
  // ==========================================
  renderAccountsSection() {
    const grid = document.getElementById('accountsCardsGrid');
    grid.innerHTML = this.data.accounts.map(acc => `
      <div class="bank-card ${acc.institution}">
        <div class="bank-header">
          <div class="bank-brand">
            <div class="bank-badge-icon bg-${acc.institution}">
              <i class="ph-bold ph-bank"></i>
            </div>
            <div>
              <div class="bank-owner">Titular: ${acc.holder}</div>
              <div class="bank-title">${acc.name}</div>
            </div>
          </div>
          <button class="btn-table-icon" onclick="app.editSingleAccount('${acc.id}')" title="Editar Saldo">
            <i class="ph ph-pencil-simple"></i>
          </button>
        </div>
        <div class="bank-balance">
          <span class="label">Saldo Atual</span>
          <div class="amount">${formatMoney(acc.balance)}</div>
        </div>
        <div class="bank-footer">
          <span>${acc.type}</span>
          <button class="btn-link" onclick="app.quickDepositAccount('${acc.id}')">+ Ajustar Saldo</button>
        </div>
      </div>
    `).join('');

    // FGTS
    const fgtsAndressa = Number(this.data.fgts?.andressa) || 0;
    const fgtsAndressaEl = document.getElementById('fgtsAndressaVal');
    if (fgtsAndressaEl) fgtsAndressaEl.textContent = formatMoney(fgtsAndressa);
    const fgtsTotalEl = document.getElementById('fgtsTotalVal');
    if (fgtsTotalEl) fgtsTotalEl.textContent = formatMoney(fgtsAndressa);
    const fgtsVitorEl = document.getElementById('fgtsVitorVal');
    if (fgtsVitorEl) fgtsVitorEl.textContent = formatMoney(0);
  },

  // ==========================================
  // SEÇÃO: CARTÕES DE CRÉDITO
  // ==========================================
  renderCreditCardsSection() {
    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();
    const year = this.currentDate.getFullYear();

    const grid = document.getElementById('creditCardsGrid');
    grid.innerHTML = this.data.creditCards.map(c => {
      const inv = this.getCardInvoice(c, monthKey);
      return `
        <div class="cc-card-ui cc-${c.institution}">
          <div class="cc-top">
            <div class="cc-chip"></div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="cc-brand-title">${c.name}</span>
              <button class="cc-edit-btn" onclick="app.openEditSingleCardInvoice('${c.id}', '${monthKey}')" title="Editar fatura de ${monthName}">
                <i class="ph ph-pencil-simple"></i>
              </button>
            </div>
          </div>
          <div class="cc-middle">
            <span class="cc-fatura-label">Fatura de ${monthName} / ${year}</span>
            <div class="cc-fatura-value">${formatMoney(inv.amount)}</div>
          </div>
          <div class="cc-bottom">
            <div class="cc-meta-info">
              <div>
                <span class="text-xs" style="opacity: 0.8;">Vencimento</span>
                <p><strong>Dia ${c.dueDay}</strong></p>
              </div>
              <div>
                <span class="text-xs" style="opacity: 0.8;">Limite</span>
                <p><strong>${formatMoney(c.limit)}</strong></p>
              </div>
            </div>
            <button class="cc-status-btn" onclick="app.toggleCardPaid('${c.id}', '${monthKey}')">
              ${inv.isPaid ? '<i class="ph ph-check-circle"></i> Fatura Paga' : '<i class="ph ph-clock"></i> Marcar Paga'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Renderiza a tabela de histórico e projeção mês a mês
    this.renderMonthlyInvoicesTable();
  },

  renderMonthlyInvoicesTable() {
    const tableEl = document.getElementById('monthlyInvoicesTable');
    if (!tableEl) return;

    const cards = this.data.creditCards;
    const currentKey = this.getCurrentMonthKey();

    const monthKeysSet = new Set();
    const currY = this.currentDate.getFullYear();
    const currM = this.currentDate.getMonth();

    for (let offset = -3; offset <= 5; offset++) {
      const d = new Date(currY, currM + offset, 1);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthKeysSet.add(k);
    }

    cards.forEach(c => {
      if (c.monthlyInvoices) {
        Object.keys(c.monthlyInvoices).forEach(k => monthKeysSet.add(k));
      }
    });

    const sortedMonthKeys = Array.from(monthKeysSet).sort();

    const thead = `
      <thead>
        <tr>
          <th>Mês / Período</th>
          ${cards.map(c => `<th>${c.name}</th>`).join('')}
          <th>Total das Faturas</th>
          <th>Status</th>
          <th class="text-right">Ações</th>
        </tr>
      </thead>
    `;

    const tbody = sortedMonthKeys.map(mKey => {
      const [yStr, mStr] = mKey.split('-');
      const y = parseInt(yStr);
      const m = parseInt(mStr) - 1;
      const d = new Date(y, m, 1);
      const monthName = this.getMonthName(d);
      const isCurrent = (mKey === currentKey);

      let rowTotal = 0;
      let totalCount = 0;
      let paidCount = 0;

      const cardCells = cards.map(c => {
        const inv = this.getCardInvoice(c, mKey);
        const amt = Number(inv.amount) || 0;
        rowTotal += amt;
        if (amt > 0) {
          totalCount++;
          if (inv.isPaid) paidCount++;
        }
        return `
          <td>
            <div style="font-weight:600; color:${inv.isPaid ? 'var(--success)' : 'var(--text-main)'};">
              ${formatMoney(amt)}
            </div>
            ${amt > 0 ? `<small style="font-size:0.7rem; color:${inv.isPaid ? 'var(--success)' : 'var(--danger)'};">${inv.isPaid ? '✓ Paga' : '⏳ Aberta'}</small>` : '<small style="color:var(--text-dim);">-</small>'}
          </td>
        `;
      }).join('');

      let statusBadge = '<span class="badge badge-subtle">Sem faturas</span>';
      if (rowTotal > 0) {
        if (paidCount === totalCount) {
          statusBadge = '<span class="badge badge-green">✓ Todas Pagas</span>';
        } else if (paidCount > 0) {
          statusBadge = `<span class="badge badge-gold">${paidCount}/${totalCount} Pagas</span>`;
        } else {
          statusBadge = '<span class="badge badge-danger">⏳ Em Aberto</span>';
        }
      }

      return `
        <tr style="${isCurrent ? 'background: rgba(59, 130, 246, 0.08); font-weight: 500;' : ''}">
          <td>
            <strong>${monthName} / ${y}</strong>
            ${isCurrent ? '<span class="badge badge-blue" style="margin-left: 8px;">Mês Atual</span>' : ''}
          </td>
          ${cardCells}
          <td>
            <strong class="${rowTotal > 0 ? 'text-danger' : 'text-muted'}">${formatMoney(rowTotal)}</strong>
          </td>
          <td>${statusBadge}</td>
          <td class="text-right">
            <div class="table-actions" style="justify-content: flex-end;">
              <button class="btn-table-icon" onclick="app.openCreditCardModal('${mKey}')" title="Editar faturas deste mês">
                <i class="ph ph-pencil-simple"></i>
              </button>
              ${!isCurrent ? `
                <button class="btn-table-icon" onclick="app.setPeriod('${mKey}')" title="Ir para este mês no painel">
                  <i class="ph ph-calendar-blank"></i>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tableEl.innerHTML = thead + `<tbody>${tbody}</tbody>`;
  },

  toggleCardPaid(cardId, monthKey = this.getCurrentMonthKey()) {
    const card = this.data.creditCards.find(c => c.id === cardId);
    if (card) {
      const inv = this.getCardInvoice(card, monthKey);
      inv.isPaid = !inv.isPaid;
      if (monthKey === this.getCurrentMonthKey()) {
        card.isPaid = inv.isPaid;
      }
      this.saveData();
      this.renderAll();
      const monthLabel = this.formatMonthKeyLabel(monthKey);
      this.showToast(inv.isPaid 
        ? `${card.name}: Fatura de ${monthLabel} marcada como PAGA!` 
        : `${card.name}: Fatura de ${monthLabel} marcada como PENDENTE.`);
    }
  },

  renderConsolidatedExpensesSummary() {
    const container = document.getElementById('expensesConsolidatedGrid');
    if (!container) return;

    const t = this.getTotals();
    const monthName = this.getMonthName();
    const monthKey = this.getCurrentMonthKey();

    const cardDetails = this.data.creditCards.map(c => {
      const inv = this.getCardInvoice(c, monthKey);
      return `${c.name}: ${formatMoney(inv.amount)}`;
    }).join(' • ');

    container.innerHTML = `
      <div class="exp-summary-card">
        <span class="label"><i class="ph ph-receipt"></i> Contas Fixas</span>
        <div class="value">${formatMoney(t.despesasFixas)}</div>
        <span class="sub">Aluguel, condomínio, internet, etc.</span>
      </div>

      <div class="exp-summary-card">
        <span class="label"><i class="ph ph-shopping-bag"></i> Despesas Variáveis</span>
        <div class="value">${formatMoney(t.despesasVariaveis)}</div>
        <span class="sub">Mercado, farmácia, lazer, etc.</span>
      </div>

      <div class="exp-summary-card">
        <span class="label"><i class="ph ph-credit-card"></i> Faturas dos Cartões (${monthName})</span>
        <div class="value text-accent-blue">${formatMoney(t.totalFaturas)}</div>
        <span class="sub" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${cardDetails}">
          ${cardDetails}
        </span>
      </div>

      <div class="exp-summary-card highlight-total">
        <span class="label"><i class="ph-bold ph-equals"></i> TOTAL GERAL DE DESPESAS</span>
        <div class="value">${formatMoney(t.totalDespesasComFaturas)}</div>
        <span class="sub">Contas Fixas + Variáveis + Faturas Somadas</span>
      </div>
    `;
  },

  // ==========================================
  // SEÇÃO: RECEITAS & CONSULTORIAS
  // ==========================================
  renderIncomeSection() {
    const t = this.getTotals();
    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();
    const year = this.currentDate.getFullYear();

    const salaryDia15Display = document.getElementById('salaryDia15Display');
    if (salaryDia15Display) {
      salaryDia15Display.textContent = formatMoney(t.salarioDia15);
    }
    const salaryDia30Display = document.getElementById('salaryDia30Display');
    if (salaryDia30Display) {
      salaryDia30Display.textContent = formatMoney(t.salarioDia30);
    }
    const salaryAndressaDisplay = document.getElementById('salaryAndressaDisplay');
    if (salaryAndressaDisplay) {
      salaryAndressaDisplay.textContent = formatMoney(t.salarioAndressa);
    }

    document.getElementById('consultancyTotalDisplay').textContent = formatMoney(t.consultoriasTotal);
    document.getElementById('consultanciesCountBadge').textContent = `${t.consultoriasDoMes.length} no mês`;

    const subEl = document.getElementById('consultancyPeriodSub');
    if (subEl) {
      subEl.textContent = `Registros de consultorias previstos ou recebidos em ${monthName} / ${year}`;
    }

    // Tabela de consultorias (SOMENTE AS DO MÊS SELECIONADO)
    const tbody = document.getElementById('consultancyTableBody');
    if (t.consultoriasDoMes.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);"><i class="ph ph-calendar-blank" style="font-size:22px; display:block; margin-bottom:6px;"></i>Nenhuma consultoria lançada para ${monthName} / ${year}. Clique em "Nova Consultoria" para lançar neste mês.</td></tr>`;
      return;
    }

    tbody.innerHTML = t.consultoriasDoMes.map(c => `
      <tr>
        <td>
          <strong>${c.client}</strong>
          ${c.description ? `<br><small style="color:var(--text-muted);">${c.description}</small>` : ''}
        </td>
        <td>
          <span class="badge ${c.person === 'Vitor' ? 'badge-blue' : 'badge-subtle'}">
            ${c.person}
          </span>
        </td>
        <td>${formatDate(c.date)}</td>
        <td><strong class="text-success">${formatMoney(c.amount)}</strong></td>
        <td>
          <button class="badge ${c.status === 'recebido' ? 'badge-green' : 'badge-gold'}" 
                  style="border:none; cursor:pointer;" 
                  onclick="app.toggleConsultancyStatus('${c.id}')"
                  title="Clique para alternar Recebido / Pendente">
            ${c.status === 'recebido' ? '✓ Recebido' : '⏳ Pendente'}
          </button>
        </td>
        <td class="text-right">
          <div class="table-actions">
            <button class="btn-table-icon" onclick="app.editConsultancy('${c.id}')" title="Editar">
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button class="btn-table-icon delete" onclick="app.deleteConsultancy('${c.id}')" title="Excluir">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  toggleConsultancyStatus(id) {
    const c = this.data.consultancies.find(item => item.id === id);
    if (c) {
      c.status = c.status === 'recebido' ? 'pendente' : 'recebido';
      this.saveData();
      this.renderAll();
      this.showToast(`Status da consultoria atualizado para ${c.status.toUpperCase()}`);
    }
  },

  deleteConsultancy(id) {
    if (confirm('Deseja realmente remover esta consultoria?')) {
      this.data.consultancies = this.data.consultancies.filter(c => c.id !== id);
      this.saveData();
      this.renderAll();
      this.showToast('Consultoria removida com sucesso!');
    }
  },

  // ==========================================
  // SEÇÃO: DESPESAS
  // ==========================================
  renderExpensesTable() {
    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();
    const year = this.currentDate.getFullYear();

    const subEl = document.getElementById('expensesPeriodSub');
    if (subEl) {
      subEl.textContent = `Contas fixas recorrentes, despesas variáveis de ${monthName}/${year} e faturas de cartões somadas`;
    }

    // Faturas de Cartões do Mês Selecionado
    const cardExpenses = this.data.creditCards.map(c => {
      const inv = this.getCardInvoice(c, monthKey);
      return {
        id: `card_exp_${c.id}`,
        isCardInvoice: true,
        cardId: c.id,
        description: `Fatura ${c.name}`,
        type: 'cartao',
        category: 'Cartão de Crédito',
        dueDate: `${year}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(c.dueDay).padStart(2, '0')}`,
        amount: Number(inv.amount) || 0,
        isPaid: inv.isPaid
      };
    });

    // 1. Contas Fixas (ocorrem todo mês, status de pagamento específico para este mês)
    const fixedExpenses = this.data.expenses
      .filter(e => e.type === 'fixa')
      .map(e => ({
        ...e,
        dueDate: this.getExpenseDueDateForMonth(e, monthKey),
        isPaid: this.isExpensePaid(e, monthKey)
      }));

    // 2. Despesas Variáveis (SOMENTE as cujo dueDate pertence ao mês selecionado)
    const variableExpenses = this.data.expenses
      .filter(e => e.type === 'variavel' && e.dueDate && e.dueDate.startsWith(monthKey))
      .map(e => ({
        ...e,
        isPaid: this.isExpensePaid(e, monthKey)
      }));

    let allItems = [...fixedExpenses, ...variableExpenses, ...cardExpenses];
    let list = [...allItems];

    if (this.activeFilter === 'fixa') {
      list = allItems.filter(e => e.type === 'fixa');
    } else if (this.activeFilter === 'variavel') {
      list = allItems.filter(e => e.type === 'variavel');
    } else if (this.activeFilter === 'cartao') {
      list = allItems.filter(e => e.type === 'cartao');
    } else if (this.activeFilter === 'pendente') {
      list = allItems.filter(e => !e.isPaid);
    } else if (this.activeFilter === 'pago') {
      list = allItems.filter(e => e.isPaid);
    }

    const filteredTotal = list.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
    document.getElementById('expensesFilteredTotal').textContent = formatMoney(filteredTotal);

    const tbody = document.getElementById('expensesTableBody');
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);"><i class="ph ph-check-circle" style="font-size:22px; display:block; margin-bottom:6px;"></i>Nenhuma despesa encontrada para ${monthName} / ${year} com o filtro atual.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(e => {
      let typeBadge = '';
      if (e.type === 'fixa') {
        typeBadge = '<span class="badge badge-blue">Conta Fixa</span>';
      } else if (e.type === 'variavel') {
        typeBadge = '<span class="badge badge-subtle">Variável</span>';
      } else if (e.type === 'cartao') {
        typeBadge = '<span class="badge badge-purple">Cartão de Crédito</span>';
      }

      const statusButton = e.isCardInvoice
        ? `<button class="badge ${e.isPaid ? 'badge-green' : 'badge-danger'}" 
                   style="border:none; cursor:pointer;" 
                   onclick="app.toggleCardPaid('${e.cardId}', '${monthKey}')"
                   title="Alternar pagamento da fatura de ${monthName}">
             ${e.isPaid ? '✓ Fatura Paga' : '⏳ Pendente'}
           </button>`
        : `<button class="badge ${e.isPaid ? 'badge-green' : 'badge-danger'}" 
                   style="border:none; cursor:pointer;" 
                   onclick="app.toggleExpensePaid('${e.id}', '${monthKey}')"
                   title="Alternar Pago / Pendente para ${monthName}">
             ${e.isPaid ? '✓ Pago' : '⏳ Pendente'}
           </button>`;

      const actions = e.isCardInvoice
        ? `<div class="table-actions">
             <button class="btn-table-icon" onclick="app.openEditSingleCardInvoice('${e.cardId}', '${monthKey}')" title="Editar valor da fatura de ${monthName}">
               <i class="ph ph-pencil-simple"></i>
             </button>
           </div>`
        : `<div class="table-actions">
             <button class="btn-table-icon" onclick="app.editExpense('${e.id}')" title="Editar">
               <i class="ph ph-pencil-simple"></i>
             </button>
             <button class="btn-table-icon delete" onclick="app.deleteExpense('${e.id}')" title="Excluir">
               <i class="ph ph-trash"></i>
             </button>
           </div>`;

      return `
        <tr style="${e.isCardInvoice ? 'background: rgba(168, 85, 247, 0.04);' : ''}">
          <td>
            <strong>${e.description}</strong>
            ${e.isCardInvoice ? `<small style="display:block; color:var(--text-muted);">Fatura de ${monthName}</small>` : ''}
          </td>
          <td>${typeBadge}</td>
          <td>${e.category || 'Geral'}</td>
          <td>${formatDate(e.dueDate)}</td>
          <td><strong class="text-danger">${formatMoney(e.amount)}</strong></td>
          <td>${statusButton}</td>
          <td class="text-right">${actions}</td>
        </tr>
      `;
    }).join('');
  },

  toggleExpensePaid(id, monthKey = this.getCurrentMonthKey()) {
    const expense = this.data.expenses.find(e => e.id === id);
    if (expense) {
      if (!expense.paidMonths) expense.paidMonths = {};
      const currentStatus = this.isExpensePaid(expense, monthKey);
      expense.paidMonths[monthKey] = !currentStatus;
      if (monthKey === this.getCurrentMonthKey()) {
        expense.isPaid = expense.paidMonths[monthKey];
      }
      this.saveData();
      this.renderAll();
      const monthLabel = this.formatMonthKeyLabel(monthKey);
      this.showToast(expense.paidMonths[monthKey] 
        ? `${expense.description} marcado como PAGO em ${monthLabel}!` 
        : `${expense.description} marcado como PENDENTE em ${monthLabel}.`);
    }
  },

  deleteExpense(id) {
    if (confirm('Deseja remover esta despesa?')) {
      this.data.expenses = this.data.expenses.filter(e => e.id !== id);
      this.saveData();
      this.renderAll();
      this.showToast('Despesa excluída com sucesso.');
    }
  },

  // ==========================================
  // SEÇÃO: POUPANÇA & PROJEÇÕES
  // ==========================================
  renderSavingsSection() {
    const t = this.getTotals();
    const meta = Number(this.data.savingsGoal) || 2000;
    document.getElementById('poupancaMetaValor').textContent = formatMoney(meta);
    
    const pctRenda = t.salariosTotal > 0 ? Math.round((meta / t.salariosTotal) * 100) : 0;
    document.getElementById('poupancaMetaPercentSalario').textContent = `Equivale a aprox. ${pctRenda}% da renda fixa conjunta`;

    document.getElementById('poupancaDisponivelMes').textContent = formatMoney(Math.max(0, t.sobraMes));
    document.getElementById('poupancaRicoValor').textContent = formatMoney(t.saldoRico);
  },

  // ==========================================
  // GRÁFICOS (CHART.JS)
  // ==========================================
  renderCharts() {
    if (typeof Chart === 'undefined') return;

    const t = this.getTotals();
    const isDark = document.body.classList.contains('theme-dark');
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    // Gráfico 1: Fluxo de Caixa (Entradas vs Despesas vs Sobra)
    const ctxBar = document.getElementById('cashflowChart');
    if (ctxBar) {
      if (this.cashflowChartInstance) {
        this.cashflowChartInstance.destroy();
      }

      this.cashflowChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Entradas Totais', 'Despesas + Faturas', 'Sobra Líquida'],
          datasets: [{
            label: 'Valores em R$',
            data: [t.totalEntradas, t.totalDespesasComFaturas, Math.max(0, t.sobraMes)],
            backgroundColor: [
              'rgba(16, 185, 129, 0.85)',
              'rgba(239, 68, 68, 0.85)',
              'rgba(251, 191, 36, 0.85)'
            ],
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${formatMoney(ctx.raw)}`
              }
            }
          },
          scales: {
            y: {
              ticks: { color: textColor, callback: (v) => 'R$ ' + v.toLocaleString('pt-BR') },
              grid: { color: gridColor }
            },
            x: {
              ticks: { color: textColor },
              grid: { display: false }
            }
          }
        }
      });
    }

    // Gráfico 2: Distribuição Patrimonial
    const ctxPie = document.getElementById('distributionChart');
    if (ctxPie) {
      if (this.distributionChartInstance) {
        this.distributionChartInstance.destroy();
      }

      const labels = [];
      const values = [];
      const colors = [];

      this.data.accounts.forEach(acc => {
        labels.push(acc.name);
        values.push(Number(acc.balance) || 0);
        if (acc.institution === 'nubank') colors.push('#820AD1');
        else if (acc.institution === 'rico') colors.push('#FF5000');
        else if (acc.institution === 'bradesco') colors.push('#CC092F');
        else colors.push('#3B82F6');
      });

      // Adiciona FGTS Andressa
      if (t.fgtsAndressa > 0) {
        labels.push('FGTS Andressa');
        values.push(t.fgtsAndressa);
        colors.push('#0096C7');
      }

      this.distributionChartInstance = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: isDark ? '#131A2A' : '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: textColor,
                boxWidth: 12,
                font: { size: 11 }
              }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.label}: ${formatMoney(ctx.raw)}`
              }
            }
          }
        }
      });
    }
  },

  // ==========================================
  // MODAIS E FORMULÁRIOS
  // ==========================================
  openModal(title, htmlContent) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = htmlContent;
    document.getElementById('mainModal').classList.add('active');
  },

  closeModal() {
    document.getElementById('mainModal').classList.remove('active');
  },

  // Modal de Lançamento Rápido
  openQuickAddModal() {
    const html = `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <p style="color:var(--text-muted); font-size:0.9rem;">Selecione o que você gostaria de registrar agora:</p>
        <button class="btn-secondary" style="justify-content:flex-start; padding:14px;" onclick="app.openExpenseModal()">
          <i class="ph-bold ph-receipt text-danger" style="font-size:22px;"></i>
          <div style="text-align:left;">
            <strong>Nova Despesa (Fixa ou Variável)</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">Contas da casa, mercado, lazer, etc.</div>
          </div>
        </button>

        <button class="btn-secondary" style="justify-content:flex-start; padding:14px;" onclick="app.openConsultancyModal()">
          <i class="ph-bold ph-briefcase text-success" style="font-size:22px;"></i>
          <div style="text-align:left;">
            <strong>Nova Entrada de Consultoria</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">Projetos extras de Vitor ou Andressa</div>
          </div>
        </button>

        <button class="btn-secondary" style="justify-content:flex-start; padding:14px;" onclick="app.openCreditCardModal()">
          <i class="ph-bold ph-credit-card text-danger" style="font-size:22px;"></i>
          <div style="text-align:left;">
            <strong>Lançar Faturas de Cartão (Mês a Mês)</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">Nubank, Rico, Bradesco para qualquer mês</div>
          </div>
        </button>

        <button class="btn-secondary" style="justify-content:flex-start; padding:14px;" onclick="app.openAccountsModal()">
          <i class="ph-bold ph-bank text-primary" style="font-size:22px;"></i>
          <div style="text-align:left;">
            <strong>Atualizar Saldos Bancários</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">Nubank, Rico, Bradesco</div>
          </div>
        </button>
      </div>
    `;
    this.openModal('O que deseja lançar?', html);
  },

  // Modal Despesa
  openExpenseModal(editingId = null) {
    const monthKey = this.getCurrentMonthKey();
    const defaultDate = `${monthKey}-10`;
    const exp = editingId ? this.data.expenses.find(e => e.id === editingId) : {
      description: '',
      type: 'fixa',
      category: 'Moradia',
      amount: '',
      dueDate: defaultDate,
      isPaid: false
    };

    const isEdit = !!editingId;
    const isPaidCurrentMonth = editingId ? this.isExpensePaid(exp, monthKey) : false;
    const dueDateVal = editingId ? (exp.dueDate || defaultDate) : defaultDate;

    const html = `
      <form id="formExpense" onsubmit="event.preventDefault(); app.saveExpense('${editingId || ''}');">
        <div class="form-group">
          <label class="form-label">Descrição da Conta / Gasto</label>
          <input type="text" id="expDesc" class="form-control" required value="${exp.description}" placeholder="Ex: Aluguel, Supermercado, Luz">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tipo de Despesa</label>
            <select id="expType" class="form-control">
              <option value="fixa" ${exp.type === 'fixa' ? 'selected' : ''}>Fixa (Recorrente todo mês)</option>
              <option value="variavel" ${exp.type === 'variavel' ? 'selected' : ''}>Variável (Consumo / Lazer)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Categoria</label>
            <input type="text" id="expCategory" class="form-control" value="${exp.category}" placeholder="Ex: Moradia, Alimentação, Saúde">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Valor (R$)</label>
            <input type="number" step="0.01" id="expAmount" class="form-control" required value="${exp.amount}" placeholder="0,00">
          </div>
          <div class="form-group">
            <label class="form-label">Data de Vencimento</label>
            <input type="date" id="expDueDate" class="form-control" value="${dueDateVal}">
          </div>
        </div>

        <div class="form-group">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.9rem;">
            <input type="checkbox" id="expIsPaid" ${isPaidCurrentMonth ? 'checked' : ''} style="width:18px; height:18px;">
            Esta conta já foi paga no mês de ${this.getMonthName()}?
          </label>
        </div>

        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">${isEdit ? 'Salvar Alterações' : 'Adicionar Despesa'}</button>
        </div>
      </form>
    `;
    this.openModal(isEdit ? 'Editar Despesa' : 'Nova Despesa', html);
  },

  saveExpense(editingId) {
    const desc = document.getElementById('expDesc').value.trim();
    const type = document.getElementById('expType').value;
    const category = document.getElementById('expCategory').value.trim() || 'Geral';
    const amount = parseFloat(document.getElementById('expAmount').value) || 0;
    const dueDate = document.getElementById('expDueDate').value;
    const isPaid = document.getElementById('expIsPaid').checked;
    const monthKey = this.getCurrentMonthKey();

    if (!desc || amount <= 0) {
      alert('Por favor informe a descrição e um valor válido.');
      return;
    }

    if (editingId) {
      const idx = this.data.expenses.findIndex(e => e.id === editingId);
      if (idx !== -1) {
        const item = this.data.expenses[idx];
        if (!item.paidMonths) item.paidMonths = {};
        item.paidMonths[monthKey] = isPaid;
        this.data.expenses[idx] = { 
          ...item, 
          description: desc, 
          type, 
          category, 
          amount, 
          dueDate, 
          isPaid: monthKey === this.getCurrentMonthKey() ? isPaid : item.isPaid 
        };
      }
    } else {
      this.data.expenses.unshift({
        id: 'e_' + Date.now(),
        description: desc,
        type,
        category,
        amount,
        dueDate,
        isPaid,
        paidMonths: {
          [monthKey]: isPaid
        }
      });
    }

    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast('Despesa salva com sucesso!');
  },

  editExpense(id) {
    this.openExpenseModal(id);
  },

  // Modal Consultoria
  openConsultancyModal(editingId = null) {
    const monthKey = this.getCurrentMonthKey();
    const defaultDate = `${monthKey}-15`;
    const item = editingId ? this.data.consultancies.find(c => c.id === editingId) : {
      client: '',
      person: 'Andressa',
      description: '',
      amount: '',
      date: defaultDate,
      status: 'recebido'
    };

    const isEdit = !!editingId;
    const html = `
      <form id="formConsultancy" onsubmit="event.preventDefault(); app.saveConsultancy('${editingId || ''}');">
        <div class="form-group">
          <label class="form-label">Cliente ou Empresa</label>
          <input type="text" id="consClient" class="form-control" required value="${item.client}" placeholder="Ex: Projeto ABC, Empresa XYZ">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Quem executou?</label>
            <select id="consPerson" class="form-control">
              <option value="Vitor" ${item.person === 'Vitor' ? 'selected' : ''}>Vitor</option>
              <option value="Andressa" ${item.person === 'Andressa' ? 'selected' : ''}>Andressa</option>
              <option value="Casal" ${item.person === 'Casal' ? 'selected' : ''}>Casal (Conjunto)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Valor (R$)</label>
            <input type="number" step="0.01" id="consAmount" class="form-control" required value="${item.amount}" placeholder="0,00">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Descrição do Trabalho / Escopo</label>
          <input type="text" id="consDesc" class="form-control" value="${item.description}" placeholder="Ex: Mentoria, criação de relatório, assessoria técnica">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Data Prevista ou Recebida</label>
            <input type="date" id="consDate" class="form-control" value="${item.date}">
          </div>
          <div class="form-group">
            <label class="form-label">Status do Pagamento</label>
            <select id="consStatus" class="form-control">
              <option value="recebido" ${item.status === 'recebido' ? 'selected' : ''}>Já Recebido (Entrou na Conta)</option>
              <option value="pendente" ${item.status === 'pendente' ? 'selected' : ''}>A Receber (Previsto)</option>
            </select>
          </div>
        </div>

        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">${isEdit ? 'Atualizar Consultoria' : 'Registrar Entrada'}</button>
        </div>
      </form>
    `;
    this.openModal(isEdit ? 'Editar Consultoria' : 'Nova Consultoria (Renda Extra)', html);
  },

  saveConsultancy(editingId) {
    const client = document.getElementById('consClient').value.trim();
    const person = document.getElementById('consPerson').value;
    const amount = parseFloat(document.getElementById('consAmount').value) || 0;
    const description = document.getElementById('consDesc').value.trim();
    const date = document.getElementById('consDate').value;
    const status = document.getElementById('consStatus').value;

    if (!client || amount <= 0) {
      alert('Preencha o cliente e o valor da consultoria.');
      return;
    }

    if (editingId) {
      const idx = this.data.consultancies.findIndex(c => c.id === editingId);
      if (idx !== -1) {
        this.data.consultancies[idx] = { ...this.data.consultancies[idx], client, person, amount, description, date, status };
      }
    } else {
      this.data.consultancies.unshift({
        id: 'c_' + Date.now(),
        client,
        person,
        description,
        amount,
        date,
        status
      });
    }

    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast('Consultoria registrada com sucesso!');
  },

  editConsultancy(id) {
    this.openConsultancyModal(id);
  },

  // Modal de Atualização de Saldos das Contas
  openAccountsModal() {
    let accountsFields = this.data.accounts.map(acc => `
      <div class="form-group" style="padding:10px 0; border-bottom:1px solid var(--border-color);">
        <label class="form-label" style="display:flex; justify-content:space-between;">
          <span><strong>${acc.name}</strong> (${acc.holder})</span>
          <span style="font-size:0.75rem; text-transform:uppercase;">${acc.type}</span>
        </label>
        <div style="position:relative;">
          <span style="position:absolute; left:12px; top:10px; color:var(--text-muted); font-size:0.9rem;">R$</span>
          <input type="number" step="0.01" class="form-control" style="padding-left:36px;" id="inputAcc_${acc.id}" value="${acc.balance}">
        </div>
      </div>
    `).join('');

    const html = `
      <form id="formAccounts" onsubmit="event.preventDefault(); app.saveAccountsBalances();">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Informe o saldo real disponível em cada uma das contas:
        </p>
        ${accountsFields}
        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Fechar</button>
          <button type="submit" class="btn-primary">Atualizar Saldos</button>
        </div>
      </form>
    `;
    this.openModal('Atualizar Saldos Bancários', html);
  },

  saveAccountsBalances() {
    this.data.accounts.forEach(acc => {
      const el = document.getElementById(`inputAcc_${acc.id}`);
      if (el) {
        acc.balance = parseFloat(el.value) || 0;
      }
    });
    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast('Saldos bancários atualizados!');
  },

  editSingleAccount(accId) {
    const acc = this.data.accounts.find(a => a.id === accId);
    if (!acc) return;
    const newBal = prompt(`Digite o novo saldo para ${acc.name}:`, acc.balance);
    if (newBal !== null) {
      const parsed = parseFloat(newBal.replace(',', '.'));
      if (!isNaN(parsed)) {
        acc.balance = parsed;
        this.saveData();
        this.renderAll();
        this.showToast(`Saldo de ${acc.name} atualizado para ${formatMoney(parsed)}`);
      }
    }
  },

  quickDepositAccount(accId) {
    this.editSingleAccount(accId);
  },

  // Modal FGTS
  openFgtsModal() {
    const html = `
      <form onsubmit="event.preventDefault(); app.saveFgts();">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Atualize o valor acumulado no aplicativo do FGTS da Caixa:
        </p>
        <div class="form-group">
          <label class="form-label">Saldo FGTS Andressa</label>
          <input type="number" step="0.01" id="fgtsInputAndressa" class="form-control" value="${this.data.fgts?.andressa || 0}">
        </div>
        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar FGTS</button>
        </div>
      </form>
    `;
    this.openModal('Atualizar Saldo do FGTS', html);
  },

  saveFgts() {
    const a = parseFloat(document.getElementById('fgtsInputAndressa').value) || 0;
    this.data.fgts = { vitor: 0, andressa: a };
    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast('Saldo do FGTS atualizado!');
  },

  // Modal Cartão de Crédito Mês a Mês
  openCreditCardModal(targetMonthKey) {
    const selectedKey = targetMonthKey || this.getCurrentMonthKey();
    const options = this.getAvailableMonthOptions(selectedKey);

    let cardsInputs = this.data.creditCards.map(c => {
      const inv = this.getCardInvoice(c, selectedKey);
      return `
        <div style="background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-weight:700; color:var(--text-main); font-size:1rem; display:flex; align-items:center; gap:8px;">
              <span class="badge badge-subtle">${c.name}</span>
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">Vence dia ${c.dueDay}</span>
            </div>
            <label style="font-size:0.8rem; cursor:pointer; display:flex; align-items:center; gap:6px; color:var(--text-muted);">
              <input type="checkbox" id="cardPaid_${c.id}" ${inv.isPaid ? 'checked' : ''}>
              Fatura Paga
            </label>
          </div>
          <div class="form-row">
            <div class="form-group" style="margin-bottom:0; flex:1;">
              <label class="form-label">Valor da Fatura (R$)</label>
              <input type="number" step="0.01" class="form-control" id="cardInv_${c.id}" value="${inv.amount || 0}" oninput="app.updateModalInvoiceTotal()">
            </div>
            <div class="form-group" style="margin-bottom:0; width:130px;">
              <label class="form-label">Dia Vencimento</label>
              <input type="number" min="1" max="31" class="form-control" id="cardDue_${c.id}" value="${c.dueDay}">
            </div>
          </div>
        </div>
      `;
    }).join('');

    const html = `
      <form onsubmit="event.preventDefault(); app.saveCreditCards();">
        <div style="background:rgba(59, 130, 246, 0.08); border:1px solid rgba(59, 130, 246, 0.2); border-radius:var(--radius-md); padding:14px; margin-bottom:18px;">
          <label class="form-label" style="font-weight:700; margin-bottom:6px; color:var(--text-main);">Selecione o Mês da Fatura:</label>
          <div style="display:flex; gap:10px; align-items:center;">
            <select id="modalInvoiceMonth" class="form-control" style="font-weight:600;" onchange="app.openCreditCardModal(this.value)">
              ${options}
            </select>
          </div>
          <small style="color:var(--text-muted); display:block; margin-top:6px;">
            Ao salvar, o valor total das faturas será somado automaticamente a todas as despesas deste mês.
          </small>
        </div>

        ${cardsInputs}

        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:12px 16px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.9rem; font-weight:600; color:var(--text-muted);">Total das Faturas do Mês:</span>
          <strong id="modalInvoicesTotalDisplay" class="text-danger" style="font-size:1.3rem;">R$ 0,00</strong>
        </div>

        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar Faturas</button>
        </div>
      </form>
    `;
    this.openModal(`Lançar Faturas dos Cartões`, html);
    this.updateModalInvoiceTotal();
  },

  saveCreditCards() {
    const monthKey = document.getElementById('modalInvoiceMonth')?.value || this.getCurrentMonthKey();
    this.data.creditCards.forEach(c => {
      const invEl = document.getElementById(`cardInv_${c.id}`);
      const dueEl = document.getElementById(`cardDue_${c.id}`);
      const paidEl = document.getElementById(`cardPaid_${c.id}`);

      const amount = invEl ? (parseFloat(invEl.value) || 0) : 0;
      const isPaid = paidEl ? paidEl.checked : false;
      const dueDay = dueEl ? (parseInt(dueEl.value) || c.dueDay) : c.dueDay;

      c.dueDay = dueDay;

      if (!c.monthlyInvoices) c.monthlyInvoices = {};
      c.monthlyInvoices[monthKey] = {
        amount: amount,
        isPaid: isPaid
      };

      if (monthKey === this.getCurrentMonthKey()) {
        c.invoiceAmount = amount;
        c.isPaid = isPaid;
      }
    });

    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast(`Faturas de ${this.formatMonthKeyLabel(monthKey)} salvas e somadas às despesas!`);
  },

  openEditSingleCardInvoice(cardId, monthKey = this.getCurrentMonthKey()) {
    const card = this.data.creditCards.find(c => c.id === cardId);
    if (!card) return;
    const inv = this.getCardInvoice(card, monthKey);
    const label = this.formatMonthKeyLabel(monthKey);

    const html = `
      <form onsubmit="event.preventDefault(); app.saveSingleCardInvoice('${card.id}', '${monthKey}');">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Atualize o valor da fatura de <strong>${card.name}</strong> para o mês de <strong>${label}</strong>:
        </p>
        <div class="form-group">
          <label class="form-label">Valor da Fatura (R$)</label>
          <input type="number" step="0.01" id="singleCardAmount" class="form-control" value="${inv.amount || 0}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Dia de Vencimento</label>
          <input type="number" min="1" max="31" id="singleCardDue" class="form-control" value="${card.dueDay}">
        </div>
        <div class="form-group">
          <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="singleCardPaid" ${inv.isPaid ? 'checked' : ''}>
            <span>Fatura já marcada como PAGA neste mês</span>
          </label>
        </div>
        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar Fatura</button>
        </div>
      </form>
    `;
    this.openModal(`Fatura ${card.name} (${label})`, html);
  },

  saveSingleCardInvoice(cardId, monthKey) {
    const card = this.data.creditCards.find(c => c.id === cardId);
    if (!card) return;

    const amountEl = document.getElementById('singleCardAmount');
    const dueEl = document.getElementById('singleCardDue');
    const paidEl = document.getElementById('singleCardPaid');

    const amount = amountEl ? (parseFloat(amountEl.value) || 0) : 0;
    const dueDay = dueEl ? (parseInt(dueEl.value) || card.dueDay) : card.dueDay;
    const isPaid = paidEl ? paidEl.checked : false;

    card.dueDay = dueDay;
    if (!card.monthlyInvoices) card.monthlyInvoices = {};
    card.monthlyInvoices[monthKey] = {
      amount: amount,
      isPaid: isPaid
    };

    if (monthKey === this.getCurrentMonthKey()) {
      card.invoiceAmount = amount;
      card.isPaid = isPaid;
    }

    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast(`Fatura do ${card.name} (${this.formatMonthKeyLabel(monthKey)}) atualizada!`);
  },

  openNewCardModal() {
    const html = `
      <form onsubmit="event.preventDefault(); app.saveNewCard();">
        <div class="form-group">
          <label class="form-label">Nome do Cartão (ex: Inter Black, C6 Carbon)</label>
          <input type="text" id="newCardName" class="form-control" placeholder="Nome do cartão" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Instituição / Banco</label>
            <select id="newCardInst" class="form-control">
              <option value="nubank">Nubank</option>
              <option value="rico">Rico</option>
              <option value="bradesco">Bradesco</option>
              <option value="outro">Outro / Geral</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Dia do Vencimento</label>
            <input type="number" min="1" max="31" id="newCardDue" class="form-control" value="10" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Limite Total (R$)</label>
            <input type="number" step="0.01" id="newCardLimit" class="form-control" value="5000">
          </div>
          <div class="form-group">
            <label class="form-label">Fatura Deste Mês (R$)</label>
            <input type="number" step="0.01" id="newCardInvoice" class="form-control" value="0">
          </div>
        </div>
        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Criar Cartão</button>
        </div>
      </form>
    `;
    this.openModal('Adicionar Novo Cartão de Crédito', html);
  },

  saveNewCard() {
    const name = document.getElementById('newCardName')?.value.trim();
    if (!name) {
      alert('Informe o nome do cartão.');
      return;
    }
    const institution = document.getElementById('newCardInst')?.value || 'outro';
    const dueDay = parseInt(document.getElementById('newCardDue')?.value) || 10;
    const limit = parseFloat(document.getElementById('newCardLimit')?.value) || 0;
    const invoiceAmount = parseFloat(document.getElementById('newCardInvoice')?.value) || 0;
    const monthKey = this.getCurrentMonthKey();

    const newId = 'card_' + Date.now();
    const newCard = {
      id: newId,
      name,
      institution,
      dueDay,
      limit,
      invoiceAmount,
      isPaid: false,
      monthlyInvoices: {
        [monthKey]: {
          amount: invoiceAmount,
          isPaid: false
        }
      }
    };

    this.data.creditCards.push(newCard);
    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast(`Cartão "${name}" adicionado com sucesso!`);
  },

  // Modal Salário Fixo (Dia 15 e Dia 30)
  openSalariesModal() {
    const salaries = this.normalizeSalaries(this.data.salaries);
    const dia15 = Number(salaries.dia15) || 2900.00;
    const dia30 = Number(salaries.dia30) || 2900.00;
    const total = dia15 + dia30;

    const html = `
      <form onsubmit="event.preventDefault(); app.saveSalaries();">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Configure os dois pagamentos mensais do salário líquido da Andressa (Dia 15 e Dia 30):
        </p>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Salário Dia 15 (Adiantamento)</label>
            <div style="position:relative;">
              <span style="position:absolute; left:12px; top:10px; color:var(--text-muted); font-size:0.9rem;">R$</span>
              <input type="number" step="0.01" id="salaryDia15Input" class="form-control" style="padding-left:36px;" value="${dia15}" oninput="app.updateModalSalariesTotal()">
            </div>
            <small style="color:var(--text-muted); font-size:0.75rem;">1ª Quinzena</small>
          </div>

          <div class="form-group">
            <label class="form-label">Salário Dia 30 (Fechamento)</label>
            <div style="position:relative;">
              <span style="position:absolute; left:12px; top:10px; color:var(--text-muted); font-size:0.9rem;">R$</span>
              <input type="number" step="0.01" id="salaryDia30Input" class="form-control" style="padding-left:36px;" value="${dia30}" oninput="app.updateModalSalariesTotal()">
            </div>
            <small style="color:var(--text-muted); font-size:0.75rem;">2ª Quinzena</small>
          </div>
        </div>

        <div style="background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:14px 18px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">Total Líquido Mensal:</span>
          <strong id="modalSalariesTotalDisplay" class="text-success" style="font-size:1.35rem;">${formatMoney(total)}</strong>
        </div>

        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar Salários</button>
        </div>
      </form>
    `;
    this.openModal('Salário Mensal (Dia 15 e Dia 30)', html);
  },

  updateModalSalariesTotal() {
    const d15 = parseFloat(document.getElementById('salaryDia15Input')?.value) || 0;
    const d30 = parseFloat(document.getElementById('salaryDia30Input')?.value) || 0;
    const totalEl = document.getElementById('modalSalariesTotalDisplay');
    if (totalEl) totalEl.textContent = formatMoney(d15 + d30);
  },

  saveSalaries() {
    const d15 = parseFloat(document.getElementById('salaryDia15Input')?.value) || 0;
    const d30 = parseFloat(document.getElementById('salaryDia30Input')?.value) || 0;
    const total = d15 + d30;

    this.data.salaries = {
      vitor: 0,
      dia15: d15,
      dia30: d30,
      andressa: total
    };

    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast(`Salários salvos! Dia 15: ${formatMoney(d15)} • Dia 30: ${formatMoney(d30)}`);
  },

  // Modal Meta de Poupança
  openSavingsGoalModal() {
    const html = `
      <form onsubmit="event.preventDefault(); app.saveSavingsGoal();">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Quanto vocês desejam poupar e investir todo mês do salário conjunto?
        </p>
        <div class="form-group">
          <label class="form-label">Meta de Poupança Mensal (R$)</label>
          <input type="number" step="50" id="goalAmountInput" class="form-control" value="${this.data.savingsGoal || 2000}">
        </div>
        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar Meta</button>
        </div>
      </form>
    `;
    this.openModal('Definir Meta de Poupança', html);
  },

  saveSavingsGoal() {
    const goal = parseFloat(document.getElementById('goalAmountInput').value) || 0;
    this.data.savingsGoal = goal;
    this.saveData();
    this.closeModal();
    this.renderAll();
    this.showToast('Meta de poupança atualizada!');
  },

  // ==========================================
  // BACKUP E RESTAURAÇÃO
  // ==========================================
  exportBackup() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_financas_vitor_andressa_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Backup exportado com sucesso!');
  },

  importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.accounts && imported.salaries) {
          this.data = imported;
          this.saveData();
          this.renderAll();
          this.showToast('Dados restaurados com sucesso!');
        } else {
          alert('Arquivo de backup inválido.');
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  },

  resetDemoData() {
    if (confirm('Deseja recarregar os dados de exemplo padrão? (Isso substituirá as alterações não salvas em backup)')) {
      this.data = JSON.parse(JSON.stringify(defaultData));
      this.saveData();
      this.renderAll();
      this.showToast('Dados de exemplo recarregados!');
    }
  },

  // ==========================================
  // INTEGRAÇÃO NUVEM: NEON POSTGRESQL
  // ==========================================
  initNeon() {
    const saved = localStorage.getItem(NEON_CONFIG_KEY);
    if (saved) {
      try {
        this.neonConfig = { ...DEFAULT_NEON_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        this.neonConfig = { ...DEFAULT_NEON_CONFIG };
      }
    } else {
      this.neonConfig = { ...DEFAULT_NEON_CONFIG };
    }

    this.updateNeonUI('checking', 'Conectando ao Neon...');
    if (this.neonConfig.enabled) {
      this.fetchFromNeon(false);
    } else {
      this.updateNeonUI('offline', 'Nuvem Pausada');
    }
  },

  updateNeonUI(status, label) {
    this.neonStatus = status;
    const dotEl = document.getElementById('sidebarNeonDot');
    const textEl = document.getElementById('sidebarNeonText');
    const topIcon = document.getElementById('topNeonIcon');
    const topText = document.getElementById('topNeonText');

    if (dotEl) {
      dotEl.className = 'neon-status-dot ' + (status === 'syncing' ? 'syncing' : status === 'offline' ? 'offline' : '');
    }
    if (textEl) textEl.textContent = label || (status === 'online' ? 'Neon Conectado' : 'Neon Offline');

    if (topIcon) {
      if (status === 'online') {
        topIcon.className = 'ph-bold ph-cloud-check text-success';
      } else if (status === 'syncing') {
        topIcon.className = 'ph-bold ph-arrows-clockwise text-gold';
      } else {
        topIcon.className = 'ph-bold ph-cloud-slash text-danger';
      }
    }
    if (topText) topText.textContent = (status === 'online' ? 'Nuvem Ativa' : status === 'syncing' ? 'Sincronizando...' : 'Nuvem Offline');
  },

  async queryNeon(query) {
    if (!this.neonConfig || !this.neonConfig.endpoint || !this.neonConfig.connectionString) {
      throw new Error('Configuração do Neon incompleta.');
    }
    const res = await fetch(this.neonConfig.endpoint, {
      method: 'POST',
      headers: {
        'Neon-Connection-String': this.neonConfig.connectionString,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    if (json.message || json.code) {
      throw new Error(json.message || 'Erro ao executar query no Neon');
    }
    return json;
  },

  async fetchFromNeon(notify = false) {
    try {
      this.updateNeonUI('syncing', 'Sincronizando...');
      const result = await this.queryNeon("SELECT data, updated_at FROM financial_data WHERE id = 'current';");
      if (result && result.rows && result.rows.length > 0) {
        const cloudData = result.rows[0].data;
        const updatedAt = result.rows[0].updated_at;
        if (cloudData && typeof cloudData === 'object') {
          this.data = cloudData;
          if (this.data.salaries) this.data.salaries = this.normalizeSalaries(this.data.salaries);
          if (this.data.fgts) this.data.fgts.vitor = 0;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
          this.lastSyncTime = new Date(updatedAt);
          this.updateNeonUI('online', 'Neon Conectado');
          this.renderAll();
          if (notify) this.showToast('Dados sincronizados com o Neon!');
          return;
        }
      }
      await this.syncToNeon(true);
      this.updateNeonUI('online', 'Neon Conectado');
    } catch (err) {
      console.warn('Erro ao conectar ao Neon:', err);
      this.updateNeonUI('offline', 'Modo Local (Offline)');
      if (notify) this.showToast('Não foi possível conectar ao Neon. Usando dados locais.');
    }
  },

  async syncToNeon(silent = true) {
    if (!this.neonConfig?.enabled) return;
    try {
      this.updateNeonUI('syncing', 'Salvando na Nuvem...');
      const jsonStr = JSON.stringify(this.data).replace(/'/g, "''");
      const query = `INSERT INTO financial_data (id, data, updated_at) VALUES ('current', '${jsonStr}'::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW() RETURNING updated_at;`;
      const result = await this.queryNeon(query);
      if (result && result.rows && result.rows[0]) {
        this.lastSyncTime = new Date(result.rows[0].updated_at);
      } else {
        this.lastSyncTime = new Date();
      }
      this.updateNeonUI('online', 'Neon Conectado');
      if (!silent) this.showToast('Dados salvos na nuvem Neon PostgreSQL!');
    } catch (err) {
      console.warn('Falha no upload para Neon:', err);
      this.updateNeonUI('offline', 'Salvo apenas Local');
    }
  },

  openNeonModal() {
    const lastSyncStr = this.lastSyncTime ? this.lastSyncTime.toLocaleString('pt-BR') : 'Ainda não sincronizado nesta sessão';
    const statusColor = this.neonStatus === 'online' ? 'var(--success)' : (this.neonStatus === 'syncing' ? 'var(--gold)' : 'var(--danger)');
    const statusLabel = this.neonStatus === 'online' ? '🟢 Conectado e Sincronizado' : (this.neonStatus === 'syncing' ? '🟡 Sincronizando...' : '🔴 Offline / Salvo Local');

    const html = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="ph-bold ph-database" style="color:#00E699; font-size:22px;"></i>
              <strong>Neon Serverless PostgreSQL</strong>
            </div>
            <span class="badge ${this.neonStatus === 'online' ? 'badge-green' : 'badge-gold'}">
              ${this.neonConfig.projectName || 'controle-financeiro'}
            </span>
          </div>

          <div style="font-size:0.85rem; color:var(--text-muted); display:flex; flex-direction:column; gap:6px;">
            <div><strong>Região:</strong> ${this.neonConfig.region || 'São Paulo (aws-sa-east-1)'}</div>
            <div><strong>Status da Nuvem:</strong> <span style="color:${statusColor}; font-weight:700;">${statusLabel}</span></div>
            <div><strong>Último Sincronismo:</strong> ${lastSyncStr}</div>
          </div>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn-primary" style="flex:1;" onclick="app.fetchFromNeon(true); app.closeModal();">
            <i class="ph ph-arrows-clockwise"></i> Baixar da Nuvem
          </button>
          <button class="btn-secondary" style="flex:1;" onclick="app.syncToNeon(false); app.closeModal();">
            <i class="ph ph-cloud-arrow-up"></i> Enviar p/ Nuvem
          </button>
        </div>

        <details style="font-size:0.82rem; color:var(--text-muted); background:rgba(255,255,255,0.03); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <summary style="cursor:pointer; font-weight:600; color:var(--text-main); margin-bottom:8px;">
            <i class="ph ph-gear"></i> Detalhes da Conexão Neon
          </summary>
          <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
            <div>
              <label class="form-label" style="font-size:0.75rem;">Endpoint HTTP</label>
              <input type="text" id="neonEndpointInput" class="form-control" style="font-size:0.75rem;" value="${this.neonConfig.endpoint}">
            </div>
            <div>
              <label class="form-label" style="font-size:0.75rem;">Connection String</label>
              <input type="password" id="neonConnInput" class="form-control" style="font-size:0.75rem;" value="${this.neonConfig.connectionString}">
            </div>
            <button class="btn-secondary btn-sm" onclick="app.saveNeonConfig()">Salvar Configuração</button>
          </div>
        </details>

        <div class="form-footer" style="margin-top:8px;">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Fechar</button>
        </div>
      </div>
    `;
    this.openModal('Sincronização em Nuvem (Neon)', html);
  },

  saveNeonConfig() {
    const ep = document.getElementById('neonEndpointInput')?.value.trim();
    const conn = document.getElementById('neonConnInput')?.value.trim();
    if (ep && conn) {
      this.neonConfig.endpoint = ep;
      this.neonConfig.connectionString = conn;
      localStorage.setItem(NEON_CONFIG_KEY, JSON.stringify(this.neonConfig));
      this.showToast('Configurações do Neon salvas!');
      this.fetchFromNeon(true);
    }
  },

  // Notificações Toast
  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="ph-bold ${type === 'success' ? 'ph-check-circle' : 'ph-info'}"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
