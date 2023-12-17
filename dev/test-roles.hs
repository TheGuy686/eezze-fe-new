const input = `I would like to have a website which admin and users and use to loging. admin will be able to do ... and the users will be able to ...`;

const output = (async (input) => {

    if (input) {
        let roles = [];

        if (/[i|I]\s*would\s*like\s*to\s*have([a-zA-Z0-9 ]+)/.test(input)) {
            // ... do something
        }
        else if (/[i|I]\s*would\s*like\s*to\s*have([a-zA-Z0-9 ]+)/.test(input)) {
            // ... do something
        }
    }

})(input);

console.log('OUTPUT: ', output);

// nodemon -e ts,js --exec './my-script.js'