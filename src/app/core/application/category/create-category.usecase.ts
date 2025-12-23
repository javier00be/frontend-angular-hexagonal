import { Category, CategoryRepository } from '../../domain/category/category.model';

export class CreateCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute(category: Category): Promise<Category> {
        return await this.categoryRepository.create(category);
    }
}
