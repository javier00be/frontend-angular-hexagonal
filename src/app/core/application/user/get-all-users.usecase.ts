import { User, UserRepository } from "../../domain/user/user.model";

export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
}
