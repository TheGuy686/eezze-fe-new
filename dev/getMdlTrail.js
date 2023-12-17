console.clear();
console.clear();
console.clear();
console.clear();

const MDL = [
    {
        "groupId": "actions",
        "id": "action-1",
        "title": "Action 1",
        "children": {
            "result": {
                "groupId": "actions",
                "id": "result",
                "title": "Result",
                "type": "object",
                "children": {
                    "full-path2": {
                        "groupId": "actions",
                        "id": "full-path2",
                        "title": "Full Path 2"
                    },
                    "full-url2": {
                        "groupId": "actions",
                        "id": "full-url2",
                        "title": "Full Url 2"
                    }
                }
            },
            "success-message": {
                "groupId": "actions",
                "id": "success-message",
                "title": "Success Message"
            },
            "success-response-code": {
                "groupId": "actions",
                "id": "success-response-code",
                "title": "Success Response Code"
            },
            "error-message": {
                "groupId": "actions",
                "id": "error-message",
                "title": "Error Message"
            },
            "error-response-code": {
                "groupId": "actions",
                "id": "error-response-code",
                "title": "Error Response Code"
            }
        }
    },
    {
        "groupId": "actions",
        "id": "action-2",
        "title": "Action 2",
        "children": {
            "result2": {
                "groupId": "actions",
                "id": "result2",
                "title": "Result",
                "type": "list",
                "disableInputIfNotKeys": [
                    "success-message3",
                    "success-response-code3",
                    "error-message3",
                    "error-response-code3"
                ],
                "children": {
                    "full-path3": {
                        "groupId": "actions",
                        "id": "full-path3",
                        "title": "Full Path 3"
                    },
                    "full-url3": {
                        "groupId": "actions",
                        "id": "full-url3",
                        "title": "Full Url 3"
                    }
                }
            },
            "success-message3": {
                "groupId": "actions",
                "id": "success-message3",
                "title": "Success Message"
            },
            "success-response-code3": {
                "groupId": "actions",
                "id": "success-response-code3",
                "title": "Success Response Code"
            },
            "error-message3": {
                "groupId": "actions",
                "id": "error-message3",
                "title": "Error Message"
            },
            "error-response-code3": {
                "groupId": "actions",
                "id": "error-response-code3",
                "title": "Error Response Code"
            }
        }
    },
    {
        "groupId": "eezze",
        "id": "request",
        "title": "Request",
        "helpText": "request-help-text",
        "children": {
            "accessed-from-browser": {
                "groupId": "eezze",
                "id": "accessed-from-browser",
                "key": "adm.request.accessedFromBrowser",
                "title": "Accessed from Browser"
            },
            "host": {
                "groupId": "eezze",
                "id": "host",
                "key": "adm.request.host",
                "title": "Host"
            },
            "ip-address": {
                "groupId": "eezze",
                "id": "ip-address",
                "key": "adm.request.requestIp",
                "title": "IP Address"
            },
            "full-path": {
                "groupId": "eezze",
                "id": "full-path",
                "key": "adm.request.urlPath",
                "title": "Full Path"
            },
            "full-url": {
                "groupId": "eezze",
                "id": "full-url",
                "key": "adm.request.fullUrl",
                "title": "Full Url"
            },
            "method": {
                "groupId": "eezze",
                "id": "method",
                "key": "adm.request.method",
                "title": "method"
            },
            "headers": {
                "groupId": "eezze",
                "id": "headers",
                "title": "Headers",
                "type": "dynamice-list",
                "key": "adm.request.requestHeaders",
                "children": [
                    {
                        "groupId": "eezze",
                        "id": "ndx2FKc1J1",
                        "isDynamicItem": true,
                        "dlKey": "adm.request.requestHeaders",
                        "key": "adm.request.requestHeaders.authorization",
                        "title": "authorization"
                    },
                    {
                        "groupId": "eezze",
                        "id": "Yv5O6QKWLo",
                        "isDynamicItem": true,
                        "dlKey": "adm.request.requestHeaders",
                        "key": "adm.request.requestHeaders.anotherHeader",
                        "title": "anotherHeader"
                    }
                ]
            },
            "cookies": {
                "groupId": "eezze",
                "id": "cookies",
                "title": "Cookies",
                "type": "dynamice-list",
                "key": "adm.request.cookies",
                "children": {}
            },
            "url-params": {
                "groupId": "eezze",
                "id": "url-params",
                "type": "dynamice-list",
                "key": "adm.request.urlParams",
                "title": "Url Params",
                "helpText": "All these variables are what is accessible from the url paramaters. For eg. If a user accesses the website from a url that has a var called \"example\" then here is where we would access that variable by adding a propery into this list with the exact expected name.",
                "children": {}
            },
            "body": {
                "id": "body",
                "title": "Request Body",
                "type": "dynamice-list",
                "key": "adm.request.requestBody",
                "helpText": "All these variables are what is accessible from the request body. For eg. If a user accesses the website with a \"request body enabled request (POST, PUT ...)\" that has a var called \"example\" then here is where we would access that variable by adding a propery into this list with the exact expected name.",
                "children": {}
            }
        }
    }
];

const val = 'adm.request.requestHeaders.authorization';

console.log(' ------------------------------------------------- ');
console.log('                           ');
console.log('                           ');
console.log('                           ');
console.log('                           ');

function getTreeMdl(mdl, out, value, parent) {
    for (let item of Object.values(mdl)) {
        if (typeof item?.children === 'object') {
            const found = getTreeMdl(item.children, out, value, item);

            if (found) {
                if (typeof parent == 'object' && !out.includes(parent.id)) {
                    out.push(parent.id);
                }

                out.push(item.id);
            }
        }
        else {
            if (item.key === value) {
                console.log('found a value');

                out.push(item.groupId);

                return true;
            }
        }
    }
}

let out = [];

getTreeMdl(MDL, out, val);

console.log('OUT: ', out);