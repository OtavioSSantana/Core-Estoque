'use client'

import { useState } from 'react';
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

// Placeholder images using data URLs
const mattressImages: Record<string, string> = {
  'prod1': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9ydG9ib208L3RleHQ+Cjwvc3ZnPg==',
  'prod2': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhc3RvcjwvdGV4dD4KPC9zdmc+',
  'prod3': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNlYWx5PC90ZXh0Pgo8L3N2Zz4=',
  'prod4': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkp1dmVuaWw8L3RleHQ+Cjwvc3ZnPg==',
  'prod5': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ci8+CjxyZWN0IHg9IjEwIiB5PSIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNpbW1vbnM8L3RleHQ+Cjwvc3ZnPg=='
};

// Static product data
const products = [
  {
    id: 'prod1',
    name: 'Colchão Ortopédico Premium',
    sku: 'COL-ORT-CAL-188',
    brand: 'Ortobom',
    size: 'Casal (188x138)',
    type: 'Molas Ensacadas',
    costPrice: 1200,
    salePrice: 2400,
    totalStock: 3,
    available: 2,
    display: 1,
    minStock: 3
  },
  {
    id: 'prod2',
    name: 'Colchão Espuma D33',
    sku: 'COL-ESP-SOL-188',
    brand: 'Castor',
    size: 'Casal (188x138)',
    type: 'Espuma D33',
    costPrice: 800,
    salePrice: 1600,
    totalStock: 5,
    available: 4,
    display: 1,
    minStock: 5
  },
  {
    id: 'prod3',
    name: 'Colchão Memory Foam',
    sku: 'COL-MEM-CAL-188',
    brand: 'Sealy',
    size: 'Casal (188x138)',
    type: 'Memory Foam',
    costPrice: 2000,
    salePrice: 3800,
    totalStock: 2,
    available: 1,
    display: 1,
    minStock: 2
  },
  {
    id: 'prod4',
    name: 'Colchão Solteiro Juvenil',
    sku: 'COL-JUV-SOL-188',
    brand: 'Ortobom',
    size: 'Solteiro (188x88)',
    type: 'Espuma D28',
    costPrice: 450,
    salePrice: 900,
    totalStock: 4,
    available: 3,
    display: 1,
    minStock: 4
  },
  {
    id: 'prod5',
    name: 'Colchão King Size Luxo',
    sku: 'COL-LUX-KIN-193',
    brand: 'Simmons',
    size: 'King (193x203)',
    type: 'Molas Ensacadas',
    costPrice: 3500,
    salePrice: 6800,
    totalStock: 1,
    available: 0,
    display: 1,
    minStock: 1
  }
];

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrar produtos baseado na busca
  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search)
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
            placeholder="Buscar por nome, SKU ou marca..."
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
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha as informações do produto para adicioná-lo ao catálogo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input id="name" placeholder="Ex: Colchão Ortopédico" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Ex: COL-ORT-CAL-188" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descreva as características do produto..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input id="brand" placeholder="Ex: Ortobom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Tamanho</Label>
                  <Input id="size" placeholder="Ex: Casal (188x138)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Input id="type" placeholder="Ex: Molas Ensacadas" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Preço de Custo</Label>
                  <Input id="cost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale">Preço de Venda</Label>
                  <Input id="sale" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Estoque Mínimo</Label>
                  <Input id="minStock" type="number" placeholder="3" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem</Label>
                <Input id="image" placeholder="https://..." />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Adicionar Produto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead className="text-center">Estoque Total</TableHead>
              <TableHead className="text-center">Disponível</TableHead>
              <TableHead className="text-center">Mostruário</TableHead>
              <TableHead>Preço de Venda</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={mattressImages[product.id] || mattressImages['prod1']}
                        alt={product.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {product.sku}
                    </code>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell className="text-center">
                    <span className={product.totalStock < product.minStock ? 'text-destructive font-medium' : ''}>
                      {product.totalStock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={product.available < product.minStock ? 'text-warning font-medium' : 'text-success'}>
                      {product.available}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{product.display}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">R$ {product.salePrice.toLocaleString('pt-BR')}</p>
                      <p className="text-xs text-muted-foreground">
                        Custo: R$ {product.costPrice.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
    </div>
  );
}