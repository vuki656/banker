import { makeAutoObservable } from 'mobx'

export class HomeStore {
    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public readTransactions(json: unknown[]) {
        console.log(json)
    }
}
