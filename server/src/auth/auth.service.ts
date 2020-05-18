import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

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
