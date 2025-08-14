import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArguments {
    @Field()
    username: string;

    @Field()
    password: string;
}
