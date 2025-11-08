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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

// Tipo que corresponde aos dados da API
type Produto = {
  id: number;
  codigo: string;
  descricao: string;
  fornecedor: string;
  preco_venda: string; // API retorna como string
  quantidade_mostruario: number;
  quantidade_estoque: number;
  quantidade_disponivel: number;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Produto | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    fornecedor: '',
    preco_venda: ''
  });

  // Buscar produtos da API
  useEffect(() => {
    async function fetchProdutos() {
      setLoading(true);
      setErro(null);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await res.json();
        setProdutos(data);
      } catch (e: unknown) {
        setErro(e instanceof Error ? e.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  // Função para atualizar dados do formulário
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para limpar o formulário
  const resetForm = () => {
    setFormData({
      codigo: '',
      descricao: '',
      fornecedor: '',
      preco_venda: ''
    });
  };

  // Função para adicionar produto
  const handleAddProduct = async () => {
    setIsSubmitting(true);
    setErro(null);

    try {
      // Validação básica
      if (!formData.codigo || !formData.descricao || !formData.fornecedor || !formData.preco_venda) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      // Faz a requisição POST para a API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar produto');
      }

      // Adiciona o novo produto à lista local
      setProdutos(prev => [...prev, data]);
      
      // Limpa o formulário e fecha o modal
      resetForm();
      setIsDialogOpen(false);
      
      // Mostra mensagem de sucesso (opcional)
      alert('Produto adicionado com sucesso!');

    } catch (error: unknown) {
      setErro(error instanceof Error ? error.message : 'Erro ao adicionar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para abrir modal de edição
  const handleEditProduct = (produto: Produto) => {
    setEditingProduct(produto);
    setFormData({
      codigo: produto.codigo,
      descricao: produto.descricao,
      fornecedor: produto.fornecedor,
      preco_venda: produto.preco_venda
    });
    setIsDialogOpen(true);
  };

  // Função para editar produto
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    setIsSubmitting(true);
    setErro(null);

    try {
      // Validação básica
      if (!formData.codigo || !formData.descricao || !formData.fornecedor || !formData.preco_venda) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      // Faz a requisição PUT para a API
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingProduct.id,
          ...formData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar produto');
      }

      // Atualiza o produto na lista local
      setProdutos(prev => prev.map(p => p.id === editingProduct.id ? data : p));
      
      // Limpa o formulário e fecha o modal
      resetForm();
      setEditingProduct(null);
      setIsDialogOpen(false);
      
      // Mostra mensagem de sucesso
      alert('Produto atualizado com sucesso!');

    } catch (error: unknown) {
      setErro(error instanceof Error ? error.message : 'Erro ao atualizar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para cancelar edição
  const handleCancelEdit = () => {
    resetForm();
    setEditingProduct(null);
    setIsDialogOpen(false);
    setErro(null);
  };

  // Função para abrir modal de confirmação de exclusão
  const handleDeleteProduct = (produto: Produto) => {
    setDeletingProduct(produto);
    setShowDeleteDialog(true);
  };

  // Função para confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;

    setIsSubmitting(true);
    setErro(null);

    try {
      // Faz a requisição DELETE para a API
      const response = await fetch(`/api/products?id=${deletingProduct.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar produto');
      }

      // Remove o produto da lista local
      setProdutos(prev => prev.filter(p => p.id !== deletingProduct.id));
      
      // Fecha o modal de confirmação
      setShowDeleteDialog(false);
      setDeletingProduct(null);
      
      // Mostra mensagem de sucesso
      alert('Produto deletado com sucesso!');

    } catch (error: unknown) {
      setErro(error instanceof Error ? error.message : 'Erro ao deletar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para cancelar exclusão
  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeletingProduct(null);
    setErro(null);
  };

  // Filtrar produtos baseado na busca
  const filteredProducts = produtos.filter(produto => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      produto.descricao.toLowerCase().includes(search) ||
      produto.codigo.toLowerCase().includes(search) ||
      produto.fornecedor.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie o catálogo de produtos da sua loja
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por descrição, código ou fornecedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </DialogTitle>
              <DialogDescription>
                {editingProduct 
                  ? 'Atualize as informações do produto'
                  : 'Preencha as informações do produto para adicioná-lo ao catálogo'
                }
              </DialogDescription>
            </DialogHeader>
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {erro}
              </div>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código do Produto *</Label>
                  <Input 
                    id="codigo" 
                    placeholder="Ex: PROD001" 
                    value={formData.codigo}
                    onChange={(e) => handleInputChange('codigo', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fornecedor">Fornecedor *</Label>
                  <Input 
                    id="fornecedor" 
                    placeholder="Ex: Dell Brasil" 
                    value={formData.fornecedor}
                    onChange={(e) => handleInputChange('fornecedor', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição *</Label>
                <Textarea 
                  id="descricao" 
                  placeholder="Descreva as características do produto..."
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preco_venda">Preço de Venda *</Label>
                  <Input 
                    id="preco_venda" 
                    type="number" 
                    placeholder="0.00" 
                    step="0.01"
                    value={formData.preco_venda}
                    onChange={(e) => handleInputChange('preco_venda', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={handleCancelEdit}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (editingProduct ? 'Atualizando...' : 'Adicionando...') 
                  : (editingProduct ? 'Atualizar Produto' : 'Adicionar Produto')
                }
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          {deletingProduct && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-900">{deletingProduct.descricao}</p>
                  <p className="text-sm text-red-700">Código: {deletingProduct.codigo}</p>
                </div>
              </div>
            </div>
          )}

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {erro}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={handleCancelDelete}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Excluindo...' : 'Excluir Produto'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading e Error States */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      )}
      
      {erro && (
        <div className="text-center py-8">
          <p className="text-red-500">{erro}</p>
        </div>
      )}

      {/* Table */}
      {!loading && !erro && (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Fornecedor</TableHead>
              <TableHead className="text-center">Estoque Total</TableHead>
              <TableHead className="text-center">Mostruário</TableHead>
              <TableHead className="text-center">Disponível</TableHead>
              <TableHead>Preço de Venda</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'Nenhum produto encontrado para a busca' : 'Nenhum produto cadastrado'}
                </TableCell>
              </TableRow>
            ) : (
                filteredProducts.map((produto) => (
                  <TableRow key={produto.id} className="hover:bg-muted/50">
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                        {produto.codigo}
                    </code>
                  </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{produto.descricao}</p>
                      </div>
                    </TableCell>
                    <TableCell>{produto.fornecedor}</TableCell>
                  <TableCell className="text-center">
                      <span className={produto.quantidade_estoque === 0 ? 'text-destructive font-medium' : ''}>
                        {produto.quantidade_estoque}
                    </span>
                  </TableCell>
                    <TableCell className="text-center">{produto.quantidade_mostruario}</TableCell>
                    <TableCell className="text-center">
                      <span className={produto.quantidade_disponivel === 0 ? 'text-warning font-medium' : 'text-success'}>
                        {produto.quantidade_disponivel}
                    </span>
                  </TableCell>
                  <TableCell>
                      <p className="font-medium">R$ {parseFloat(produto.preco_venda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditProduct(produto)}
                        >
                        <Edit className="w-4 h-4" />
                      </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteProduct(produto)}
                        >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      )}
    </div>
  );
}