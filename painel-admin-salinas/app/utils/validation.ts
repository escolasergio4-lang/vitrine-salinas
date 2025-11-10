// Utilitários de validação

export function validatePrice(price: string): { valid: boolean; error?: string } {
  const numPrice = parseFloat(price);
  
  if (isNaN(numPrice)) {
    return { valid: false, error: 'Preço deve ser um número válido' };
  }
  
  if (numPrice <= 0) {
    return { valid: false, error: 'Preço deve ser maior que zero' };
  }
  
  if (numPrice > 999999) {
    return { valid: false, error: 'Preço muito alto' };
  }
  
  return { valid: true };
}

export function validateProductName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Nome do produto deve ter pelo menos 3 caracteres' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Nome do produto muito longo (máximo 100 caracteres)' };
  }
  
  return { valid: true };
}

export function validateMarketName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Nome do mercado deve ter pelo menos 3 caracteres' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Nome do mercado muito longo (máximo 100 caracteres)' };
  }
  
  return { valid: true };
}

export function validateAddress(address: string): { valid: boolean; error?: string } {
  const trimmed = address.trim();
  
  if (trimmed.length < 5) {
    return { valid: false, error: 'Endereço deve ter pelo menos 5 caracteres' };
  }
  
  if (trimmed.length > 200) {
    return { valid: false, error: 'Endereço muito longo (máximo 200 caracteres)' };
  }
  
  return { valid: true };
}

export function validateWhatsApp(whatsapp: string): { valid: boolean; error?: string } {
  if (!whatsapp) return { valid: true }; // Opcional
  
  const cleaned = whatsapp.replace(/\D/g, '');
  
  if (cleaned.length < 10 || cleaned.length > 11) {
    return { valid: false, error: 'WhatsApp deve ter 10 ou 11 dígitos' };
  }
  
  return { valid: true };
}
