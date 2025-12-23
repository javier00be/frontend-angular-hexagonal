import { Fabric, FabricRepository } from '../../domain/fabric/fabric.model';

export class UpdateFabricUseCase {
    constructor(private fabricRepository: FabricRepository) { }

    async execute(fabric: Fabric): Promise<Fabric> {
        return await this.fabricRepository.update(fabric);
    }
}
