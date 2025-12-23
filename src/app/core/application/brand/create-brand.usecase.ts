import { Brand, BrandRepository } from '../../domain/brand/brand.model';

/**
 * Caso de Uso: Crear una nueva marca
 */
export class CreateBrandUseCase {
    constructor(private brandRepository: BrandRepository) { }

    async execute(brand: Brand): Promise<Brand> {
        return await this.brandRepository.create(brand);
    }
}
