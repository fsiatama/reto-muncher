import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: [ProductEntity], isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: [ProductEntity] })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne({ id });
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/decrement-stock')
  @ApiCreatedResponse({ type: ProductEntity })
  decrement(@Param('id', ParseIntPipe) id: number, @Body() { quantity }) {
    return this.productsService.decrementStock(id, quantity);
  }
  @Patch(':id/increment-stock')
  @ApiCreatedResponse({ type: ProductEntity })
  increment(@Param('id', ParseIntPipe) id: number, @Body() { quantity }) {
    return this.productsService.incrementStock(id, quantity);
  }

  @Delete(':id')
  @ApiOkResponse({ type: [ProductEntity] })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
