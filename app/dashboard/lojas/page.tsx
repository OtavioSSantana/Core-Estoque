'use client'

import { useState } from 'react';
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
import { Store, MapPin, Phone, User, Package, Edit, Power, Plus } from 'lucide-react';

// Paliativo: Dados mockados inline
const mockStores = [
  { 
    id: 'store1', 
    name: 'Loja Centro', 
    address: 'Rua Principal, 123 - Centro, São Paulo - SP', 
    phone: '(11) 1234-5678', 
    active: true,
    managerName: 'João Silva'
  },
  { 
    id: 'store2', 
    name: 'Loja Shopping', 
    address: 'Shopping Center, Loja 45 - Vila Madalena, São Paulo - SP', 
    phone: '(11) 8765-4321', 
    active: true,
    managerName: 'Maria Santos'
  },
  { 
    id: 'warehouse', 
    name: 'Depósito Central', 
    address: 'Av. Industrial, 500 - Distrito Industrial, São Paulo - SP', 
    phone: '(11) 5555-0000', 
    active: true,
    managerName: 'Carlos Oliveira'
  }
];

const mockStockItems = [
  { id: 'item1', storeId: 'store1', status: 'available' },
  { id: 'item2', storeId: 'store1', status: 'display' },
  { id: 'item3', storeId: 'store2', status: 'available' },
  { id: 'item4', storeId: 'store2', status: 'reserved' },
  { id: 'item5', storeId: 'warehouse', status: 'available' },
  { id: 'item6', storeId: 'warehouse', status: 'in_transit' }
];

export default function Lojas() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Adicionar estatísticas para cada loja
  const storesWithStats = mockStores.map(store => {
    const storeItems = mockStockItems.filter(
      item => item.storeId === store.id && item.status !== 'sold'
    );
    return {
      ...store,
      totalItems: storeItems.length
    };
  });

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input id="storeName" placeholder="Ex: Loja Centro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input id="address" placeholder="Rua, número, bairro, cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(11) 0000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Gerente Responsável</Label>
                <Input id="manager" placeholder="Nome do gerente" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Adicionar Loja
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storesWithStats.map((store) => (
          <Card 
            key={store.id} 
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
                    <h3 className="font-semibold text-lg">{store.name}</h3>
                    {store.id === 'warehouse' && (
                      <span className="text-xs bg-info-light text-info px-2 py-0.5 rounded-full">
                        Depósito Central
                      </span>
                    )}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${store.active ? 'bg-success' : 'bg-destructive'}`} />
              </div>

              {/* Store Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground flex-1">{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{store.phone}</span>
                </div>
                {store.managerName && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Gerente: <strong className="text-foreground">{store.managerName}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Store Stats */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Total de Itens</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{store.totalItems}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Power className="w-4 h-4 mr-2" />
                  {store.active ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Resumo Geral</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de Lojas</p>
            <p className="text-2xl font-bold">{storesWithStats.filter(s => s.id !== 'warehouse').length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Depósitos</p>
            <p className="text-2xl font-bold">{storesWithStats.filter(s => s.id === 'warehouse').length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lojas Ativas</p>
            <p className="text-2xl font-bold text-success">{storesWithStats.filter(s => s.active).length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Itens (Rede)</p>
            <p className="text-2xl font-bold text-primary">
              {storesWithStats.reduce((acc, store) => acc + store.totalItems, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}