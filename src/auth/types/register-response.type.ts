import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegisterResponse {
    @Field(() => ID)
    id: number

    @Field()
    username: string

    @Field({ nullable: true }) // make it optional if you want
    message?: string;
}