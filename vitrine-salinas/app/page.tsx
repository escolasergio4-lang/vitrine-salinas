"use client";

import { useState, useEffect } from 'react';
import { db } from './firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Oferta } from './types';

export default function HomePage() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);

  // A função de busca agora roda dentro do useEffect
  useEffect(() => {
    const getOfertas = async () => {
      try {
        console.log("Iniciando busca (ordenada) no Firestore...");
        
        // 1. Define a consulta
        const ofertasRef = collection(db, "ofertas");
        
        // NOVO: A ORDENAÇÃO (orderBy) ESTÁ DE VOLTA!
        const q = query(ofertasRef, orderBy("dataCriacao", "desc"));

        // 2. Executa a consulta
        const querySnapshot = await getDocs(q); // Usamos 'q'
        console.log(`Encontrados ${querySnapshot.docs.length} documentos.`);

        // 3. Mapeia os resultados
        const ofertasList: Oferta[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Converte o Timestamp do Firebase para um Objeto Date
          const dataCriacao = data.dataCriacao ? data.dataCriacao.toDate() : new Date();

          ofertasList.push({
            id: doc.id,
            nomeProduto: data.nomeProduto,
            preco: data.preco,
            mercadoInfo: {
              id: data.mercadoInfo.id,
              nome: data.mercadoInfo.nome,
            },
            dataCriacao: dataCriacao, // NOVO: dataCriacao incluída
          });
        });
        
        setOfertas(ofertasList); // Salva as ofertas no estado

      } catch (error) { 
        console.error("Erro ao buscar ofertas (Passo 24):", error);
      }
      
      setLoading(false); // Termina o loading
    };

    getOfertas();
    
  }, []); // O [] vazio significa "rode apenas uma vez"

  // Função para formatar o preço para R$
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  };

  // 3. NOVO HTML/JSX (Com Tailwind CSS para "polimento")
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Preço Bom Salinas
          </h1>
          <p className="text-lg text-gray-600">
            As melhores ofertas da cidade, atualizadas para você.
          </p>
        </header>

        {/* Lista de Ofertas */}
        <div className="space-y-4">
          
          {loading ? (
            <p className="text-center text-gray-700 bg-white p-6 rounded-lg shadow">
              Carregando ofertas...
            </p>
          ) : ofertas.length === 0 ? (
            <p className="text-center text-gray-700 bg-white p-6 rounded-lg shadow">
              Nenhuma oferta cadastrada no momento. Volte mais tarde!
            </p>
          ) : (
            // NOVO: Visual de "Card" para cada oferta
            ofertas.map((oferta) => (
              <div 
                key={oferta.id} 
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Informação do Produto */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {oferta.nomeProduto}
                  </h2>
                  <p className="text-md text-gray-600">
                    no <span className="font-bold text-blue-700">{oferta.mercadoInfo.nome}</span>
                  </p>
                </div>
                
                {/* Preço */}
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-600">
                    {formatPrice(oferta.preco)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}