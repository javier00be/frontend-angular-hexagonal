import { FabricRepository } from '../../domain/fabric/fabric.model';

export class DeleteFabricUseCase {
    constructor(private fabricRepository: FabricRepository) { }

    async execute(id: number): Promise<void> {
        return await this.fabricRepository.delete(id);
    }
}
