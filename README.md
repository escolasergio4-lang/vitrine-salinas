# Preço Bom Salinas

Sistema de gerenciamento e exibição de ofertas de supermercados em Salinas.

## Estrutura do Projeto

Este é um monorepo contendo dois projetos Next.js:

- **painel-admin-salinas**: Painel administrativo para gerenciar mercados e ofertas
- **vitrine-salinas**: Aplicação pública para visualizar as ofertas

## Configuração Inicial

### 1. Instalar Dependências

```bash
# Instalar dependências do painel admin
cd painel-admin-salinas
npm install

# Instalar dependências da vitrine
cd ../vitrine-salinas
npm install
```

### 2. Configurar Firebase

Cada projeto precisa de suas credenciais do Firebase:

```bash
# No painel-admin-salinas
cp .env.example .env.local
# Edite .env.local com suas credenciais reais

# Na vitrine-salinas
cp .env.example .env.local
# Edite .env.local com suas credenciais reais
```

**IMPORTANTE**: Nunca commite arquivos `.env.local` no git. Eles já estão no `.gitignore`.

### 3. Executar os Projetos

```bash
# Painel Admin (porta 3000)
cd painel-admin-salinas
npm run dev

# Vitrine (porta 3000 - em outro terminal)
cd vitrine-salinas
npm run dev
```

## Funcionalidades

### Painel Admin
- Autenticação com Firebase Auth
- Gerenciamento de mercados
- Gerenciamento de ofertas
- Proteção de rotas
- Sistema de notificações (toasts)

### Vitrine
- Listagem de ofertas ordenadas por data
- Design responsivo
- Atualização em tempo real

## Segurança

- Credenciais Firebase protegidas em arquivos `.env.local`
- Rotas do dashboard protegidas com middleware
- Autenticação obrigatória para operações administrativas
- Validação de usuário em todas as páginas protegidas

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Firebase (Auth + Firestore)
- Tailwind CSS

## Melhorias Implementadas

- ✅ Remoção de código de debug
- ✅ Proteção de credenciais
- ✅ Middleware de autenticação
- ✅ Sistema de tipos compartilhados
- ✅ Sistema de notificações (Toast)
- ✅ Feedback visual melhorado
- ✅ Metadata otimizada

## Próximos Passos Sugeridos

- [ ] Implementar paginação na vitrine
- [ ] Adicionar filtros por mercado
- [ ] Implementar busca de produtos
- [ ] Adicionar validação de formulários com Zod
- [ ] Implementar edição e exclusão de ofertas
- [ ] Adicionar testes automatizados
- [ ] Configurar CI/CD
