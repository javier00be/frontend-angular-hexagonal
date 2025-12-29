import { Material, MaterialRepository } from "../../domain/material/material.model";

export class CreateMaterialUseCase {
    constructor(private materialRepository: MaterialRepository) { }

    async execute(material: Material): Promise<Material> {
        return await this.materialRepository.create(material);
    }
}