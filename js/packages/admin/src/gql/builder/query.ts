import { buildSchema, GraphQLSchema } from "graphql";
import {
  defaultConfig,
  GeneratorConfig,
  GraphQLQueryGenerator,
} from "src/gql/builder/generator";
import jsonSchema from "src/gql/generated/graphql.schema.json";
export const fetchSchema = async (url: string): Promise<GraphQLSchema> => {
  // const schema = await loadSchema(url, {
  //   loaders: [new UrlLoader()],
  // });
  const convertedJSON = JSON.stringify(jsonSchema).replace(/"_/g, '"');
  return buildSchema(convertedJSON);
};

export const getSchema = (): GraphQLSchema => {
  const convertedJSON = JSON.stringify(jsonSchema).replace(/"_/g, '"');
  return buildSchema(convertedJSON);
};

// type Type = Pick<typeof __schema, "types">;

// const walkToType = (type: string): Type | null => {
//   var types: Array<Type> = __schema.types;
//   for (let i = 0; i < types.length; i++) {
//     if ((types[i].name = type)) {
//       return types[i] as Type;
//     }
//   }

//   return null;
// };

export const buildQuery = async (
  schema: GraphQLSchema,
  queryToBuild: string,
  config: GeneratorConfig = defaultConfig
) => {
  const generator = new GraphQLQueryGenerator(schema);

  generator.buildQuery(queryToBuild, config);

  return generator.getQuery();
};
