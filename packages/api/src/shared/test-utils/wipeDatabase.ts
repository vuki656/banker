import { orm } from '../orm'

export const wipeDatabase = async () => {
    // @ts-expect-error -- Accessing internals
    const models = Object.keys(orm._baseDmmf.modelMap)

    const actions = models.map((model) => {
        /*
         * Model names we get are formatted like the following `AccessRight`.
         * We need to transform them to `accessRight` format for the orm call
         */
        const name = model.charAt(0).toLowerCase() + model.slice(1)

        // @ts-expect-error -- Can't narrow this
        return orm[name].deleteMany()
    })

    await orm.$transaction(actions)
}
