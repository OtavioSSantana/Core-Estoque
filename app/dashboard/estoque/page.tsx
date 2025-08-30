'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, ShoppingCart, Package, MoreVertical, Eye, Edit, Printer } from 'lucide-react';

// Paliativo: Hook de autenticação inline
const useAuth = () => ({
  user: { storeId: 'store1', name: 'Admin' },
  isAdmin: true
});

// Paliativo: Dados mockados inline
const mockStores = [
  { id: 'store1', name: 'Loja Centro', address: 'Rua Principal, 123', phone: '(11) 1234-5678', active: true },
  { id: 'store2', name: 'Loja Shopping', address: 'Shopping Center, Loja 45', phone: '(11) 8765-4321', active: true },
  { id: 'warehouse', name: 'Depósito Central', address: 'Av. Industrial, 500', phone: '(11) 5555-0000', active: true }
];

const mockProducts = [
  { id: 'prod1', name: 'Colchão Ortopédico King', sku: 'COL-001' },
  { id: 'prod2', name: 'Colchão Molas Queen', sku: 'COL-002' },
  { id: 'prod3', name: 'Colchão Espuma Casal', sku: 'COL-003' }
];

const mockStockItems = [
  {
    id: 'item1',
    barcode: 'EST001234',
    productId: 'prod1',
    storeId: 'store1',
    status: 'available',
    salePrice: 1200,
    entryDate: '2024-01-15',
    product: mockProducts[0],
    store: mockStores[0]
  },
  {
    id: 'item2',
    barcode: 'EST001235',
    productId: 'prod2',
    storeId: 'store2',
    status: 'display',
    salePrice: 950,
    entryDate: '2024-01-20',
    notes: 'Mostruário com pequeno defeito',
    product: mockProducts[1],
    store: mockStores[1]
  }
];

// Paliativo: Componente StatusBadge inline
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    available: { label: 'Disponível', className: 'bg-green-100 text-green-800' },
    display: { label: 'Mostruário', className: 'bg-yellow-100 text-yellow-800' },
    in_transit: { label: 'Em Trânsito', className: 'bg-blue-100 text-blue-800' },
    sold: { label: 'Vendido', className: 'bg-gray-100 text-gray-800' },
    reserved: { label: 'Reservado', className: 'bg-purple-100 text-purple-800' }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

// Paliativo: Imagens placeholder
const mattressImages: Record<string, string> = {
  'prod1': 'https://via.placeholder.com/150x150/e5e7eb/6b7280?text=Colchão+1',
  'prod2': 'https://via.placeholder.com/150x150/e5e7eb/6b7280?text=Colchão+2',
  'prod3': 'https://via.placeholder.com/150x150/e5e7eb/6b7280?text=Colchão+3',
  'prod4': 'https://via.placeholder.com/150x150/e5e7eb/6b7280?text=Colchão+4',
  'prod5': 'https://via.placeholder.com/150x150/e5e7eb/6b7280?text=Colchão+5'
};

export default function Estoque() {
  const { user, isAdmin } = useAuth();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');

  // Filtrar itens baseado nas permissões e filtros
  const filteredItems = mockStockItems.filter(item => {
    // Filtro de permissão
    if (!isAdmin && user?.storeId && item.storeId !== user.storeId) {
      return false;
    }

    // Filtro de loja
    if (selectedStore !== 'all' && item.storeId !== selectedStore) {
      return false;
    }

    // Filtro de status
    if (selectedStatus !== 'all' && item.status !== selectedStatus) {
      return false;
    }

    // Filtro de produto
    if (selectedProduct !== 'all' && item.productId !== selectedProduct) {
      return false;
    }

    // Filtro de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        item.barcode.toLowerCase().includes(search) ||
        item.product?.name.toLowerCase().includes(search) ||
        item.product?.sku.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const availableStores = isAdmin 
    ? mockStores 
    : mockStores.filter(store => store.id === user?.storeId);

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
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="available">Disponível</SelectItem>
                <SelectItem value="display">Mostruário</SelectItem>
                <SelectItem value="in_transit">Em Trânsito</SelectItem>
                <SelectItem value="sold">Vendido</SelectItem>
                <SelectItem value="reserved">Reservado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Produtos</SelectItem>
                {mockProducts.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

          {/* Ações */}
          <div className="flex gap-2">
            <Button 
              variant="outline"
              disabled={selectedItems.length === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Registrar Venda ({selectedItems.length})
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              disabled={selectedItems.length === 0}
            >
              <Package className="w-4 h-4 mr-2" />
              Mover Estoque ({selectedItems.length})
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
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>ID do Item</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Preço de Venda</TableHead>
              <TableHead>Data de Entrada</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum item encontrado com os filtros aplicados
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={mattressImages[item.productId] || mattressImages['prod1']}
                        alt={item.product?.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.product?.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {item.product?.sku}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {item.barcode}
                    </code>
                  </TableCell>
                  <TableCell>{item.store?.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">R$ {item.salePrice.toLocaleString('pt-BR')}</p>
                      {item.status === 'display' && item.notes && (
                        <p className="text-xs text-muted-foreground">{item.notes}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(item.entryDate).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="w-4 h-4 mr-2" />
                          Gerar Etiqueta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
          Mostrando {filteredItems.length} de {mockStockItems.length} itens
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}