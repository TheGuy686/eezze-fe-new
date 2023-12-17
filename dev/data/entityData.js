module.exports = [
    {
      id: 1,
      "key": "1:a-table",
      "projectId": 1,
      "datasource": 1,
      "entityId": "1:a-table",
      "name": "A Table",
      "entityItems": [
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "id",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "id2",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop1",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop2",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop3",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop4",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-many"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": true
          },
          "relation": "Address",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "addresses",
          "name": "Addresses",
          "example": 1,
          "relKey": "one-to-many",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "many-to-one"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": true
          },
          "relation": "Category",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "category",
          "name": "Category",
          "example": 1,
          "relKey": "many-to-one",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-one"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": true
          },
          "relation": "OrderItem",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "orderItem",
          "name": "Order Item",
          "example": 1,
          "relKey": "one-to-one",
          "type": "relation"
        }
      ],
      "erd": {
        "_genId": "NtX71InpnI",
        "name": "A Table",
        "parent": null,
        "attr": [
          {
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "name": "prop3",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          },
          {
            "name": "prop4",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 4
          }
        ],
        "transform": {
          "x": 661.8888883590698,
          "y": 347.8888883590698,
          "width": 119,
          "height": 154
        },
        "relations": []
      }
    },
    {
      id: 2,
      "key": "1:address",
      "projectId": 1,
      "datasource": 1,
      "entityId": "1:address",
      "name": "Address",
      "entityItems": [
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "id",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "addressLine1",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "addressLine2",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "ownedBy",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "postCode",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop1",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "many-to-one"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false
          },
          "relation": "ATable",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "aTable",
          "name": "A Table",
          "example": 1,
          "relKey": "many-to-one",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "many-to-one"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": true
          },
          "relation": "Order",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "order",
          "name": "Order",
          "example": 1,
          "relKey": "many-to-one",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-many"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false,
            dsName: "address",
          },
          "relation": "Address",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "address",
          "name": "Address",
          "example": 1,
          "relKey": "one-to-many",
          "type": "relation"
        }
      ],
      "erd": {
        "_genId": "WG9YZzZ6hF",
        "name": "Address",
        "parent": null,
        "attr": [
          {
            "name": "id",
            "primary": false,
            "unique": true,
            "nullable": false,
            "pos": 4
          },
          {
            "name": "addressLine1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "name": "addressLine2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "name": "ownedBy",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 5
          },
          {
            "name": "postCode",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          }
        ],
        "transform": {
          "x": 366.8888883590698,
          "y": 400.8888883590698,
          "width": 201,
          "height": 273
        },
        "relations": [
          [
            {
              "entity": "Address",
              "identifying": true,
              "optional": false,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 567.8888883590698,
                  "y": 537.3888883590698,
                  "edge": 1
                },
                "points": [
                  {
                    "x": 614.8888883590698,
                    "y": 481.1388883590698
                  }
                ],
                "manual": false
              },
              "key": "1:address",
              "cases": {
                "camelCase": "address",
                "kebabCase": "address",
                "pascalCase": "Address"
              },
              "reverse": {
                "entity": "A Table",
                "identifying": false,
                "optional": true,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 661.8888883590698,
                    "y": 424.8888883590698,
                    "edge": 3
                  },
                  "points": [
                    {
                      "x": 614.8888883590698,
                      "y": 481.1388883590698
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "A Table",
              "identifying": false,
              "optional": true,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 661.8888883590698,
                  "y": 424.8888883590698,
                  "edge": 3
                },
                "points": [
                  {
                    "x": 614.8888883590698,
                    "y": 481.1388883590698
                  }
                ],
                "manual": false
              },
              "key": "1:a-table",
              "cases": {
                "camelCase": "aTable",
                "kebabCase": "a-table",
                "pascalCase": "ATable"
              },
              "reverse": {
                "entity": "Address",
                "identifying": true,
                "optional": false,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 567.8888883590698,
                    "y": 537.3888883590698,
                    "edge": 1
                  },
                  "points": [
                    {
                      "x": 614.8888883590698,
                      "y": 481.1388883590698
                    }
                  ],
                  "manual": false
                }
              }
            }
          ],
          [
            {
              "entity": "User",
              "identifying": false,
              "optional": true,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 245.88888835906982,
                  "y": 331.8888883590698,
                  "edge": 2
                },
                "points": [
                  {
                    "x": 356.6388883590698,
                    "y": 366.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:user",
              "cases": {
                "camelCase": "user",
                "kebabCase": "user",
                "pascalCase": "User"
              },
              "reverse": {
                "entity": "Address",
                "identifying": true,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 467.3888883590698,
                    "y": 400.8888883590698,
                    "edge": 0
                  },
                  "points": [
                    {
                      "x": 356.6388883590698,
                      "y": 366.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "Address",
              "identifying": true,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 467.3888883590698,
                  "y": 400.8888883590698,
                  "edge": 0
                },
                "points": [
                  {
                    "x": 356.6388883590698,
                    "y": 366.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:address",
              "cases": {
                "camelCase": "address",
                "kebabCase": "address",
                "pascalCase": "Address"
              },
              "reverse": {
                "entity": "User",
                "identifying": false,
                "optional": true,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 245.88888835906982,
                    "y": 331.8888883590698,
                    "edge": 2
                  },
                  "points": [
                    {
                      "x": 356.6388883590698,
                      "y": 366.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            }
          ]
        ]
      }
    },
    {
      id: 6,
      "key": "1:category",
      "projectId": 1,
      "datasource": 1,
      "entityId": "1:category",
      "name": "Category",
      "entityItems": [
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop1",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop2",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop3",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop4",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-many"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false
          },
          "relation": "ATable",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "aTables",
          "name": "A Tables",
          "example": 1,
          "relKey": "one-to-many",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "many-to-many"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": false
          },
          "relation": "OrderItem",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "orderItem",
          "name": "Order Item",
          "example": 1,
          "relKey": "many-to-many",
          "type": "relation"
        }
      ],
      "erd": {
        "_genId": "zZmaRBfX5W",
        "name": "Category",
        "parent": null,
        "attr": [
          {
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "name": "prop3",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "name": "prop4",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          }
        ],
        "transform": {
          "x": 880.8888883590698,
          "y": 100.88888835906982,
          "width": 120,
          "height": 140
        },
        "relations": [
          [
            {
              "entity": "Category",
              "identifying": true,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 940.8888883590698,
                  "y": 240.88888835906982,
                  "edge": 2
                },
                "points": [
                  {
                    "x": 866.3888883590698,
                    "y": 338.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:category",
              "cases": {
                "camelCase": "category",
                "kebabCase": "category",
                "pascalCase": "Category"
              },
              "reverse": {
                "entity": "A Table",
                "identifying": false,
                "optional": true,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 780.8888883590698,
                    "y": 424.8888883590698,
                    "edge": 1
                  },
                  "points": [
                    {
                      "x": 866.3888883590698,
                      "y": 338.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "A Table",
              "identifying": false,
              "optional": true,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 780.8888883590698,
                  "y": 424.8888883590698,
                  "edge": 1
                },
                "points": [
                  {
                    "x": 866.3888883590698,
                    "y": 338.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:a-table",
              "cases": {
                "camelCase": "aTable",
                "kebabCase": "a-table",
                "pascalCase": "ATable"
              },
              "reverse": {
                "entity": "Category",
                "identifying": true,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 940.8888883590698,
                    "y": 240.88888835906982,
                    "edge": 2
                  },
                  "points": [
                    {
                      "x": 866.3888883590698,
                      "y": 338.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            }
          ],
          [
            {
              "entity": "Order Item",
              "identifying": false,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 791.8888883590698,
                  "y": 175.88888835906982,
                  "edge": 1
                },
                "points": [
                  {
                    "x": 836.3888883590698,
                    "y": 173.38888835906982
                  }
                ],
                "manual": false
              },
              "key": "1:order-item",
              "cases": {
                "camelCase": "orderItem",
                "kebabCase": "order-item",
                "pascalCase": "OrderItem"
              },
              "reverse": {
                "entity": "Category",
                "identifying": true,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 880.8888883590698,
                    "y": 170.88888835906982,
                    "edge": 3
                  },
                  "points": [
                    {
                      "x": 836.3888883590698,
                      "y": 173.38888835906982
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "Category",
              "identifying": true,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 880.8888883590698,
                  "y": 170.88888835906982,
                  "edge": 3
                },
                "points": [
                  {
                    "x": 836.3888883590698,
                    "y": 173.38888835906982
                  }
                ],
                "manual": false
              },
              "key": "1:category",
              "cases": {
                "camelCase": "category",
                "kebabCase": "category",
                "pascalCase": "Category"
              },
              "reverse": {
                "entity": "Order Item",
                "identifying": false,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 791.8888883590698,
                    "y": 175.88888835906982,
                    "edge": 1
                  },
                  "points": [
                    {
                      "x": 836.3888883590698,
                      "y": 173.38888835906982
                    }
                  ],
                  "manual": false
                }
              }
            }
          ]
        ]
      }
    },
    {
      id: 4,
      "key": "1:order",
      "projectId": 1,
      "datasource": 1,
      "entityId": "1:order",
      "name": "Order",
      "entityItems": [
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "id",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "orderedBy",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "addressId",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "date",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "orderedAt",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop2",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "many-to-one"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": true
          },
          "relation": "OrderItem",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "orderItem",
          "name": "Order Item",
          "example": 1,
          "relKey": "many-to-one",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-many"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false
          },
          "relation": "Address",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "addresses",
          "name": "Addresses",
          "example": 1,
          "relKey": "one-to-many",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-many"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false
          },
          "relation": "User",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "users",
          "name": "Users",
          "example": 1,
          "relKey": "one-to-many",
          "type": "relation"
        }
      ],
      "erd": {
        "_genId": "YAmKfQX070",
        "name": "Order",
        "parent": null,
        "attr": [
          {
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "name": "orderedBy",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "name": "addressId",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 4
          },
          {
            "name": "date",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "name": "orderedAt",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 5
          },
          {
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          }
        ],
        "transform": {
          "x": 429.8888883590698,
          "y": 155.88888835906982,
          "width": 136,
          "height": 156
        },
        "relations": [
          [
            {
              "entity": "Order",
              "identifying": true,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 497.8888883590698,
                  "y": 311.8888883590698,
                  "edge": 2
                },
                "points": [
                  {
                    "x": 460.0138883590698,
                    "y": 356.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:order",
              "cases": {
                "camelCase": "order",
                "kebabCase": "order",
                "pascalCase": "Order"
              },
              "reverse": {
                "entity": "Address",
                "identifying": false,
                "optional": true,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 422.1388883590698,
                    "y": 400.8888883590698,
                    "edge": 0
                  },
                  "points": [
                    {
                      "x": 460.0138883590698,
                      "y": 356.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "Address",
              "identifying": false,
              "optional": true,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 422.1388883590698,
                  "y": 400.8888883590698,
                  "edge": 0
                },
                "points": [
                  {
                    "x": 460.0138883590698,
                    "y": 356.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:address",
              "cases": {
                "camelCase": "address",
                "kebabCase": "address",
                "pascalCase": "Address"
              },
              "reverse": {
                "entity": "Order",
                "identifying": true,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 497.8888883590698,
                    "y": 311.8888883590698,
                    "edge": 2
                  },
                  "points": [
                    {
                      "x": 460.0138883590698,
                      "y": 356.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            }
          ],
          [
            {
              "entity": "User",
              "identifying": false,
              "optional": true,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 351.8888883590698,
                  "y": 224.38888835906982,
                  "edge": 1
                },
                "points": [
                  {
                    "x": 390.8888883590698,
                    "y": 229.13888835906982
                  }
                ],
                "manual": false
              },
              "key": "1:user",
              "cases": {
                "camelCase": "user",
                "kebabCase": "user",
                "pascalCase": "User"
              },
              "reverse": {
                "entity": "Order",
                "identifying": true,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 429.8888883590698,
                    "y": 233.88888835906982,
                    "edge": 3
                  },
                  "points": [
                    {
                      "x": 390.8888883590698,
                      "y": 229.13888835906982
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "Order",
              "identifying": true,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 429.8888883590698,
                  "y": 233.88888835906982,
                  "edge": 3
                },
                "points": [
                  {
                    "x": 390.8888883590698,
                    "y": 229.13888835906982
                  }
                ],
                "manual": false
              },
              "key": "1:order",
              "cases": {
                "camelCase": "order",
                "kebabCase": "order",
                "pascalCase": "Order"
              },
              "reverse": {
                "entity": "User",
                "identifying": false,
                "optional": true,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 351.8888883590698,
                    "y": 224.38888835906982,
                    "edge": 1
                  },
                  "points": [
                    {
                      "x": 390.8888883590698,
                      "y": 229.13888835906982
                    }
                  ],
                  "manual": false
                }
              }
            }
          ]
        ]
      }
    },
    {
      id: 5,
      "key": "1:order-item",
      "projectId": 1,
      "datasource": 1,
      "entityId": "1:order-item",
      "name": "Order Item",
      "entityItems": [
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "id",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "amount",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop1",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop2",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "prop3",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "quantity",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "many-to-many"
            }
          },
          "metadata": {
            "required": false,
            "xor": null,
            "identifying": true
          },
          "relation": "Category",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "category",
          "name": "Category",
          "example": 1,
          "relKey": "many-to-many",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-many"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false
          },
          "relation": "Order",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "orders",
          "name": "Orders",
          "example": 1,
          "relKey": "one-to-many",
          "type": "relation"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-key": true,
              "boolean-unique": false,
              "boolean-nullable": false,
              "radio-relation-definition": "one-to-one"
            }
          },
          "metadata": {
            "required": true,
            "xor": null,
            "identifying": false
          },
          "relation": "ATable",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "aTable",
          "name": "A Table",
          "example": 1,
          "relKey": "one-to-one",
          "type": "relation"
        }
      ],
      "erd": {
        "_genId": "ddzS9K9Bn4",
        "name": "Order Item",
        "parent": null,
        "attr": [
          {
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "name": "amount",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          },
          {
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 4
          },
          {
            "name": "prop3",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 5
          },
          {
            "name": "quantity",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          }
        ],
        "transform": {
          "x": 628.8888883590698,
          "y": 80.88888835906982,
          "width": 163,
          "height": 190
        },
        "relations": [
          [
            {
              "entity": "Order Item",
              "identifying": true,
              "optional": false,
              "cardinality": 0,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 628.8888883590698,
                  "y": 175.88888835906982,
                  "edge": 3
                },
                "points": [
                  {
                    "x": 597.3888883590698,
                    "y": 204.88888835906982
                  }
                ],
                "manual": false
              },
              "key": "1:order-item",
              "cases": {
                "camelCase": "orderItem",
                "kebabCase": "order-item",
                "pascalCase": "OrderItem"
              },
              "reverse": {
                "entity": "Order",
                "identifying": false,
                "optional": true,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 565.8888883590698,
                    "y": 233.88888835906982,
                    "edge": 1
                  },
                  "points": [
                    {
                      "x": 597.3888883590698,
                      "y": 204.88888835906982
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "Order",
              "identifying": false,
              "optional": true,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 565.8888883590698,
                  "y": 233.88888835906982,
                  "edge": 1
                },
                "points": [
                  {
                    "x": 597.3888883590698,
                    "y": 204.88888835906982
                  }
                ],
                "manual": false
              },
              "key": "1:order",
              "cases": {
                "camelCase": "order",
                "kebabCase": "order",
                "pascalCase": "Order"
              },
              "reverse": {
                "entity": "Order Item",
                "identifying": true,
                "optional": false,
                "cardinality": 0,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 628.8888883590698,
                    "y": 175.88888835906982,
                    "edge": 3
                  },
                  "points": [
                    {
                      "x": 597.3888883590698,
                      "y": 204.88888835906982
                    }
                  ],
                  "manual": false
                }
              }
            }
          ],
          [
            {
              "entity": "Order Item",
              "identifying": true,
              "optional": false,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 710.3888883590698,
                  "y": 270.8888883590698,
                  "edge": 2
                },
                "points": [
                  {
                    "x": 715.8888883590698,
                    "y": 309.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:order-item",
              "cases": {
                "camelCase": "orderItem",
                "kebabCase": "order-item",
                "pascalCase": "OrderItem"
              },
              "reverse": {
                "entity": "A Table",
                "identifying": false,
                "optional": true,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 721.3888883590698,
                    "y": 347.8888883590698,
                    "edge": 0
                  },
                  "points": [
                    {
                      "x": 715.8888883590698,
                      "y": 309.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            },
            {
              "entity": "A Table",
              "identifying": false,
              "optional": true,
              "cardinality": 1,
              "xor": null,
              "name": null,
              "transform": {
                "anchor": {
                  "x": 721.3888883590698,
                  "y": 347.8888883590698,
                  "edge": 0
                },
                "points": [
                  {
                    "x": 715.8888883590698,
                    "y": 309.3888883590698
                  }
                ],
                "manual": false
              },
              "key": "1:a-table",
              "cases": {
                "camelCase": "aTable",
                "kebabCase": "a-table",
                "pascalCase": "ATable"
              },
              "reverse": {
                "entity": "Order Item",
                "identifying": true,
                "optional": false,
                "cardinality": 1,
                "xor": null,
                "name": null,
                "transform": {
                  "anchor": {
                    "x": 710.3888883590698,
                    "y": 270.8888883590698,
                    "edge": 2
                  },
                  "points": [
                    {
                      "x": 715.8888883590698,
                      "y": 309.3888883590698
                    }
                  ],
                  "manual": false
                }
              }
            }
          ]
        ]
      }
    },
    {
      "id": 3,
      "key": "user",
      "entityId": "1:user",
      "datasource": "1",
      "projectId": 1,
      "name": "User",
      "entityItems": [
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "id",
          "type": "text"
        },
        {
          "dbValues": {
            "keyValues": {
              "boolean-primary-key": false,
              "boolean-unique": false,
              "boolean-nullable": false
            }
          },
          "relation": "",
          "regex": "",
          "primitiveType": "string",
          "required": false,
          "isArray": false,
          "ignoreInModel": false,
          "key": "name",
          "type": "text"
        }
      ],
      "erd": {
        "_genId": "oOVojN59lT",
        "name": "User",
        "parent": null,
        "attr": [
          {
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "name": "age",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          },
          {
            "name": "email",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 4
          },
          {
            "name": "firstName",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "name": "lastName",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          }
        ],
        "transform": {
          "x": 150.88888835906982,
          "y": 116.88888835906982,
          "width": 201,
          "height": 215
        },
        "relations": []
      }
    }
  ]