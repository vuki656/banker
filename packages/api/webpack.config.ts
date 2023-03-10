import { resolve } from 'path'

// eslint-disable-next-line import/default -- This plugin has broken import so this has to be done
import CopyWebpackPlugin from 'copy-webpack-plugin'
import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

import { DEVELOPMENT_SCHEMA_PATH } from './src/server'

const config: Configuration = {
    entry: './src/index.ts',
    externals: [
        nodeExternals({
            modulesDir: resolve(__dirname, '../../node_modules'),
        }),
    ] as Configuration['externals'],
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/u,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.production.json',
                },
            },

            {
                loader: 'string-replace-loader',
                options: {
                    replace: './schema.graphql',
                    search: DEVELOPMENT_SCHEMA_PATH,
                },
                test: /type-defs\.ts$/u,
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './schema.graphql',
                    to: './',
                },
            ],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
}

export default config
