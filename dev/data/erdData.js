module.exports = {
  data: {
    "entities": [
      {
        "_genId": "oOVojN59lT",
        "name": "User",
        "parent": null,
        "attr": [
          {
            "__eezzeId": '28',
            "name": "id2",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "__eezzeId": '200',
            "name": "age",
            "primary": false,
            "unique": true,
            "nullable": false,
            "pos": 0
          }
        ],
        "transform": {
          "x": 150.88888835906982,
          "y": 116.88888835906982,
          "width": 201,
          "height": 215
        }
      },
      {
        "_genId": "NtX71InpnI",
        "name": "A Table 2",
        "parent": null,
        "attr": [
          {
            "__eezzeId": '1',
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "__eezzeId": '2',
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "__eezzeId": '3',
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "__eezzeId": '4',
            "name": "prop3",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          },
          {
            "__eezzeId": '5',
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
        }
      },
      {
        "_genId": "WG9YZzZ6hF",
        "name": "Address",
        "parent": null,
        "attr": [
          {
            "__eezzeId": '6',
            "name": "id",
            "primary": false,
            "unique": true,
            "nullable": false,
            "pos": 4
          },
          {
            "__eezzeId": '7',
            "name": "addressLine1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "__eezzeId": '8',
            "name": "addressLine2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "__eezzeId": '9',
            "name": "ownedBy",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 5
          },
          {
            "__eezzeId": '10',
            "name": "postCode",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "__eezzeId": '11',
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
        }
      },
      {
        "_genId": "zZmaRBfX5W",
        "name": "Category",
        "parent": null,
        "attr": [
          {
            "__eezzeId": '12',
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "__eezzeId": '13',
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "__eezzeId": '14',
            "name": "prop3",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "__eezzeId": '15',
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
        }
      },
      {
        "_genId": "YAmKfQX070",
        "name": "Order",
        "parent": null,
        "attr": [
          {
            "__eezzeId": '16',
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "__eezzeId": '17',
            "name": "orderedBy",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "__eezzeId": '18',
            "name": "addressId",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 4
          },
          {
            "__eezzeId": '19',
            "name": "date",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 1
          },
          {
            "__eezzeId": '20',
            "name": "orderedAt",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 5
          },
          {
            "__eezzeId": '21',
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
        }
      },
      {
        "_genId": "ddzS9K9Bn4",
        "name": "Order Item",
        "parent": null,
        "attr": [
          {
            "__eezzeId": '22',
            "name": "id",
            "primary": true,
            "unique": false,
            "nullable": false,
            "pos": 0
          },
          {
            "__eezzeId": '23',
            "name": "amount",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 2
          },
          {
            "__eezzeId": '24',
            "name": "prop1",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 3
          },
          {
            "__eezzeId": '25',
            "name": "prop2",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 4
          },
          {
            "__eezzeId": '26',
            "name": "prop3",
            "primary": false,
            "unique": false,
            "nullable": false,
            "pos": 5
          },
          {
            "__eezzeId": '27',
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
        }
      }
    ],
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
          }
        },
        {
          "entity": "A Table 2",
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
      ],
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
          }
        }
      ],
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
          }
        }
      ],
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
          }
        }
      ]
    ],
    "notes": []
  }
}