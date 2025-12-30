import { User, UserRepository } from "../../domain/user/user.model";

export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }
}
