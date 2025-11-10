# Guia de Deploy

## Opções de Deploy

### Vercel (Recomendado)

A Vercel é a plataforma oficial do Next.js e oferece deploy gratuito.

#### Painel Admin

1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório Git
3. Configure o projeto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `painel-admin-salinas`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. Adicione as variáveis de ambiente:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=sua_chave
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_dominio
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
   ```

5. Deploy!

#### Vitrine

Repita o processo acima, mas com:
- **Root Directory**: `vitrine-salinas`

### Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Conecte seu repositório
3. Configure:
   - **Base directory**: `painel-admin-salinas` ou `vitrine-salinas`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

4. Adicione as variáveis de ambiente
5. Deploy!

### Firebase Hosting

```bash
# Instale o Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicialize o projeto
firebase init hosting

# Build do projeto
cd painel-admin-salinas
npm run build

# Deploy
firebase deploy --only hosting
```

## Checklist Pré-Deploy

- [ ] Todas as credenciais estão em variáveis de ambiente
- [ ] Arquivos `.env.local` não estão no repositório
- [ ] Build local funciona sem erros (`npm run build`)
- [ ] Regras do Firestore estão configuradas
- [ ] Firebase Auth está configurado
- [ ] Domínios de produção estão autorizados no Firebase
- [ ] Testes básicos foram realizados

## Pós-Deploy

1. Teste a autenticação
2. Teste criação de mercados
3. Teste criação de ofertas
4. Verifique se a vitrine exibe as ofertas
5. Configure domínio customizado (opcional)
6. Configure SSL/HTTPS (geralmente automático)

## Monitoramento

- Configure alertas no Firebase Console
- Monitore logs de erro
- Configure Analytics (opcional)
- Configure Performance Monitoring (opcional)

## Rollback

Se algo der errado:

### Vercel
- Acesse o dashboard
- Vá em Deployments
- Clique em "..." no deploy anterior
- Selecione "Promote to Production"

### Netlify
- Acesse o dashboard
- Vá em Deploys
- Clique em "Publish deploy" no deploy anterior

## Suporte

Em caso de problemas:
1. Verifique os logs da plataforma
2. Verifique o Firebase Console
3. Revise as variáveis de ambiente
4. Teste localmente primeiro
