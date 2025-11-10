#!/bin/bash

echo "🔍 Verificando se o projeto está pronto para deploy..."
echo ""

ERRORS=0

# Verifica se os arquivos .env.local existem
echo "✓ Verificando arquivos de ambiente..."
if [ ! -f "painel-admin-salinas/.env.local" ]; then
    echo "  ⚠️  AVISO: painel-admin-salinas/.env.local não encontrado"
    echo "     Configure as credenciais antes do deploy!"
fi

if [ ! -f "vitrine-salinas/.env.local" ]; then
    echo "  ⚠️  AVISO: vitrine-salinas/.env.local não encontrado"
    echo "     Configure as credenciais antes do deploy!"
fi

# Verifica se os .env.example existem
if [ -f "painel-admin-salinas/.env.example" ] && [ -f "vitrine-salinas/.env.example" ]; then
    echo "  ✅ Arquivos .env.example encontrados"
else
    echo "  ❌ Arquivos .env.example não encontrados"
    ERRORS=$((ERRORS + 1))
fi

# Verifica se node_modules existem
echo ""
echo "✓ Verificando dependências..."
if [ -d "painel-admin-salinas/node_modules" ]; then
    echo "  ✅ Dependências do painel admin instaladas"
else
    echo "  ❌ Dependências do painel admin não instaladas"
    echo "     Execute: cd painel-admin-salinas && npm install"
    ERRORS=$((ERRORS + 1))
fi

if [ -d "vitrine-salinas/node_modules" ]; then
    echo "  ✅ Dependências da vitrine instaladas"
else
    echo "  ❌ Dependências da vitrine não instaladas"
    echo "     Execute: cd vitrine-salinas && npm install"
    ERRORS=$((ERRORS + 1))
fi

# Verifica arquivos de configuração
echo ""
echo "✓ Verificando arquivos de configuração..."
if [ -f "painel-admin-salinas/vercel.json" ] && [ -f "painel-admin-salinas/netlify.toml" ]; then
    echo "  ✅ Configurações de deploy do painel admin OK"
else
    echo "  ❌ Configurações de deploy do painel admin não encontradas"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "vitrine-salinas/vercel.json" ] && [ -f "vitrine-salinas/netlify.toml" ]; then
    echo "  ✅ Configurações de deploy da vitrine OK"
else
    echo "  ❌ Configurações de deploy da vitrine não encontradas"
    ERRORS=$((ERRORS + 1))
fi

# Verifica documentação
echo ""
echo "✓ Verificando documentação..."
if [ -f "README.md" ] && [ -f "SECURITY.md" ] && [ -f "DEPLOY.md" ]; then
    echo "  ✅ Documentação completa"
else
    echo "  ⚠️  Documentação incompleta"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo "✅ PROJETO PRONTO PARA DEPLOY!"
    echo ""
    echo "Próximos passos:"
    echo "1. Configure as variáveis de ambiente na plataforma (Vercel/Netlify)"
    echo "2. Configure as regras do Firestore"
    echo "3. Adicione os domínios autorizados no Firebase Auth"
    echo "4. Faça o deploy!"
    echo ""
    echo "Consulte PRE-DEPLOY-CHECKLIST.md para mais detalhes"
else
    echo "❌ PROJETO NÃO ESTÁ PRONTO"
    echo "Corrija os $ERRORS erro(s) acima antes de fazer deploy"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
