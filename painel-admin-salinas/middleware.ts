import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Esta é uma proteção básica no lado do servidor
  // A autenticação real acontece no cliente via Firebase
  
  const { pathname } = request.nextUrl;
  
  // Se está tentando acessar o dashboard
  if (pathname.startsWith('/dashboard')) {
    // Verifica se existe um cookie de sessão do Firebase
    // (O Firebase Auth automaticamente gerencia isso)
    const hasAuthCookie = request.cookies.has('__session');
    
    // Por enquanto, deixamos o AuthContext do cliente fazer a verificação
    // Em produção, você pode implementar Firebase Admin SDK aqui
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
