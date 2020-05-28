import { Product } from './product.entity';

export const productsProviders = [{ provide: 'ProductsRepository', useValue: Product }];
