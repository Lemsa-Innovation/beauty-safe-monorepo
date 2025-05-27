import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create product' })
  create(@Body() data: CreateProductDto) {
    console.log('POST /products called');
    return this.productsService.create(data);
  }
  @Get('test-auth')
  testAuth(@Req() req: any) {
    console.log('testAuth req.user:', req.user);
    return req.user;
  }
  @Get('debug-token')
  debugToken(@Req() req) {
    return { user: req.user, headers: req.headers };
  }
  @Public()
  @Get()
  @ApiOperation({ summary: 'List all products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Public()
  @Get('ean/:ean')
  @ApiOperation({ summary: 'Get product by EAN code' })
  findByEan(@Param('ean') ean: string) {
    return this.productsService.findByEan(ean);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update product' })
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
