import {
    Button,
    FileButton,
} from '@mantine/core'
import { createWorker } from 'tesseract.js'

export const Image = () => {
    const worker = createWorker({
        logger: (m) => {
            console.log(m)
        },
    })

    const onUpload = async (file: File | null) => {
        if (!file) {
            return
        }

        await worker.load()
        await worker.loadLanguage('hrv')
        await worker.initialize('hrv')

        await worker
            .recognize(file)
            .then((result) => {
            console.log('result: ', result)
            })
            .catch((e) => {
                console.log('e: ', e)
            })

        await worker.terminate()
    }

    return (
        <FileButton
            accept="image/png,image/jpeg"
            onChange={onUpload}
        >
            {(props) => (
                <Button {...props}>
                    Upload image
                </Button>
            )}
        </FileButton>
    )
}
