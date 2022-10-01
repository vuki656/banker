import {
    Button,
    Modal,
} from '@mantine/core'
import {
    showNotification,
    updateNotification,
} from '@mantine/notifications'
import {
    IconCheck,
    IconCloudUpload,
} from '@tabler/icons'
import {
    read,
    utils,
} from 'xlsx'

import { useBoolean } from '../../../utils'
import { useImportStore } from '../hooks'
import type { NewTransactionType } from '../stores/ImportStore.types'
import { validateTransaction } from '../stores/validateTransaction'

import { ImportFileUploadDropzone } from './ImportFileUploadDropzone'
import type { ExcelRowType as ExcelRowType } from './ImportFileUploadDropzone.types'

export const ImportFileUpload: React.FunctionComponent = () => {
    const store = useImportStore()

    const [isOpen, isOpenActions] = useBoolean(false)

    const parseExcelFile = (
        file: File,
        onCompleted: (excelRows: NewTransactionType[]) => void
    ) => {
        const reader = new FileReader()

        reader.readAsBinaryString(file)

        reader.onloadstart = function() {
            showNotification({
                autoClose: false,
                disallowClose: true,
                id: 'progress',
                loading: true,
                message: 'This might take a second',
                title: 'Loading File',
            })
        }

        reader.onloadend = () => {
            updateNotification({
                autoClose: 2000,
                color: 'teal',
                icon: <IconCheck />,
                id: 'progress',
                message: 'You can now sort your transactions',
                title: 'Loading Finished',
            })
        }

        reader.onerror = () => {
            showNotification({
                autoClose: 2000,
                color: 'red',
                message: 'Failed reading file',
                title: 'Error',
            })
        }

        return reader.onload = function(event) {
            const data = event.target?.result

            if (!data) {
                throw new Error('Failed reading data from file')
            }

            const workbook = read(data, { cellDates: true, type: 'binary' })
            const sheet = workbook.Sheets[workbook.SheetNames[0] ?? '']

            if (!sheet) {
                throw new Error('Failed extracting sheet from file')
            }

            const excelRows = utils.sheet_to_json<ExcelRowType>(sheet)

            // Remove the first two rows as they are not transactions
            excelRows.splice(0, 2)

            const validatedTransactions = excelRows.map((excelRow) => {
                return validateTransaction(Object.values(excelRow))
            })

            onCompleted(validatedTransactions)
        }
    }

    const onCompleted = async (file: File) => {
        const uploadedTransactions = await new Promise<NewTransactionType[]>((resolve) => {
            parseExcelFile(file, (parsedExcelRows) => {
                resolve(parsedExcelRows)
            })
        })

        /*
         * Reverse the array because when we find a cancellation,
         * we can go back in time and find the canceled transaction
         * and not count it as an expense because the money was returned
         */
        uploadedTransactions.reverse()

        const newTransactions = uploadedTransactions.reduce<NewTransactionType[]>(
            (accumulator, uploadedTransaction) => {
                // Already entered transaction
                if (store.existingTransactions.has(uploadedTransaction.reference)) {
                    return accumulator
                }

                /*
                 * Check if any of the processed transactions description have
                 * iterated transactions' reference code, if it does, we found
                 * a cancellation transaction and know which transaction is canceled
                 */
                const cancelationTransaction = accumulator.find((processedTransaction) => {
                    return processedTransaction
                        .description
                        .toLowerCase()
                        .includes(uploadedTransaction.reference.toLowerCase())
                })

                // Remove the canceled transaction from the processed transaction list
                if (cancelationTransaction) {
                    return accumulator.filter((processedTransaction) => {
                        return processedTransaction.reference !== cancelationTransaction.reference
                    })
                }

                // Not an expense
                if (uploadedTransaction.amount === 0) {
                    return accumulator
                }

                return [
                    ...accumulator,
                    uploadedTransaction,
                ]
            },
            []
        )

        if (newTransactions.length === 0) {
            showNotification({
                color: 'blue',
                message: 'Info',
                title: 'All transactions already entered',
            })

            return
        }

        store.newTransactions = newTransactions

        isOpenActions.setFalse()
    }

    return (
        <>
            <Button
                leftIcon={<IconCloudUpload size={16} />}
                onClick={isOpenActions.setTrue}
            >
                Upload
            </Button>
            <Modal
                centered={true}
                onClose={isOpenActions.setFalse}
                opened={isOpen}
                title="Upload Your Bank Report"
            >
                <ImportFileUploadDropzone onCompleted={onCompleted} />
            </Modal>
        </>
    )
}
