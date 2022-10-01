import {
    ActionIcon,
    Badge,
    Group,
    Input,
    Modal,
    Text,
} from '@mantine/core'
import {
    IconPlus,
    IconX,
} from '@tabler/icons'
import {
    useController,
    useFormContext,
} from 'react-hook-form'

import type { KeywordType } from '../../../graphql/types.generated'
import { useBoolean } from '../../../utils'

import type { CategoryFormType } from './CategoryForm.types'
import { KeywordForm } from './KeywordForm'

export const CategoryFormKeywords: React.FunctionComponent = () => {
    const [isKeywordDialogOpen, isKeywordDialogOpenActions] = useBoolean(false)

    const { control } = useFormContext<CategoryFormType>()

    const keywordsField = useController({ control, name: 'keywords' })

    const onKeywordRemove = (id: string) => {
        return () => {
            const filteredList = keywordsField.field.value.filter((keyword) => {
                return keyword.id !== id
            })

            keywordsField.field.onChange(filteredList)
        }
    }

    const onKeywordAdd = (formValue: KeywordType) => {
        keywordsField.field.onChange([
            ...keywordsField.field.value,
            formValue,
        ])

        isKeywordDialogOpenActions.setFalse()
    }

    return (
        <>
            <Input.Wrapper
                error={keywordsField.fieldState.error?.message}
                label="Keywords"
            >
                <Group
                    align="center"
                    noWrap={true}
                    position="apart"
                >
                    <Group>
                        {
                            keywordsField.field.value.length > 0
                                ? keywordsField.field.value.map((keyword) => {
                                    return (
                                        <Badge
                                            color="gray"
                                            key={keyword.name}
                                            rightSection={(
                                                <ActionIcon
                                                    color="blue"
                                                    onClick={onKeywordRemove(keyword.id)}
                                                    radius="xl"
                                                    size="xs"
                                                    variant="transparent"
                                                >
                                                    <IconX size={10} />
                                                </ActionIcon>
                                            )}
                                            size="sm"
                                        >
                                            {keyword.name}
                                        </Badge>
                                    )
                                })
                                : (
                                    <Text
                                        color="dimmed"
                                        size="xs"
                                    >
                                        No keywords
                                    </Text>
                                )
                        }
                    </Group>
                    <ActionIcon
                        color="dark"
                        onClick={isKeywordDialogOpenActions.setTrue}
                        size={30}
                        variant="default"
                    >
                        <IconPlus />
                    </ActionIcon>
                </Group>
            </Input.Wrapper>
            <Modal
                centered={true}
                onClose={isKeywordDialogOpenActions.setFalse}
                opened={isKeywordDialogOpen}
                title="Add Keyword"
                zIndex={999}
            >
                <KeywordForm
                    onCancel={isKeywordDialogOpenActions.setFalse}
                    onSubmit={onKeywordAdd}
                />
            </Modal>
        </>
    )
}
