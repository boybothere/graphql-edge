import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {
    @Field(() => ID)
    id: number

    @Field()
    username: string

}