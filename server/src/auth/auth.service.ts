import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { UserDto } from 'src/user/dto/UserDto';
import { LoginUserDto } from 'src/user/dto/LoginUserDto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'Usuário registrado',
        };
        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        const user = await this.userService.findByLogin(loginUserDto);
        
        const token = this._createToken(user);
        
        return {
            username: user.username, ...token,    
        };  
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,    
        };  
    }
    
    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);    
        
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    

        return user;  
    }
}
