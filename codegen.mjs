import { gql } from '@apollo/client';
import fs from 'fs-extra';
import glob from 'glob';
import camelCase from 'camelcase';

const isOperationDefinitionNode = (object) => {
    return object.kind === 'OperationDefinition';
};

glob("./components/**/*.graphql", {}, (error, files) => {
    files.forEach(file => {
        const query = fs.readFileSync(file, 'utf8');
        const ast = gql `${query}`;
        ast.definitions.forEach(d => {
            if (isOperationDefinitionNode(d) && d.operation === 'query') {

                const queryName = d.name.value;
                const filename = camelCase(queryName);

                let apiRouteCode = 'import { gql, ApolloClient, createHttpLink, InMemoryCache } from \'@apollo/client\'\n';
                apiRouteCode += 'import fetch from \'isomorphic-unfetch\'\n\n';
                apiRouteCode += 'export default async (req, res) => {\n\n';
                apiRouteCode += '  const { previewId } = req.query;\n';
                apiRouteCode += '  const variables = previewId != null ? { id: previewId } : {}\n';

                d.variableDefinitions.forEach(vd => {
                    const variableName = vd.variable.name.value;
                    const newCode = `variables.${variableName} = req.query.${variableName}\n`;
                    apiRouteCode += `  ${newCode}`;
                });

                apiRouteCode += '\n';
                apiRouteCode += '  const query = gql`\n';
                apiRouteCode += `      ${query.trimEnd().split('\n').join('\n      ')}\n`;
                apiRouteCode += '  `\n\n';
                apiRouteCode += '  const client = new ApolloClient({\n';
                apiRouteCode += '    link: createHttpLink({\n';
                apiRouteCode += '        fetch,\n';
                apiRouteCode += '        uri: process.env.GRAPHQL_URL,\n';
                apiRouteCode += '        headers: {\n';
                apiRouteCode += '          \'X-API-Key\': process.env.API_KEY\n';
                apiRouteCode += '        }\n';
                apiRouteCode += '      }\n';
                apiRouteCode += '    ),\n';
                apiRouteCode += '    cache: new InMemoryCache()\n';
                apiRouteCode += '  })\n\n';
                apiRouteCode += '  const data = await client.query({ query, variables })\n\n';
                apiRouteCode += '  res.status(200).json(data)\n';
                apiRouteCode += '}';

                fs.outputFileSync(`./pages/api/${filename}.js`, apiRouteCode);

                const queryTypeName = `${queryName}Query`;
                const queryVariablesTypeName = `${queryTypeName}Variables`;
                const useQueryHookName = `use${queryTypeName}`;

                let queryCode = `import { ${queryTypeName}, ${queryVariablesTypeName}, ${useQueryHookName} as originalQuery } from './graphql'\n`;
                queryCode += 'import * as Apollo from \'@apollo/client\'\n';
                queryCode += 'import { useEffect, useState } from \'react\'\n';
                queryCode += 'import { ApolloQueryResult, QueryResult } from \'@apollo/react-hooks\'\n\n';
                queryCode += `export const ${useQueryHookName} = (baseOptions?: Apollo.QueryHookOptions<${queryTypeName}, ${queryVariablesTypeName}>):\n`;
                queryCode += `    ApolloQueryResult<${queryTypeName}> | QueryResult<${queryTypeName}, ${queryVariablesTypeName}> => {\n\n`;
                queryCode += `    const [response, setResponse] = useState<ApolloQueryResult<${queryTypeName}>>(originalQuery(baseOptions))\n\n`;
                queryCode += '    const searchParams = new URLSearchParams()\n\n';
                queryCode += '    Object.entries(baseOptions.variables).forEach(([key, value]) => {\n';
                queryCode += '        searchParams.append(key, value)\n';
                queryCode += '    })\n\n';
                queryCode += '    useEffect(() => {\n';
                queryCode += '        if (!response.data) {\n';
                queryCode += '            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/' + filename + '?${searchParams.toString()}`)\n';
                queryCode += '            .then(response => response.json())\n';
                queryCode += '            .then(d => setResponse(d))\n';
                queryCode += '        }\n';
                queryCode += '    }, [])\n\n';
                queryCode += '    return response\n';
                queryCode += '}';

                fs.outputFileSync(`./generated/${filename}.ts`, queryCode);
            }
        });
    });
});
