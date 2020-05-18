import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto/UserDto';

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};