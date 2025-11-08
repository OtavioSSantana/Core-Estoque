import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getEstoque } from '@/app/dashboard/estoque/_data_access/get-estoque';

// Helper para verificar autenticação
async function checkAuth() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }
    return null;
  } catch (error) {
    // Tratamento de erros de conexão com banco de dados
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as { code?: string })?.code;
    
    if (errorCode === 'P1001' || errorMessage.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { message: 'Erro de conexão com o banco de dados. Verifique sua conexão.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { message: 'Erro ao verificar autenticação' },
      { status: 500 }
    );
  }
}

// GET /api/estoque - Listar estoque
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const authError = await checkAuth();
    if (authError) return authError;

    // Buscar estoque
    const result = await getEstoque();
    
    // getEstoque retorna NextResponse, então precisamos extrair o JSON
    if (result instanceof NextResponse) {
      const data = await result.json();
      return NextResponse.json(data, { status: result.status });
    }
    
    return result;
  } catch (error) {
    console.error('Erro na requisição GET /api/estoque:', error);
    
    // Tratamento de erros de conexão com banco de dados
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as { code?: string })?.code;
    
    if (errorCode === 'P1001' || errorMessage.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { message: 'Erro de conexão com o banco de dados. Verifique sua conexão.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { message: 'Falha ao processar requisição' },
      { status: 500 }
    );
  }
}

