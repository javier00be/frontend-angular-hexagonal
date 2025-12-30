import { User, UserRepository } from "../../domain/user/user.model";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }
}
