import {
    makeAutoObservable,
    observable,
} from 'mobx'

import type {
    CategoryType,
    TransactionType,
} from '../../../graphql/types.generated'
import type { ImportPageData } from '../../../pages/import'

import type {
    MatchedCategoryType,
    NewTransactionType,
} from './ImportStore.types'

export class ImportStore {
    public categories = observable.array<CategoryType>([], { deep: false })

    public existingTransactions = observable.map<string, TransactionType>([], { deep: false })

    private _newTransactions = observable.array<NewTransactionType>([], { deep: false })

    private _totalNewTransactions = 0

    constructor(data: ImportPageData) {
        this.categories.push(...data.categories)

        data.transactions.forEach((transaction) => {
            this.existingTransactions.set(transaction.reference, transaction)
        })

        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public get currentTransaction() {
        return this._newTransactions.at(0)
    }

    public get currentTransactionMatchedKeyword() {
        const match = this.categories.reduce<MatchedCategoryType>((accumulator, category) => {
            const foundKeyword = category.keywords.find((keyword) => {
                return this
                    ._newTransactions.at(0)
                    ?.description
                    .toLowerCase()
                    .includes(keyword.name.toLowerCase())
            })

            if (foundKeyword) {
                return {
                    category,
                    keyword: foundKeyword.name,
                }
            }

            return accumulator
        }, { category: null, keyword: '' })

        if (this._newTransactions[0]) {
            this._newTransactions[0].category = match.category
        }

        return match.keyword
    }

    public get isCurrentTransactionSetup() {
        return Boolean(this._newTransactions.at(0)?.category)
    }

    public get progress(): string | null {
        if (this._newTransactions.length === 0) {
            return null
        }

        const currentTransactionNumber = (this._totalNewTransactions - this._newTransactions.toJSON().length) + 1

        return `${currentTransactionNumber} / ${this._totalNewTransactions}`
    }

    public set newTransactions(newTransactions: NewTransactionType[]) {
        this._totalNewTransactions = newTransactions.length

        this._newTransactions.push(...newTransactions.map((transaction) => {
            return {
                ...transaction,
                category: null,
            }
        }))
    }

    public setNextTransaction() {
        this._newTransactions.shift()
    }

    public updateCurrentTransactionAmount(value: number) {
        if (this._newTransactions[0]) {
            this._newTransactions[0].amount = value
        }
    }

    public updateCurrentTransactionCategory(value: CategoryType) {
        if (this._newTransactions[0]) {
            this._newTransactions[0].category = value
        }
    }
}
