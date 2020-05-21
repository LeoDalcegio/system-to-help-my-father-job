import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService, ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'Usuário registrado',
        };

        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }

        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        const token = this._createToken(user);
        
        return {
            username: user.username, 
            ...token,    
        };  
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        
        const authorization = this.jwtService.sign(user);  

        return {
            expiresIn: process.env.EXPIRESIN,
            authorization,    
        };  
    }
    
    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    

        return user;  
    }
}
