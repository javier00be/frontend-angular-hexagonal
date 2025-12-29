import { MaterialRepository } from "../../domain/material/material.model";

export class DeleteMaterialUseCase {
    constructor(private materialRepository: MaterialRepository) { }

    async execute(id: number): Promise<void> {
        return await this.materialRepository.delete(id);
    }
}