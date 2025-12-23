import { CategoryRepository } from '../../domain/category/category.model';

export class DeleteCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute(id: number): Promise<void> {
        return await this.categoryRepository.delete(id);
    }
}
