import { format } from 'date-fns'
import type { IConfigItem } from 'generate-template-files'
import { CaseConverterEnum } from 'generate-template-files'

export const migrationTemplate: IConfigItem = {
    defaultCase: CaseConverterEnum.None,
    dynamicReplacers: [
        { slot: '__timestamp__', slotValue: String(Math.floor(Date.now() / 1000)) },
        { slot: '__folder__', slotValue: format(new Date(), 'yyyy-MM-dd') },
    ],
    entry: {
        folderPath: './generator/templates/migration/template.json',
    },
    option: 'Create Database Migration',
    output: {
        path: './src/database/migrations/changelog/__folder__/__timestamp__-__description__KebabCase__.migration.json',
        pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
    },
    stringReplacers: [
        { question: 'Description of the changes', slot: '__description__' },
    ],
}
