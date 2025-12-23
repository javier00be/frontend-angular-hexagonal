import { Brand, BrandRepository } from '../../domain/brand/brand.model';

/**
 * Caso de Uso: Obtener todas las marcas
 */
export class GetAllBrandsUseCase {
    constructor(private brandRepository: BrandRepository) { }

    async execute(): Promise<Brand[]> {
        return await this.brandRepository.getAll();
    }
}
