import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  create(data: Partial<Product>) {
    return this.productsRepo.save(data);
  }

  findAll() {
    return this.productsRepo.find();
  }

  findOne(id: number) {
    return this.productsRepo.findOne({ where: { id } });
  }

  findByEan(ean: string) {
    return this.productsRepo
      .createQueryBuilder('product')
      .where(':ean = ANY(product.eans)', { ean })
      .getOne();
  }

  update(id: number, data: Partial<Product>) {
    return this.productsRepo.update(id, data);
  }

  remove(id: number) {
    return this.productsRepo.delete(id);
  }
}
