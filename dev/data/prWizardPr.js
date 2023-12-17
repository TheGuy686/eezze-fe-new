module.exports = {
    "info": {
      "projectName": "Test Project",
      "teams": [],
      "hasLogger": true,
      "details": "Test Description",
      "industry": "I.T",
      "stats": [
        {
          "id": 1,
          "key": "last-generated",
          "value": "Nod 6, 2023"
        },
        {
          "id": 2,
          "key": "active-members",
          "value": 5
        },
        {
          "id": 3,
          "key": "number-of-actions",
          "value": 260
        },
        {
          "id": 4,
          "key": "number-of-datasources",
          "value": 20
        },
        {
          "id": 4,
          "key": "deployment-status",
          "value": "active"
        }
      ]
    },
    "connections": [
      {
        "id": null,
        "name": "Test Project Default Server",
        "description": "This is the default setup from the create project scaffold. This server will be the main server that will run the various types of datasources and dependancies",
        "type": "server",
        "metadata": {
          "auth": {
            "type": "rsa-key",
            "credentials": -1,
            "props": {
              "key": "default-con-rsa-key",
            }
          },
          "host": "localhost",
          "serviceTypes": [
            "rest",
            "websocket",
            "cron-task",
            "installable-services"
          ]
        },
        "enabled": true,
        "state": "true"
      }
    ],
    "datasources": [
      {
        "type": "eezze-logger",
        "name": "Test Project Logging Server",
        "description": "This is the default setup from the create project scaffold. This server will route all of the logs to be viewed in the dev pannel on the right hand side of the website",
        "metadata": {
          "connection": 0,
          "path": "/v1",
          "port": 200,
          "localhost": "asdf",
          "host": "localhost",
          "secureProtocol": "wss",
          "protocol": "ws",
          "storeState": false,
          "secure": true,
          "devIsSecure": false
        },
        "initModel": []
      },
      {
        "type": "rest-service",
        "name": "Test Project Default REST Server",
        "description": "This is the default setup from the create project scaffold. This server will host all of the REST endpoints and services",
        "metadata": {
          "connection": 0,
          "path": "/v1",
          "port": 100,
          "localhost": "asdf",
          "host": "localhost",
          "secureProtocol": "wss",
          "protocol": "ws",
          "storeState": false,
          "secure": true,
          "devIsSecure": false
        },
        "initModel": []
      },
      {
        "type": "MySql",
        "name": "Default MySql connection",
        "description": "This is simple boilerplate of a mysql datasource that will act as the default db for this project",
        "metadata": {
          "connection": 0,
          "credentials": -1,
          "logger": -1,
          "host": "localhost",
          "port": 3306
        },
        "initModel": []
      }
    ],
    "roles": [
      {
        "color": "#1a3f91",
        "role": "ryan",
        "description": "this person will do a"
      },
      {
        "color": "#454ab3",
        "role": "persinb",
        "description": "this person will do something else"
      },
      {
        "color": "#9ba1a7",
        "role": "admin",
        "description": "to here"
      }
    ],
    "values": [
      {
        "key": "thisIsJustAKey",
        "value": "I'm not sure what to do from here god"
      },
      {
        "key": "ryanWasHere",
        "value": "Oh yeah"
      }
    ],
    "vault": {
      "accessibleTo": [],
      "updatableTo": [],
      "keyValues": [
        {
          "key": "default-db-user",
          "value": "root",
          "ignoreFromList": true
        },
        {
          "key": "default-db-pass",
          "value": "root",
          "isSecret": true,
          "ignoreFromList": true
        },
        {
          "key": "default-con-user",
          "value": "RyanjCooke@hotmail.com",
          "isSecret": true,
          "ignoreFromList": true
        },
        {
          "key": "default-con-password",
          "value": "Password123",
          "isSecret": true,
          "ignoreFromList": true
        },
        {
          "key": "aCredential",
          "value": "something going on here",
          "isSecret": false,
          "ignoreFromList": false
        },
        {
          "key": "justAPass",
          "value": "this is just a another value",
          "isSecret": true,
          "ignoreFromList": false
        }
      ],
      "name": "Defualt Credentials / Key Values Vault",
      "description": "This is the vault that will be used by default to store any confidential values"
    }
}