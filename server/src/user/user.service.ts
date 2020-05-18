import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { toUserDto } from 'src/shared/mapper';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePasswords } from 'src/shared/utils';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity)    
    private readonly userRepository: Repository<UserEntity>, ) {}

    async findOne(options?: object): Promise<UserDto> {
        const user =  await this.userRepository.findOne(options); 

        return toUserDto(user);  
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.userRepository.findOne({ where: { username } });
        
        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.UNAUTHORIZED);    
        }
        
        const areEqual = await comparePasswords(user.password, password);
        
        if (!areEqual) {
            throw new HttpException('Usuario ou senha inválidos', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }
    
    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({ 
            where:  { username } 
        });  
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { username, password, email } = userDto;
        
        const userInDb = await this.userRepository.findOne({ 
            where: { username } 
        });
        
        if (userInDb) {
            throw new HttpException('Usuário já existente', HttpStatus.BAD_REQUEST);    
        }
        
        const user: UserEntity = this.userRepository.create({ username, password, email, });
        
        await this.userRepository.save(user);
        
        return toUserDto(user);  
    }
}
