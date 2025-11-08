'use client'

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
// actions dropdown removido
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Package, Plus, Minus } from 'lucide-react';
import { 
  EstoqueItem
} from './_data_access/get-estoque';
import { registrarSaidaEstoque, transferirEstoque } from './_data_access/saida-estoque';
import { updateEstoque } from './_data_access/update-estoque';
import { useToast } from '@/hooks/use-toast';

// Paliativo: Hook de autenticação inline
const useAuth = () => ({
  user: { storeId: 'store1', name: 'Admin' },
  isAdmin: true
});

// Paliativo: Componente StatusBadge inline (removido - não usado)

// Paliativo: Imagens placeholder (removido - não usado)

export default function Estoque() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [stockItems, setStockItems] = useState<EstoqueItem[]>([]);
  const [, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [stores, setStores] = useState<{id: string; nome: string}[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [moveSelectedStore, setMoveSelectedStore] = useState('');
  const [itemsToMove, setItemsToMove] = useState<EstoqueItem[]>([]);
  const [quantity, setQuantity] = useState('1');
  const [tiposMovimento, setTiposMovimento] = useState<{ chave: number; descricao: string }[]>([]);
  const [selectedTipoMovimento, setSelectedTipoMovimento] = useState<string>('');
  const [ajusteDirecao, setAjusteDirecao] = useState<'positivo' | 'negativo'>('positivo');
  const [selectedLojaMovimento, setSelectedLojaMovimento] = useState<string>('');
  
  // Estados para dialogs de entrada e saída
  const [isEntradaDialogOpen, setIsEntradaDialogOpen] = useState(false);
  const [isSaidaDialogOpen, setIsSaidaDialogOpen] = useState(false);
  const [entradaProdutoId, setEntradaProdutoId] = useState<number | null>(null);
  const [saidaProdutoId, setSaidaProdutoId] = useState<number | null>(null);
  const [entradaQuantidade, setEntradaQuantidade] = useState('1');
  const [saidaQuantidade, setSaidaQuantidade] = useState('1');
  const [entradaLojaId, setEntradaLojaId] = useState<string>('');
  const [saidaLojaId, setSaidaLojaId] = useState<string>('');
  const [entradaTipoMovimento, setEntradaTipoMovimento] = useState<string>('1');
  const [saidaTipoMovimento, setSaidaTipoMovimento] = useState<string>('2');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch stock data using the API route
  const fetchStockData = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('paginated', 'true');
      params.set('page', String(pageNumber));
      params.set('pageSize', String(pageSize));
      if (searchTerm) params.set('search', searchTerm);
      if (selectedStatus !== 'all') params.set('status', selectedStatus);
      if (selectedStore !== 'all') params.set('lojaId', selectedStore);
      const response = await fetch(`/api/estoque?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro na API de estoque:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        
        // Mensagem específica para erro de conexão com banco
        if (response.status === 503 || errorData.message?.includes('banco de dados')) {
          throw new Error('Erro de conexão com o banco de dados. Verifique sua conexão.');
        }
        
        throw new Error(errorData.message || `Erro ao carregar estoque (${response.status})`);
      }
      
      const data = await response.json();
      if (Array.isArray(data)) {
        // fallback para formato antigo
        setStockItems(data);
        setTotalPages(1);
      } else {
        setStockItems(data.items || []);
        setTotalPages(data.meta?.totalPages || 1);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do estoque:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os itens do estoque',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, selectedStatus, selectedStore, searchTerm, toast]);

  useEffect(() => {
    fetchStockData();
  }, [isAdmin, pageNumber, pageSize, selectedStatus, selectedStore, fetchStockData]);

  useEffect(() => {
    // Carrega lojas da API dedicada
    (async () => {
      try {
        const resp = await fetch('/api/lojas');
        if (resp.ok) {
          const lojas = await resp.json();
          setStores(lojas.map((l: { id: number; nome: string | null }) => ({ id: String(l.id), nome: l.nome || `Loja ${l.id}` })));
        }
      } catch {
        // fallback silencioso
      }
    })();
    // Carrega tipos de movimento
    (async () => {
      try {
        const resp = await fetch('/api/estoque/tipos-movimento');
        if (resp.ok) {
          const tipos = await resp.json();
          setTiposMovimento(Array.isArray(tipos) ? tipos : []);
        }
      } catch {
        // silencioso
      }
    })();
  }, []);

  // Handle selling an item using registrarSaidaEstoque (removido - não usado)
  /*
  const handleSellItem = async (item: EstoqueItem) => {
    try {
      const result = await registrarSaidaEstoque({
        produto_id: item.id,
        quantidade: 1,
        motivo: 'Venda',
        tipo_saida: 'venda'
      });

      // Atualiza estado com base no retorno padronizado
      setStockItems(prevItems => 
        prevItems.map(i => i.id === item.id ? { ...i, ...result?.produto_atualizado } : i)
      );
      
      toast({
        title: 'Sucesso',
        description: 'Venda registrada com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Não foi possível registrar a venda.',
        variant: 'destructive',
      });
    }
  };
  */

  // Handle moving an item using updateEstoque (removido - não usado)
  /*
  const handleMoveItem = async (itemId: number, newStoreId: string) => {
    try {
      const updatedItem = await updateEstoque({
        produto_id: itemId,
        loja_id: parseInt(newStoreId)
      });

      setStockItems(prevItems => 
        prevItems.map(i => i.id === itemId ? { ...i, ...updatedItem } : i)
      );
      
      toast({
        title: 'Sucesso',
        description: 'Item movido com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao mover item:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Não foi possível mover o item.',
        variant: 'destructive',
      });
    }
  };
  */

  // Handle deleting an item (removido - não usado)
  /*
  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('Tem certeza que deseja remover este item do estoque?')) return;
    
    try {
      const response = await fetch(`/api/estoque/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao remover item');
      }
      
      // Update local state
      setStockItems(prevItems => prevItems.filter(item => item.id !== itemId));
      
      toast({
        title: 'Sucesso',
        description: 'Item removido com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Não foi possível remover o item.',
        variant: 'destructive',
      });
    }
  };
  */

  // Filtrar itens baseado nas permissões e filtros
  const filteredItems = stockItems.filter(item => {
    // Filtro de permissão
    if (!isAdmin && user?.storeId && String(item.loja_id ?? '') !== user.storeId) {
      return false;
    }

    // Filtro de loja
    if (selectedStore !== 'all' && String(item.loja_id ?? '') !== selectedStore) {
      return false;
    }

    // Filtro de status
    if (selectedStatus !== 'all' && item.status_estoque !== selectedStatus) {
      return false;
    }

    // Filtro de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        (item.barcode?.toLowerCase() || '').includes(search) ||
        (item.produto?.nome?.toLowerCase() || '').includes(search) ||
        (item.produto?.sku?.toLowerCase() || '').includes(search) ||
        item.codigo.toLowerCase().includes(search) ||
        item.descricao.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => `${item.id}-${item.loja_id ?? 'global'}`));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemKey: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemKey]);
    } else {
      setSelectedItems(selectedItems.filter(key => key !== itemKey));
    }
  };

  const availableStores = isAdmin 
    ? stores 
    : stores.filter(store => store.id === user?.storeId);

  // Handle opening the move dialog
  const handleOpenMoveDialog = () => {
    if (selectedItems.length === 0) return;
    
    const selectedItemsData = stockItems.filter(item => 
      selectedItems.includes(`${item.id}-${item.loja_id ?? 'global'}`)
    );
    
    setItemsToMove(selectedItemsData);
    setIsMoveDialogOpen(true);
  };

  // Executa a ação conforme o tipo de movimento selecionado
  const handleConfirmMovement = async () => {
    try {
      if (itemsToMove.length === 0) return;
      const qtd = parseInt(quantity || '0');
      if (!qtd || qtd <= 0) {
        toast({ title: 'Erro', description: 'Quantidade inválida', variant: 'destructive' });
        return;
      }

      // Transferência entre lojas usando novo endpoint de transferências
      if (selectedTipoMovimento === 'transfer_between_stores') {
        if (!moveSelectedStore) {
          toast({ title: 'Erro', description: 'Selecione a loja de destino', variant: 'destructive' });
          return;
        }
        const lojaDestino = parseInt(moveSelectedStore);
        // Para itens sem loja definida, usar loja 1 como padrão
        const invalidSameStore = itemsToMove.filter(item => {
          const origem = item.loja_id || 1; // fallback para loja 1
          return Number(origem) === lojaDestino;
        });
        if (invalidSameStore.length > 0) {
          toast({ title: 'Erro', description: 'Origem e destino não podem ser a mesma loja.', variant: 'destructive' });
          return;
        }
        // Valida saldo suficiente na origem para cada item (não permitir estoque negativo)
        // Transferência entre lojas só pode sair do "estoque" (não do mostruário)
        const insuficientes = itemsToMove.filter(item => (item.quantidade_estoque ?? 0) < qtd);
        if (insuficientes.length > 0) {
          toast({ title: 'Erro', description: 'Quantidade solicitada excede o disponível/estoque na origem.', variant: 'destructive' });
          return;
        }
        await Promise.all(
          itemsToMove.map(item => updateEstoque({
            produto_id: item.id,
            tipo_movimentacao: 'transfer_between_stores',
            quantidade: qtd,
            loja_origem: Number(item.loja_id) || 1, // fallback para loja 1 se não definida
            loja_destino: lojaDestino,
          }))
        );
      } else {
        const tipoChave = parseInt(selectedTipoMovimento || '0');
        if (!tipoChave) {
          toast({ title: 'Erro', description: 'Selecione o tipo de movimentação', variant: 'destructive' });
          return;
        }

        // Valida se loja foi selecionada para movimentações
        if (!selectedLojaMovimento) {
          toast({ title: 'Erro', description: 'Selecione uma loja para a movimentação', variant: 'destructive' });
          return;
        }

        // Mapear tipos
        const executeForItem = async (item: EstoqueItem) => {
          if (tipoChave === 1 || tipoChave === 5 || (tipoChave === 7 && ajusteDirecao === 'positivo')) {
            // Entradas: Entrada, Devolução de Cliente, Ajuste positivo
            const resp = await fetch('/api/estoque/movimentacoes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                produto_id: item.id,
                quantidade: qtd,
                loja_id: parseInt(selectedLojaMovimento), // usar loja selecionada
                tipo_movimento: tipoChave,
              }),
            });
            if (!resp.ok) throw new Error((await resp.json().catch(() => ({}))).message || 'Falha na entrada');
            return resp.json();
          }

          if (tipoChave === 2 || tipoChave === 6 || tipoChave === 8 || (tipoChave === 7 && ajusteDirecao === 'negativo')) {
            // Saídas: Saída, Devolução ao Fornecedor, Perda/Avaria, Ajuste negativo
            return registrarSaidaEstoque({
              produto_id: item.id,
              quantidade: qtd,
              motivo: tiposMovimento.find(t => t.chave === tipoChave)?.descricao || 'Saída',
              tipo_saida: 'outros',
              loja_id: parseInt(selectedLojaMovimento), // usar loja selecionada
            });
          }

          if (tipoChave === 3) {
            // Enviar para Mostruário
            return transferirEstoque({ 
              produto_id: item.id, 
              quantidade: qtd, 
              tipo_transferencia: 'estoque_para_mostruario',
              loja_id: parseInt(selectedLojaMovimento)
            });
          }
          if (tipoChave === 4) {
            // Retornar do Mostruário
            return transferirEstoque({ 
              produto_id: item.id, 
              quantidade: qtd, 
              tipo_transferencia: 'mostruario_para_estoque',
              loja_id: parseInt(selectedLojaMovimento)
            });
          }

          throw new Error('Tipo de movimento não suportado');
        };

        await Promise.all(itemsToMove.map(executeForItem));
      }

      await fetchStockData();
      setIsMoveDialogOpen(false);
      setSelectedItems([]);
      setMoveSelectedStore('');
      setQuantity('1');
      setSelectedTipoMovimento('');
      setAjusteDirecao('positivo');
      setSelectedLojaMovimento('');
      toast({ title: 'Sucesso', description: 'Operação realizada com sucesso!' });
    } catch (error) {
      console.error('Erro na movimentação:', error);
      toast({ title: 'Erro', description: error instanceof Error ? error.message : 'Falha na operação', variant: 'destructive' });
    }
  };

  const isValidMovement = () => {
    if (selectedTipoMovimento === 'transfer_between_stores') {
      return Boolean(moveSelectedStore) && Boolean(quantity) && parseInt(quantity) > 0;
    }
    return Boolean(selectedTipoMovimento) && Boolean(quantity) && parseInt(quantity) > 0 && Boolean(selectedLojaMovimento);
  };

  const getButtonText = () => {
    if (selectedTipoMovimento === 'transfer_between_stores') return 'Transferir';
    const tipo = tiposMovimento.find(t => String(t.chave) === selectedTipoMovimento)?.descricao;
    return tipo ? `Confirmar: ${tipo}` : 'Confirmar';
  };

  // Função para abrir dialog de entrada
  const handleOpenEntradaDialog = () => {
    if (selectedItems.length === 0) {
      toast({ 
        title: 'Atenção', 
        description: 'Selecione pelo menos um produto na tabela', 
        variant: 'destructive' 
      });
      return;
    }

    // Pega o primeiro item selecionado
    const item = stockItems.find(i => `${i.id}-${i.loja_id ?? 'global'}` === selectedItems[0]);
    if (item) {
      setEntradaProdutoId(item.id);
      if (item.loja_id) {
        setEntradaLojaId(String(item.loja_id));
      }
      
      // Se houver múltiplos itens selecionados, avisa
      if (selectedItems.length > 1) {
        toast({ 
          title: 'Atenção', 
          description: `Múltiplos itens selecionados. Processando apenas: ${item.descricao || item.codigo}`, 
        });
      }
    }
    setIsEntradaDialogOpen(true);
  };

  // Função para abrir dialog de saída
  const handleOpenSaidaDialog = () => {
    if (selectedItems.length === 0) {
      toast({ 
        title: 'Atenção', 
        description: 'Selecione pelo menos um produto na tabela', 
        variant: 'destructive' 
      });
      return;
    }

    // Pega o primeiro item selecionado
    const item = stockItems.find(i => `${i.id}-${i.loja_id ?? 'global'}` === selectedItems[0]);
    if (item) {
      setSaidaProdutoId(item.id);
      if (item.loja_id) {
        setSaidaLojaId(String(item.loja_id));
      }
      
      // Se houver múltiplos itens selecionados, avisa
      if (selectedItems.length > 1) {
        toast({ 
          title: 'Atenção', 
          description: `Múltiplos itens selecionados. Processando apenas: ${item.descricao || item.codigo}`, 
        });
      }
    }
    setIsSaidaDialogOpen(true);
  };

  // Função para submeter entrada
  const handleSubmitEntrada = async () => {
    if (!entradaProdutoId || !entradaLojaId || !entradaQuantidade) {
      toast({ title: 'Erro', description: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
      return;
    }

    const qtd = parseInt(entradaQuantidade);
    if (!qtd || qtd <= 0) {
      toast({ title: 'Erro', description: 'Quantidade deve ser maior que zero', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/estoque/movimentacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: entradaProdutoId,
          quantidade: qtd,
          loja_id: parseInt(entradaLojaId),
          tipo_movimento: parseInt(entradaTipoMovimento),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao registrar entrada');
      }

      await fetchStockData();
      setIsEntradaDialogOpen(false);
      setEntradaProdutoId(null);
      setEntradaQuantidade('1');
      setEntradaLojaId('');
      setEntradaTipoMovimento('1');
      toast({ title: 'Sucesso', description: 'Entrada de estoque registrada com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
      toast({ 
        title: 'Erro', 
        description: error instanceof Error ? error.message : 'Falha ao registrar entrada', 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para submeter saída
  const handleSubmitSaida = async () => {
    if (!saidaProdutoId || !saidaLojaId || !saidaQuantidade) {
      toast({ title: 'Erro', description: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
      return;
    }

    const qtd = parseInt(saidaQuantidade);
    if (!qtd || qtd <= 0) {
      toast({ title: 'Erro', description: 'Quantidade deve ser maior que zero', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/estoque/saidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto_id: saidaProdutoId,
          quantidade: qtd,
          loja_id: parseInt(saidaLojaId),
          tipo_movimento: parseInt(saidaTipoMovimento),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao registrar saída');
      }

      await fetchStockData();
      setIsSaidaDialogOpen(false);
      setSaidaProdutoId(null);
      setSaidaQuantidade('1');
      setSaidaLojaId('');
      setSaidaTipoMovimento('2');
      toast({ title: 'Sucesso', description: 'Saída de estoque registrada com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar saída:', error);
      toast({ 
        title: 'Erro', 
        description: error instanceof Error ? error.message : 'Falha ao registrar saída', 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestão de Estoque</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie individualmente cada item do seu estoque
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-card rounded-lg border border-border p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filtros */}
          <div className="flex flex-1 flex-wrap gap-3">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Local" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Locais</SelectItem>
                {availableStores.map(store => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="baixo">Estoque Baixo</SelectItem>
              <SelectItem value="normal">Em Estoque</SelectItem>
              <SelectItem value="alto">Estoque Alto</SelectItem>
              </SelectContent>
            </Select> */}

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por ID, SKU ou nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Ações: Entrada, Saída e Mover estoque */}
          <div className="flex gap-2">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={selectedItems.length === 0}
              onClick={handleOpenEntradaDialog}
            >
              <Plus className="w-4 h-4 mr-2" />
              Entrada de Estoque ({selectedItems.length})
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={selectedItems.length === 0}
              onClick={handleOpenSaidaDialog}
            >
              <Minus className="w-4 h-4 mr-2" />
              Saída de Estoque ({selectedItems.length})
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              disabled={selectedItems.length === 0}
              onClick={handleOpenMoveDialog}
            >
              <Package className="w-4 h-4 mr-2" />
              Outros Movimentos ({selectedItems.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                />
              </TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>ID do Item</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Preço de Venda</TableHead>
              <TableHead>Qtd. Estoque</TableHead>
              <TableHead>Qtd. Mostruário</TableHead>
              <TableHead>Qtd. Disponível</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Nenhum item encontrado com os filtros aplicados
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={`${item.id}-${item.loja_id ?? 'global'}`} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(`${item.id}-${item.loja_id ?? 'global'}`)}
                      onCheckedChange={(checked) => handleSelectItem(`${item.id}-${item.loja_id ?? 'global'}`, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-sm">{item.produto?.nome || item.descricao}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.produto?.sku ? `SKU: ${item.produto.sku}` : `Código: ${item.codigo}`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {item.barcode || item.codigo}
                    </code>
                  </TableCell>
                  <TableCell>{item.loja?.nome || `Loja ${item.loja_id}`}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">
                        R$ {typeof item.preco_venda === 'number' ? 
                            item.preco_venda.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 
                            parseFloat(item.preco_venda || '0').toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      {item.notas && (
                        <p className="text-xs text-muted-foreground">{item.notas}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.quantidade_estoque ?? 0}
                  </TableCell>
                  <TableCell>
                    {item.quantidade_mostruario ?? 0}
                  </TableCell>
                  <TableCell>
                    {(item.quantidade_estoque ?? 0) + (item.quantidade_mostruario ?? 0)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>
          Mostrando {filteredItems.length} de {stockItems.length} itens
        </span>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          >
            Anterior
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled={pageNumber >= totalPages}
            onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
          >
            Próximo
          </Button>
        </div>
      </div>

      {/* Move Stock Dialog */}
      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Movimentação de Estoque</DialogTitle>
            <DialogDescription>
              {itemsToMove.length > 1 
                ? `Gerenciar ${itemsToMove.length} itens selecionados`
                : 'Gerenciar item do estoque'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Tipo de Movimentação</Label>
                <Select value={selectedTipoMovimento} onValueChange={setSelectedTipoMovimento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* opção para transferência entre lojas (fora da tabela tipo_movimento) */}
                    <SelectItem value="transfer_between_stores">Transferência entre Lojas</SelectItem>
                    {tiposMovimento.map(tm => (
                      <SelectItem key={tm.chave} value={String(tm.chave)}>
                        {tm.descricao || `Tipo ${tm.chave}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedTipoMovimento === 'transfer_between_stores' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="store">Loja de Destino</Label>
                  <Select 
                    value={moveSelectedStore} 
                    onValueChange={setMoveSelectedStore}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma loja" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores
                        .filter(store => 
                          !itemsToMove.some(item => String(item.loja_id ?? '') === store.id)
                        )
                        .map(store => (
                          <SelectItem key={store.id} value={store.id}>
                            {store.nome}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantidade a transferir"
                  />
                </div>
              </div>
            )}

            {selectedTipoMovimento !== '' && selectedTipoMovimento !== 'transfer_between_stores' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loja-movimento">Loja</Label>
                  <Select value={selectedLojaMovimento} onValueChange={setSelectedLojaMovimento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a loja" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map(store => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">
                    Quantidade
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantidade"
                  />
                </div>
                {selectedTipoMovimento === '7' && (
                  <div>
                    <Label>Direção do Ajuste</Label>
                    <Select value={ajusteDirecao} onValueChange={(v) => setAjusteDirecao(v as 'positivo' | 'negativo')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positivo">Ajuste Positivo</SelectItem>
                        <SelectItem value="negativo">Ajuste Negativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <div className="border rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">
                {itemsToMove.length > 1 ? 'Itens selecionados:' : 'Item selecionado:'}
              </h4>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {itemsToMove.map(item => (
                  <li key={`${item.id}-${item.loja_id ?? 'global'}`} className="text-sm flex justify-between">
                    <span>• {item.produto?.nome || item.descricao}</span>
                    <span className="text-muted-foreground ml-4">
                      Estoque: {item.quantidade_estoque} | Mostruário: {item.quantidade_mostruario}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsMoveDialogOpen(false);
                setSelectedTipoMovimento('');
                setAjusteDirecao('positivo');
                setQuantity('1');
                setSelectedLojaMovimento('');
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmMovement}
              disabled={!isValidMovement()}
            >
              {getButtonText()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Entrada de Estoque */}
      <Dialog open={isEntradaDialogOpen} onOpenChange={setIsEntradaDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Entrada de Estoque</DialogTitle>
            <DialogDescription>
              Registre uma entrada de estoque para o produto selecionado
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="entrada-produto">Produto Selecionado</Label>
              <Input
                id="entrada-produto"
                value={entradaProdutoId ? (stockItems.find(i => i.id === entradaProdutoId)?.descricao || stockItems.find(i => i.id === entradaProdutoId)?.codigo || 'Produto não encontrado') : ''}
                disabled
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="entrada-loja">Loja *</Label>
              <Select 
                value={entradaLojaId} 
                onValueChange={setEntradaLojaId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a loja" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map(store => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="entrada-tipo">Tipo de Movimento</Label>
              <Select 
                value={entradaTipoMovimento} 
                onValueChange={setEntradaTipoMovimento}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposMovimento
                    .filter(t => t.chave === 1 || t.chave === 5)
                    .map(tipo => (
                      <SelectItem key={tipo.chave} value={String(tipo.chave)}>
                        {tipo.descricao}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="entrada-quantidade">Quantidade *</Label>
              <Input
                id="entrada-quantidade"
                type="number"
                min="1"
                value={entradaQuantidade}
                onChange={(e) => setEntradaQuantidade(e.target.value)}
                placeholder="Quantidade"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEntradaDialogOpen(false);
                setEntradaProdutoId(null);
                setEntradaQuantidade('1');
                setEntradaLojaId('');
                setEntradaTipoMovimento('1');
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitEntrada}
              disabled={!entradaProdutoId || !entradaLojaId || !entradaQuantidade || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Entrada'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Saída de Estoque */}
      <Dialog open={isSaidaDialogOpen} onOpenChange={setIsSaidaDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Saída de Estoque</DialogTitle>
            <DialogDescription>
              Registre uma saída de estoque para o produto selecionado
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="saida-produto">Produto Selecionado</Label>
              <Input
                id="saida-produto"
                value={saidaProdutoId ? (stockItems.find(i => i.id === saidaProdutoId)?.descricao || stockItems.find(i => i.id === saidaProdutoId)?.codigo || 'Produto não encontrado') : ''}
                disabled
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="saida-loja">Loja *</Label>
              <Select 
                value={saidaLojaId} 
                onValueChange={setSaidaLojaId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a loja" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map(store => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="saida-tipo">Tipo de Movimento</Label>
              <Select 
                value={saidaTipoMovimento} 
                onValueChange={setSaidaTipoMovimento}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposMovimento
                    .filter(t => t.chave === 2 || t.chave === 6 || t.chave === 8)
                    .map(tipo => (
                      <SelectItem key={tipo.chave} value={String(tipo.chave)}>
                        {tipo.descricao}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="saida-quantidade">Quantidade *</Label>
              <Input
                id="saida-quantidade"
                type="number"
                min="1"
                value={saidaQuantidade}
                onChange={(e) => setSaidaQuantidade(e.target.value)}
                placeholder="Quantidade"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSaidaDialogOpen(false);
                setSaidaProdutoId(null);
                setSaidaQuantidade('1');
                setSaidaLojaId('');
                setSaidaTipoMovimento('2');
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitSaida}
              disabled={!saidaProdutoId || !saidaLojaId || !saidaQuantidade || isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Saída'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}