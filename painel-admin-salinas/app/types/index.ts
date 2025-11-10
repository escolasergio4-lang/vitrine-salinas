// Tipos compartilhados do projeto

export interface Mercado {
  id: string;
  nomeFantasia: string;
  endereco: string;
  whatsapp?: string;
  adminUid: string;
}

export interface Oferta {
  id: string;
  nomeProduto: string;
  preco: number;
  mercadoInfo: {
    id: string;
    nome: string;
  };
  dataCriacao: Date;
  ativo: boolean;
  adminUid: string;
}

export interface OfertaFormData {
  nomeProduto: string;
  preco: string;
  mercadoId: string;
}

export interface MercadoFormData {
  nomeFantasia: string;
  endereco: string;
  whatsapp: string;
}
