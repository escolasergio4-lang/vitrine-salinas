# 🚀 Quick Start - Deploy Rápido

## ✅ Status: PRONTO PARA DEPLOY!

Ambos os projetos compilam sem erros e estão prontos para produção.

## Deploy em 5 Minutos

### Vercel (Mais Fácil)

1. **Acesse**: https://vercel.com
2. **Clique**: "Add New Project"
3. **Importe**: Seu repositório Git
4. **Configure Painel Admin**:
   - Root Directory: `painel-admin-salinas`
   - Adicione as variáveis de ambiente (copie do `.env.local`)
   - Deploy!
5. **Configure Vitrine**:
   - Root Directory: `vitrine-salinas`
   - Adicione as variáveis de ambiente (copie do `.env.local`)
   - Deploy!

### Netlify

1. **Acesse**: https://netlify.com
2. **Clique**: "Add new site"
3. **Configure**:
   - Base directory: `painel-admin-salinas` (depois `vitrine-salinas`)
   - Adicione as variáveis de ambiente
   - Deploy!

## ⚠️ NÃO ESQUEÇA!

### Firebase Console

1. **Firestore Rules** (Database > Rules):
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

2. **Auth Domains** (Authentication > Settings > Authorized domains):
   - Adicione: `seu-projeto.vercel.app`
   - Adicione: `seu-projeto.netlify.app`

3. **Índice Firestore** (vai aparecer erro no primeiro acesso):
   - Clique no link do erro para criar automaticamente

## 📋 Variáveis de Ambiente

Copie estas do seu `.env.local` para a plataforma:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## ✅ Teste Após Deploy

1. Acesse o painel admin
2. Faça login
3. Crie um mercado
4. Crie uma oferta
5. Acesse a vitrine
6. Veja a oferta aparecer

## 🆘 Problemas?

- **Erro de domínio não autorizado**: Adicione o domínio no Firebase Auth
- **Erro de índice**: Clique no link do erro para criar
- **Variáveis não encontradas**: Adicione na plataforma e faça redeploy

## 📚 Documentação Completa

- `PRE-DEPLOY-CHECKLIST.md` - Checklist detalhado
- `DEPLOY.md` - Guia completo de deploy
- `SECURITY.md` - Guia de segurança
- `README.md` - Documentação geral

---

**Dica**: Execute `./check-deploy-ready.sh` para verificar se está tudo OK!
