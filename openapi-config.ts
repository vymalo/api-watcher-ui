import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: './openapi.yaml',
    apiFile: './src/service/empty.api.ts',
    apiImport: 'emptySplitApi',
    outputFile: './src/store/api.gen.api.ts',
    outputFiles: {
        './src/store/api.gen.api.ts': {
            filterEndpoints: (operationName, operationDefinition) => operationDefinition.path.startsWith('/api'),
        },
    },
    exportName: 'apiApi',
    hooks: true,
}

export default config