import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  create(createUserInput: CreateUserInput
  ) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

}
