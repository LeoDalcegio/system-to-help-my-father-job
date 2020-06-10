import {
    Controller,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
    Query,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiQuery,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto'; // leo
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Product as ProductEntity } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOkResponse({ type: [ProductEntity] })
    @ApiQuery({ name: 'page', required: true })
    @ApiQuery({ name: 'limit', required: true })
    @ApiQuery({ name: 'productCode', required: false })
    @ApiQuery({ name: 'productDescription', required: false })
    findAll(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('limit', new ParseIntPipe()) limit: number,
        @Query('productCode') productCode: string,
        @Query('productDescription') productDescription: string,
        )
        : Promise<ProductEntity[]> {
        return this.productsService.findAll(page, limit, productCode, productDescription);
    }

    @Get(':id')
    @ApiOkResponse({ type: ProductEntity })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ProductEntity> {
        return this.productsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: ProductEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ProductEntity })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<ProductEntity> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ProductEntity })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<ProductEntity> {
        return this.productsService.delete(id);
    }
}
