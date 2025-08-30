'use client';

import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import {
  DollarSign,
  Package,
  Eye,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedStore, setSelectedStore] = useState('all');

  // Static data for demonstration
  const stats = {
    totalValue: 125000,
    totalItems: 1234,
    displayItems: 45,
    lowStockAlerts: 8
  };

  const stores = [
    { id: '1', name: 'Loja Centro' },
    { id: '2', name: 'Loja Shopping' },
    { id: '3', name: 'Loja Norte' }
  ];

  const lowStockProducts = [
    { id: '1', name: 'Produto A', sku: 'SKU001', available: 3, minStock: 10, needed: 7 },
    { id: '2', name: 'Produto B', sku: 'SKU002', available: 2, minStock: 8, needed: 6 },
    { id: '3', name: 'Produto C', sku: 'SKU003', available: 1, minStock: 5, needed: 4 }
  ];

  const recentMovements = [
    {
      id: '1',
      type: 'sale',
      item: { product: { name: 'Produto X' } },
      fromStore: { name: 'Loja Centro' },
      date: new Date().toISOString()
    },
    {
      id: '2',
      type: 'transfer',
      item: { product: { name: 'Produto Y' } },
      fromStore: { name: 'Loja Centro' },
      toStore: { name: 'Loja Shopping' },
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      type: 'entry',
      item: { product: { name: 'Produto Z' } },
      fromStore: { name: 'Loja Norte' },
      date: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo de volta, Ana Silva!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione a loja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Lojas</SelectItem>
              {stores.map(store => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Package className="w-4 h-4 mr-2" />
            Nova Entrada
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Valor do Estoque"
          value={`R$ ${stats.totalValue.toLocaleString('pt-BR')}`}
          subtitle="Em produtos disponíveis"
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Itens em Estoque"
          value={stats.totalItems}
          subtitle="Total de unidades"
          icon={<Package className="w-5 h-5 text-primary" />}
          trend="neutral"
          trendValue="0%"
        />
        <StatCard
          title="Itens no Mostruário"
          value={stats.displayItems}
          subtitle="Em exposição"
          icon={<Eye className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Alertas de Estoque"
          value={stats.lowStockAlerts}
          subtitle="Produtos abaixo do mínimo"
          icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
          trend={stats.lowStockAlerts > 0 ? "down" : "neutral"}
          trendValue={stats.lowStockAlerts > 0 ? "Atenção" : "OK"}
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Estoque por Loja</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Package className="w-12 h-12 mx-auto mb-2" />
              <p>Gráfico de distribuição</p>
              <p className="text-sm">Instale recharts para visualizar</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Composição do Estoque</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2" />
              <p>Gráfico de composição</p>
              <p className="text-sm">Instale recharts para visualizar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Movimentações */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Últimas Movimentações</h3>
          </div>
          <div className="divide-y divide-border">
            {recentMovements.map((movement) => (
              <div key={movement.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {movement.type === 'sale' && (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      )}
                      {movement.type === 'transfer' && (
                        <ArrowDownRight className="w-4 h-4 text-blue-600" />
                      )}
                      {movement.type === 'entry' && (
                        <Package className="w-4 h-4 text-primary" />
                      )}
                      <span className="font-medium text-sm">
                        {movement.type === 'sale' && 'Venda'}
                        {movement.type === 'transfer' && 'Transferência'}
                        {movement.type === 'entry' && 'Entrada'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {movement.item?.product?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {movement.fromStore?.name}
                      {movement.toStore && ` → ${movement.toStore.name}`}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(movement.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produtos com Estoque Baixo */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Produtos com Estoque Baixo</h3>
          </div>
          <div className="divide-y divide-border">
            {lowStockProducts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-green-600" />
                <p>Todos os produtos estão com estoque adequado!</p>
              </div>
            ) : (
              lowStockProducts.map((product) => (
                <div key={product.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs">
                          Disponível: <strong className="text-red-600">{product.available}</strong>
                        </span>
                        <span className="text-xs">
                          Mínimo: <strong>{product.minStock}</strong>
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Repor
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}