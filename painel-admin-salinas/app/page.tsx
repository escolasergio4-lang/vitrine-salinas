"use client"; 

import { useState, useEffect } from 'react'; // Adicionamos useEffect
import type { FormEvent } from 'react';
import { auth } from './firebase/config'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'; // NOVO: Para redirecionar
import { useAuth } from './authContext'; // NOVO: Nosso vigia

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  // NOVO: Pegando o estado do vigia
  const { user, loading } = useAuth();
  const router = useRouter();

  // NOVO: "Segurança" que verifica se o usuário JÁ está logado
  useEffect(() => {
    if (!loading && user) {
      // Se não está carregando E existe um usuário, vá pro dashboard
      router.push('/dashboard');
    }
  }, [user, loading, router]); // Rode isso quando 'user' ou 'loading' mudarem

  const handleLogin = async (evento: FormEvent) => {
    evento.preventDefault(); 
    setErro(null); 

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      // NOVO: SUCESSO! Em vez de 'alert', redirecionamos.
      router.push('/dashboard');
      
    } catch (error: any) { 
      console.error("Erro no login:", error.code);
      
      // NOVO: Usando o 'catch' completo
      switch (error.code) {
        case 'auth/user-not-found':
          setErro("Usuário não encontrado. Verifique o e-mail.");
          break;
        case 'auth/wrong-password':
          setErro("Senha incorreta. Tente novamente.");
          break;
        case 'auth/invalid-credential':
          setErro("Credenciais inválidas. Verifique o e-mail e a senha.");
          break;
        case 'auth/invalid-email':
          setErro("O e-mail digitado não é válido.");
          break;
        default:
          setErro("Ocorreu um erro ao tentar fazer login.");
      }
    }
  };

  // NOVO: Não mostrar o login se estiver carregando ou se já estiver logado
  if (loading || user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Carregando...</p>
      </main>
    );
  }

  // Se não está carregando E não tem usuário, mostre o login
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">
          Painel Admin
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* ... (O restante do <form> é exatamente igual ao anterior) ... */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              id="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-300">Senha</label>
            <input
              id="senha" type="password" required value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>
          {erro && (
            <div className="rounded-md bg-red-900 p-3 text-center text-sm font-medium text-red-100">
              {erro}
            </div>
          )}
          <div>
            <button 
              type="submit" 
              className="w-full justify-center rounded-md bg-blue-600 py-3 px-4 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}