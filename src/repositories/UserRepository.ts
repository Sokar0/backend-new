import { User } from '../entities/User.js';
import { DataSource } from 'typeorm';

const UserRepository = (dataSource: DataSource) => {
    return dataSource.getRepository(User).extend({
        findByName(firstName: string, lastName: string) {
            return this.createQueryBuilder("user")
                .where("user.firstName = :firstName", { firstName })
                .andWhere("user.lastName = :lastName", { lastName })
                .getMany();
        },
    });
};

export default UserRepository; 