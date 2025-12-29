import { Material, MaterialRepository } from "../../domain/material/material.model";

export class UpdateMaterialUseCase {
    constructor(private materialRepository: MaterialRepository) { }

    async execute(material: Material): Promise<Material> {
        return await this.materialRepository.update(material);
    }
}