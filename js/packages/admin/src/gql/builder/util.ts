import {
  Kind,
  ArgumentNode,
  SelectionSetNode,
  TypeNode,
  NamedTypeNode,
  SelectionNode,
  FieldNode,
  InlineFragmentNode,
  ValueNode,
} from "graphql";

export const createField = (
  name: string,
  selectionSet?: SelectionSetNode,
  args?: ArgumentNode[]
): FieldNode => ({
  kind: Kind.FIELD,
  name: {
    kind: Kind.NAME,
    value: name,
  },
  selectionSet,
  arguments: args,
});

export const createInlineFragment = (
  typeNode: NamedTypeNode,
  selections: SelectionNode[]
): InlineFragmentNode => ({
  kind: Kind.INLINE_FRAGMENT,
  typeCondition: typeNode,
  selectionSet: createSelectionSet(selections),
});

export const createSelectionSet = (
  selections: SelectionNode[]
): SelectionSetNode => ({
  kind: Kind.SELECTION_SET,
  selections: [...selections],
});

export const unwrapType = (type: TypeNode): NamedTypeNode => {
  if (type.kind !== Kind.NAMED_TYPE) {
    return unwrapType(type.type);
  }
  return type;
};

export const convertValueNodeToJS = (ast: ValueNode): unknown => {
  if (!ast) {
    return null;
  }
  switch (ast.kind) {
    case Kind.VARIABLE:
      break;
    case Kind.INT:
      return parseInt(ast.value);
    case Kind.STRING:
      return ast.value;
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.NULL:
      return null;
    case Kind.ENUM:
      return ast.value;
    case Kind.LIST:
      return ast.values.map((value) => convertValueNodeToJS(value));
    default:
      return ast.fields.reduce((acc, curr) => {
        acc[curr.name.value] = convertValueNodeToJS(curr.value);
        return acc;
      }, {});
  }
};
