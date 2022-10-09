import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class CategoryArgs {
    @Field(() => ID)
    public id: string
}
