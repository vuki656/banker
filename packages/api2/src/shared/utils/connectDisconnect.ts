export const connectDisconnect = (id?: string | null | undefined) => {
    // Not sent, do nothing
    if (id === undefined) {
        return undefined
    }

    // If null is sent, it's intentional disconnect
    if (id === null) {
        return {
            disconnect: true,
        }
    }

    // Only connect case left, so do that
    return {
        connect: {
            id,
        },
    }
}
