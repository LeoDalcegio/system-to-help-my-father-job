import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')  
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {    
        
        const result: RegistrationStatus = await this.authService.register(createUserDto,);
        
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
        }
        
        return result;  
    }

    @Post('login')  
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);  
    }
}
