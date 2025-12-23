import { Brand, BrandRepository } from '../../domain/brand/brand.model';

/**
 * Caso de Uso: Actualizar una marca existente
 */
export class UpdateBrandUseCase {
    constructor(private brandRepository: BrandRepository) { }

    async execute(brand: Brand): Promise<Brand> {
        return await this.brandRepository.update(brand);
    }
}
