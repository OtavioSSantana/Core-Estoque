'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Edit, Power, KeyRound, Trash2, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Tipos
interface Usuario {
  id: number;
  nome: string;
  login: string;
  email?: string;
  setor?: number;
  setor_descricao?: string;
  loja?: number;
  loja_nome?: string;
  inativo: boolean;
}

interface Loja {
  id: number;
  nome: string;
}

interface Setor {
  id: number;
  descricao: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    login: '',
    senha: '',
    email: '',
    setor: '',
    loja: '',
  });
  const { toast } = useToast();

  // Carrega dados iniciais
  useEffect(() => {
    loadUsuarios();
    loadLojas();
    loadSetores();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/usuarios');
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        toast({
          title: "Erro",
          description: "Erro ao carregar usuários",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadLojas = async () => {
    try {
      const response = await fetch('/api/lojas');
      if (response.ok) {
        const data = await response.json();
        setLojas(data);
      }
    } catch (error) {
      console.error('Erro ao carregar lojas:', error);
    }
  };

  const loadSetores = async () => {
    try {
      // Por enquanto, vamos usar setores mockados
      // Você pode criar uma API para setores se necessário
      setSetores([
        { id: 1, descricao: 'Administração' },
        { id: 2, descricao: 'Vendas' },
        { id: 3, descricao: 'Estoque' },
        { id: 4, descricao: 'Financeiro' },
      ]);
    } catch (error) {
      console.error('Erro ao carregar setores:', error);
    }
  };

  const handleCreateUsuario = async () => {
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          login: formData.login,
          senha: parseInt(formData.senha),
          email: formData.email || null,
          setor: formData.setor ? parseInt(formData.setor) : null,
          loja: formData.loja ? parseInt(formData.loja) : null,
        }),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Usuário criado com sucesso!",
        });
        setIsDialogOpen(false);
        resetForm();
        loadUsuarios();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao criar usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar usuário",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUsuario = async () => {
    if (!selectedUsuario) return;

    try {
      const response = await fetch(`/api/usuarios/${selectedUsuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          login: formData.login,
          senha: formData.senha ? parseInt(formData.senha) : undefined,
          email: formData.email || null,
          setor: formData.setor ? parseInt(formData.setor) : null,
          loja: formData.loja ? parseInt(formData.loja) : null,
        }),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso!",
        });
        setIsEditDialogOpen(false);
        setSelectedUsuario(null);
        resetForm();
        loadUsuarios();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao atualizar usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar usuário",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUsuario = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Usuário deletado com sucesso!",
        });
        loadUsuarios();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao deletar usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      toast({
        title: "Erro",
        description: "Erro ao deletar usuário",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (usuario: Usuario) => {
    try {
      const endpoint = usuario.inativo ? 'activate' : 'deactivate';
      const response = await fetch(`/api/usuarios/${usuario.id}/${endpoint}`, {
        method: 'PUT',
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: `Usuário ${usuario.inativo ? 'ativado' : 'desativado'} com sucesso!`,
        });
        loadUsuarios();
      } else {
        const error = await response.json();
        toast({
          title: "Erro",
          description: error.message || "Erro ao alterar status do usuário",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do usuário",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setFormData({
      nome: usuario.nome || '',
      login: usuario.login || '',
      senha: '',
      email: usuario.email || '',
      setor: usuario.setor?.toString() || '',
      loja: usuario.loja?.toString() || '',
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      login: '',
      senha: '',
      email: '',
      setor: '',
      loja: '',
    });
  };

  const getRoleBadge = (usuario: Usuario) => {
    // Lógica simples para determinar o papel baseado no login
    if (usuario.login === 'ADMIN') {
      return <Badge className="bg-primary text-primary-foreground">Administrador</Badge>;
    }
    return <Badge variant="secondary">Usuário</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os usuários e suas permissões no sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadUsuarios} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Usuário</DialogTitle>
                <DialogDescription>
                  Adicione um novo usuário ao sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    placeholder="João Silva" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login">Login</Label>
                  <Input 
                    id="login" 
                    placeholder="joao.silva" 
                    value={formData.login}
                    onChange={(e) => setFormData({...formData, login: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha (Número)</Label>
                  <Input 
                    id="senha" 
                    type="number" 
                    placeholder="123456" 
                    value={formData.senha}
                    onChange={(e) => setFormData({...formData, senha: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="joao@exemplo.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setor">Setor</Label>
                  <Select value={formData.setor} onValueChange={(value) => setFormData({...formData, setor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {setores.map(setor => (
                        <SelectItem key={setor.id} value={setor.id.toString()}>
                          {setor.descricao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loja">Loja</Label>
                  <Select value={formData.loja} onValueChange={(value) => setFormData({...formData, loja: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a loja" />
                    </SelectTrigger>
                    <SelectContent>
                      {lojas.map(loja => (
                        <SelectItem key={loja.id} value={loja.id.toString()}>
                          {loja.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateUsuario} className="bg-primary hover:bg-primary-hover text-primary-foreground">
                  Criar Usuário
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Usuário</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Loja</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Carregando usuários...
                </TableCell>
              </TableRow>
            ) : usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario) => (
                <TableRow key={usuario.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {usuario.nome?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{usuario.nome}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {usuario.login}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {usuario.email || '-'}
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(usuario)}
                  </TableCell>
                  <TableCell>
                    {usuario.setor_descricao || '-'}
                  </TableCell>
                  <TableCell>
                    {usuario.loja_nome || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={usuario.inativo ? 'secondary' : 'default'}
                      className={usuario.inativo ? 'bg-muted text-muted-foreground' : 'bg-green-100 text-green-800 border-green-200'}
                    >
                      {usuario.inativo ? 'Inativo' : 'Ativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Editar"
                        onClick={() => openEditDialog(usuario)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title={usuario.inativo ? 'Ativar' : 'Desativar'}
                        onClick={() => handleToggleStatus(usuario)}
                      >
                        <Power className={`w-4 h-4 ${usuario.inativo ? 'text-green-600' : 'text-red-600'}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Deletar"
                        onClick={() => handleDeleteUsuario(usuario.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Edite as informações do usuário
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nome">Nome Completo</Label>
              <Input 
                id="edit-nome" 
                placeholder="João Silva" 
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-login">Login</Label>
              <Input 
                id="edit-login" 
                placeholder="joao.silva" 
                value={formData.login}
                onChange={(e) => setFormData({...formData, login: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-senha">Nova Senha (Deixe vazio para manter)</Label>
              <Input 
                id="edit-senha" 
                type="number" 
                placeholder="123456" 
                value={formData.senha}
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email" 
                placeholder="joao@exemplo.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-setor">Setor</Label>
              <Select value={formData.setor} onValueChange={(value) => setFormData({...formData, setor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores.map(setor => (
                    <SelectItem key={setor.id} value={setor.id.toString()}>
                      {setor.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-loja">Loja</Label>
              <Select value={formData.loja} onValueChange={(value) => setFormData({...formData, loja: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a loja" />
                </SelectTrigger>
                <SelectContent>
                  {lojas.map(loja => (
                    <SelectItem key={loja.id} value={loja.id.toString()}>
                      {loja.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateUsuario} className="bg-primary hover:bg-primary-hover text-primary-foreground">
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Resumo de Usuários</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de Usuários</p>
            <p className="text-2xl font-bold">{usuarios.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Administradores</p>
            <p className="text-2xl font-bold text-primary">
              {usuarios.filter(u => u.login === 'ADMIN').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Usuários Ativos</p>
            <p className="text-2xl font-bold text-green-600">
              {usuarios.filter(u => !u.inativo).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Usuários Inativos</p>
            <p className="text-2xl font-bold text-red-600">
              {usuarios.filter(u => u.inativo).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}