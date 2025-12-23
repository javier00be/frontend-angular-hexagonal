import { BrandRepository } from '../../domain/brand/brand.model';

/**
 * Caso de Uso: Eliminar una marca
 */
export class DeleteBrandUseCase {
    constructor(private brandRepository: BrandRepository) { }

    async execute(id: number): Promise<void> {
        return await this.brandRepository.delete(id);
    }
}
