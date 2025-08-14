import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }
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
}
