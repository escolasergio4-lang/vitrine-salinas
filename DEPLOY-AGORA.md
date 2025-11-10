# 🚀 DEPLOY AGORA - Guia Específico para Você

## ✅ Status: TUDO PRONTO!

- ✅ Credenciais configuradas
- ✅ Builds testados e funcionando
- ✅ Código limpo e seguro

## 🎯 Deploy em 10 Minutos

### Opção 1: Vercel (RECOMENDADO - Mais Fácil)

#### Passo 1: Criar Conta/Login
1. Acesse: https://vercel.com
2. Clique em "Sign Up" ou "Login"
3. Use sua conta GitHub/GitLab/Bitbucket

#### Passo 2: Deploy do Painel Admin
1. Clique em **"Add New Project"**
2. Clique em **"Import Git Repository"**
3. Selecione seu repositório
4. Configure:
   - **Project Name**: `preco-bom-salinas-admin`
   - **Framework Preset**: Next.js (já detectado)
   - **Root Directory**: `painel-admin-salinas` ⚠️ IMPORTANTE!
   - **Build Command**: `npm run build` (já preenchido)
   - **Output Directory**: `.next` (já preenchido)

5. **Environment Variables** (clique em "Add"):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyAmfA7FtsY9eH6wFv7sYQekVVhpFTwFkQQ
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = precos-salinas.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = precos-salinas
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = precos-salinas.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 194960227301
   NEXT_PUBLIC_FIREBASE_APP_ID = 1:194960227301:web:a437e83f0bd52a7f344d0c
   ```

6. Clique em **"Deploy"**
7. Aguarde 2-3 minutos
8. Anote a URL: `https://preco-bom-salinas-admin.vercel.app`

#### Passo 3: Deploy da Vitrine
1. Volte ao dashboard da Vercel
2. Clique em **"Add New Project"** novamente
3. Selecione o MESMO repositório
4. Configure:
   - **Project Name**: `preco-bom-salinas-vitrine`
   - **Root Directory**: `vitrine-salinas` ⚠️ IMPORTANTE!
   
5. Adicione as MESMAS variáveis de ambiente

6. Clique em **"Deploy"**
7. Anote a URL: `https://preco-bom-salinas-vitrine.vercel.app`

### Opção 2: Netlify

#### Passo 1: Criar Conta/Login
1. Acesse: https://netlify.com
2. Clique em "Sign Up" ou "Login"

#### Passo 2: Deploy do Painel Admin
1. Clique em **"Add new site"** > **"Import an existing project"**
2. Conecte seu Git provider
3. Selecione seu repositório
4. Configure:
   - **Site name**: `preco-bom-salinas-admin`
   - **Base directory**: `painel-admin-salinas`
   - **Build command**: `npm run build`
   - **Publish directory**: `painel-admin-salinas/.next`

5. Clique em **"Show advanced"** > **"New variable"**
6. Adicione as variáveis de ambiente (mesmas da Vercel)

7. Clique em **"Deploy site"**

#### Passo 3: Deploy da Vitrine
Repita o processo com:
- **Base directory**: `vitrine-salinas`
- **Publish directory**: `vitrine-salinas/.next`

## ⚠️ IMPORTANTE: Configure o Firebase

### 1. Regras do Firestore

1. Acesse: https://console.firebase.google.com
2. Selecione o projeto: **precos-salinas**
3. Vá em **Firestore Database** > **Rules**
4. Cole este código:

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

5. Clique em **"Publish"**

### 2. Domínios Autorizados

1. No Firebase Console, vá em **Authentication** > **Settings**
2. Role até **Authorized domains**
3. Clique em **"Add domain"**
4. Adicione suas URLs da Vercel/Netlify:
   - `preco-bom-salinas-admin.vercel.app`
   - `preco-bom-salinas-vitrine.vercel.app`
   - (ou as URLs do Netlify)

### 3. Índice do Firestore

No primeiro acesso à vitrine, pode aparecer um erro sobre índice faltando.

**Solução**: Clique no link do erro que o Firebase mostra. Ele vai criar o índice automaticamente.

## ✅ Teste Tudo

1. **Acesse o painel admin**: `https://seu-painel.vercel.app`
2. **Faça login** com seu email/senha do Firebase
3. **Crie um mercado** de teste
4. **Crie uma oferta** de teste
5. **Acesse a vitrine**: `https://sua-vitrine.vercel.app`
6. **Veja a oferta** aparecer!

## 🎉 Pronto!

Seus dois sites estão no ar!

- **Painel Admin**: Para você gerenciar
- **Vitrine**: Para o público ver as ofertas

## 📱 Próximos Passos (Opcional)

- Configure domínio customizado (ex: admin.precobom.com.br)
- Adicione mais usuários admin no Firebase Auth
- Customize cores e logo
- Adicione Google Analytics

## 🆘 Problemas?

**Erro: "Firebase: Error (auth/unauthorized-domain)"**
→ Adicione o domínio nos domínios autorizados do Firebase

**Erro: "Missing index"**
→ Clique no link do erro para criar automaticamente

**Build falha**
→ Verifique se adicionou TODAS as variáveis de ambiente

**Não consigo fazer login**
→ Verifique se criou um usuário no Firebase Authentication

---

**Dúvidas?** Consulte os outros arquivos de documentação! 📚
