import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { LoginResponse } from 'src/auth/types/login-response.type';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  @UseGuards(LocalAuthGuard)
  loginUser(@Args('username') username: string,
    @Args('password') password: string,
    @Context() context) {
    const user = context.req.user
    return {
      id: user.id,
      username: user.username
    }
  }
}
