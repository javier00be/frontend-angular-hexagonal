import { Fabric, FabricRepository } from '../../domain/fabric/fabric.model';

export class CreateFabricUseCase {
    constructor(private fabricRepository: FabricRepository) { }

    async execute(fabric: Fabric): Promise<Fabric> {
        return await this.fabricRepository.create(fabric);
    }
}
