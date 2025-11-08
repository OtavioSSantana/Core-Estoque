// app/dashboard/produtos/_data_access/index.ts

// Exporta todas as funções de data access para facilitar as importações

// GET operations
export { getProducts, getProductById, getProductByCode } from './get-products';

// CREATE operations
export { createProduct, validateCreateProductData } from './create-products';
export type { CreateProductData } from './create-products';

// UPDATE operations
export { updateProduct, validateUpdateProductData } from './update-products';
export type { UpdateProductData } from './update-products';

// DELETE operations
export { deleteProduct, canDeleteProduct, validateProductId } from './delete-products';
