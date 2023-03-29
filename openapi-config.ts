import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: './openapi.yaml',
    apiFile: './src/service/empty.api.ts',
    apiImport: 'emptySplitApi',
    outputFile: './src/store/sms.gen.api.ts',
    outputFiles: {
        './src/store/sms.gen.api.ts': {
            filterEndpoints: (operationName, operationDefinition) => operationDefinition.path.startsWith('/sms'),
        },
    },
    exportName: 'smsApi',
    hooks: true,
}

export default config