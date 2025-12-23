import { Category, CategoryRepository } from '../../domain/category/category.model';

export class UpdateCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute(category: Category): Promise<Category> {
        return await this.categoryRepository.update(category);
    }
}
