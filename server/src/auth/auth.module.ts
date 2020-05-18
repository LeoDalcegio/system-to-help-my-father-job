import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({  
    imports: [    
        UserModule,    
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRETKEY, signOptions: {
                expiresIn: process.env.EXPIRESIN,
            },
        }),
    ], 
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy],  
    exports: [
        PassportModule, 
        JwtModule
    ],
})
export class AuthModule {}
