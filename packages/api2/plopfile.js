const dayjs = require('dayjs')

const actions = (/** @type { import('plop').NodePlopAPI } */ plop) => {
    const year = dayjs().year()
    const month = dayjs().month() + 1
    const timestamp = dayjs().unix() + 1

    plop.setHelper('timestamp', timestamp)

    plop.setGenerator('Migration', {
        actions: [
            {
                path: `./src/database/migrations/changelog/${year}/${month}/${timestamp}-{{description}}.migration.json`,
                templateFile: './__templates__/migration.hbs',
                type: 'add',
            },
        ],
        description: 'Generate a liquibase migration',
        prompts: [
            {
                choices: [
                    'off.vukovic@gmail.com',
                ],
                message: 'Author Email:',
                name: 'email',
                type: 'list',
            },
            {
                message: 'Migration Description:',
                name: 'description',
                type: 'input',
                validate: (value) => {
                    if (value.includes(' ')) {
                        return 'Description can\'t contain empty spaces. Use hyphens (my-description-here)'
                    }

                    return true
                },
            },
        ],
    })
}

module.exports = actions
