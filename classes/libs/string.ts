const urlencode = require('urlencode'),
	  Pluralize   = require('pluralize'),
	  singularize = require('@nathanfaucett/singularize'),
	  inflections = require('@nathanfaucett/inflections');

let en = inflections('en');

export function generateRandomString(length = 10) {
	let text     = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++)
	{
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

export function serializeUrl(host: string, path: string = '', params: any = {}, returnAsObject: boolean = false) {
	if (arguments.length < 2) {
        console.error('serializeUrl needs a path and params arg. Please supply both arguments');
        process.exit();
    }

	let paramsIn: string[] = [], k;

	for (k in params) {
		paramsIn.push(`${k}=${urlencode(params[k])}`);
	}

	if (returnAsObject) {
		return {
			host: host,
			path: path,
			params: paramsIn.length > 0 ? `?${paramsIn.join('&')}` : '',
		};
	}

	return `${host}${path}${paramsIn.length > 0 ? `?${paramsIn.join('&')}` : ''}`;
}

export function ucFirst(str: string) : string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pluralize(str: string) {
	return Pluralize(str);
}

export function lcFirst(str: string) : string {
	return str.charAt(0).toLowerCase() + str.slice(1);
}

export function convertStrToKey(str: string) : string {
	return String(str.replace(/[^0-9a-z]/gi, '').replace(/ /gi, ' ').toLowerCase());
}

export function randColor() : string {
	const clr = '#' + Math.floor(Math.random()*16777215).toString(16);

	if (clr.toLowerCase() == '#fff' || clr.toLowerCase() == '#ffffff')
	{
		return randColor();
	}

	return clr;
}

export function space(x: number) {
	let res = '';
	while (x--) {
		res += ' ';
	}
	return res;
}

export function getUniqueId() {
	const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	return s4() + s4() + '-' + s4();
};

export function kebabCase(str: string) {
	str = str.replace(/\W+/g, ' ')
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map(word => word.toLowerCase())
	  .join(' ');

	return str.replace(/ /g, '-');
}

export function pascalCase(str: string) {
	let words = str.replace(/\W+/g, ' ')
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map((word: string, index: number) => index == 0 ? word.toLowerCase() : ucFirst(word))
	  .join('');

	return ucFirst(words);
}

export function camelCase(str: string) {
	let words = str.replace(/\W+/g, ' ')
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map((word: string, index: number) => index == 0 ? word.toLowerCase() : ucFirst(word))
	  .join('');

	return lcFirst(words);
}

export function convertToStrToCode (str: string) {
	const tmp = str.split(' ');

	if (tmp.length < 3) {
		return str.substr(0, 3).toUpperCase();
	}

	let word,
		out = '';

	const skips = ['is', 'it', 'the', 'of', 'a', 'and', 'as', 'not'];

	for (word of tmp) {
		if (skips.indexOf(word) >= 0) continue;

		const matches: any = word.match(/^[a-zA-Z0-9]{1}/);

		out += matches[0];
	}

	return out.toUpperCase();
};

export function getStringCases(str: string) {
	str = str.replace(/\W+/g, ' ')
		.replace(/_/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map(word => word.toLowerCase())
		.join(' ');

	const singular = singularize(str);
	const plural   = pluralize(str);

	const cases: any = {
		code: convertToStrToCode(str.replace(/ /g, '')).toLowerCase(),
		snakeCase: str.replace(/ /g, '-'),
		singleWord: str.replace(/ /g, ''),
		pascalCase: '',
		camelCase: '',
		underscoreCase: str.replace(/ /g, '_'),
		kebabCase: str.replace(/ /g, '-'),
		mysqlKey: str.replace(/\:/g, ' ').replace(/ /g, '_'),
		singular: {
			singular,
			underscore: singular.replace(/ /g, '_'),
			pascalCase: '',
			camelCase: '',
		},
		plural: {
			plural,
			underscore: plural.replace(/ /g, '_'),
			pascalCase: '',
			camelCase: '',
		},
	};

	str.split(' ').forEach(
		(word) =>
		{
			// this appends the next word with a capital
			if (cases.camelCase != '') {
				cases.camelCase += ucFirst(word);
			}
			// here we append the first word as a lowercase
			else {
				cases.camelCase += word;
			}

			cases.pascalCase += ucFirst(word);
		}
	);

	singular.split(' ').forEach(
		(word: string) => {
			// this appends the next word with a capital
			if (cases.singular.camelCase != '')
			{
				cases.singular.camelCase += ucFirst(word);
			}
			// here we append the first word as a lowercase
			else {
				cases.singular.camelCase += word;
			}

			cases.singular.pascalCase += ucFirst(word);
		}
	);

	plural.split(' ').forEach(
		(word: string) => {
			// this appends the next word with a capital
			if (cases.plural.camelCase != '') {
				cases.plural.camelCase += ucFirst(word);
			}
			// here we append the first word as a lowercase
			else {
				cases.plural.camelCase += word;
			}

			cases.plural.pascalCase += ucFirst(word);
		}
	);

	cases.singular.mysqlKey = singular.replace(/\:/g, ' ').replace(/ /g, '_');
	cases.plural.mysqlKey   = plural.replace(/\:/g, ' ').replace(/ /g, '_');

	return cases;
}

export function randDarkColor () {
    const lum = -0.25;
    let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let rgb = '#', c, i;

    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }
    return rgb;
}