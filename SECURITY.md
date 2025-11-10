# Guia de Segurança

## ⚠️ IMPORTANTE: Credenciais Firebase

### O que NÃO fazer

❌ **NUNCA** commite arquivos `.env.local` no git  
❌ **NUNCA** compartilhe suas credenciais Firebase publicamente  
❌ **NUNCA** exponha suas chaves em código-fonte versionado

### O que fazer

✅ Use arquivos `.env.local` para credenciais (já está no `.gitignore`)  
✅ Use `.env.example` como template sem valores reais  
✅ Configure regras de segurança no Firebase Console  
✅ Rotacione credenciais se foram expostas acidentalmente

## Configuração de Segurança do Firebase

### Firestore Rules (Recomendado)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Mercados: apenas admins autenticados podem escrever
    match /mercados/{mercadoId} {
      allow read: if true; // Público pode ler
      allow write: if request.auth != null; // Apenas autenticados podem escrever
    }
    
    // Ofertas: apenas admins autenticados podem escrever
    match /ofertas/{ofertaId} {
      allow read: if true; // Público pode ler
      allow write: if request.auth != null; // Apenas autenticados podem escrever
    }
  }
}
```

### Firebase Auth

Configure no Firebase Console:
1. Habilite apenas Email/Password como método de autenticação
2. Adicione domínios autorizados
3. Configure políticas de senha forte

## Checklist de Segurança

- [ ] Arquivos `.env.local` não estão no git
- [ ] Regras do Firestore estão configuradas
- [ ] Apenas usuários autorizados têm acesso ao painel admin
- [ ] Firebase Auth está configurado corretamente
- [ ] Domínios de produção estão na whitelist do Firebase

## Em Caso de Exposição de Credenciais

1. Acesse o Firebase Console
2. Vá em Project Settings > Service Accounts
3. Gere novas credenciais
4. Atualize os arquivos `.env.local`
5. Revogue as credenciais antigas
6. Revise o histórico do git e remova commits com credenciais

## Contato

Se você encontrar alguma vulnerabilidade de segurança, por favor, não abra uma issue pública. Entre em contato diretamente com o administrador do projeto.
