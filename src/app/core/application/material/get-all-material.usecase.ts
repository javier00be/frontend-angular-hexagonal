import { Material, MaterialRepository } from "../../domain/material/material.model";

export class GetAllMaterialsUseCase {
    constructor(private materialRepository: MaterialRepository) { }

    async execute(): Promise<Material[]> {
        return await this.materialRepository.getAll();
    }
}