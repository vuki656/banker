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
import { useHomeStore } from '../hooks'

import { HomeFileUploadDropzone } from './HomeFileUploadDropzone'

const LOADING_NOTIFICATION_ID = 'loading-notification-id'

export const HomeFileUpload: React.FunctionComponent = () => {
    const [isOpen, isOpenActions] = useBoolean(false)

    const store = useHomeStore()

    const onCompleted = (file: File) => {
        const reader = new FileReader()

        reader.readAsBinaryString(file)

        reader.onloadstart = function() {
            showNotification({
                autoClose: false,
                disallowClose: true,
                id: LOADING_NOTIFICATION_ID,
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
                id: LOADING_NOTIFICATION_ID,
                message: 'You can now sort your transactions',
                title: 'Loading Finished',
            })
        }

        reader.onload = function(event) {
            const data = event.target?.result

            if (!data) {
                throw new Error('Failed reading data from file')
            }

            const workbook = read(data, { cellDates: true, type: 'binary' })
            const sheet = workbook.Sheets[workbook.SheetNames[0] ?? '']

            if (!sheet) {
                throw new Error('Failed extracting sheet from file')
            }

            const excelRows = utils.sheet_to_json<Record<string, number | string>>(sheet)

            store.parseTransactions(excelRows)
        }

        reader.onerror = () => {
            showNotification({
                autoClose: 2000,
                color: 'red',
                message: 'Failed reading file',
                title: 'Error',
            })
        }

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
                <HomeFileUploadDropzone onCompleted={onCompleted} />
            </Modal>
        </>
    )
}
