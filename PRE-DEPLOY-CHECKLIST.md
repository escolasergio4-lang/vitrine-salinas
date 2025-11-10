# ✅ Checklist Pré-Deploy

## Status Atual: ✅ PRONTO PARA DEPLOY

### ✅ Builds Testados
- [x] Painel Admin compila sem erros
- [x] Vitrine compila sem erros
- [x] TypeScript sem erros
- [x] Configurações Next.js corretas

### ✅ Segurança
- [x] Código de debug removido
- [x] `.env.local` não está no git
- [x] `.env.example` criado como template
- [x] Documentação de segurança criada

### ✅ Configurações de Deploy
- [x] `vercel.json` criado para ambos os projetos
- [x] `netlify.toml` criado para ambos os projetos
- [x] `next.config.ts` configurado

### ⚠️ ANTES DE FAZER DEPLOY

#### 1. Configure as Variáveis de Ambiente na Plataforma

**Vercel:**
- Acesse Project Settings > Environment Variables
- Adicione todas as variáveis do `.env.example`

**Netlify:**
- Acesse Site Settings > Environment Variables
- Adicione todas as variáveis do `.env.example`

**Variáveis necessárias:**
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

#### 2. Configure o Firebase

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mercados/{mercadoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /ofertas/{ofertaId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Firebase Auth:**
- Habilite Email/Password
- Adicione os domínios autorizados:
  - `localhost` (desenvolvimento)
  - Seu domínio Vercel: `*.vercel.app`
  - Seu domínio Netlify: `*.netlify.app`
  - Domínio customizado (se tiver)

#### 3. Crie um Índice no Firestore

Para a ordenação por `dataCriacao`, crie um índice:
- Acesse Firebase Console > Firestore > Indexes
- Coleção: `ofertas`
- Campo: `dataCriacao` (Descending)
- Status: Enabled

Ou aguarde o erro no primeiro deploy e clique no link que o Firebase fornece.

## 🚀 Passos para Deploy

### Opção 1: Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório Git
4. Configure o primeiro projeto:
   - Name: `preco-bom-salinas-admin`
   - Root Directory: `painel-admin-salinas`
   - Framework: Next.js (detectado automaticamente)
5. Adicione as variáveis de ambiente
6. Deploy!
7. Repita para a vitrine:
   - Name: `preco-bom-salinas-vitrine`
   - Root Directory: `vitrine-salinas`

### Opção 2: Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "Add new site"
3. Conecte seu repositório
4. Configure:
   - Base directory: `painel-admin-salinas`
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Adicione as variáveis de ambiente
6. Deploy!
7. Repita para a vitrine com `vitrine-salinas`

## 📋 Pós-Deploy

- [ ] Teste o login no painel admin
- [ ] Crie um mercado de teste
- [ ] Crie uma oferta de teste
- [ ] Verifique se a vitrine exibe a oferta
- [ ] Teste em mobile
- [ ] Configure domínio customizado (opcional)

## 🆘 Troubleshooting

**Erro: "Firebase: Error (auth/unauthorized-domain)"**
- Adicione o domínio nos domínios autorizados do Firebase Auth

**Erro: "Missing index"**
- Clique no link do erro para criar o índice automaticamente

**Erro: "Environment variables not found"**
- Verifique se todas as variáveis foram adicionadas na plataforma
- Faça um novo deploy após adicionar as variáveis

**Build falha**
- Verifique os logs de build
- Teste localmente: `npm run build`
- Verifique se todas as dependências estão no `package.json`

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs da plataforma
2. Consulte o `DEPLOY.md`
3. Revise o `SECURITY.md`
4. Teste localmente primeiro
