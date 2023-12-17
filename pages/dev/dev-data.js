module.exports = [
  {
    "id": "action-0",
    "property": "filename",
    "name": "New Item Default",
    "desc": "New Item Default Desc",
    "type": "string",
    "actions": [
      {
        "id": "action-inner",
        "property": "filename",
        "name": "Action 1",
        "type": "string",
        "actions": [
          {
            "id": "ryans-logic-0-here",
            "type": "number-operation",
            "name": "Logic item \"0\"",
            "logic": {
              "subtype": "calculation",
              "formula": "96*3${1}${2}",
              "raw": "96*3${1}${2}",
              "resultPreview": 34368,
              "variables": {
                "v1": {
                  "pos": 1,
                  "color": "#462f7d",
                  "alias": "${1}",
                  "value": "adm.request.host",
                  "example": 5,
                  "format": {}
                },
                "v2": {
                  "pos": 2,
                  "color": "#5c1174",
                  "alias": "${2}",
                  "value": "adm.request.requestIp",
                  "example": 8,
                  "format": {}
                }
              },
              "spanPreview": "<span>9</span><span>6</span><span>x</span><span>3</span><span style=\"color: #462f7d;\">${1}</span><span style=\"color: #5c1174;\">${2}</span>",
              "prop": "RYAN"
            },
            "returns": "string",
            "actions": []
          },
          {
            "id": "undefined-logic-0-logic-1",
            "type": "set-stash-values",
            "name": "Logic item \"1\"",
            "logic": {
              "raw": "",
              "formula": "",
              "source": "",
              "prop": "",
              "type": "",
              "subtype": "",
              "variables": [],
              "opArgs": []
            },
            "returns": "string",
            "actions": [
              {
                "id": "act-0",
                "type": "custom",
                "logic": {
                  "subtype": "",
                  "prop": "ryan",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "",
                  "opArgs": [],
                  "variables": []
                },
                "returns": "text",
                "actions": []
              },
              {
                "id": "act-1",
                "type": "formatter",
                "logic": {
                  "subtype": "date-interpolate",
                  "prop": "here",
                  "format": "custom",
                  "formula": "",
                  "source": "host",
                  "example": "01/10/2020",
                  "raw": "${1}${2}",
                  "opArgs": [],
                  "variables": [
                    {
                      "pos": 1,
                      "id": 1,
                      "color": "#743b6c",
                      "format": {
                        "group": "year",
                        "value": "YY"
                      },
                      "value": "host",
                      "example": "22"
                    },
                    {
                      "pos": 2,
                      "id": 2,
                      "color": "red",
                      "format": {
                        "group": "year",
                        "value": "YY"
                      },
                      "value": "host",
                      "example": "22"
                    }
                  ]
                },
                "returns": "text",
                "actions": []
              }
            ]
          },
          {
            "id": "action-inner-logic-2",
            "type": "number-operation",
            "name": "Logic item \"2\"",
            "logic": {
              "raw": "",
              "formula": "",
              "source": "",
              "prop": "",
              "type": "",
              "subtype": "addition",
              "variables": [],
              "opArgs": [
                {
                  "value": "C7zDTyxljp",
                  "example": 40
                },
                {
                  "value": "ip-address",
                  "example": 63
                }
              ]
            },
            "returns": "string",
            "actions": []
          },
          {
            "id": "action-inner-logic-3",
            "type": "assign-values",
            "name": "Logic item \"3\"",
            "logic": {
              "raw": "",
              "formula": "",
              "source": "",
              "prop": "",
              "type": "",
              "subtype": "",
              "variables": [],
              "opArgs": []
            },
            "returns": "string",
            "actions": [
              {
                "id": "act-0",
                "type": "number-operation",
                "logic": {
                  "subtype": "addition",
                  "prop": "prop1",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "",
                  "opArgs": [
                    {
                      "value": "full-url",
                      "example": 68
                    },
                    {
                      "value": "method",
                      "example": 98
                    }
                  ],
                  "variables": []
                },
                "returns": "number",
                "actions": []
              },
              {
                "id": "act-1",
                "type": "formatter",
                "logic": {
                  "subtype": "string-interpolate",
                  "prop": "prop2",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "hell there \"${1}\"",
                  "opArgs": [],
                  "variables": [
                    {
                      "pos": 1,
                      "id": 1,
                      "color": "#5d744c",
                      "format": {},
                      "value": "host",
                      "example": "ryan"
                    }
                  ]
                },
                "returns": "text",
                "actions": []
              },
              {
                "id": "act-2",
                "type": "formatter",
                "logic": {
                  "prop": "prop3",
                  "raw": "${1}-${2}/${3}",
                  "format": "custom",
                  "formula": "",
                  "type": "formatter",
                  "subtype": "date-interpolate",
                  "opArgs": [],
                  "variables": [
                    {
                      "pos": 1,
                      "id": 1,
                      "color": "#21655d",
                      "format": {},
                      "value": "accessed-from-browser",
                      "example": "1"
                    },
                    {
                      "pos": 2,
                      "id": 2,
                      "color": "#864676",
                      "format": {},
                      "value": "full-url",
                      "example": "2"
                    },
                    {
                      "pos": 3,
                      "id": 3,
                      "color": "#bfb2b3",
                      "format": {},
                      "value": "full-url",
                      "example": "am"
                    }
                  ],
                  "source": "host",
                  "example": "2023-02-22"
                },
                "returns": "text",
                "actions": []
              },
              {
                "id": "act-3",
                "type": "assign-primitive",
                "logic": {
                  "subtype": "text",
                  "prop": "prop4",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "hello there",
                  "opArgs": [],
                  "variables": []
                },
                "returns": {
                  "index": "0",
                  "option": {
                    "key": "text",
                    "label": "TEXT",
                    "color": "#8B0000"
                  },
                  "value": "text"
                },
                "actions": []
              },
              {
                "id": "act-4",
                "type": "assign-primitive",
                "logic": {
                  "subtype": "boolean",
                  "prop": "prop5",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": [
                    {
                      "type": "condition",
                      "operator": "is-true",
                      "opArgs": [
                        {
                          "id": "is-true",
                          "type": "text",
                          "value": "host",
                          "example": "ryan"
                        }
                      ]
                    },
                    {
                      "type": "linker",
                      "operator": "and",
                      "opArgs": []
                    },
                    {
                      "type": "condition-group",
                      "opArgs": [],
                      "group": [
                        {
                          "type": "condition",
                          "operator": "equals-to",
                          "opArgs": [
                            {
                              "id": "equals-to",
                              "type": "number",
                              "value": "accessed-from-browser",
                              "example": "2"
                            },
                            {
                              "id": "equals-to",
                              "type": "number",
                              "value": "ip-address",
                              "example": "2"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "opArgs": [],
                  "variables": []
                },
                "returns": {
                  "index": "2",
                  "option": {
                    "key": "boolean",
                    "label": "BOOLEAN",
                    "color": "#5C5CB5"
                  },
                  "value": "boolean"
                },
                "actions": []
              },
              {
                "id": "act-5",
                "type": "assign-primitive",
                "logic": {
                  "subtype": "date",
                  "prop": "prop6",
                  "format": "DD/MM/YYYY",
                  "formula": "",
                  "source": "now",
                  "example": "01/10/2020",
                  "raw": "",
                  "opArgs": [],
                  "variables": []
                },
                "returns": {
                  "index": "3",
                  "option": {
                    "key": "date",
                    "label": "DATE",
                    "color": "#f50"
                  },
                  "value": "date"
                },
                "actions": []
              },
              {
                "id": "act-6",
                "type": "assign-primitive",
                "logic": {
                  "subtype": "object",
                  "prop": "prop7",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": [
                    {
                      "key": "ryan",
                      "value": "",
                      "returns": "object",
                      "data": [
                        {
                          "key": "was",
                          "value": "",
                          "returns": "object",
                          "data": [
                            {
                              "key": "here",
                              "value": "",
                              "returns": "object",
                              "data": [
                                {
                                  "key": "today",
                                  "value": "",
                                  "returns": "object",
                                  "data": []
                                }
                              ]
                            },
                            {
                              "key": "again",
                              "value": "method",
                              "returns": "text",
                              "data": []
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "opArgs": [],
                  "variables": []
                },
                "returns": {
                  "index": "4",
                  "option": {
                    "key": "object",
                    "label": "OBJECT",
                    "color": "#C90B0B"
                  },
                  "value": "object"
                },
                "actions": []
              },
              {
                "id": "act-7",
                "type": "assign-primitive",
                "logic": {
                  "subtype": "list",
                  "prop": "prop8",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "assign-even-number-list-to-range",
                  "opArgs": [
                    {
                      "value": "accessed-from-browser",
                      "example": 1
                    },
                    {
                      "value": "host",
                      "example": 100
                    }
                  ],
                  "variables": []
                },
                "returns": {
                  "index": "5",
                  "option": {
                    "key": "list",
                    "label": "LIST",
                    "color": "#87d068"
                  },
                  "value": "list"
                },
                "actions": []
              }
            ]
          },
          {
            "id": "action-inner-logic-4",
            "type": "formatter",
            "name": "Logic item \"4\"",
            "logic": {
              "subtype": "string-interpolate",
              "raw": "hello there \"${1}\"",
              "formula": "",
              "format": {},
              "source": "",
              "prop": "",
              "variables": [
                {
                  "pos": 1,
                  "id": 1,
                  "color": "#57695b",
                  "format": {},
                  "value": "accessed-from-browser",
                  "example": "TcI8C"
                }
              ],
              "opArgs": []
            },
            "returns": "text",
            "actions": []
          },
          {
            "id": "action-inner-logic-5",
            "type": "formatter",
            "name": "Logic item \"5\"",
            "logic": {
              "subtype": "date-interpolate",
              "raw": "",
              "formula": "",
              "format": "DD/MM/YYYY",
              "source": "host",
              "prop": "",
              "variables": [],
              "opArgs": [],
              "example": "01/10/2020"
            },
            "returns": "text",
            "actions": []
          },
          {
            "id": "action-inner-logic-6",
            "type": "formatter",
            "name": "Logic item \"6\"",
            "logic": {
              "subtype": "number",
              "raw": "2078${1}${2}",
              "formula": "",
              "format": {},
              "source": "",
              "prop": "",
              "variables": [
                {
                  "pos": 1,
                  "id": 1,
                  "color": "#693a19",
                  "format": {},
                  "value": "ip-address",
                  "example": 96
                },
                {
                  "pos": 2,
                  "id": 2,
                  "color": "#8a9e1a",
                  "format": {},
                  "value": "full-path",
                  "example": 46
                }
              ],
              "opArgs": []
            },
            "returns": "number",
            "actions": []
          },
          {
            "id": "action-inner-logic-7",
            "type": "formatter",
            "name": "Logic item \"7\"",
            "logic": {
              "subtype": "object",
              "raw": [
                {
                  "key": "ryan",
                  "value": "host",
                  "returns": "text",
                  "data": []
                },
                {
                  "key": "was",
                  "value": "",
                  "returns": "object",
                  "data": [
                    {
                      "key": "again",
                      "value": "method",
                      "returns": "text",
                      "data": []
                    },
                    {
                      "key": "and",
                      "value": "full-url",
                      "returns": "text",
                      "data": []
                    },
                    {
                      "key": "yesterday",
                      "value": "",
                      "returns": "object",
                      "data": [
                        {
                          "key": "hello",
                          "value": "",
                          "returns": "object",
                          "data": [
                            {
                              "key": "cOOKE",
                              "value": "full-path",
                              "returns": "text",
                              "data": []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              "formula": "",
              "format": {},
              "source": "",
              "prop": "",
              "variables": [],
              "opArgs": []
            },
            "returns": "number",
            "actions": []
          },
          {
            "id": "action-inner-logic-8",
            "type": "list-process",
            "name": "Logic item \"8\"",
            "logic": {
              "raw": "ip-address",
              "formula": "",
              "source": "",
              "prop": "",
              "type": "",
              "subtype": "",
              "variables": [],
              "opArgs": []
            },
            "returns": "string",
            "actions": [
              {
                "id": "action-inner-logic-8-logic-0",
                "type": "custom",
                "name": "Logic item \"0\"",
                "logic": {
                  "raw": "\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst ryan = 'hello';\n\n\n\n\n\n\n\n\n\n",
                  "formula": "",
                  "source": "",
                  "prop": "",
                  "type": "",
                  "subtype": "",
                  "variables": [],
                  "opArgs": []
                },
                "returns": "string",
                "actions": []
              }
            ]
          },
          {
            "id": "action-inner-logic-9",
            "type": "set-state-values",
            "name": "Logic item \"9\"",
            "logic": {
              "raw": "",
              "formula": "",
              "source": "",
              "prop": "",
              "type": "",
              "subtype": "",
              "variables": [],
              "opArgs": []
            },
            "returns": "string",
            "actions": [
              {
                "id": "act-0",
                "type": "custom",
                "logic": {
                  "subtype": "",
                  "prop": "prop2",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "\n\n\n\n\nconst ryan = 'hello there';\n\n\nreturn ryan;\n\n\n\n\n\n\n\n\n",
                  "opArgs": [],
                  "variables": []
                },
                "returns": "text",
                "actions": []
              }
            ]
          },
          {
            "id": "action-inner-logic-10",
            "type": "set-stash-values",
            "name": "Logic item \"10\"",
            "logic": {
              "raw": "",
              "formula": "",
              "source": "",
              "prop": "",
              "type": "",
              "subtype": "",
              "variables": [],
              "opArgs": []
            },
            "returns": "string",
            "actions": [
              {
                "id": "act-0",
                "type": "assign-primitive",
                "logic": {
                  "subtype": "text",
                  "prop": "propWhatever",
                  "format": "",
                  "formula": "",
                  "source": "",
                  "example": "",
                  "raw": "hello there",
                  "opArgs": [],
                  "variables": []
                },
                "returns": {
                  "index": "0",
                  "option": {
                    "key": "text",
                    "label": "TEXT",
                    "color": "#8B0000"
                  },
                  "value": "text"
                },
                "actions": []
              }
            ]
          }
        ]
      }
    ]
  }
]