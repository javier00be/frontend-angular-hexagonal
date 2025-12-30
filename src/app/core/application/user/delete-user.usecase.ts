import { UserRepository } from "../../domain/user/user.model";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(id: number): Promise<void> {
        return await this.userRepository.delete(id);
    }
}
