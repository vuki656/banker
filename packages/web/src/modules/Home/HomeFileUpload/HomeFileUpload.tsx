import {
    Button,
    Modal,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useToggle } from '@react-hookz/web'
import { IconCloudUpload } from '@tabler/icons'
import {
    read,
    utils,
} from 'xlsx'

import { useHomeStore } from '../hooks'

import { HomeFileUploadDropzone } from './HomeFileUploadDropzone'

export const HomeFileUpload: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useToggle(false)

    const store = useHomeStore()

    const onCompleted = (file: File) => {
        const reader = new FileReader()

        reader.readAsBinaryString(file)

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

        setIsOpen(false)
    }

    return (
        <>
            <Button
                leftIcon={<IconCloudUpload size={16} />}
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                Upload
            </Button>
            <Modal
                centered={true}
                onClose={() => {
                    setIsOpen(false)
                }}
                opened={isOpen}
                title="Upload Your Bank Report"
            >
                <HomeFileUploadDropzone onCompleted={onCompleted} />
            </Modal>
        </>
    )
}
