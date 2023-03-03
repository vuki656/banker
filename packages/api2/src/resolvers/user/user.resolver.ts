import { sign } from 'jsonwebtoken'
import { compare } from "bcrypt"
import { GraphQLError } from "graphql"
import env from "../../shared/env"
import { orm } from "../../shared/orm"
import { TokenDataType } from "../../shared/types"
import { UserModule } from "./resolver-types.generated"
import { loginUserValidation } from "./user.validation"

// TODO: is this type correct?
const UserResolver: UserModule.Resolvers = {
    Mutation: {
        loginUser: async (_, variables) => {
            const {
                email,
                password,
            } = loginUserValidation.parse(variables.input)

            const user = await orm.user.findUnique({
                select: {
                    password: true,
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    currency: true,
                },
                where: {
                    email,
                },
            })

            if (!user?.password) {
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
        updateUser: () => {
            
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
