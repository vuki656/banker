import {
    ActionIcon,
    Group,
    Input,
    Modal,
    Stack,
    Text,
} from '@mantine/core'
import {
    IconPencil,
    IconX,
} from '@tabler/icons'
import { useState } from 'react'
import {
    useController,
    useFormContext,
} from 'react-hook-form'

import type { KeywordType } from '../../../shared/types'
import { toFirstCapitalCase } from '../../../utils'

import type { CategoryFormType } from './CategoryForm.types'
import { KeywordAddDialog } from './KeywordAddDialog'
import { KeywordForm } from './KeywordForm'

export const CategoryFormKeywords: React.FunctionComponent = () => {
    const [keywordToUpdate, setKeywordToUpdate] = useState<KeywordType | null>(null)

    const { control } = useFormContext<CategoryFormType>()

    const keywordsField = useController({ control, name: 'keywords' })

    const onKeywordRemoveClick = (id: string) => {
        return () => {
            const filteredList = keywordsField.field.value.filter((keyword) => {
                return keyword.id !== id
            })

            keywordsField.field.onChange(filteredList)
        }
    }

    const onKeywordUpdateClick = (keyword: KeywordType) => {
        return () => {
            setKeywordToUpdate(keyword)
        }
    }

    const onKeywordUpdateSubmit = (updateKeyword: KeywordType) => {
        const existingKeywords = keywordsField.field.value.filter((keyword) => {
            return keyword.id !== updateKeyword.id
        })

        keywordsField.field.onChange([...existingKeywords, updateKeyword])

        setKeywordToUpdate(null)
    }

    const onKeywordUpdateClose = () => {
        setKeywordToUpdate(null)
    }

    return (
        <>
            <Input.Wrapper
                error={keywordsField.fieldState.error?.message}
                label={(
                    <Group>
                        <Text>
                            Keyword
                        </Text>
                        <KeywordAddDialog />
                    </Group>
                )}
            >
                <Stack
                    align="flex-start"
                    sx={(theme) => ({
                        maxHeight: '300px',
                        overflow: 'auto',
                        paddingTop: theme.spacing.md,
                    })}
                >
                    {keywordsField.field.value.map((keyword) => {
                        return (
                            <Group
                                key={keyword.id}
                                position="apart"
                                sx={(theme) => ({
                                    borderBottom: `1px solid ${theme.colors.gray[3]}`,
                                    paddingBottom: theme.spacing.xs,
                                    width: '100%',
                                })}
                            >
                                <Text
                                    size="xs"
                                    weight={500}
                                >
                                    {toFirstCapitalCase(keyword.name)}
                                </Text>
                                <Group spacing="xs">
                                    <ActionIcon
                                        color="gray"
                                        onClick={onKeywordUpdateClick(keyword)}
                                        size={20}
                                        variant="subtle"
                                    >
                                        <IconPencil size="15px" />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="gray"
                                        onClick={onKeywordRemoveClick(keyword.id)}
                                        size={20}
                                        variant="subtle"
                                    >
                                        <IconX size="15px" />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        )
                    })}
                </Stack>
            </Input.Wrapper>
            {keywordToUpdate ? (
                <Modal
                    centered={true}
                    onClose={onKeywordUpdateClose}
                    opened={Boolean(keywordToUpdate)}
                    title="Update Keyword"
                    zIndex={999}
                >
                    <KeywordForm
                        onCancel={onKeywordUpdateClose}
                        onSubmit={onKeywordUpdateSubmit}
                        value={keywordToUpdate}
                    />
                </Modal>
            ) : null}
        </>
    )
}
