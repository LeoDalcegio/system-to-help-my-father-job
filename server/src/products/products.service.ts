import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('ProductsRepository')
        private readonly productsRepository: typeof Product,
    ) {}

    async findAll(
        page: number, 
        limit: number = 15, 
        productCode?: string, 
        productDescription?: string
    ) {

        let where = { };

        if (productCode) {
            where['productCode'] = productCode
        }

        if (productDescription) {
            where['productDescription'] = productDescription
        }

        page++;

        const products = await this.productsRepository.findAll<Product>({
            where,
            order: ['id'],
            limit,
            offset: (limit * page) - limit,
        });

        return products; // verificar se isso é necessário
    }

    async findOne(id: number) {
        const product = await this.productsRepository.findByPk<Product>(id);

        if (!product) {
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async create(createProductDto: CreateProductDto) {
        const product = new Product();

        product.productCode = createProductDto.productCode;
        product.observation = createProductDto.observation;
        product.productDescription = createProductDto.productDescription;
        product.type = createProductDto.type;

        return product.save();
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.findByPk<Product>(id);

        if (!product) {
            throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);
        }

        product.productCode = updateProductDto.productCode;
        product.observation = updateProductDto.observation;
        product.productDescription = updateProductDto.productDescription;
        product.type = updateProductDto.type;

        try {
            const data = await product.save();

            return data;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const product = await this.productsRepository.findByPk<Product>(id);

        await product.destroy();

        return product;
    }
}
