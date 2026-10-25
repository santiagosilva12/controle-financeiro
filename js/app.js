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
  monthlySavingsGoals: {},
  sobraReal: {},
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
  incomeFilter: 'all',
  currentDate: new Date(2026, 9, 1), // Outubro 2026
  cashflowChartInstance: null,
  distributionChartInstance: null,
  evolutionChartInstance: null,
  savingsProjectionChartInstance: null,
  evolutionYear: 2026,
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
          if (!this.data.sobraReal) {
            this.data.sobraReal = {};
          }
          if (!this.data.monthlySavingsGoals) {
            this.data.monthlySavingsGoals = {};
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
    this.renderSavingsSection();
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
      const prevDate = new Date(this.currentDate);
      prevDate.setMonth(prevDate.getMonth() - 1);
      const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
      if (prevKey < '2026-10') {
        this.showToast('O controle financeiro inicia a partir de Outubro de 2026.');
        return;
      }
      this.currentDate = prevDate;
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
    const btnNewReembolso = document.getElementById('btnNewReembolso');
    if (btnNewReembolso) {
      btnNewReembolso.addEventListener('click', () => this.openReembolsoModal());
    }
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
    if (monthKey < '2026-10') {
      this.showToast('O controle financeiro inicia a partir de Outubro de 2026.');
      return;
    }
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
        if (k < '2026-10') return; // Contabilizar a partir de Outubro/2026
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
    } else if (tabId === 'evolucao') {
      setTimeout(() => this.renderEvolutionSection(), 50);
    } else if (tabId === 'poupanca') {
      setTimeout(() => this.renderSavingsSection(), 50);
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

  // Helper para verificar se um pagamento de salário foi recebido no mês selecionado
  isSalaryReceived(dayKey, monthKey = this.getCurrentMonthKey()) {
    if (!this.data.salaries) return false;
    if (this.data.salaries.receivedMonths && 
        this.data.salaries.receivedMonths[monthKey] && 
        this.data.salaries.receivedMonths[monthKey][dayKey] !== undefined) {
      return !!this.data.salaries.receivedMonths[monthKey][dayKey];
    }
    // Fallback padrão:
    // Para Outubro/2026, dia 15 = true (recebido), dia 30 = false (pendente)
    if (monthKey === '2026-10') {
      return dayKey === 'dia15';
    }
    return false;
  },

  // Alternar status de recebimento do salário (dia15 ou dia30) para o mês selecionado
  toggleSalaryReceived(dayKey, monthKey = this.getCurrentMonthKey()) {
    if (!this.data.salaries) this.data.salaries = {};
    if (!this.data.salaries.receivedMonths) this.data.salaries.receivedMonths = {};
    if (!this.data.salaries.receivedMonths[monthKey]) {
      this.data.salaries.receivedMonths[monthKey] = {
        dia15: this.isSalaryReceived('dia15', monthKey),
        dia30: this.isSalaryReceived('dia30', monthKey)
      };
    }

    const currentStatus = this.isSalaryReceived(dayKey, monthKey);
    const newStatus = !currentStatus;
    this.data.salaries.receivedMonths[monthKey][dayKey] = newStatus;

    this.saveData();
    this.renderAll();

    const labelDay = dayKey === 'dia15' ? 'Salário Dia 15' : 'Salário Dia 30';
    const monthLabel = this.formatMonthKeyLabel(monthKey);
    this.showToast(newStatus 
      ? `${labelDay} marcado como RECEBIDO em ${monthLabel}!` 
      : `${labelDay} marcado como PENDENTE em ${monthLabel}.`);
  },

  // ==========================================
  // CÁLCULOS PRINCIPAIS POR MÊS
  // ==========================================
  getMonthTotals(monthKey = this.getCurrentMonthKey()) {
    // Não contabilizar meses anteriores a Outubro de 2026 (início do controle)
    if (monthKey < '2026-10') {
      return {
        monthKey,
        isBeforeStart: true,
        totalFaturas: 0,
        faturasPendentes: 0,
        salarioVitor: 0,
        salarioDia15: 0,
        salarioDia30: 0,
        salarioAndressa: 0,
        salariosTotal: 0,
        salarioDia15Recebido: 0,
        salarioDia30Recebido: 0,
        salariosRecebidosTotal: 0,
        salariosPendentesTotal: 0,
        consultoriasDoMes: [],
        apenasConsultorias: [],
        apenasReembolsos: [],
        consultoriasRecebidas: 0,
        consultoriasPendentes: 0,
        consultoriasTotal: 0,
        reembolsosRecebidos: 0,
        reembolsosPendentes: 0,
        reembolsosTotal: 0,
        extrasTotal: 0,
        extrasRecebidosTotal: 0,
        extrasPendentesTotal: 0,
        totalGeralMes: 0,
        totalRecebidoMes: 0,
        totalPendenteMes: 0,
        totalEntradas: 0,
        totalEntradasPrevistas: 0,
        despesasFixas: 0,
        despesasVariaveis: 0,
        totalDespesasCadastradas: 0,
        totalDespesasComFaturas: 0,
        totalDespesasPendentes: 0,
        sobraRealAmount: 0,
        somarGanhosSobraReal: true,
        adicionalSobraGanhos: 0,
        sobraMes: 0,
        sobraRealizada: 0
      };
    }

    // Faturas de Cartões do Mês
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
    const salarioDia15 = Number(this.data.salaries?.dia15) ?? 2400.00;
    const salarioDia30 = Number(this.data.salaries?.dia30) ?? 3400.00;
    const salarioAndressa = salarioDia15 + salarioDia30;
    const salariosTotal = salarioAndressa;

    // Status de Recebimento de Salários no Mês Ativo
    const salarioDia15Recebido = this.isSalaryReceived('dia15', monthKey) ? salarioDia15 : 0;
    const salarioDia30Recebido = this.isSalaryReceived('dia30', monthKey) ? salarioDia30 : 0;
    const salariosRecebidosTotal = salarioDia15Recebido + salarioDia30Recebido;
    const salariosPendentesTotal = salariosTotal - salariosRecebidosTotal;

    // Entradas Extras do Mês: Consultorias & Reembolsos (PUXAR APENAS AS DO MÊS ESPECIFICADO)
    const consultoriasDoMes = this.data.consultancies.filter(c => c.date && c.date.startsWith(monthKey));

    // Separar por tipo (retrocompatibilidade: se não tiver type, assume consultoria)
    const apenasConsultorias = consultoriasDoMes.filter(c => (c.type || 'consultoria') === 'consultoria');
    const apenasReembolsos = consultoriasDoMes.filter(c => c.type === 'reembolso');

    const consultoriasRecebidas = apenasConsultorias
      .filter(c => c.status === 'recebido')
      .reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const consultoriasPendentes = apenasConsultorias
      .filter(c => c.status === 'pendente')
      .reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const consultoriasTotal = consultoriasRecebidas + consultoriasPendentes;

    const reembolsosRecebidos = apenasReembolsos
      .filter(c => c.status === 'recebido')
      .reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const reembolsosPendentes = apenasReembolsos
      .filter(c => c.status === 'pendente')
      .reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const reembolsosTotal = reembolsosRecebidos + reembolsosPendentes;

    const extrasTotal = consultoriasTotal + reembolsosTotal;
    const extrasRecebidosTotal = consultoriasRecebidas + reembolsosRecebidos;
    const extrasPendentesTotal = consultoriasPendentes + reembolsosPendentes;

    // Sobra Líquida Real (Estimada / Saldo Anterior) informada pelo usuário
    const sobraRealCfg = (this.data.sobraReal && this.data.sobraReal[monthKey]) 
      ? this.data.sobraReal[monthKey] 
      : null;
    let sobraRealAmount = 0;
    let somarGanhosSobraReal = true;
    if (typeof sobraRealCfg === 'number') {
      sobraRealAmount = sobraRealCfg;
      somarGanhosSobraReal = true;
    } else if (sobraRealCfg && typeof sobraRealCfg === 'object') {
      sobraRealAmount = Number(sobraRealCfg.amount) || 0;
      somarGanhosSobraReal = sobraRealCfg.somarGanhos !== false;
    }
    const adicionalSobraGanhos = (somarGanhosSobraReal && sobraRealAmount > 0) ? sobraRealAmount : 0;

    // TOTAIS CONSOLIDADOS DE ENTRADAS / RECEITAS DO MÊS
    const totalGeralMes = salariosTotal + extrasTotal + adicionalSobraGanhos;
    const totalRecebidoMes = salariosRecebidosTotal + extrasRecebidosTotal + adicionalSobraGanhos;
    const totalPendenteMes = salariosPendentesTotal + extrasPendentesTotal;

    const totalEntradas = totalRecebidoMes;
    const totalEntradasPrevistas = totalGeralMes;

    // Despesas do Mês:
    // 1. Contas Fixas (ocorrem todo mês)
    const despesasFixas = this.data.expenses
      .filter(e => e.type === 'fixa')
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    // 2. Despesas Variáveis (SOMENTE as que vencem no mês especificado)
    const despesasVariaveis = this.data.expenses
      .filter(e => e.type === 'variavel' && e.dueDate && e.dueDate.startsWith(monthKey))
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    const totalDespesasCadastradas = despesasFixas + despesasVariaveis;
    const totalDespesasComFaturas = totalDespesasCadastradas + totalFaturas;

    // Sobras
    const sobraMes = totalGeralMes - totalDespesasComFaturas;
    const sobraRealizada = totalRecebidoMes - totalDespesasComFaturas;

    // Contas Pendentes a Pagar no Mês Selecionado
    const contasFixasPendentes = this.data.expenses
      .filter(e => e.type === 'fixa' && !this.isExpensePaid(e, monthKey))
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    const despesasVariaveisPendentes = this.data.expenses
      .filter(e => e.type === 'variavel' && e.dueDate && e.dueDate.startsWith(monthKey) && !this.isExpensePaid(e, monthKey))
      .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

    const totalDespesasPendentes = contasFixasPendentes + despesasVariaveisPendentes + faturasPendentes;

    return {
      monthKey,
      totalFaturas,
      faturasPendentes,
      salarioVitor,
      salarioDia15,
      salarioDia30,
      salarioAndressa,
      salariosTotal,
      salarioDia15Recebido,
      salarioDia30Recebido,
      salariosRecebidosTotal,
      salariosPendentesTotal,
      consultoriasDoMes,
      apenasConsultorias,
      apenasReembolsos,
      consultoriasRecebidas,
      consultoriasPendentes,
      consultoriasTotal,
      reembolsosRecebidos,
      reembolsosPendentes,
      reembolsosTotal,
      extrasTotal,
      extrasRecebidosTotal,
      extrasPendentesTotal,
      totalGeralMes,
      totalRecebidoMes,
      totalPendenteMes,
      totalEntradas,
      totalEntradasPrevistas,
      despesasFixas,
      despesasVariaveis,
      totalDespesasCadastradas,
      totalDespesasComFaturas,
      totalDespesasPendentes,
      sobraRealAmount,
      somarGanhosSobraReal,
      adicionalSobraGanhos,
      sobraMes,
      sobraRealizada
    };
  },

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

    // Mês Selecionado no Painel
    const monthKey = this.getCurrentMonthKey();
    const monthTotals = this.getMonthTotals(monthKey);

    // Patrimônio Líquido Total Consolidado
    const patrimonioTotal = (saldoContas + fgtsTotal) - monthTotals.faturasPendentes;

    return {
      saldoContas,
      saldoRico,
      fgtsVitor,
      fgtsAndressa,
      fgtsTotal,
      patrimonioTotal,
      ...monthTotals
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
    this.renderEvolutionSection();
    this.renderCharts();
  },

  // KPIs
  renderKPIs() {
    const t = this.getTotals();

    document.getElementById('kpiSaldoContas').textContent = formatMoney(t.saldoContas);
    document.getElementById('kpiFgts').textContent = formatMoney(t.fgtsTotal);
    document.getElementById('kpiEntradas').textContent = formatMoney(t.totalRecebidoMes);
    document.getElementById('kpiDespesas').textContent = formatMoney(t.totalDespesasComFaturas);
    
    const sobraEl = document.getElementById('kpiSobraMes');
    sobraEl.textContent = formatMoney(t.sobraMes);
    if (t.sobraMes >= 0) {
      sobraEl.className = 'kpi-value text-success';
    } else {
      sobraEl.className = 'kpi-value text-danger';
    }

    const sobraDescEl = document.getElementById('kpiSobraDesc');
    if (sobraDescEl) {
      sobraDescEl.textContent = `Previsto: ${formatMoney(t.sobraMes)} • Já Realizado: ${formatMoney(t.sobraRealizada)}`;
    }

    document.getElementById('kpiPatrimonioTotal').textContent = formatMoney(t.patrimonioTotal);

    // Badges dos KPIs
    document.getElementById('kpiConsultoriaBadge').textContent = `Total Previsto: ${formatMoney(t.totalGeralMes)} (Faltam ${formatMoney(t.totalPendenteMes)})`;
    document.getElementById('kpiFaturasBadge').textContent = `Faturas: ${formatMoney(t.totalFaturas)}`;
  },

  // Barra de Progresso da Poupança no Topo
  renderSavingsGoal() {
    const t = this.getTotals();
    const monthKey = this.getCurrentMonthKey();
    const meta = (this.data.monthlySavingsGoals && this.data.monthlySavingsGoals[monthKey] !== undefined)
      ? Number(this.data.monthlySavingsGoals[monthKey])
      : (Number(this.data.savingsGoal) || 2000.00);
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

    // 1. Valores dos Salários
    const salaryDia15Display = document.getElementById('salaryDia15Display');
    if (salaryDia15Display) salaryDia15Display.textContent = formatMoney(t.salarioDia15);

    const salaryDia30Display = document.getElementById('salaryDia30Display');
    if (salaryDia30Display) salaryDia30Display.textContent = formatMoney(t.salarioDia30);

    const salaryAndressaDisplay = document.getElementById('salaryAndressaDisplay');
    if (salaryAndressaDisplay) salaryAndressaDisplay.textContent = formatMoney(t.salariosTotal);

    // 2. Botões de Status Interativos para Salário Dia 15 e Dia 30
    const isDia15Received = this.isSalaryReceived('dia15', monthKey);
    const btnDia15 = document.getElementById('salaryDia15StatusBtn');
    if (btnDia15) {
      btnDia15.className = `salary-status-btn ${isDia15Received ? 'badge-green' : 'badge-gold'}`;
      btnDia15.innerHTML = isDia15Received ? '<i class="ph-bold ph-check"></i> Recebido' : '<i class="ph-bold ph-clock"></i> Pendente';
      btnDia15.title = `Clique para alternar: ${isDia15Received ? 'Marcar como Pendente' : 'Marcar como Recebido'}`;
    }

    const isDia30Received = this.isSalaryReceived('dia30', monthKey);
    const btnDia30 = document.getElementById('salaryDia30StatusBtn');
    if (btnDia30) {
      btnDia30.className = `salary-status-btn ${isDia30Received ? 'badge-green' : 'badge-gold'}`;
      btnDia30.innerHTML = isDia30Received ? '<i class="ph-bold ph-check"></i> Recebido' : '<i class="ph-bold ph-clock"></i> Pendente';
      btnDia30.title = `Clique para alternar: ${isDia30Received ? 'Marcar como Pendente' : 'Marcar como Recebido'}`;
    }

    // 3. Detalhamento Recebido / Pendente nos Cards
    const salaryBreakdownEl = document.getElementById('salaryReceivedBreakdown');
    if (salaryBreakdownEl) {
      salaryBreakdownEl.innerHTML = `Recebido: <strong class="text-success">${formatMoney(t.salariosRecebidosTotal)}</strong> • Pendente: <strong class="text-gold">${formatMoney(t.salariosPendentesTotal)}</strong>`;
    }

    const consultBreakdownEl = document.getElementById('consultancyReceivedBreakdown');
    if (consultBreakdownEl) {
      consultBreakdownEl.innerHTML = `Recebido: <strong class="text-success">${formatMoney(t.consultoriasRecebidas)}</strong> • Pendente: <strong class="text-gold">${formatMoney(t.consultoriasPendentes)}</strong>`;
    }

    const consultTotalDisplay = document.getElementById('consultancyTotalDisplay');
    if (consultTotalDisplay) consultTotalDisplay.textContent = formatMoney(t.consultoriasTotal);
    const consultCountBadge = document.getElementById('consultanciesCountBadge');
    if (consultCountBadge) consultCountBadge.textContent = `${t.apenasConsultorias.length} no mês`;

    // Reembolsos no Mês
    const reembolsoBreakdownEl = document.getElementById('reembolsoReceivedBreakdown');
    if (reembolsoBreakdownEl) {
      reembolsoBreakdownEl.innerHTML = `Recebido: <strong class="text-success">${formatMoney(t.reembolsosRecebidos)}</strong> • Pendente: <strong class="text-gold">${formatMoney(t.reembolsosPendentes)}</strong>`;
    }
    const reembolsoTotalDisplay = document.getElementById('reembolsoTotalDisplay');
    if (reembolsoTotalDisplay) reembolsoTotalDisplay.textContent = formatMoney(t.reembolsosTotal);
    const reembolsosCountBadge = document.getElementById('reembolsosCountBadge');
    if (reembolsosCountBadge) reembolsosCountBadge.textContent = `${t.apenasReembolsos.length} no mês`;

    // 4. Resumo Consolidado de Rendas do Mês (Total Geral & Já Recebido)
    const incTotalGeralEl = document.getElementById('incomeTotalGeralMes');
    if (incTotalGeralEl) incTotalGeralEl.textContent = formatMoney(t.totalGeralMes);

    const incTotalGeralSub = document.getElementById('incomeTotalGeralSub');
    if (incTotalGeralSub) {
      const parts = [`Salários (${formatMoney(t.salariosTotal)})`];
      if (t.consultoriasTotal > 0) parts.push(`Consultorias (${formatMoney(t.consultoriasTotal)})`);
      if (t.reembolsosTotal > 0) parts.push(`Reembolsos (${formatMoney(t.reembolsosTotal)})`);
      if (t.adicionalSobraGanhos > 0) parts.push(`Sobra Real (${formatMoney(t.sobraRealAmount)})`);
      if (t.consultoriasTotal === 0 && t.reembolsosTotal === 0 && t.adicionalSobraGanhos === 0) parts.push('Nenhuma renda extra');
      incTotalGeralSub.textContent = parts.join(' + ');
    }

    const incTotalRecebidoEl = document.getElementById('incomeTotalRecebidoMes');
    if (incTotalRecebidoEl) incTotalRecebidoEl.textContent = formatMoney(t.totalRecebidoMes);

    const incTotalRecebidoSub = document.getElementById('incomeTotalRecebidoSub');
    if (incTotalRecebidoSub) {
      const pct = t.totalGeralMes > 0 ? Math.round((t.totalRecebidoMes / t.totalGeralMes) * 100) : 0;
      incTotalRecebidoSub.textContent = `${pct}% do total previsto já na conta`;
    }

    const incTotalPendenteEl = document.getElementById('incomeTotalPendenteMes');
    if (incTotalPendenteEl) incTotalPendenteEl.textContent = formatMoney(t.totalPendenteMes);

    const incTotalPendenteSub = document.getElementById('incomeTotalPendenteSub');
    if (incTotalPendenteSub) {
      incTotalPendenteSub.textContent = `Aguardando entrada em ${monthName}`;
    }

    // 5. Balanço do Mês: Ganhos x Despesas & Simulador de Poupança
    this.renderIncomeBalanceAndPlanner(t);

    const subEl = document.getElementById('consultancyPeriodSub');
    if (subEl) {
      subEl.textContent = `Registros de consultorias e reembolsos previstos ou recebidos em ${monthName} / ${year}`;
    }

    // Filtrar itens da tabela pelo filtro ativo (all, consultoria, reembolso)
    const filter = this.incomeFilter || 'all';
    let filteredList = t.consultoriasDoMes;
    if (filter === 'consultoria') {
      filteredList = t.apenasConsultorias;
    } else if (filter === 'reembolso') {
      filteredList = t.apenasReembolsos;
    }

    // Tabela de consultorias e reembolsos
    const tbody = document.getElementById('consultancyTableBody');
    if (filteredList.length === 0) {
      const msg = filter === 'reembolso'
        ? `Nenhum reembolso lançado para ${monthName} / ${year}. Clique em "+ Novo Reembolso" para lançar.`
        : (filter === 'consultoria'
          ? `Nenhuma consultoria lançada para ${monthName} / ${year}. Clique em "+ Nova Consultoria" para lançar.`
          : `Nenhuma consultoria ou reembolso lançado para ${monthName} / ${year}.`);
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);"><i class="ph ph-calendar-blank" style="font-size:22px; display:block; margin-bottom:6px;"></i>${msg}</td></tr>`;
      return;
    }

    tbody.innerHTML = filteredList.map(c => {
      const isReemb = (c.type === 'reembolso');
      const typeBadge = isReemb
        ? '<span class="badge badge-purple" style="display:inline-flex; align-items:center; gap:4px;"><i class="ph-bold ph-arrow-u-up-left"></i> Reembolso</span>'
        : '<span class="badge badge-green" style="display:inline-flex; align-items:center; gap:4px;"><i class="ph-bold ph-briefcase"></i> Consultoria</span>';

      return `
        <tr>
          <td>
            <strong>${c.client}</strong>
            ${c.description ? `<br><small style="color:var(--text-muted);">${c.description}</small>` : ''}
          </td>
          <td>${typeBadge}</td>
          <td>
            <span class="badge ${c.person === 'Vitor' ? 'badge-blue' : 'badge-subtle'}">
              ${c.person}
            </span>
          </td>
          <td>${formatDate(c.date)}</td>
          <td><strong class="${isReemb ? 'text-purple' : 'text-success'}">${formatMoney(c.amount)}</strong></td>
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
      `;
    }).join('');
  },

  setIncomeFilter(filter) {
    this.incomeFilter = filter;
    const btnAll = document.getElementById('filterExtraAll');
    const btnCons = document.getElementById('filterExtraConsultancy');
    const btnReemb = document.getElementById('filterExtraReembolso');
    if (btnAll) btnAll.classList.toggle('active', filter === 'all');
    if (btnCons) btnCons.classList.toggle('active', filter === 'consultoria');
    if (btnReemb) btnReemb.classList.toggle('active', filter === 'reembolso');
    this.renderIncomeSection();
  },

  toggleConsultancyStatus(id) {
    const c = this.data.consultancies.find(item => item.id === id);
    if (c) {
      c.status = c.status === 'recebido' ? 'pendente' : 'recebido';
      this.saveData();
      this.renderAll();
      const label = c.type === 'reembolso' ? 'Reembolso' : 'Consultoria';
      this.showToast(c.status === 'recebido' 
        ? `${label} "${c.client}" marcado como RECEBIDO!` 
        : `${label} "${c.client}" marcado como PENDENTE.`);
    }
  },

  deleteConsultancy(id) {
    const c = this.data.consultancies.find(item => item.id === id);
    const label = c && c.type === 'reembolso' ? 'este reembolso' : 'esta consultoria';
    if (confirm(`Deseja realmente remover ${label}?`)) {
      this.data.consultancies = this.data.consultancies.filter(item => item.id !== id);
      this.saveData();
      this.renderAll();
      this.showToast('Item removido com sucesso!');
    }
  },

  // ==========================================
  // BALANÇO FINANCEIRO & SIMULADOR DE POUPANÇA
  // ==========================================
  renderIncomeBalanceAndPlanner(t) {
    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();
    const year = this.currentDate.getFullYear();

    const badgeMonth = document.getElementById('balanceMonthBadge');
    if (badgeMonth) badgeMonth.textContent = `${monthName} / ${year}`;

    // Equação de Subtração (Ganhos - Despesas = Sobra)
    const eqGanhos = document.getElementById('eqTotalGanhos');
    if (eqGanhos) eqGanhos.textContent = formatMoney(t.totalGeralMes);

    const eqGanhosSub = document.getElementById('eqTotalGanhosSub');
    if (eqGanhosSub) {
      if (t.adicionalSobraGanhos > 0) {
        eqGanhosSub.textContent = `Salários + Extras + Sobra Real (${formatMoney(t.sobraRealAmount)})`;
      } else {
        eqGanhosSub.textContent = 'Salários + Consultorias + Reembolsos';
      }
    }

    const eqDespesas = document.getElementById('eqTotalDespesas');
    if (eqDespesas) eqDespesas.textContent = formatMoney(t.totalDespesasComFaturas);

    const eqSobra = document.getElementById('eqSobraMes');
    if (eqSobra) {
      eqSobra.textContent = formatMoney(t.sobraMes);
      eqSobra.className = t.sobraMes >= 0 ? 'eq-val text-gold' : 'eq-val text-danger';
    }

    const eqSobraSub = document.getElementById('eqSobraMesSub');
    if (eqSobraSub) {
      const extraTag = (t.adicionalSobraGanhos > 0) ? ' (inclui Sobra Real)' : '';
      eqSobraSub.textContent = `Previsto: ${formatMoney(t.sobraMes)}${extraTag} • Já Realizado: ${formatMoney(t.sobraRealizada)}`;
    }

    // Configuração de Sobra Líquida Real deste mês
    const inputSobraReal = document.getElementById('inputSobraRealMes');
    if (inputSobraReal && document.activeElement !== inputSobraReal) {
      inputSobraReal.value = t.sobraRealAmount > 0 ? t.sobraRealAmount : '';
    }

    const checkSomar = document.getElementById('checkSomarGanhosSobraReal');
    if (checkSomar) {
      checkSomar.checked = t.somarGanhosSobraReal !== false;
    }

    const badgeSobraRealMonth = document.getElementById('sobraRealMonthBadge');
    if (badgeSobraRealMonth) {
      badgeSobraRealMonth.textContent = `${monthName} / ${year}`;
    }

    const tagSobraReal = document.getElementById('sobraRealActiveTag');
    if (tagSobraReal) {
      tagSobraReal.style.display = (t.sobraRealAmount > 0 && t.somarGanhosSobraReal) ? 'inline-flex' : 'none';
    }

    const feedbackSobraReal = document.getElementById('sobraRealFeedback');
    const feedbackText = document.getElementById('sobraRealFeedbackText');
    if (feedbackSobraReal && feedbackText) {
      if (t.sobraRealAmount > 0) {
        feedbackSobraReal.style.display = 'flex';
        if (t.somarGanhosSobraReal) {
          feedbackText.innerHTML = `<strong>Sobra Real aplicada:</strong> O valor de <strong class="text-success">${formatMoney(t.sobraRealAmount)}</strong> foi somado aos ganhos de ${monthName}. Seu saldo total do mês agora é <strong class="text-success">${formatMoney(t.totalGeralMes)}</strong>.`;
        } else {
          feedbackText.innerHTML = `<strong>Sobra Real registrada:</strong> O valor de <strong class="text-gold">${formatMoney(t.sobraRealAmount)}</strong> está anotado apenas como referência (não somado aos ganhos).`;
        }
      } else {
        feedbackSobraReal.style.display = 'none';
      }
    }

    // Carregar meta atual de poupança deste mês
    const metaMes = (this.data.monthlySavingsGoals && this.data.monthlySavingsGoals[monthKey] !== undefined)
      ? Number(this.data.monthlySavingsGoals[monthKey])
      : (Number(this.data.savingsGoal) || 2000.00);

    const inputMeta = document.getElementById('inputMetaPouparMes');
    if (inputMeta && document.activeElement !== inputMeta) {
      inputMeta.value = metaMes;
    }

    this.updateSavingsPlannerPreview(metaMes, t);
  },

  updateSavingsPlannerPreview(val, totals = null) {
    const t = totals || this.getTotals();
    const sobra = Math.max(0, t.sobraMes);
    const numVal = parseFloat(val) || 0;

    const displayPoupar = document.getElementById('plannerPouparDisplay');
    if (displayPoupar) displayPoupar.textContent = formatMoney(numVal);

    const pct = sobra > 0 ? Math.round((numVal / sobra) * 100) : 0;
    const displayPct = document.getElementById('plannerPouparPctDisplay');
    if (displayPct) displayPct.textContent = `${pct}%`;

    const livre = Math.max(0, sobra - numVal);
    const displayLivre = document.getElementById('plannerLivreDisplay');
    if (displayLivre) displayLivre.textContent = formatMoney(livre);

    const bar = document.getElementById('plannerProgressBar');
    if (bar) {
      bar.style.width = `${Math.min(100, pct)}%`;
      bar.style.background = pct > 100 
        ? 'linear-gradient(90deg, #EF4444, #DC2626)' 
        : 'linear-gradient(90deg, #10B981, #F59E0B)';
    }
  },

  applySavingsPercent(pct) {
    const t = this.getTotals();
    const sobra = Math.max(0, t.sobraMes);
    const calculated = Math.round((sobra * (pct / 100)) * 100) / 100;

    const inputMeta = document.getElementById('inputMetaPouparMes');
    if (inputMeta) {
      inputMeta.value = calculated;
    }

    document.querySelectorAll('.btn-percent-pill').forEach(btn => {
      const match = btn.textContent.includes(`${pct}%`);
      btn.classList.toggle('active', match);
    });

    this.updateSavingsPlannerPreview(calculated, t);
  },

  saveMonthSavingsGoal() {
    const inputMeta = document.getElementById('inputMetaPouparMes');
    const val = inputMeta ? parseFloat(inputMeta.value) : 0;

    if (isNaN(val) || val < 0) {
      alert('Por favor, informe um valor de poupança válido.');
      return;
    }

    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();

    if (!this.data.monthlySavingsGoals) {
      this.data.monthlySavingsGoals = {};
    }
    this.data.monthlySavingsGoals[monthKey] = val;
    this.data.savingsGoal = val;

    this.saveData();
    this.renderAll();
    this.showToast(`Meta de poupança de ${monthName} definida para ${formatMoney(val)}!`);
  },

  saveSobraRealConfig() {
    const input = document.getElementById('inputSobraRealMes');
    const chk = document.getElementById('checkSomarGanhosSobraReal');
    const val = input ? parseFloat(input.value) : 0;
    const somar = chk ? chk.checked : true;

    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();

    if (!this.data.sobraReal) {
      this.data.sobraReal = {};
    }

    if (isNaN(val) || val <= 0) {
      delete this.data.sobraReal[monthKey];
      this.saveData();
      this.renderAll();
      this.showToast(`Sobra real de ${monthName} redefinida para R$ 0,00.`);
      return;
    }

    this.data.sobraReal[monthKey] = {
      amount: val,
      somarGanhos: somar
    };

    this.saveData();
    this.renderAll();

    const msg = somar
      ? `Sobra real de ${formatMoney(val)} aplicada e SOMADA aos ganhos de ${monthName}!`
      : `Sobra real de ${formatMoney(val)} registrada para ${monthName} (não somada aos ganhos).`;
    this.showToast(msg);
  },

  clearSobraRealConfig() {
    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();
    if (this.data.sobraReal && this.data.sobraReal[monthKey]) {
      delete this.data.sobraReal[monthKey];
      this.saveData();
      this.renderAll();
      this.showToast(`Sobra real de ${monthName} limpa com sucesso.`);
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
  // SEÇÃO: POUPANÇA & PROJEÇÕES (OUTUBRO/2026 A MARÇO/2027)
  // ==========================================
  getSavingsGoalForMonth(monthKey) {
    if (this.data.monthlySavingsGoals && this.data.monthlySavingsGoals[monthKey] !== undefined) {
      return Number(this.data.monthlySavingsGoals[monthKey]) || 0;
    }
    if (this.data.monthlySavingsGoals && this.data.monthlySavingsGoals['2026-10'] !== undefined) {
      return Number(this.data.monthlySavingsGoals['2026-10']) || 0;
    }
    return Number(this.data.savingsGoal) || 4000.00;
  },

  applyProjectionGoalToAll(val = null) {
    const input = document.getElementById('inputMetaProjecaoGeral');
    const valor = val !== null ? parseFloat(val) : (input ? parseFloat(input.value) : 0);

    if (isNaN(valor) || valor < 0) {
      alert('Por favor, informe um valor de meta válido.');
      return;
    }

    if (!this.data.monthlySavingsGoals) {
      this.data.monthlySavingsGoals = {};
    }

    const projectionMonthKeys = ['2026-10', '2026-11', '2026-12', '2027-01', '2027-02', '2027-03'];
    projectionMonthKeys.forEach(key => {
      this.data.monthlySavingsGoals[key] = valor;
    });
    this.data.savingsGoal = valor;

    this.saveData();
    this.renderAll();
    this.showToast(`Meta de ${formatMoney(valor)}/mês aplicada para todos os 6 meses (Out/26 a Mar/27)!`);
  },

  updateSingleMonthSavingsGoal(monthKey, val) {
    const valor = parseFloat(val) || 0;
    if (isNaN(valor) || valor < 0) return;

    if (!this.data.monthlySavingsGoals) {
      this.data.monthlySavingsGoals = {};
    }
    this.data.monthlySavingsGoals[monthKey] = valor;

    if (monthKey === this.getCurrentMonthKey()) {
      this.data.savingsGoal = valor;
    }

    this.saveData();
    this.renderAll();
    const label = this.formatMonthKeyLabel(monthKey);
    this.showToast(`Meta de poupança de ${label} atualizada para ${formatMoney(valor)}!`);
  },

  renderSavingsSection() {
    const tCurrent = this.getTotals();
    const currentKey = this.getCurrentMonthKey();

    const projectionMonths = [
      { key: '2026-10', name: 'Outubro', year: 2026, label: 'Out/26' },
      { key: '2026-11', name: 'Novembro', year: 2026, label: 'Nov/26' },
      { key: '2026-12', name: 'Dezembro', year: 2026, label: 'Dez/26' },
      { key: '2027-01', name: 'Janeiro', year: 2027, label: 'Jan/27' },
      { key: '2027-02', name: 'Fevereiro', year: 2027, label: 'Fev/27' },
      { key: '2027-03', name: 'Março', year: 2027, label: 'Mar/27' }
    ];

    let acumuladoPoupanca = 0;
    let sumSobra = 0;

    const projectionData = projectionMonths.map((m, index) => {
      const t = this.getMonthTotals(m.key);
      const metaMes = this.getSavingsGoalForMonth(m.key);
      acumuladoPoupanca += metaMes;
      sumSobra += t.sobraMes;

      const sobraMes = t.sobraMes;
      const pctSobra = sobraMes > 0 ? Math.round((metaMes / sobraMes) * 100) : 0;
      const livreMes = sobraMes - metaMes;

      return {
        ...m,
        ...t,
        metaMes,
        acumuladoPoupanca,
        pctSobra,
        livreMes,
        isCurrent: m.key === currentKey
      };
    });

    const totalAcumuladoMarco = acumuladoPoupanca;
    const metaBase = this.getSavingsGoalForMonth(currentKey);

    // 1. Atualizar Cards Principais
    const metaBaseEl = document.getElementById('projMetaMensalBase');
    if (metaBaseEl) metaBaseEl.textContent = formatMoney(metaBase);

    const metaBasePctEl = document.getElementById('projMetaMensalPct');
    if (metaBasePctEl) {
      const pctRenda = tCurrent.salariosTotal > 0 ? Math.round((metaBase / tCurrent.salariosTotal) * 100) : 0;
      metaBasePctEl.textContent = `Equivale a aprox. ${pctRenda}% da renda fixa conjunta`;
    }

    const totalAcumMarcoEl = document.getElementById('projTotalAcumuladoMarco');
    if (totalAcumMarcoEl) totalAcumMarcoEl.textContent = formatMoney(totalAcumuladoMarco);

    const totalAcumSubEl = document.getElementById('projTotalAcumuladoSub');
    if (totalAcumSubEl) totalAcumSubEl.textContent = `6 meses guardando ${formatMoney(totalAcumuladoMarco / 6)} em média`;

    const totalSobraEl = document.getElementById('projTotalSobraPeriodo');
    if (totalSobraEl) totalSobraEl.textContent = formatMoney(sumSobra);

    const sobraCompromissadaEl = document.getElementById('projSobraCompromissadaSub');
    if (sobraCompromissadaEl) {
      const pctSobraGeral = sumSobra > 0 ? Math.round((totalAcumuladoMarco / sumSobra) * 100) : 0;
      sobraCompromissadaEl.textContent = `${pctSobraGeral}% da sobra total prevista será guardada`;
    }

    // Saldo patrimonial projetado
    const patrimonioAtual = tCurrent.patrimonioTotal || 0;
    const patrimonioProjetadoMarco = patrimonioAtual + totalAcumuladoMarco;

    const patrimonioMarcoEl = document.getElementById('projPatrimonioMarco');
    if (patrimonioMarcoEl) patrimonioMarcoEl.textContent = formatMoney(patrimonioProjetadoMarco);

    const crescimentoPatrimonioEl = document.getElementById('projCrescimentoPatrimonioSub');
    if (crescimentoPatrimonioEl) {
      crescimentoPatrimonioEl.textContent = `+${formatMoney(totalAcumuladoMarco)} sobre o patrimônio atual`;
    }

    // Input de Meta Geral
    const inputGeral = document.getElementById('inputMetaProjecaoGeral');
    if (inputGeral && document.activeElement !== inputGeral) {
      inputGeral.value = metaBase;
    }

    const badgeGoalFinal = document.getElementById('badgeProjGoalFinal');
    if (badgeGoalFinal) {
      badgeGoalFinal.textContent = `Meta em Março/27: ${formatMoney(totalAcumuladoMarco)}`;
    }

    // 2. Renderizar Cards em Linha do Tempo
    const timelineContainer = document.getElementById('savingsTimelineContainer');
    if (timelineContainer) {
      timelineContainer.innerHTML = projectionData.map((d, index) => {
        const isLast = (index === projectionData.length - 1);
        const pctProgresso = totalAcumuladoMarco > 0 ? Math.round((d.acumuladoPoupanca / totalAcumuladoMarco) * 100) : 0;

        return `
          <div class="timeline-step ${isLast ? 'highlight' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="time">${d.name} / ${d.year}</span>
              ${isLast 
                ? '<span class="badge badge-gold" style="font-size:11px;"><i class="ph-bold ph-trophy"></i> Meta Final</span>' 
                : `<span class="badge badge-subtle" style="font-size:11px;">Mês ${index + 1} de 6</span>`}
            </div>
            <strong>${formatMoney(d.acumuladoPoupanca)}</strong>
            <small style="color:var(--text-muted);">+ ${formatMoney(d.metaMes)} guardados no mês</small>
            <div style="margin-top: 8px;">
              <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:3px; color:var(--text-dim);">
                <span>Progresso</span>
                <span>${pctProgresso}%</span>
              </div>
              <div style="width:100%; height:6px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden;">
                <div style="width:${pctProgresso}%; height:100%; background:${isLast ? 'var(--gold)' : 'var(--success)'}; border-radius:4px;"></div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // 3. Renderizar Tabela Detalhada
    const tbody = document.getElementById('savingsProjectionTableBody');
    if (tbody) {
      tbody.innerHTML = projectionData.map((d, index) => {
        const pctBadge = d.pctSobra > 100
          ? `<span class="badge badge-danger">${d.pctSobra}%</span>`
          : `<span class="badge badge-green">${d.pctSobra}%</span>`;

        const livreClass = d.livreMes >= 0 ? 'text-accent-blue' : 'text-danger';

        return `
          <tr style="${d.isCurrent ? 'background: rgba(59, 130, 246, 0.08); font-weight: 500;' : ''}">
            <td>
              <strong>${d.name} / ${d.year}</strong>
              ${d.isCurrent ? '<span class="badge badge-blue" style="margin-left:6px;">Mês Atual</span>' : ''}
            </td>
            <td><strong class="text-success">${formatMoney(d.totalGeralMes)}</strong></td>
            <td><strong class="text-danger">${formatMoney(d.totalDespesasComFaturas)}</strong></td>
            <td><strong class="${d.sobraMes >= 0 ? 'text-gold' : 'text-danger'}">${formatMoney(d.sobraMes)}</strong></td>
            <td>
              <div class="sobra-real-input-wrapper" style="max-width: 130px;">
                <span class="prefix" style="font-size:0.75rem;">R$</span>
                <input type="number" step="0.01" class="sobra-real-input" 
                       style="padding: 4px 6px 4px 26px; font-size: 0.88rem; width: 110px;"
                       value="${d.metaMes}" 
                       onchange="app.updateSingleMonthSavingsGoal('${d.key}', this.value)"
                       title="Ajustar meta deste mês">
              </div>
            </td>
            <td>${pctBadge}</td>
            <td><strong class="${livreClass}">${formatMoney(d.livreMes)}</strong></td>
            <td><strong class="text-success" style="font-size:1.05rem;">${formatMoney(d.acumuladoPoupanca)}</strong></td>
            <td class="text-right">
              <button class="btn-secondary btn-sm" onclick="app.setPeriod('${d.key}'); app.switchTab('dashboard');" title="Abrir este mês no painel principal">
                <i class="ph ph-calendar-blank"></i> Abrir
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    // 4. Renderizar Gráfico Interativo de Poupança Acumulada
    this.renderSavingsProjectionChart(projectionData);
  },

  renderSavingsProjectionChart(projectionData) {
    if (typeof Chart === 'undefined') return;
    const canvas = document.getElementById('savingsProjectionChart');
    if (!canvas) return;

    if (this.savingsProjectionChartInstance) {
      this.savingsProjectionChartInstance.destroy();
    }

    const isDark = document.body.classList.contains('theme-dark');
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    const labels = projectionData.map(d => `${d.name}/${String(d.year).slice(2)}`);
    const dataAcumulado = projectionData.map(d => d.acumuladoPoupanca);
    const dataMeta = projectionData.map(d => d.metaMes);
    const dataSobra = projectionData.map(d => Math.max(0, d.sobraMes));

    const ctx = canvas.getContext('2d');
    const gradientAcumulado = ctx.createLinearGradient(0, 0, 0, 300);
    gradientAcumulado.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    gradientAcumulado.addColorStop(1, 'rgba(16, 185, 129, 0.02)');

    this.savingsProjectionChartInstance = new Chart(ctx, {
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Poupança Acumulada (R$)',
            data: dataAcumulado,
            borderColor: '#10B981',
            backgroundColor: gradientAcumulado,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 9,
            order: 1
          },
          {
            type: 'bar',
            label: 'Meta a Guardar no Mês (R$)',
            data: dataMeta,
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: '#F59E0B',
            borderWidth: 1,
            borderRadius: 6,
            order: 2
          },
          {
            type: 'bar',
            label: 'Sobra Líquida Prevista (R$)',
            data: dataSobra,
            backgroundColor: 'rgba(59, 130, 246, 0.45)',
            borderColor: '#3B82F6',
            borderWidth: 1,
            borderRadius: 6,
            order: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              font: { size: 12, weight: 600 },
              usePointStyle: true,
              padding: 16
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#F8FAFC',
            bodyColor: '#E2E8F0',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatMoney(ctx.raw)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { weight: 600 } }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: (val) => formatMoney(val)
            }
          }
        }
      }
    });
  },

  // ==========================================
  // SEÇÃO: EVOLUÇÃO MÊS A MÊS
  // ==========================================
  setEvolutionYear(year) {
    this.evolutionYear = Number(year) || 2026;
    const btn2026 = document.getElementById('btnEvolucao2026');
    const btn2027 = document.getElementById('btnEvolucao2027');
    if (btn2026) btn2026.classList.toggle('active', this.evolutionYear === 2026);
    if (btn2027) btn2027.classList.toggle('active', this.evolutionYear === 2027);

    const badgeEl = document.getElementById('evolutionChartBadge');
    if (badgeEl) {
      badgeEl.textContent = (this.evolutionYear === 2026) 
        ? 'Ano de 2026 (Outubro a Dezembro)' 
        : `Ano de ${this.evolutionYear} (Janeiro a Dezembro)`;
    }

    this.renderEvolutionSection();
  },

  renderEvolutionSection() {
    const year = this.evolutionYear || 2026;
    const currentKey = this.getCurrentMonthKey();
    const monthsData = [];

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    // Para 2026, contabilizar estritamente a partir de Outubro (mês 10)
    const startMonth = (year === 2026) ? 10 : 1;
    const endMonth = 12;
    const monthsCount = (endMonth - startMonth + 1);

    let sumEntradas = 0;
    let sumDespesas = 0;
    let sumSobra = 0;
    let bestMonth = null;
    let maxSobra = -Infinity;

    for (let m = startMonth; m <= endMonth; m++) {
      const monthKey = `${year}-${String(m).padStart(2, '0')}`;
      const t = this.getMonthTotals(monthKey);
      const name = monthNames[m - 1];

      sumEntradas += t.totalGeralMes;
      sumDespesas += t.totalDespesasComFaturas;
      sumSobra += t.sobraMes;

      if (t.sobraMes > maxSobra) {
        maxSobra = t.sobraMes;
        bestMonth = { name, monthKey, sobra: t.sobraMes };
      }

      monthsData.push({
        monthKey,
        name,
        isCurrent: monthKey === currentKey,
        ...t
      });
    }

    const mediaEntradas = sumEntradas / monthsCount;
    const mediaDespesas = sumDespesas / monthsCount;
    const mediaSobra = sumSobra / monthsCount;

    const mediaEntradasEl = document.getElementById('evolucaoMediaEntradas');
    if (mediaEntradasEl) mediaEntradasEl.textContent = formatMoney(mediaEntradas);

    const totalEntradasAnoEl = document.getElementById('evolucaoTotalEntradasAno');
    if (totalEntradasAnoEl) {
      totalEntradasAnoEl.textContent = (year === 2026)
        ? `Total (Out - Dez / ${monthsCount} meses): ${formatMoney(sumEntradas)}`
        : `Total no ano (12 meses): ${formatMoney(sumEntradas)}`;
    }

    const mediaDespesasEl = document.getElementById('evolucaoMediaDespesas');
    if (mediaDespesasEl) mediaDespesasEl.textContent = formatMoney(mediaDespesas);

    const totalDespesasAnoEl = document.getElementById('evolucaoTotalDespesasAno');
    if (totalDespesasAnoEl) {
      totalDespesasAnoEl.textContent = (year === 2026)
        ? `Despesas (Out - Dez): ${formatMoney(sumDespesas)}`
        : `Contas + Faturas no ano: ${formatMoney(sumDespesas)}`;
    }

    const mediaSobraEl = document.getElementById('evolucaoMediaSobra');
    if (mediaSobraEl) {
      mediaSobraEl.textContent = formatMoney(mediaSobra);
      mediaSobraEl.className = mediaSobra >= 0 ? 'val text-gold' : 'val text-danger';
    }

    const totalSobraAnoEl = document.getElementById('evolucaoTotalSobraAno');
    if (totalSobraAnoEl) {
      totalSobraAnoEl.textContent = (year === 2026)
        ? `Economia acumulada (Out - Dez): ${formatMoney(sumSobra)}`
        : `Economia projetada no ano: ${formatMoney(sumSobra)}`;
    }

    const melhorMesEl = document.getElementById('evolucaoMelhorMes');
    if (melhorMesEl && bestMonth) melhorMesEl.textContent = formatMoney(bestMonth.sobra);

    const melhorMesNomeEl = document.getElementById('evolucaoMelhorMesNome');
    if (melhorMesNomeEl && bestMonth) melhorMesNomeEl.textContent = `Maior economia em ${bestMonth.name}/${year}`;

    const tableSubEl = document.getElementById('evolutionTableSub');
    if (tableSubEl) {
      tableSubEl.textContent = (year === 2026)
        ? 'Demonstrativo contabilizado a partir de Outubro/2026 (início do controle financeiro).'
        : 'Demonstrativo completo para os 12 meses do ano de 2027.';
    }

    const tbody = document.getElementById('evolutionTableBody');
    if (tbody) {
      tbody.innerHTML = monthsData.map(d => {
        const taxaPoupanca = d.totalGeralMes > 0 ? Math.round((d.sobraMes / d.totalGeralMes) * 100) : 0;
        const poupancaBadge = d.sobraMes >= 0 
          ? `<span class="badge badge-green">${taxaPoupanca}%</span>` 
          : `<span class="badge badge-danger">${taxaPoupanca}%</span>`;

        return `
          <tr style="${d.isCurrent ? 'background: rgba(59, 130, 246, 0.08); font-weight: 500;' : ''}">
            <td>
              <strong>${d.name} / ${year}</strong>
              ${d.isCurrent ? '<span class="badge badge-blue" style="margin-left:6px;">Mês Atual</span>' : ''}
            </td>
            <td>${formatMoney(d.salariosTotal)}</td>
            <td>${d.consultoriasTotal > 0 ? `<strong class="text-success">${formatMoney(d.consultoriasTotal)}</strong>` : '<span class="text-muted">R$ 0,00</span>'}</td>
            <td>
              <strong class="text-success">${formatMoney(d.totalGeralMes)}</strong>
              ${d.adicionalSobraGanhos > 0 ? `<br><small class="badge badge-gold" style="font-size:10px;" title="Inclui sobra real de ${formatMoney(d.sobraRealAmount)}">+ Sobra Real</small>` : ''}
            </td>
            <td>${formatMoney(d.despesasFixas)}</td>
            <td>${d.despesasVariaveis > 0 ? formatMoney(d.despesasVariaveis) : '<span class="text-muted">R$ 0,00</span>'}</td>
            <td>${d.totalFaturas > 0 ? `<strong class="text-purple">${formatMoney(d.totalFaturas)}</strong>` : '<span class="text-muted">R$ 0,00</span>'}</td>
            <td><strong class="text-danger">${formatMoney(d.totalDespesasComFaturas)}</strong></td>
            <td>
              <strong class="${d.sobraMes >= 0 ? 'text-success' : 'text-danger'}">
                ${formatMoney(d.sobraMes)}
              </strong>
            </td>
            <td>${poupancaBadge}</td>
            <td class="text-right">
              <button class="btn-secondary btn-sm" onclick="app.setPeriod('${d.monthKey}'); app.switchTab('dashboard');" title="Abrir este mês no painel principal">
                <i class="ph ph-calendar-blank"></i> Abrir
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    this.renderEvolutionChart(monthsData, year);
  },

  renderEvolutionChart(monthsData, year) {
    if (typeof Chart === 'undefined') return;
    const canvas = document.getElementById('evolutionChart');
    if (!canvas) return;

    if (this.evolutionChartInstance) {
      this.evolutionChartInstance.destroy();
    }

    const isDark = document.body.classList.contains('theme-dark');
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    const labels = (year === 2026) 
      ? monthsData.map(d => d.name) 
      : monthsData.map(d => d.name.slice(0, 3));
    const entradas = monthsData.map(d => d.totalGeralMes);
    const despesas = monthsData.map(d => d.totalDespesasComFaturas);
    const sobras = monthsData.map(d => d.sobraMes);

    this.evolutionChartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Entradas Totais (R$)',
            data: entradas,
            backgroundColor: 'rgba(16, 185, 129, 0.85)',
            borderRadius: 6,
            order: 2
          },
          {
            label: 'Despesas + Faturas (R$)',
            data: despesas,
            backgroundColor: 'rgba(239, 68, 68, 0.85)',
            borderRadius: 6,
            order: 3
          },
          {
            label: 'Sobra Líquida (R$)',
            data: sobras,
            type: 'line',
            borderColor: '#F59E0B',
            backgroundColor: '#F59E0B',
            borderWidth: 3,
            pointBackgroundColor: '#F59E0B',
            pointRadius: 4,
            tension: 0.3,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              boxWidth: 12,
              font: { size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatMoney(ctx.raw)}`
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: textColor,
              callback: (v) => 'R$ ' + v.toLocaleString('pt-BR')
            },
            grid: { color: gridColor }
          },
          x: {
            ticks: { color: textColor },
            grid: { display: false }
          }
        }
      }
    });
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

        <button class="btn-secondary" style="justify-content:flex-start; padding:14px;" onclick="app.openReembolsoModal()">
          <i class="ph-bold ph-arrow-u-up-left text-purple" style="font-size:22px;"></i>
          <div style="text-align:left;">
            <strong>Novo Reembolso a Receber</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">Reembolso corporativo, saúde ou despesa de trabalho</div>
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
            <input type="text" id="expCategory" class="form-control" value="${exp.category}" placeholder="Ex: Moradia, Alimentação, Saúde, Reembolsável">
            <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;">
              <span class="badge badge-subtle" style="cursor:pointer;" onclick="document.getElementById('expCategory').value = 'Moradia'">Moradia</span>
              <span class="badge badge-subtle" style="cursor:pointer;" onclick="document.getElementById('expCategory').value = 'Alimentação'">Alimentação</span>
              <span class="badge badge-subtle" style="cursor:pointer;" onclick="document.getElementById('expCategory').value = 'Saúde'">Saúde</span>
              <span class="badge badge-subtle" style="cursor:pointer;" onclick="document.getElementById('expCategory').value = 'Transporte'">Transporte</span>
              <span class="badge badge-purple" style="cursor:pointer;" onclick="document.getElementById('expCategory').value = 'Reembolsável (Empresa)'"><i class="ph-bold ph-arrow-u-up-left"></i> Reembolsável</span>
            </div>
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

  // Modal Consultoria & Reembolso
  openConsultancyModal(editingId = null, initialType = 'consultoria') {
    const monthKey = this.getCurrentMonthKey();
    const defaultDate = `${monthKey}-15`;
    const item = editingId ? this.data.consultancies.find(c => c.id === editingId) : {
      type: initialType,
      client: '',
      person: 'Andressa',
      description: '',
      amount: '',
      date: defaultDate,
      status: 'recebido'
    };

    const isEdit = !!editingId;
    const currentType = item.type || initialType || 'consultoria';
    const isReembolso = currentType === 'reembolso';

    const html = `
      <form id="formConsultancy" onsubmit="event.preventDefault(); app.saveConsultancy('${editingId || ''}');">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tipo de Lançamento</label>
            <select id="consType" class="form-control" onchange="app.updateIncomeModalLabels(this.value)">
              <option value="consultoria" ${currentType === 'consultoria' ? 'selected' : ''}>Consultoria (Serviço / Projeto Extra)</option>
              <option value="reembolso" ${currentType === 'reembolso' ? 'selected' : ''}>Reembolso (Empresa / Saúde / Corporativo)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Quem executou / Titular</label>
            <select id="consPerson" class="form-control">
              <option value="Andressa" ${item.person === 'Andressa' ? 'selected' : ''}>Andressa</option>
              <option value="Vitor" ${item.person === 'Vitor' ? 'selected' : ''}>Vitor</option>
              <option value="Casal" ${item.person === 'Casal' ? 'selected' : ''}>Casal (Conjunto)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" id="labelConsClient">${isReembolso ? 'Empresa / Origem do Reembolso' : 'Cliente ou Empresa'}</label>
          <input type="text" id="consClient" class="form-control" required value="${item.client}" placeholder="${isReembolso ? 'Ex: Empresa X, Bradesco Saúde, Viagem corporativa' : 'Ex: Projeto ABC, Empresa XYZ'}">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Valor (R$)</label>
            <input type="number" step="0.01" id="consAmount" class="form-control" required value="${item.amount}" placeholder="0,00">
          </div>
          <div class="form-group">
            <label class="form-label">Data Prevista ou Recebida</label>
            <input type="date" id="consDate" class="form-control" value="${item.date}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" id="labelConsDesc">${isReembolso ? 'Motivo do Reembolso / Despesas Reembolsadas' : 'Descrição do Trabalho / Escopo'}</label>
          <input type="text" id="consDesc" class="form-control" value="${item.description}" placeholder="${isReembolso ? 'Ex: Passagem e hotel em SP, consulta médica, materiais' : 'Ex: Mentoria, criação de relatório, assessoria técnica'}">
        </div>

        <div class="form-group">
          <label class="form-label">Status do Pagamento</label>
          <select id="consStatus" class="form-control">
            <option value="recebido" ${item.status === 'recebido' ? 'selected' : ''}>Já Recebido (Creditado na Conta)</option>
            <option value="pendente" ${item.status === 'pendente' ? 'selected' : ''}>A Receber (Aguardando Reembolso/Depósito)</option>
          </select>
        </div>

        <div class="form-footer">
          <button type="button" class="btn-secondary" onclick="app.closeModal()">Cancelar</button>
          <button type="submit" class="btn-primary">${isEdit ? 'Atualizar Registro' : (isReembolso ? 'Registrar Reembolso' : 'Registrar Consultoria')}</button>
        </div>
      </form>
    `;
    const title = isEdit 
      ? (isReembolso ? 'Editar Reembolso' : 'Editar Consultoria') 
      : (isReembolso ? 'Novo Reembolso a Receber' : 'Nova Consultoria (Renda Extra)');
    this.openModal(title, html);
  },

  openReembolsoModal(editingId = null) {
    this.openConsultancyModal(editingId, 'reembolso');
  },

  updateIncomeModalLabels(type) {
    const isReembolso = type === 'reembolso';
    const labelClient = document.getElementById('labelConsClient');
    const inputClient = document.getElementById('consClient');
    const labelDesc = document.getElementById('labelConsDesc');
    const inputDesc = document.getElementById('consDesc');

    if (labelClient) labelClient.textContent = isReembolso ? 'Empresa / Origem do Reembolso' : 'Cliente ou Empresa';
    if (inputClient) inputClient.placeholder = isReembolso ? 'Ex: Empresa X, Bradesco Saúde, Viagem corporativa' : 'Ex: Projeto ABC, Empresa XYZ';
    if (labelDesc) labelDesc.textContent = isReembolso ? 'Motivo do Reembolso / Despesas Reembolsadas' : 'Descrição do Trabalho / Escopo';
    if (inputDesc) inputDesc.placeholder = isReembolso ? 'Ex: Passagem e hotel em SP, consulta médica, materiais' : 'Ex: Mentoria, criação de relatório, assessoria técnica';
  },

  saveConsultancy(editingId) {
    const type = document.getElementById('consType') ? document.getElementById('consType').value : 'consultoria';
    const client = document.getElementById('consClient').value.trim();
    const person = document.getElementById('consPerson').value;
    const amount = parseFloat(document.getElementById('consAmount').value) || 0;
    const description = document.getElementById('consDesc').value.trim();
    const date = document.getElementById('consDate').value;
    const status = document.getElementById('consStatus').value;

    if (!client || amount <= 0) {
      alert('Preencha a origem/cliente e o valor.');
      return;
    }

    if (editingId) {
      const idx = this.data.consultancies.findIndex(c => c.id === editingId);
      if (idx !== -1) {
        this.data.consultancies[idx] = { ...this.data.consultancies[idx], type, client, person, amount, description, date, status };
      }
    } else {
      this.data.consultancies.unshift({
        id: 'c_' + Date.now(),
        type,
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
    this.showToast(type === 'reembolso' ? 'Reembolso registrado com sucesso!' : 'Consultoria registrada com sucesso!');
  },

  editConsultancy(id) {
    const item = this.data.consultancies.find(c => c.id === id);
    const initialType = item ? (item.type || 'consultoria') : 'consultoria';
    this.openConsultancyModal(id, initialType);
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
    const dia15 = Number(salaries.dia15) || 2400.00;
    const dia30 = Number(salaries.dia30) || 3400.00;
    const total = dia15 + dia30;

    const monthKey = this.getCurrentMonthKey();
    const monthName = this.getMonthName();
    const year = this.currentDate.getFullYear();

    const isDia15Received = this.isSalaryReceived('dia15', monthKey);
    const isDia30Received = this.isSalaryReceived('dia30', monthKey);

    const html = `
      <form onsubmit="event.preventDefault(); app.saveSalaries();">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:16px;">
          Configure os dois pagamentos mensais do salário líquido da Andressa (Dia 15 e Dia 30) e marque se já foram recebidos:
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

        <div style="background:var(--bg-card-solid); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:12px 16px; margin-bottom:16px;">
          <label style="font-weight:700; font-size:0.85rem; color:var(--text-main); display:block; margin-bottom:8px;">
            <i class="ph-bold ph-calendar"></i> Status em ${monthName} / ${year}:
          </label>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.85rem;">
              <input type="checkbox" id="modalSalaryDia15Received" ${isDia15Received ? 'checked' : ''} style="width:18px; height:18px;">
              <span>Salário Dia 15 já recebido em ${monthName}</span>
            </label>
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.85rem;">
              <input type="checkbox" id="modalSalaryDia30Received" ${isDia30Received ? 'checked' : ''} style="width:18px; height:18px;">
              <span>Salário Dia 30 já recebido em ${monthName}</span>
            </label>
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

    const isDia15Received = document.getElementById('modalSalaryDia15Received')?.checked || false;
    const isDia30Received = document.getElementById('modalSalaryDia30Received')?.checked || false;
    const monthKey = this.getCurrentMonthKey();

    if (!this.data.salaries) this.data.salaries = {};
    if (!this.data.salaries.receivedMonths) this.data.salaries.receivedMonths = {};
    this.data.salaries.receivedMonths[monthKey] = {
      dia15: isDia15Received,
      dia30: isDia30Received
    };

    this.data.salaries = {
      ...this.data.salaries,
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
