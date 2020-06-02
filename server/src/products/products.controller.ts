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
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOkResponse({ type: [ProductDto] })
    @ApiQuery({ name: 'page', required: true })
    @ApiQuery({ name: 'limit', required: true })
    findAll(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('limit', new ParseIntPipe()) limit: number,
        )
        : Promise<ProductDto[]> {
        return this.productsService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOkResponse({ type: ProductDto })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ProductDto> {
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
    @ApiOkResponse({ type: ProductDto })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<ProductDto> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ProductDto })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<ProductDto> {
        return this.productsService.delete(id);
    }
}
