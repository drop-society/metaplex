import {
  ArgumentNode,
  DocumentNode,
  FieldDefinitionNode,
  FieldNode,
  GraphQLInterfaceType,
  GraphQLSchema,
  Kind,
  OperationDefinitionNode,
  SelectionNode,
  TypeDefinitionNode,
  TypeNode,
  VariableDefinitionNode,
  visit,
} from "graphql";

import {
  convertValueNodeToJS,
  createField,
  createInlineFragment,
  createSelectionSet,
  unwrapType,
} from "src/gql/builder/util";

export interface QueryMap {
  [key: string]: QueryMap | boolean;
}

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const copyQueryMap = (source: QueryMap): QueryMap => {
  const copy: QueryMap = {};
  for (let key in source) {
    const val = source[key];
    if (!(typeof val === "boolean")) {
      copy[key] = copyQueryMap(val);
    } else {
      copy[key] = source[key];
    }
  }
  return copy;
};

export type GeneratorConfig = {
  depthLimit?: number;
  recursiveTypeLimit?: number;
  expandInterfaces: boolean;
  introspectTypeNames: boolean;
};

export const defaultConfig: GeneratorConfig = {
  depthLimit: 7,
  recursiveTypeLimit: 2,
  expandInterfaces: false,
  introspectTypeNames: true,
};

export class GraphQLQueryGenerator {
  private schema: GraphQLSchema;
  private baseQuery?: DocumentNode;
  private config?: GeneratorConfig;
  private queryMap: QueryMap = {};
  private variableDefinitions: VariableDefinitionNode[] = [];

  constructor(schema: GraphQLSchema) {
    this.schema = schema;
  }

  /**
   * If `recursiveTypeLimit` is set in the config, default to that check
   * and ignore depthLimit, else use depthLimit check.
   */
  private handleQueryLimits(
    fieldName: string,
    typePath: Array<string>
  ): boolean {
    // typePathCheck should be true if the config value is not set
    // OR we've seen the type on the path less than the given limit
    const typePathCheck =
      !this.config?.recursiveTypeLimit ||
      typePath.reduce((acc, curr) => {
        return fieldName === curr ? acc + 1 : acc;
      }, 0) < this.config.recursiveTypeLimit;
    // queryDepthCheck should be true if config value is not set
    // OR the path length is less than the maximum depth value
    const queryDepthCheck =
      !this.config?.depthLimit || typePath.length < this.config?.depthLimit;
    return typePathCheck && queryDepthCheck;
  }

  private handleTypeDefinition(
    ast: TypeDefinitionNode,
    typePath: Array<string>,
    queryMap: QueryMap = {}
  ): SelectionNode[] {
    let fieldNodes: FieldNode[] = [];
    switch (ast.kind) {
      case Kind.OBJECT_TYPE_DEFINITION:
        fieldNodes = ast.fields
          .filter((field) => this.handleQueryLimits(field.name.value, typePath))
          .map((field) => {
            return this.handleFieldDefinition(field, [...typePath], queryMap);
          })
          .filter((field) => field !== undefined);
        if (
          this.config?.introspectTypeNames &&
          typePath.length < this.config?.depthLimit
        ) {
          fieldNodes.push(createField("__type"));
        }
        return fieldNodes;
      case Kind.UNION_TYPE_DEFINITION:
        return ast.types.map((ft) =>
          createInlineFragment(
            ft,
            this.handleTypeDefinition(this.getType(ft), typePath, queryMap)
          )
        );
      case Kind.INTERFACE_TYPE_DEFINITION:
        if (this.config.expandInterfaces) {
          const interfaceType = this.schema.getType(ast.name.value);
          const implementations = this.schema.getImplementations(
            interfaceType as GraphQLInterfaceType
          );
          return implementations.objects
            .map((obj) => obj.astNode)
            .map((ast) =>
              createInlineFragment(
                {
                  kind: Kind.NAMED_TYPE,
                  name: ast.name,
                },
                this.handleTypeDefinition(ast, typePath, queryMap)
              )
            );
        }
        fieldNodes = ast.fields
          .filter((field) => this.handleQueryLimits(field.name.value, typePath))
          .map((field) => {
            return this.handleFieldDefinition(field, [...typePath], queryMap);
          })
          .filter((field) => field !== undefined);
        if (
          this.config.introspectTypeNames &&
          typePath.length < this.config.depthLimit
        ) {
          fieldNodes.push(createField("__type"));
        }
        return fieldNodes;
      default:
        // only type left is InputObjectDefinitionNode
        throw Error("Uncaught type exception");
    }
  }

  private handleFieldDefinition(
    ast: FieldDefinitionNode,
    typePath: Array<string> = [],
    queryMap: QueryMap = {}
  ): FieldNode {
    typePath.push(ast.name.value);

    const fieldTypeDef = this.getType(ast.type);
    if (
      fieldTypeDef === undefined ||
      fieldTypeDef.kind === Kind.ENUM_TYPE_DEFINITION ||
      fieldTypeDef.kind === Kind.SCALAR_TYPE_DEFINITION
    ) {
      queryMap[ast.name.value] = false;
      return createField(ast.name.value);
    }
    const subQueryMap = {};
    const fieldSelectionSet = createSelectionSet(
      this.handleTypeDefinition(fieldTypeDef, typePath, subQueryMap)
    );
    if (fieldSelectionSet.selections.length > 0) {
      // InpuValueDefinitionNode -> ArgumentNode
      queryMap[ast.name.value] = subQueryMap;

      return createField(
        ast.name.value,
        fieldSelectionSet,
        ast?.arguments?.map(
          (input): ArgumentNode => {
            const variableName =
              Array.from(typePath).join("_") + `_${input.name.value}`;
            const variable = {
              kind: Kind.VARIABLE,
              name: {
                kind: Kind.NAME,
                value: variableName,
              },
            };
            this.variableDefinitions.push({
              kind: Kind.VARIABLE_DEFINITION,
              variable,
              type: input.type,
              defaultValue: input.defaultValue,
            });
            return {
              kind: Kind.ARGUMENT,
              name: {
                kind: Kind.NAME,
                value: input.name.value,
              },
              value: variable,
            };
          }
        )
      );
    }
    // Hitting this point in the function means it must have been an
    // Object, Union, or Interface type without any fields (depth limit
    // was hit or type was revisited on the path). Implicit `undefined`
    // return will be filtered out within parent call to handleTypeDefinition.
  }

  private getType(ast: TypeNode): TypeDefinitionNode {
    const type = unwrapType(ast).name.value;
    return this.schema.getType(type).astNode;
  }

  getGeneratorConfig(): GeneratorConfig {
    return { ...this.config };
  }

  getQueryMap(): QueryMap {
    return copyQueryMap(this.queryMap);
  }

  getVariables(): JSONValue {
    return this.variableDefinitions.reduce((acc, curr): any => {
      acc[curr.variable.name.value] = convertValueNodeToJS(curr.defaultValue);
      return acc;
    }, {});
  }

  getQuery(queryMap?: QueryMap): { query: DocumentNode; variables: JSONValue } {
    if (!queryMap) {
      // Use visit to deep copy
      return {
        query: visit(this.baseQuery, {}),
        variables: this.getVariables(),
      };
    }
    const varsToDelete = [];
    const collectDeletedVarNames = (ast: FieldNode) => {
      ast?.arguments?.forEach((curr) => {
        if (curr.value.kind === Kind.VARIABLE) {
          varsToDelete.push(curr.value.name.value);
        }
      });
      varsToDelete.push();
    };
    const editedAST: DocumentNode = visit(this.baseQuery, {
      InlineFragment: {
        leave(node, key, parent, path, ancestors) {
          if (node?.selectionSet && !node.selectionSet.selections.length) {
            return null;
          }
        },
      },
      Field: {
        leave(node, key, parent, path, ancestors) {
          const nodePath = [...ancestors, node];
          if (node?.selectionSet && !node.selectionSet.selections.length) {
            collectDeletedVarNames(node);
            return null;
          }
          let innerQueryMap: QueryMap | boolean = queryMap;
          nodePath.forEach((curr) => {
            if (!(curr instanceof Array) && curr.kind === Kind.FIELD) {
              innerQueryMap = innerQueryMap?.[curr.name.value];
            }
          });
          if (!innerQueryMap) {
            collectDeletedVarNames(node);
            return null;
          }
        },
      },
    });
    // Our Document only contains one definition, the primary query
    const queryDef = editedAST.definitions[0] as OperationDefinitionNode;
    return {
      query: {
        kind: Kind.DOCUMENT,
        definitions: [
          {
            ...queryDef,
            variableDefinitions: queryDef.variableDefinitions?.filter(
              (varDef) => !varsToDelete.includes(varDef.variable?.name?.value)
            ),
          },
        ],
      },
      variables: this.getVariables(),
    };
  }

  buildQuery(queryName: string, config = defaultConfig) {
    if (!(config?.depthLimit || config?.recursiveTypeLimit)) {
      throw Error(
        "Config requires either depthLimit or recursiveTypeLimit to be set"
      );
    }
    this.config = config;

    const queryAST = this.schema.getQueryType()?.getFields()?.[queryName]
      ?.astNode;

    this.baseQuery = {
      kind: Kind.DOCUMENT,
      definitions: [
        {
          kind: Kind.OPERATION_DEFINITION,
          operation: "query",
          selectionSet: createSelectionSet([
            this.handleFieldDefinition(queryAST, [], this.queryMap),
          ]),
          variableDefinitions: this.variableDefinitions,
        },
      ],
    };
  }
}
