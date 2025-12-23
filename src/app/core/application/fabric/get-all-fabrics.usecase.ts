import { Fabric, FabricRepository } from '../../domain/fabric/fabric.model';

export class GetAllFabricsUseCase {
    constructor(private fabricRepository: FabricRepository) { }

    async execute(): Promise<Fabric[]> {
        return await this.fabricRepository.getAll();
    }
}
