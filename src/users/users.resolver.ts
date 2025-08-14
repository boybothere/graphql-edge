import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { LoginResponse } from 'src/auth/types/login-response.type';
import { RegisterResponse } from 'src/auth/types/register-response.type';
import { AuthService } from 'src/auth/auth.service';
import { RegisterArguments } from './args/register.args';
import { LoginArguments } from './args/login.args';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => RegisterResponse, { name: 'register' })
  registerUser(@Args() registerArgs: RegisterArguments) {
    return this.authService.registerUser(registerArgs)
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  async loginUser(@Args() args: LoginArguments) {
    return this.authService.loginUser(args.username, args.password)
  }
}
