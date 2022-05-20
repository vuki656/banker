import {
    Box,
    Button,
    InputWrapper,
    Stack,
    TextInput,
} from '@mantine/core'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { v4 as UUID } from 'uuid'

import type { KeywordFormProps } from './KeywordForm.types'

export const KeywordForm: React.FunctionComponent<KeywordFormProps> = (props) => {
    const {
        onCancel: onCancelProp,
        onSubmit: onSubmitProp,
    } = props

    const [keyword, setKeyword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = () => {
        if (keyword.length === 0) {
            setError('Required')

            return
        }

        onSubmitProp({
            id: UUID(),
            name: keyword,
        })

        setKeyword('')
        setError('')
    }

    const onCancel = () => {
        onCancelProp()

        setKeyword('')
        setError('')
    }

    const onChange = (event: ChangeEvent<{ value: string }>) => {
        setKeyword(event.target.value)
        setError('')
    }

    return (
        <Stack>
            <InputWrapper
                error={error}
                label="Name"
            >
                <TextInput
                    onChange={onChange}
                    placeholder="Enter a name"
                    value={keyword}
                />
            </InputWrapper>
            <Box
                style={{
                    columnGap: '10px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    color="dark"
                    onClick={onCancel}
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSubmit}
                >
                    Add
                </Button>
            </Box>
        </Stack>
    )
}
