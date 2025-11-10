"use client";

import { useState } from 'react';
import { useAuth } from '../../authContext'; 
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import { validateMarketName, validateAddress, validateWhatsApp } from '../../utils/validation';
import BackButton from '../../components/BackButton';

export default function MercadosPage() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loadingForm, setLoadingForm] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const handleSaveMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Validações
    const nameValidation = validateMarketName(nome);
    if (!nameValidation.valid) {
      showToast(nameValidation.error!, 'error');
      return;
    }

    const addressValidation = validateAddress(endereco);
    if (!addressValidation.valid) {
      showToast(addressValidation.error!, 'error');
      return;
    }

    const whatsappValidation = validateWhatsApp(whatsapp);
    if (!whatsappValidation.valid) {
      showToast(whatsappValidation.error!, 'error');
      return;
    }

    setLoadingForm(true);

    try {
      // A mágica de salvar no Firestore!
      await addDoc(collection(db, "mercados"), {
        nomeFantasia: nome,
        endereco: endereco,
        whatsapp: whatsapp,
        adminUid: user.uid // Salvamos quem cadastrou
      });

      showToast("Supermercado salvo com sucesso!", 'success');
      
      setNome('');
      setEndereco('');
      setWhatsapp('');

    } catch (error) {
      console.error("Erro ao salvar mercado: ", error);
      showToast("Erro ao salvar. Tente novamente.", 'error');
    }

    setLoadingForm(false);
  };


  // 4. Bouncer / Segurança (igual ao dashboard)
  if (authLoading) {
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
        <h1 className="text-3xl font-bold mb-6">Gerenciar Mercados</h1>
        
        <form 
          onSubmit={handleSaveMarket} 
          className="space-y-4 p-6 bg-gray-800 rounded-lg"
        >
          <h2 className="text-xl font-semibold">Adicionar Novo Mercado</h2>
          
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-300">
              Nome Fantasia
            </label>
            <input
              id="nome" type="text" required value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-300">
              Endereço
            </label>
            <input
              id="endereco" type="text" required value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300">
              WhatsApp (Opcional)
            </label>
            <input
              id="whatsapp" type="text" value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white"
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              disabled={loadingForm}
              className="w-full justify-center rounded-md bg-green-600 py-3 px-4 text-lg font-semibold text-white shadow-sm hover:bg-green-700 disabled:bg-gray-500"
            >
              {loadingForm ? "Salvando..." : "Salvar Mercado"}
            </button>
          </div>
        </form>
      </div>
    </main>
    </>
  );
}