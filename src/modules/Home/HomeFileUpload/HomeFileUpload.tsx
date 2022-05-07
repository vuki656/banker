import {
    Button,
    Modal,
} from '@mantine/core'
import { useToggle } from '@react-hookz/web'
import { IconCloudUpload } from '@tabler/icons'

import { HomeFileUploadDropzone } from './HomeFileUploadDropzone'

export const HomeFileUpload: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useToggle(false)

    const onCompleted = (file: File) => {
        console.log(file)

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
