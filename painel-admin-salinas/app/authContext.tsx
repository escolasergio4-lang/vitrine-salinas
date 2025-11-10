"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // User é o tipo do usuário
import { auth } from './firebase/config'; // Nosso arquivo de config
import { useRouter } from 'next/navigation';

// 1. Define o "formato" do nosso contexto
type AuthContextType = {
  user: User | null; // O usuário pode ser um Objeto 'User' ou 'null'
  loading: boolean;  // Para sabermos se ainda está "carregando"
};

// 2. Cria o Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Cria o "Provedor" (o componente que vai "envelopar" o app)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 4. O "Vigia" (useEffect)
  // Este código roda uma vez e fica "ouvindo" o Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Quando o status do Firebase muda (login, logout)...
      if (user) {
        // ...se tem um usuário, nós o guardamos
        setUser(user);
      } else {
        // ...se não tem (logout), nós limpamos
        setUser(null);
      }
      // Já sabemos se está logado ou não, então paramos o "loading"
      setLoading(false);
    });

    // Limpa o "ouvinte" quando o componente desmonta
    return () => unsubscribe();
  }, []); // O [] vazio significa "rode apenas uma vez"

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Cria um "Hook" (um atalho) para usarmos o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};