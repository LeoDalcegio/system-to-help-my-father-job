import { UserEntity } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};