// Tipos compartilhados do projeto

export interface Oferta {
  id: string;
  nomeProduto: string;
  preco: number;
  mercadoInfo: {
    id: string;
    nome: string;
  };
  dataCriacao: Date;
}

export interface Mercado {
  id: string;
  nomeFantasia: string;
  endereco: string;
  whatsapp?: string;
}
