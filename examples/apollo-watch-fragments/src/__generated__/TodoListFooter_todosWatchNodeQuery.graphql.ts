/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

/*
query TodoListFooter_todosWatchNodeQuery($id: ID!) {
  node(id: $id) {
    __typename
    ...TodoListFooter_todosFragment
    id
    ... on Node {
      __fragments @client
    }
  }
}

fragment TodoListFooter_todosFragment on TodosConnection {
  uncompletedCount
  id
}
*/

export const documents: import("@graphitation/apollo-react-relay-duct-tape-compiler").CompiledArtefactModule = (function(){
var v0 = {
  "kind": "Name",
  "value": "id"
},
v1 = {
  "kind": "Variable",
  "name": (v0/*: any*/)
},
v2 = {
  "kind": "Name",
  "value": "TodoListFooter_todosFragment"
},
v3 = {
  "kind": "Field",
  "name": (v0/*: any*/)
};
return {
  "watchQueryDocument": {
    "kind": "Document",
    "definitions": [
      {
        "kind": "OperationDefinition",
        "operation": "query",
        "name": {
          "kind": "Name",
          "value": "TodoListFooter_todosWatchNodeQuery"
        },
        "variableDefinitions": [
          {
            "kind": "VariableDefinition",
            "variable": (v1/*: any*/),
            "type": {
              "kind": "NonNullType",
              "type": {
                "kind": "NamedType",
                "name": {
                  "kind": "Name",
                  "value": "ID"
                }
              }
            }
          }
        ],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "node"
              },
              "arguments": [
                {
                  "kind": "Argument",
                  "name": (v0/*: any*/),
                  "value": (v1/*: any*/)
                }
              ],
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                  {
                    "kind": "Field",
                    "name": {
                      "kind": "Name",
                      "value": "__typename"
                    }
                  },
                  {
                    "kind": "FragmentSpread",
                    "name": (v2/*: any*/)
                  },
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "typeCondition": {
                      "kind": "NamedType",
                      "name": {
                        "kind": "Name",
                        "value": "Node"
                      }
                    },
                    "selectionSet": {
                      "kind": "SelectionSet",
                      "selections": [
                        {
                          "kind": "Field",
                          "name": {
                            "kind": "Name",
                            "value": "__fragments"
                          },
                          "directives": [
                            {
                              "kind": "Directive",
                              "name": {
                                "kind": "Name",
                                "value": "client"
                              }
                            }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "kind": "FragmentDefinition",
        "name": (v2/*: any*/),
        "typeCondition": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "TodosConnection"
          }
        },
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "uncompletedCount"
              }
            },
            (v3/*: any*/)
          ]
        }
      }
    ]
  },
  "metadata": {
    "rootSelection": "node",
    "mainFragment": {
      "name": "TodoListFooter_todosFragment",
      "typeCondition": "TodosConnection"
    }
  }
};
})();

export default documents;