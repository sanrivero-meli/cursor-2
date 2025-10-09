#!/bin/bash

echo "🔧 Instalando Homebrew y Node.js..."
echo ""

# Instalar Homebrew
if ! command -v brew &> /dev/null; then
    echo "📦 Instalando Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew ya está instalado"
fi

# Instalar Node.js
echo ""
echo "📦 Instalando Node.js..."
brew install node

echo ""
echo "✅ ¡Instalación completa!"
echo ""
node --version
npm --version
