"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../authContext';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import type { Mercado } from '../../types';
import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import { validatePrice, validateProductName } from '../../utils/validation';
import BackButton from '../../components/BackButton';

interface MercadoSimples {
  id: string;
  nomeFantasia: string;
}

export default function OfertasPage() {
  const [mercados, setMercados] = useState<MercadoSimples[]>([]);
  const [loadingMercados, setLoadingMercados] = useState(true);
  const [mercadoId, setMercadoId] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  // NOVO: Função para BUSCAR os mercados no Firestore
  useEffect(() => {
    // Só busca se o usuário estiver logado
    if (user) {
      const fetchMercados = async () => {
        try {
          // 1. Pega os dados da coleção 'mercados'
          const querySnapshot = await getDocs(collection(db, "mercados"));
          
          // 2. Mapeia os resultados
          const mercadosList = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia,
          }));
          
          setMercados(mercadosList);

        } catch (error) {
          console.error("Erro ao buscar mercados: ", error);
          showToast("Erro ao carregar a lista de mercados", 'error');
        }
        setLoadingMercados(false);
      };

      fetchMercados();
    }
  }, [user]); // Rode isso assim que 'user' for confirmado

  // NOVO: Função para SALVAR a oferta
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !mercadoId) {
      showToast("Por favor, selecione um mercado", 'error');
      return;
    }

    // Validações
    const productValidation = validateProductName(nomeProduto);
    if (!productValidation.valid) {
      showToast(productValidation.error!, 'error');
      return;
    }

    const priceValidation = validatePrice(preco);
    if (!priceValidation.valid) {
      showToast(priceValidation.error!, 'error');
      return;
    }

    setLoadingForm(true);

    try {
      // 1. Pega os dados do mercado selecionado
      const mercadoSelecionado = mercados.find(m => m.id === mercadoId);
      if (!mercadoSelecionado) return;

      // 2. Salva na coleção 'ofertas'
      await addDoc(collection(db, "ofertas"), {
        nomeProduto: nomeProduto,
        preco: parseFloat(preco), // Salva como número
        
        // Dados "desnormalizados" para facilitar a busca no app 'Vitrine'
        mercadoInfo: {
          id: mercadoId,
          nome: mercadoSelecionado.nomeFantasia,
        },
        
        dataCriacao: new Date(), // Salva a data de hoje
        ativo: true,
        adminUid: user.uid,
      });

      showToast("Oferta salva com sucesso!", 'success');

      setNomeProduto('');
      setPreco('');

    } catch (error) {
      console.error("Erro ao salvar oferta: ", error);
      showToast("Erro ao salvar a oferta. Tente novamente.", 'error');
    }
    setLoadingForm(false);
  };

  // --- Bouncer / Segurança (igual aos outros) ---
  if (authLoading || loadingMercados) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Carregando...</p>
      </main>
    );
  }
  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <>
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6">Gerenciar Ofertas</h1>
        
        <form 
          onSubmit={handleSaveOffer} 
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-xl font-semibold">Adicionar Nova Oferta</h2>
          
          {/* 1. SELETOR DE MERCADO */}
          <div>
            <label htmlFor="mercado" className="block text-sm font-medium text-gray-300">
              Selecione o Mercado
            </label>
            <select
              id="mercado"
              value={mercadoId}
              onChange={(e) => setMercadoId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white"
            >
              <option value="">-- Escolha um mercado --</option>
              {mercados.map((mercado) => (
                <option key={mercado.id} value={mercado.id}>
                  {mercado.nomeFantasia}
                </option>
              ))}
            </select>
          </div>

          {/* 2. NOME DO PRODUTO */}
          <div>
            <label htmlFor="nomeProduto" className="block text-sm font-medium text-gray-300">
              Nome do Produto (ex: Arroz Tio João 1kg)
            </label>
            <input
              id="nomeProduto" type="text" required value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white"
            />
          </div>
          
          {/* 3. PREÇO */}
          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-300">
              Preço (ex: 19.90)
            </label>
            <input
              id="preco" type="number" step="0.01" required value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white"
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              disabled={loadingForm || !mercadoId}
              className="w-full justify-center rounded-md bg-green-600 py-3 px-4 text-lg font-semibold text-white shadow-sm hover:bg-green-700 disabled:bg-gray-500"
            >
              {loadingForm ? "Salvando..." : "Salvar Oferta"}
            </button>
          </div>
        </form>
      </div>
    </main>
    </>
  );
}