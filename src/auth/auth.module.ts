import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({
    signOptions: { expiresIn: '60m' },
    secret: process.env.JWT_SECRET
  })],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule { }
