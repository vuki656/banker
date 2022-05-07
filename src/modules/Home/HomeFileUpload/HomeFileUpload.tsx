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

import { HomeFileUploadDropzone } from './HomeFileUploadDropzone'

export const HomeFileUpload: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useToggle(false)

    const onCompleted = (file: File) => {
        const reader = new FileReader()

        reader.readAsBinaryString(file)

        reader.onload = function(event) {
            const data = event.target?.result

            if (!data) {
                throw new Error('Failed reading data from file')
            }

            const workbook = read(data, { type: 'binary' })
            const sheet = workbook.Sheets[workbook.SheetNames[0] ?? '']

            if (!sheet) {
                throw new Error('Failed extracting sheet from file')
            }

            const result = utils.sheet_to_json(sheet)

            console.log(result)
        }

        reader.onerror = () => {
            showNotification({
                autoClose: 2000,
                color: 'red',
                message: 'Please try again',
                title: 'File reading Failed',
            })
        }

        setIsOpen(false)
    }

    return (
        <>
            <Modal
                onClose={() => {
                    setIsOpen(false)
                }}
                opened={isOpen}
                title="Upload Your Bank Report"
            >
                <HomeFileUploadDropzone onCompleted={onCompleted} />
            </Modal>
            <Button
                leftIcon={<IconCloudUpload size={16} />}
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                Upload
            </Button>
        </>
    )
}
