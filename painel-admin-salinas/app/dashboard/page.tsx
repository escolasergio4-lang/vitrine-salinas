"use client";

import { useAuth } from '../authContext'; 
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/config'; 
import { signOut } from 'firebase/auth'; 
import Link from 'next/link'; 

export default function DashboardPage() {
  const { user, loading } = useAuth(); 
  const router = useRouter();

  const handleLogout = async () => {
    // ... (função de logout) ...
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    // ... (tela de loading) ...
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    // ... (segurança) ...
    router.push('/');
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bem-vindo ao Painel, Sérgio!
        </h1>
        <p className="text-lg mb-8">
          Logado com o e-mail: <span className="font-mono text-blue-300">{user.email}</span>
        </p>
        
        {/* Bloco de Navegação ATUALIZADO */}
        <div className="my-12 p-6 bg-gray-800 rounded-lg flex justify-center gap-4">
          <Link 
            href="/dashboard/mercados"
            className="rounded-md bg-gray-600 py-3 px-6 text-lg font-semibold text-white shadow-sm hover:bg-gray-500"
          >
            Gerenciar Mercados
          </Link>
          
          {/* NOVO LINK */}
          <Link 
            href="/dashboard/ofertas"
            className="rounded-md bg-blue-600 py-3 px-6 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Gerenciar Ofertas
          </Link>
        </div>
        
        <button 
          onClick={handleLogout}
          className="rounded-md bg-red-600 py-3 px-6 text-lg font-semibold text-white shadow-sm hover:bg-red-700"
        >
          Sair (Logout)
        </button>
      </div>
    </main>
  );
}