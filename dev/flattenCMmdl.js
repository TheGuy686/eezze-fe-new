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
                "title": "Accessed From Browser"
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
                "title": "Ip Address"
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
                "title": "Method"
            },
            "headers": {
                "groupId": "eezze",
                "id": "headers",
                "title": "Headers",
                "type": "dynamice-list",
                "key": "adm.request.requestHeaders",
                "children": {}
            },
            "cookies": {
                "groupId": "eezze",
                "id": "cookies",
                "title": "Cookies",
                "type": "dynamice-list",
                "key": "adm.request.cookies",
                "children": {}
            },
            "session": {
                "groupId": "eezze",
                "id": "session",
                "title": "Session",
                "type": "dynamice-list",
                "key": "adm.request.session",
                "children": {}
            },
            "url-params": {
                "groupId": "eezze",
                "id": "url-params",
                "type": "dynamice-list",
                "key": "adm.request.urlParams",
                "title": "Url Params",
                "helpText": "All these variables are what is accessible from the url paramaters. For eg. If a user accesses the website from a url that has a var called \"example\" then here is where we would access that variable by adding a propery into this list with the exact expected name.",
                "children": {
                    "some-param-1": {
                        "groupId": "eezze",
                        "id": "some-param-1",
                        "title": "Some Param 1"
                    },
                    "some-param-2": {
                        "groupId": "eezze",
                        "id": "some-param-2",
                        "title": "Some Param 2"
                    }
                }
            },
            "body": {
                "id": "body",
                "title": "Request Body",
                "type": "dynamice-list",
                "key": "adm.request.requestBody",
                "helpText": "All these variables are what is accessible from the request body. For eg. If a user accesses the website with a \"request body enabled request (POST, PUT ...)\" that has a var called \"example\" then here is where we would access that variable by adding a propery into this list with the exact expected name.",
                "children": {
                    "username": {
                        "id": "username",
                        "title": "Username"
                    },
                    "password": {
                        "id": "password",
                        "title": "Password"
                    }
                }
            }
        }
    }
]

function flattenMdl(mdl, out = {}) {
    for (let c of mdl) {
        if (typeof c?.children == 'object') {
            const children = Object.values(c.children);
            // return flattenMdl(Object.values(c.children), out, level);
            flattenMdl(children, out);
            continue;
        }
        if (typeof c?.key == 'undefined') continue;

        out[c.key] = c.title;
    }

    return out;
}

console.log(' --------------------------------------------------------------- ');
console.log('                                                         ');
console.log('                                                         ');
console.log('                                                         ');
console.log('                                                         ');
console.log('                                                         ');
console.log('Here',  flattenMdl(MDL));