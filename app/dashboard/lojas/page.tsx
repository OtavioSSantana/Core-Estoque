'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Store, MapPin, User, Package, Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Interface para os dados da loja
interface Loja {
  id: number;
  nome: string | null;
  endereco: string | null;
  gerente: number | null;
  qtd_total_prod: number | null;
}

export default function Lojas() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLoja, setEditingLoja] = useState<Loja | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    gerente: ''
  });
  const { toast } = useToast();

  // Carrega as lojas do banco de dados
  const fetchLojas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lojas');
      if (response.ok) {
        const data = await response.json();
        setLojas(data);
      } else {
        toast({
          title: "Erro",
          description: "Erro ao carregar lojas",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar lojas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar lojas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Carrega as lojas quando o componente monta
  useEffect(() => {
    fetchLojas();
  }, []);

  // Função para criar nova loja
  const handleCreateLoja = async () => {
    try {
      const response = await fetch('/api/lojas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          endereco: formData.endereco || null,
          gerente: formData.gerente ? parseInt(formData.gerente) : null,
        }),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Loja criada com sucesso!",
        });
        setIsCreateDialogOpen(false);
        setFormData({ nome: '', endereco: '', gerente: '' });
        fetchLojas();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao criar loja",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar loja",
        variant: "destructive",
      });
    }
  };

  // Função para editar loja
  const handleEditLoja = async () => {
    if (!editingLoja) return;

    try {
      const response = await fetch(`/api/lojas/${editingLoja.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          endereco: formData.endereco || null,
          gerente: formData.gerente ? parseInt(formData.gerente) : null,
        }),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Loja atualizada com sucesso!",
        });
        setIsEditDialogOpen(false);
        setEditingLoja(null);
        setFormData({ nome: '', endereco: '', gerente: '' });
        fetchLojas();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao atualizar loja",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar loja:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar loja",
        variant: "destructive",
      });
    }
  };

  // Função para deletar loja
  const handleDeleteLoja = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta loja?')) return;

    try {
      const response = await fetch(`/api/lojas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Loja deletada com sucesso!",
        });
        fetchLojas();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao deletar loja",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao deletar loja:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar loja",
        variant: "destructive",
      });
    }
  };

  // Função para abrir dialog de edição
  const openEditDialog = (loja: Loja) => {
    setEditingLoja(loja);
    setFormData({
      nome: loja.nome || '',
      endereco: loja.endereco || '',
      gerente: loja.gerente?.toString() || '',
    });
    setIsEditDialogOpen(true);
  };

  // Função para fechar dialogs
  const closeDialogs = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setEditingLoja(null);
    setFormData({ nome: '', endereco: '', gerente: '' });
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lojas e Depósitos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os locais físicos do seu negócio
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nova Loja
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Loja</DialogTitle>
              <DialogDescription>
                Preencha as informações da nova loja ou depósito
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Loja *</Label>
                <Input 
                  id="nome" 
                  placeholder="Ex: Loja Centro" 
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input 
                  id="endereco" 
                  placeholder="Rua, número, bairro, cidade" 
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gerente">ID do Gerente</Label>
                <Input 
                  id="gerente" 
                  type="number"
                  placeholder="ID do gerente responsável" 
                  value={formData.gerente}
                  onChange={(e) => setFormData({ ...formData, gerente: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeDialogs}>
                Cancelar
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
                onClick={handleCreateLoja}
                disabled={!formData.nome.trim()}
              >
                Adicionar Loja
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lojas.map((loja) => (
          <Card 
            key={loja.id} 
            className="p-6 hover:shadow-lg transition-all hover:border-primary/50"
          >
            <div className="space-y-4">
              {/* Store Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{loja.nome}</h3>
                    <span className="text-xs text-muted-foreground">
                      ID: {loja.id}
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-success" />
              </div>

              {/* Store Info */}
              <div className="space-y-3 text-sm">
                {loja.endereco && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground flex-1">{loja.endereco}</span>
                  </div>
                )}
                {loja.gerente && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Gerente ID: <strong className="text-foreground">{loja.gerente}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Store Stats */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Total de Produtos</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{loja.qtd_total_prod || 0}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => openEditDialog(loja)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteLoja(loja.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Deletar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Resumo Geral</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de Lojas</p>
            <p className="text-2xl font-bold">{lojas.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lojas com Endereço</p>
            <p className="text-2xl font-bold text-success">
              {lojas.filter(l => l.endereco).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Produtos (Rede)</p>
            <p className="text-2xl font-bold text-primary">
              {lojas.reduce((acc, loja) => acc + (loja.qtd_total_prod || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Loja</DialogTitle>
            <DialogDescription>
              Atualize as informações da loja
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nome">Nome da Loja *</Label>
              <Input 
                id="edit-nome" 
                placeholder="Ex: Loja Centro" 
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-endereco">Endereço</Label>
              <Input 
                id="edit-endereco" 
                placeholder="Rua, número, bairro, cidade" 
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-gerente">ID do Gerente</Label>
              <Input 
                id="edit-gerente" 
                type="number"
                placeholder="ID do gerente responsável" 
                value={formData.gerente}
                onChange={(e) => setFormData({ ...formData, gerente: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={closeDialogs}>
              Cancelar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={handleEditLoja}
              disabled={!formData.nome.trim()}
            >
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}