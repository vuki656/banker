import { sign } from 'jsonwebtoken'
import { compare } from "bcrypt"
import { GraphQLError } from "graphql"
import env from "../../shared/env"
import { orm } from "../../shared/orm"
import { TokenDataType } from "../../shared/types"
import { UserModule } from "./resolver-types.generated"
import { loginUserMutationValidation, updateUserMutationValidation } from "./user.validation"
import { userSelect } from './user.select'

// TODO: is this type correct?
const UserResolver: UserModule.Resolvers = {
    Mutation: {
        loginUser: async (_, variables) => {
            const {
                email,
                password,
            } = loginUserMutationValidation.parse(variables.input)

            const user = await orm.user.findUnique({
                select: {
                    ...userSelect,
                    password: true,
                },
                where: {
                    email,
                },
            })

            if (!user) {
                throw new GraphQLError("User not found")
            }

            const isValid = await compare(user.password, password)

            if (!isValid) {
                throw new GraphQLError('Wrong email or password')
            }

            const tokenData: TokenDataType = {
                user,
            }

            const token = sign(
                tokenData,
                env.APP_JWT_SECRET,
                { expiresIn: env.APP_JWT_DURATION }
            )

            return {
                token,
                user,
            }
        },
        updateUser: async (_, variables) => {
            const {
                currency,
                email,
                firstName,
                id,
                lastName,
            } = updateUserMutationValidation.parse(variables.input)

            const updatedUser = await orm.user.update({
                where: {
                    id,
                },
                data: {
                    currency,
                    email,
                    firstName,
                    lastName,
                },
                select: userSelect,
            })

            return {
                user: updatedUser,
            }
        }
    },
    Query: {
        currentUser: (_, __, context) => {
            if (!context.user) {
                throw new GraphQLError("No current user")
            }

            return context.user
        },
    },
}

export default UserResolver
