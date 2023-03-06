import {
    Stack,
    Text,
    ThemeIcon,
    useMantineTheme,
} from '@mantine/core'
import {
    Dropzone,
    MS_EXCEL_MIME_TYPE,
} from '@mantine/dropzone'
import { showNotification } from '@mantine/notifications'
import { IconFileAnalytics } from '@tabler/icons-react'

import type { ImportFileUploadDropzoneProps } from './ImportFileUploadDropzone.types'

export const ImportFileUploadDropzone: React.FunctionComponent<ImportFileUploadDropzoneProps> = (props) => {
    const { onCompleted } = props

    const theme = useMantineTheme()

    const showErrorNotification = () => {
        showNotification({
            autoClose: 2000,
            color: 'red',
            message: 'Upload failed',
            title: 'Error',
        })
    }

    return (
        <Dropzone
            accept={MS_EXCEL_MIME_TYPE}
            multiple={false}
            onDrop={(files) => {
                if (!files[0]) {
                    showErrorNotification()

                    return
                }

                onCompleted(files[0])
            }}
            onReject={() => {
                showErrorNotification()
            }}
            sx={{
                textAlign: 'center',
            }}
        >
            <Stack
                align="center"
                spacing="md"
            >
                <ThemeIcon
                    color="green"
                    size={50}
                    variant="light"
                >
                    <IconFileAnalytics
                        color={theme.colors.green[8]}
                        size={30}
                    />
                </ThemeIcon>
                <Text
                    inline={true}
                    size="xl"
                >
                    Drag your report here
                </Text>
                <Text
                    color="dimmed"
                    inline={true}
                    size="sm"
                >
                    Or click on the box to select the file on your PC
                </Text>
            </Stack>
        </Dropzone>
    )
}
