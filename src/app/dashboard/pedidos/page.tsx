'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Eye, Package, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Pedido {
  id: number;
  codigo_tiny: string | null;
  numero: string | null;
  data_pedido: string | null;
  cliente_nome: string | null;
  valor_total: number | null;
  situacao: string | null;
  status: string | null;
  estoque_baixado: boolean;
  estoque_baixado_em: string | null;
  loja_id: number | null;
  loja_ref: {
    id: number;
    nome: string | null;
  } | null;
  itens: Array<{
    id: number;
    descricao: string | null;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    produto_id: number | null;
    codigo_produto_tiny: string | null;
  }>;
}

interface Loja {
  id: number;
  nome: string | null;
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  // Filtros
  const [filtros, setFiltros] = useState({
    status: 'all',
    loja_id: '',
    data_inicio: '',
    data_fim: '',
  });
  
  // Paginação
  const [paginacao, setPaginacao] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  });
  
  const { toast } = useToast();

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', paginacao.page.toString());
      params.append('pageSize', paginacao.pageSize.toString());
      
      if (filtros.status !== 'all') {
        params.append('status', filtros.status);
      }
      if (filtros.loja_id) {
        params.append('loja_id', filtros.loja_id);
      }
      if (filtros.data_inicio) {
        params.append('data_inicio', filtros.data_inicio);
      }
      if (filtros.data_fim) {
        params.append('data_fim', filtros.data_fim);
      }

      const response = await fetch(`/api/tiny/pedidos?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setPedidos(data.pedidos || []);
        setPaginacao(prev => ({
          ...prev,
          total: data.meta?.total || 0,
          totalPages: data.meta?.totalPages || 0,
        }));
      } else {
        toast({
          title: "Erro",
          description: "Erro ao carregar pedidos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar pedidos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLojas = async () => {
    try {
      const response = await fetch('/api/lojas');
      if (response.ok) {
        const data = await response.json();
        setLojas(data);
      }
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
    fetchLojas();
  }, [paginacao.page, filtros]);

  const handleProcessarPedido = async (pedidoId: number) => {
    if (!confirm('Tem certeza que deseja processar este pedido? O estoque será descontado.')) {
      return;
    }

    try {
      setProcessingId(pedidoId);
      const response = await fetch(`/api/tiny/pedidos/${pedidoId}/processar`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: data.message || "Pedido processado com sucesso!",
        });
        fetchPedidos();
      } else {
        toast({
          title: "Erro ao processar pedido",
          description: data.message || "Erro desconhecido",
          variant: "destructive",
        });
        
        // Se houver itens sem estoque, mostrar detalhes
        if (data.itens_sem_estoque && data.itens_sem_estoque.length > 0) {
          const itensList = data.itens_sem_estoque.map((item: any) => 
            `${item.descricao}: necessário ${item.quantidade_necessaria}, disponível ${item.total_disponivel}`
          ).join('\n');
          
          toast({
            title: "Itens sem estoque",
            description: itensList,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar pedido",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const openDetailsDialog = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setIsDetailsDialogOpen(true);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pedidos Tiny ERP</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie pedidos sincronizados do Tiny ERP
          </p>
        </div>
        <Button variant="outline" onClick={fetchPedidos} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="filtro-status">Status</Label>
            <Select 
              value={filtros.status} 
              onValueChange={(value) => setFiltros({...filtros, status: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Faturado">Faturado</SelectItem>
                <SelectItem value="processado">Processado</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filtro-loja">Loja</Label>
            <Select 
              value={filtros.loja_id || "all"} 
              onValueChange={(value) => setFiltros({...filtros, loja_id: value === "all" ? "" : value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {lojas.map(loja => (
                  <SelectItem key={loja.id} value={loja.id.toString()}>
                    {loja.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filtro-data-inicio">Data Início</Label>
            <Input 
              id="filtro-data-inicio"
              type="date"
              value={filtros.data_inicio}
              onChange={(e) => setFiltros({...filtros, data_inicio: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="filtro-data-fim">Data Fim</Label>
            <Input 
              id="filtro-data-fim"
              type="date"
              value={filtros.data_fim}
              onChange={(e) => setFiltros({...filtros, data_fim: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Loja</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Carregando pedidos...
                </TableCell>
              </TableRow>
            ) : pedidos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum pedido encontrado
                </TableCell>
              </TableRow>
            ) : (
              pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">
                    {pedido.numero || pedido.codigo_tiny || '-'}
                  </TableCell>
                  <TableCell>{pedido.cliente_nome || '-'}</TableCell>
                  <TableCell>{pedido.loja_ref?.nome || '-'}</TableCell>
                  <TableCell>{formatDate(pedido.data_pedido)}</TableCell>
                  <TableCell>{formatCurrency(pedido.valor_total)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {pedido.situacao || pedido.status || '-'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {pedido.estoque_baixado ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Processado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                        Pendente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetailsDialog(pedido)}
                        title="Ver Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleProcessarPedido(pedido.id)}
                        disabled={pedido.estoque_baixado || processingId === pedido.id}
                        title={pedido.estoque_baixado ? 'Já processado' : 'Processar Pedido'}
                      >
                        {processingId === pedido.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Package className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {paginacao.totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Página {paginacao.page} de {paginacao.totalPages} ({paginacao.total} pedidos)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPaginacao({...paginacao, page: paginacao.page - 1})}
              disabled={paginacao.page === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => setPaginacao({...paginacao, page: paginacao.page + 1})}
              disabled={paginacao.page >= paginacao.totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
            <DialogDescription>
              Informações completas do pedido e seus itens
            </DialogDescription>
          </DialogHeader>
          {selectedPedido && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Número</Label>
                  <p className="font-medium">{selectedPedido.numero || selectedPedido.codigo_tiny || '-'}</p>
                </div>
                <div>
                  <Label>Cliente</Label>
                  <p className="font-medium">{selectedPedido.cliente_nome || '-'}</p>
                </div>
                <div>
                  <Label>Data do Pedido</Label>
                  <p className="font-medium">{formatDate(selectedPedido.data_pedido)}</p>
                </div>
                <div>
                  <Label>Loja</Label>
                  <p className="font-medium">{selectedPedido.loja_ref?.nome || '-'}</p>
                </div>
                <div>
                  <Label>Valor Total</Label>
                  <p className="font-medium">{formatCurrency(selectedPedido.valor_total)}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="font-medium">{selectedPedido.situacao || selectedPedido.status || '-'}</p>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold">Itens do Pedido</Label>
                <div className="mt-2 border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Valor Unitário</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPedido.itens.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            Nenhum item encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        selectedPedido.itens.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.descricao || '-'}</TableCell>
                            <TableCell>{item.quantidade}</TableCell>
                            <TableCell>{formatCurrency(item.valor_unitario)}</TableCell>
                            <TableCell>{formatCurrency(item.valor_total)}</TableCell>
                            <TableCell>
                              {item.produto_id ? (
                                <Badge variant="secondary" className="bg-green-50 text-green-800">
                                  Mapeado
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                                  Não mapeado
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

