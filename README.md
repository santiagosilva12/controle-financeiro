# 💰 Painel de Gestão Financeira Familiar — Vitor & Andressa

Um painel completo, moderno e intuitivo desenvolvido sob medida para o controle financeiro conjunto do casal.

---

## 🚀 Como Abrir e Usar
1. **Opção Mais Rápida:** Dê dois cliques no arquivo `Abrir_Controle_Financeiro.bat` ou abra diretamente o arquivo `index.html` em qualquer navegador (Google Chrome, Microsoft Edge, Firefox, Safari).
2. **Dados e Privacidade:** Todos os dados ficam salvos de forma **100% segura e privada no seu próprio computador** através do armazenamento local (`localStorage`).

---

## 📌 Funcionalidades Principais Desenvolvidas

### 1. 🏦 Contas Bancárias & Investimentos
- **Nubank Vitor** (Conta Corrente)
- **Nubank Andressa** (Conta Corrente)
- **Rico Andressa** (Investimentos e Aplicações)
- **Bradesco** (Conta Conjunta)
- Botão rápido para atualizar ou adicionar saldos a qualquer momento.

### 2. 🛡️ Fundo de Garantia (FGTS)
- Campo específico para o **FGTS da Andressa**.
- O saldo do FGTS é somado automaticamente ao **Patrimônio Líquido Total**, permitindo acompanhar a evolução da reserva a longo prazo.

### 3. 💳 Cartões de Crédito & Faturas Mês a Mês
- **Cartões:** Nubank, Rico e Bradesco (com suporte a novos cartões).
- **Lançamento Mês a Mês:** Defina o valor da fatura de cada cartão mês a mês (Outubro, Novembro, Dezembro, etc.).
- **Tabela de Histórico e Projeção:** Visão completa em matriz de todos os meses, cartões e somatórios mensais.
- Alternância de status de fatura **Paga** ou **Em aberto** específica para cada mês.
- As faturas do mês selecionado são somadas automaticamente ao total geral de despesas do respectivo mês.

### 4. 💵 Renda Fixa & Consultorias por Fora
- **Salários Fixos Mensais:** Configuração dos salários líquidos do Vitor e da Andressa.
- **Consultorias (Renda Extra):**
  - Registro de projetos extras (Cliente/Empresa, Responsável, Descrição, Data e Valor).
  - Status dinâmico: **Recebido** (já entrou na conta) ou **Pendente** (a receber).
  - Somatório automático em tempo real nas receitas totais do mês.

### 5. 📑 Despesas Fixas, Variáveis e Consolidação
- **Resumo Consolidado no Topo:** Cards discriminando Contas Fixas, Despesas Variáveis, Faturas dos Cartões do Mês e o **TOTAL GERAL DE TODAS AS DESPESAS**.
- **Faturas integradas à tabela:** Faturas dos cartões do mês aparecem como despesas integradas com filtro próprio (*Faturas de Cartões*) ou integradas em *Todas as Despesas*.
- Filtros interativos: *Todas*, *Contas Fixas*, *Variáveis*, *Faturas de Cartões*, *Pendentes* e *Pagas*.
- Alternância de status de pagamento com um clique direto na tabela.

### 6. 🎯 Meta Mensal de Poupança & Investimento
- Defina quanto vocês querem poupar todo mês do salário conjunto (ex: R$ 2.000,00).
- **Barra de progresso visual** na dashboard mostrando:
  - Quanto sobrou para guardar no mês;
  - Porcentagem atingida da meta;
  - Quanto ainda falta para bater a meta.

### 7. 📊 Gráficos & Indicadores Visuais (KPIs)
- **Fluxo de Caixa:** Comparativo entre Entradas Totais vs Despesas & Faturas vs Sobra Líquida.
- **Distribuição Patrimonial:** Gráfico de rosca mostrando a proporção do dinheiro entre cada banco e o FGTS.

### 8. ☁️ Banco de Dados em Nuvem (Neon PostgreSQL)
- **Projeto no Neon:** `controle-financeiro` hospedado na região **AWS São Paulo (`aws-sa-east-1`)**.
- **Sincronização Bidirecional Automática:** Ao abrir a aplicação ou salvar qualquer alteração, os dados sincronizam automaticamente com a nuvem via API Serverless HTTP do Neon.
- **Funcionamento Híbrido:** Continua funcionando offline via `localStorage` e sincroniza assim que conectado à internet.
- **Indicador em Tempo Real:** Status visual na barra lateral e no topo informando o estado da conexão (*Nuvem Ativa*, *Sincronizando...* ou *Offline*).

### 9. 💾 Backup & Segurança
- Botão **Backup**: Baixa um arquivo `.json` com todos os seus lançamentos e saldos.
- Botão **Restaurar**: Permite importar seu backup em qualquer outro computador ou celular.
- Botão **Alternar Modo Claro / Modo Escuro** na barra lateral.
