import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterArguments } from 'src/users/args/register.args';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async validateUser(username: string, inputPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: { username }
        })
        if (!user) throw new NotFoundException("User not found!")
        if (inputPassword !== user.password) throw new BadRequestException("Passwords do not match!")
        const { password, ...result } = user
        console.log(result)
        return result
    }

    async registerUser(args: RegisterArguments) {
        const user = await this.prisma.user.findUnique({
            where: { username: args.username }
        })
        if (user) throw new ConflictException("User with given username already exists!")
        const newUser = await this.prisma.user.create({
            data: {
                username: args.username,
                email: args.email,
                password: args.password
            }
        })
        const { password, email, ...result } = newUser
        return {
            ...result,
            message: "User Registered Successfully!"
        }
    }

    async loginUser(username: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { username }
        })
        if (!user) throw new NotFoundException("User not found!")
        const payload = {
            sub: user.id,
            username
        }

        const refreshSecret = this.configService.get<string>('REFRESH_SECRET')
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, { secret: refreshSecret })

        return {
            id: user.id,
            username,
            tokens: {
                accessToken,
                refreshToken
            }
        }
    }
}
