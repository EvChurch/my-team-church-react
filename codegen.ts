import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:5000/graphql',
  documents: ['src/**/*.tsx', 'pages/**/*.tsx', 'pages/**/*.ts'],
  generates: {
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
    './src/gql/': {
      preset: 'client',
      plugins: ['typescript-validation-schema'],
      config: {
        strictScalars: true,
        schema: 'yup',
        scalars: {
          ISO8601Date: 'string',
          ISO8601DateTime: 'string',
        },
      },
    },
  },
}

export default config
