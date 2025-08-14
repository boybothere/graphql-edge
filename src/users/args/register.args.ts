import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class RegisterArguments {
    @Field()
    username: string

    @Field()
    email: string

    @Field()
    password: string
}