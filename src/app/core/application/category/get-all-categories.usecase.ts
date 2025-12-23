import { Category, CategoryRepository } from '../../domain/category/category.model';

export class GetAllCategoriesUseCase {
    constructor(private categoryRepository: CategoryRepository) { }

    async execute(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }
}
