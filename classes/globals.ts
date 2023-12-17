import EventsClass from './Events';

require('./prototypes');

const dict = require('./lang/en');

var colors = require('colors/safe');

const urlencode = require('urlencode');

const dateFormat = require('dateformat').default;

let GLB: any = global;

GLB['events'] = new EventsClass();

// String.prototype.ucFirst = function ()
// {
// 	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
// }

// String.prototype.lcFirst = function ()
// {
// 	return this.charAt(0).toLowerCase() + this.slice(1).toLowerCase();
// }

GLB['lcFirst'] = function (str: string) {
	return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
}

GLB['ucFirst'] = function (str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function _replaceBetween(start: number, end: number, str: string, what: string) {
	return str.substring(0, start) + what + str.substring(end);
};

GLB['replaceBetween'] = _replaceBetween;

export function replaceBetween(start: number, end: number, str: string, what: string) {
	return _replaceBetween(start, end, str, what);
}

function _stripHtml(val: string) {
	return val.replace(/(<([^>]+)>)/ig, "");
}

GLB['stripHtml'] = function (val: string) {return _stripHtml(val)}

export function stripHtml(val: string) {return _stripHtml(val)}

GLB['ucFirst'] = function (str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function _getObj(key: string, masterItem: any) {
	try {
		if (typeof masterItem[key] === 'object') {
			return masterItem[key];
		}
		return masterItem.children[key];
	}
	catch (err: any) {
		console.error(`There was an error getting the masterItem "${key}" key val. Error "${err.message}"`, masterItem);
		return {};
	}
}

function _replaceObjectKey (key: string, obj: any, depth: number = 0) {

}

function _replaceObjectKeyMain (key: string, obj: any, delimiter = ':') {
	const bits = key.split(delimiter);

	for (let k of bits) {
		let o: any = _getObj(k, obj);
	}

	return obj;
}

GLB['replaceObjectKey'] = function (key: string, obj: any) {return _replaceObjectKeyMain(key, obj)}

export function replaceObjectKey(key: string, obj: any) {return _replaceObjectKeyMain(key, obj)}

export function _arraySames(arr1: any[] | any, arr2: any[]) {
    if (!arr1 || !arr2) return [];

    if (!Array.isArray(arr1)) {
        throw new Error(`\n\nArrayMethods:arrayDiff: arr1 was not an array. Got: ${arr1}\n`);
    }

    if (!Array.isArray(arr2)) {
        throw new Error(`\n\nArrayMethods:arrayDiff: arr2 was not an array. Got: ${arr2}\n`);
    }

    return arr1.filter(x => arr2.includes(x));
}

export function _objectSames(obj1: any, obj2: any) {
    if (!obj1 || !obj2) return [];

    const obj2Keys = Object.keys(obj2);

    return Object.keys(obj1).filter((k: string) => {
        if (!obj2Keys.includes(k)) return false;

        return obj1[k] == obj2[k];
    });
}

export function arraySames(arr1: any[] | any, arr2: any[]): any { return arraySames(arr1, arr2) }
export function objectSames(obj1: any[] | any, obj2: any[]) { return arraySames(obj1, obj2) }

GLB['arraySames'] = _arraySames;
GLB['objectSames'] = _objectSames;

// String.prototype.toTs = function () {return new Date(this).getTime()}

// GLB['serializeUrl'] = function(path, params)
// {
// 	let urlStr = '', k;

// 	for (k in params) urlStr += `${k}=${urlencode(params[k])}`;

// 	return `${host()}${path}${urlStr != '' ? '?' + urlStr : ''}`;
// }

// GLB['isMobile'] = function ()
// {
// 	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
// 		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
// 	{
// 	    return true;
// 	}

// 	return false;
// }

export function serializeUrl(host: string, path: string, params: any)
{
	let urlStr = '', k;

	for (k in params) urlStr += `${k}=${urlencode(params[k])}`;

	return `${host}${path}${urlStr != '' ? '?' + urlStr : ''}`;
}

export function isMobile()
{
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
	{
	    return true;
	}

	return false;
}

export function error(str: string)
{
	console.error(colors.red(`\n	[ERROR]:`) + colors.red(`\n\n		${str}\n`));
}

export function warn(str: string)
{
	console.warn(colors.warn(`\n	[WARN]:` + ` ${str}\n`));
}

export function success(str: string)
{
	console.warn(colors.green(`\n	[SUCCESS]:` + ` ${str}\n`));
}

export function critical(str: string, killProcess?: Boolean)
{
	if (typeof str === 'object') str = JSON.stringify(str);

	console.error(colors.red(`\n	[CRITICAL]:` + `\n\n		${str}\n`));

	if (killProcess)
	{
		process.exit(1);
	}
}

export function pj(obj: any) {return GLB['pj'](obj)}

export function downloadContentAsFile(filename: string, text: string) {
	return GLB['downloadContentAsFile'](filename, text);
}

export function keyify(dataset: any, key: string | number, keyFormatter?: (item: any, key: string) => string) {
	return keyifyG(dataset, key, keyFormatter);
}

export function objToString(obj: any)
{
	var stack = '';

	for (var property in obj)
	{
		if (obj.hasOwnProperty(property))
		{
			if (typeof obj[property] == "object")
			{
				stack = stack + objToString(obj[property]);
			}
			else
			{
				stack = stack + obj[property] + ' ';
			}
		}
	}

	return String(stack);
}

export function arrayDiff(arr1: any[], arr2: any[]) {
    if (!arr1 || !arr2) return [];

    if (!Array.isArray(arr1)) {
        throw new Error(`\n\nArrayMethods:arrayDiff: arr1 was not an array. Got: ${arr1}\n`);
    }

    if (!Array.isArray(arr2)) {
        throw new Error(`\n\nArrayMethods:arrayDiff: arr2 was not an array. Got: ${arr2}\n`);
    }

    return arr1.filter(x => !arr2.includes(x));
}

GLB['sortArrayByKeys'] = function(obj: any) {
	let keys = Object.keys(obj);

	keys.sort();

	let out: any = {};

	keys.forEach((k: any) => out[k] = obj[k]);

	return out;
}

function _htmlDecode(input: string) {
	let txt = document.createElement("textarea");

	txt.innerHTML = input;

	return txt.value;
}

function keyifyG (dataset: any, key: string | number, keyFormatter?: (item: any, key: string) => string, valueFormatter?: Function) {
	let out: any = {};

    for (let i in dataset)
    {
        if (typeof dataset[i][key] == 'undefined')
        {
            console.warn(
                `Key: ${key} was not defined in ${JSON.stringify(
                    dataset[i],
                    null,
                    4,
                )}. Therefore was skipped and not included in the keyified array`,
            );

            continue;
        }

		if (typeof keyFormatter === 'function') {
			out[keyFormatter(dataset[i], dataset[i][key])] = dataset[i];
			continue;
		}

		if (valueFormatter) {
			out[dataset[i][key]] = valueFormatter(dataset[i]);
		}
		else {
        	out[dataset[i][key]] = dataset[i];
		}
    }

    return out;
}

export function htmlDecode(input: string) {return _htmlDecode(input)}

GLB['keyify'] = keyifyG;

GLB['htmlDecode'] = _htmlDecode;

GLB['convertImgToBase64'] = function(file: any) {
	return new Promise(
		function (resolve, reject) {
			let reader = new FileReader();

			reader.onloadend = function() {resolve(reader.result)}

			reader.readAsDataURL(file);
		}
	);
}

GLB['imageExists'] = function (imageUrl: string){
    var http = new XMLHttpRequest();

    http.open('HEAD', imageUrl, false);
    http.send();

    return http.status != 404;

}

function randColorM () {
	const randomColor = Math.floor(Math.random()*16777215).toString(16);
	return "#" + randomColor;
}

function _maxLen(str: string, maxLen: number) {
	if (str.length <= maxLen) return str;
	return String(str).substr(0, maxLen) + '...';
}

function _tr(key: string, options: any = {}, debug: boolean = false) {
	const k = (key ?? '').toLowerCase(),
		  hasMaxLen = typeof options['maxLen'] == 'number',
		  toUpper = !!options?.toUpper,
		  toLower = !!options?.toLower;

	if (debug) {
		console.clear();
		console.log('Tr args: ', arguments, toUpper);
	}

	if (typeof dict[k] === 'undefined') {
		// console.log('Key did not exist: ', k);
		if (hasMaxLen) {
			if (key.length > options.maxLen) {
				return _maxLen(key, options.maxLen);
			}
		}

		return key;
	}

	let val = dict[k];

	if (Array.isArray(options?.args)) {
		for (let i in options.args) {
			val = val.replaceAll(`%${Number(i) + 1}`, options.args[i]);
		}
	}

	if (hasMaxLen) {
		if (val.length > options.maxLen) {
			val = _maxLen(val, options.maxLen);
		}
	}

	if (toUpper) {
		val = val.toUpperCase();
	}
	else if (toLower) {
		val = val.toLowerCase();
	}

	return val;
}

function _findDuplicates(arr: string[] | number []) {
	let len = arr.length, out: any = [], counts: any = {};

	for (var i = 0;i < len; i++) {
		let item = arr[i];

		counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;

		if (counts[item] === 2) out.push(item);
  	}

	return out;
}

GLB['findDuplicates'] = function (arr: string[] | number []) {return _findDuplicates(arr)}

export function findDuplicates(arr: string[] | number []) {return _findDuplicates(arr)}

function _formatDate(dte: Date | string, format: string) {
	if (typeof dte == 'string') dte = new Date(dte);

	return dateFormat(dte, format);
}

export function formatDate(dte: Date | string, format: string) {return _formatDate(dte, format)}

GLB['formatDate'] = _formatDate;

function _formatBytes(bytes: any, decimals: any = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	if (!sizes?.[i]) {
		return `${Number(bytes.toFixed(decimals))} ${sizes[0]}`;
	}

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes?.[i] ?? ''}`;
}

export function formatBytes(bytes: any, decimals: any = 2) { return _formatBytes(bytes, decimals) }

GLB['formatBytes'] = _formatBytes;

GLB['randColor'] = randColorM;

GLB['tr'] = _tr;

export function tr(key: string, options: any = {}, debug: boolean = false) {return _tr(key, options, debug)};

export function maxLen (key: string, options: any = {}) { return  _maxLen(key, options) };

export function randColor () { return  randColorM() };

export function randDarkColor () { return  _randDarkColor() };

function _convertToUrl(val: string) {
	let v = val.trim()
		.replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();

	return v;
}

GLB['convertToUrl'] = _convertToUrl;

export function convertToUrl(val: string) {return _convertToUrl(val)}

GLB['maxLen'] = function (key: string, options: any = {}) { return  _maxLen(key, options) };

function _getCookie(name: string) {
	var value = '; ' + document.cookie;

	var parts: any = value.split('; ' + name + '=');

	if (parts.length == 2) return parts.pop().split(';').shift();

	return false;
}

export function getCookie(key: string) {return _getCookie(key)}

GLB['getCookie'] = function (key: string) { return _getCookie(key) }

function getExpirationDate(expiration: number) {
	let date = new Date();
	date.setTime(date.getTime() + expiration * 60 * 1000);
	return date.toUTCString();
}

function _setCookie(name: string, value: any, expiration?: number) {
	if (value == '') return;

	let expires = expiration ? '; expires=' + getExpirationDate(expiration) : '';

	if (expiration) {
		var date = new Date();
		date.setTime(date.getTime() + expiration * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}

	document.cookie = name + '=' + value + expires + '; path=/';
}

export function setCookie(key: string, value: any, expires?: number) {return _setCookie(key, value, expires)}

GLB['setCookie'] = function (key: string, value: any, expires?: number) {return _setCookie(key, value, expires)}

export function deleteAllCookies() { return _delAllCookies() }

function _delAllCookies() {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++)
    {
        var cookie = cookies[i];
        let eqPos  = cookie.indexOf('=');
        let name   = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

GLB['deleteAllCookies'] = _delAllCookies;

// GLB['info'] = function (str, showLabel = true, includeStrToLog = true)
// {
// 	if (includeStrToLog) logStr += `\n	[INFO]:	${str}`;

// 	if (showLabel)
// 	{
// 		console.info(`\n	[INFO]:`.bold.white + `	${str}`.white);
// 		return;
// 	}

// 	console.log(`\n	`.bold.white + `	${str}`.white);
// }

// GLB['warning'] = function (str, showLabel = true)
// {
// 	if (showLabel)
// 	{
// 		console.info(`\n	[WARNING]:`.bold.orange + `	${str}`.orange);
// 		return;
// 	}

// 	console.log(`\n	`.bold.orange + `	${str}`.orange);
// }

function _urlify(text: string) {
    const urlRegex = /(?<!@)((http|https|ftp):\/\/|www\.)\S*[^\s.,!(){}[\];'"`<>?]+|(?<![a-zA-Z0-9@])[a-zA-Z0-9.\-]+\.(com|org|net|edu|gov|io|co|info|me|ly|biz|dev)(?![a-zA-Z0-9])/gi;

    return text.replace(urlRegex, function(match) {
        const url = /^(http:\/\/|https:\/\/|ftp:\/\/)/i.test(match) ? match : 'http://' + match;
        return `<a href="${url}" e-type="link" target="_blank" e-val="${url}">${match}</a>`;
    });
}

export function urlify(text: string) {return _urlify(text)}

GLB['urlify'] = function (text: string) {return _urlify(text)}

function _getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomInt(min: number = 1, max: number = 100) {return _getRandomInt(min, max)}

GLB['getRandomInt'] = function (min: number, max: number) {return _getRandomInt(min, max)}

GLB['percentage'] = function (partialValue: number, totalValue: number, parseToNumber: boolean = false) {
	const val = (100 * partialValue) / totalValue;

	if (parseToNumber) return Number(val.toFixed(2));

	return val;
}

GLB['numBetweenRange'] = function (num: number, min: number, max: number) {
	return num >= min && num <= max;
}

GLB['generateRandomString'] = function (length = 10)
{
	var text     = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++)
	{
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

export function generateRandomString(len: number = 5) {return GLB['generateRandomString'](len)};

function _randDarkColor() {
	var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

GLB['randDarkColor'] = function () { return _randDarkColor() }

GLB['randColor'] = function () {
	let clr = '#' + Math.floor(Math.random()*16777215).toString(16);

	if (clr.toLowerCase() == '#fff' || clr.toLowerCase() == '#ffffff')
	{
		return GLB['randColor']();
	}

	return clr;
}

GLB['countArrayLevels'] =  function(arr: any) {

	var total = 0;

	function _cout(arr: any) {
		for (let k in arr) {
			if (typeof arr[k] == 'object') {
				_cout(arr[k]);

				if (!Array.isArray(arr[k])) total++;
			}
		}
	}

	let res = _cout(arr);

	return total;
}

GLB['deleteArrayItemWithCreds'] = function(ia: any, ik: any, iv: any) {

    function recurse(a: any, index: any, isFirstLevel = false) {
		// this should only happen on inner level objects, Not the root object
		if (!isFirstLevel && typeof a == 'object') {
			if (typeof a[ik] != 'undefined' && a[ik] == iv) {
				return true;
			}
		}

        for (const key in a) {
			// here we only want to loop throught to find if there is any
			// inner arrays that we need to process
			if (typeof a[key] != 'object') continue;

			if (recurse(a[key], key, false)) {
				// console.log('A: ', a);
				a.splice(key, 1);
				return true;
			}
        }

		return false;
    }

    return recurse(ia, true);
}

function cmlCase(str: string) {
	str = str.replace(/\W+/g, " ")
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map(word => word.toLowerCase())
	  .join(' ');

	let out = '';

	str.split(' ').forEach(
		(word: string) =>
		{
			// this appends the next word with a capital
			if (out != '')
			{
				out += GLB['ucFirst'](word);
			}
			// here we append the first word as a lowercase
			else
			{
				out += word;
			}
		}
	);

	return out;
}

function psclCase(str: string) {
	if (!str || str == '') return '';
	
	str = (str ?? '').replace(/\W+/g, " ")
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map((word: string) => word.toLowerCase())
	  .join(' ');

	let out = '';

	str.split(' ').forEach((word: string) => out += GLB['ucFirst'](word));

	return out;
}

function _titleCase(str: string) {
	if (!str || str == '') return '';
	
	str = (str ?? '').replace(/\W+/g, " ")
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map((word: string) => word.toLowerCase())
	  .join(' ');

	let out = '';

	str.split(' ').forEach((word: string) => out += GLB['ucFirst'](word) + ' ');

	return out.trim();
}

function psclCaseWithSpaces(str: string) {
	try {
        return str.replace(/_/g, ' ').replace(/\b\w/g, function(l: any){ return l.toUpperCase() });
    }
    catch (e) {return str}
}

function kbbCase(str: string) {
	str = String(str == undefined ? '' : str).replace(/\W+/g, " ")
	  .replace(/_/g, ' ')
	  .split(/ |\B(?=[A-Z])/)
	  .map(word => word.toLowerCase())
	  .join(' ');

	return str.toLowerCase().replace(/ /g, '-');
}

function uUUnderscoreCase(str: string) {
	try {
		// Replace spaces with underscores
		str = str.replace(/\s+/g, '_');

		// Convert to uppercase
		str = str.toUpperCase();

		if (/^[ ]+/.test(str)) str = str.replace(/^\s*/g, '');
		if (/^_/.test(str)) str = str.replace(/^_/, '');
		if (/__$/.test(str)) str = str.replace(/__$/, '_');

		return str;
    }
    catch (e) {return str.toUpperCase()}
}

function _lcUnderscoreCase(str: string) {
	try {
        return str.replace(/ /g, '_')
			.replace(/\b\w/g, function(l: any){ return l.toLowerCase() })
			.toUpperCase();
    }
    catch (e) {return str.toLowerCase()}
}

function _timeSince(dte: string | Date) {

	let d: any;

	if (typeof dte == 'string') d = new Date(dte);
	else {
		d = dte;
	}

	let seconds: any = Math.floor(((new Date() as any) - d) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
	  return Math.floor(interval) + " years";
	}

	interval = seconds / 2592000;
	if (interval > 1) {
	  return Math.floor(interval) + " months";
	}

	interval = seconds / 86400;
	if (interval > 1) {
	  return Math.floor(interval) + " days";
	}

	interval = seconds / 3600;
	if (interval > 1) {
	  return Math.floor(interval) + " hours";
	}

	interval = seconds / 60;
	if (interval > 1) {
	  return Math.floor(interval) + " minutes";
	}

	return Math.floor(seconds) + " seconds";
}

export function timeSince(dte: string | Date) {return _timeSince(dte)}

GLB['timeSince'] = _timeSince;

function _secondsToString(seconds: number) {
	let numyears = Math.floor(seconds / 31536000);
	let numdays = Math.floor((seconds % 31536000) / 86400); 
	let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
	let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	let numseconds = ((((seconds % 31536000) % 86400) % 3600) % 60).toFixed(0);
	
	let out = '';

	if (numyears > 0) out += `${numyears}y`;
	if (numdays > 0) out += ` ${numdays}d`;
	if (numhours > 0) out += ` ${numhours}h`;
	if (numminutes > 0) out += ` ${numminutes}m`;
	
	out += ` ${numseconds}s`;

	return out;
}

export function secondsToString(seconds: number) {return _secondsToString(seconds)}

GLB['secondsToString'] = _secondsToString;

function _imageEists(imageUrl: string){
    var http = new XMLHttpRequest();

    http.open('HEAD', imageUrl, false);
    http.send();

    return http.status != 404;

}

function _convertImgToBase64(file: any) {
	return new Promise(
		function (resolve, reject) {
			let reader = new FileReader();

			reader.onloadend = function() {resolve(reader.result)}

			reader.readAsDataURL(file);
		}
	);
}

function _mask(val: string) {
	let str: string = '';

	for (let i = 0; i < val.length; i++) str += '*';

	return str;
}

export function mask(val: string) { return _mask(val) }
export function imageExists(url: string) {return _imageEists(url)};
export function convertImgToBase64(file: any) {return _convertImgToBase64(file)};

GLB['convertImgToBase64'] = _convertImgToBase64;
GLB['imageExists'] = _imageEists;

export function camelCase(str: string) {return cmlCase(str)}
export function pascalCase(str: string) {return psclCase(str)}
export function pascalCaseWithSpaces(str: string) {return psclCaseWithSpaces(str)}
export function kebabCase(str: string) {return kbbCase(str)}
export function upperUnderscoreCase(str: string) {return uUUnderscoreCase(str)}
export function lcUnderscoreCase(str: string): string {return _lcUnderscoreCase(str)}
export function titleCase(str: string) {return _titleCase(str)}

GLB['camelCase'] = function (str: string) {return cmlCase(str)}

GLB['pascalCase'] = function (str: string) {return psclCase(str)}

GLB['titleCase'] = function (str: string) {return titleCase(str)}

GLB['pascalCaseWithSpaces'] = function (str: string) {return psclCaseWithSpaces(str)}

GLB['kebabCase'] = function (str: string) {return kbbCase(str)}

GLB['upperUnderscoreCase'] = function (str: string) {return uUUnderscoreCase(str)}

GLB['lcUnderscoreCase'] = function (str: string) {return _lcUnderscoreCase(str)}

GLB['mask'] = _mask;

GLB['cloneArray'] = function (arr1: any) {
	let out: any = {};

	for (let k in arr1) {
		out[k] = arr1[k];
	}

	return Object.values(out);
}

GLB['pj'] = function (obj: any) {
	if (typeof obj != 'object') {
		return JSON.stringify([obj], null, 4);
	}

	return JSON.stringify(obj, null, 4);
}

GLB['downloadContentAsFile'] = function (filename: string, text: string) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

// GLB['getStringCases'] = function (str)
// {
	// str = str.replace(/\W+/g, " ")
	//   .replace(/_/g, ' ')
	//   .split(/ |\B(?=[A-Z])/)
	//   .map(word => word.toLowerCase())
	//   .join(' ');

// 	let singular = singularize(str);
// 	let plural   = pluralize(str);

// 	let cases = {
// 		code: convertToStrToCode(str.replace(/ /g, '')).toLowerCase(),
// 		snakeCase: str.replace(/ /g, '-'),
// 		singleWord: str.replace(/ /g, ''),
// 		pascalCase: '',
// 		camelCase: '',
// 		underscoreCase: str.replace(/ /g, '_'),
// 		kebabCase: str.replace(/ /g, '-'),
// 		mysqlKey: str.replace(/\:/g, ' ').replace(/ /g, '_'),
// 		singular: {
// 			singular: singular,
// 			underscore: singular.replace(/ /g, '_'),
// 			pascalCase: '',
// 			camelCase: '',
// 		},
// 		plural: {
// 			plural: plural,
// 			underscore: plural.replace(/ /g, '_'),
// 			pascalCase: '',
// 			camelCase: '',
// 		},
// 	};

// 	str.split(' ').forEach(
// 		(word) =>
// 		{
// 			// this appends the next word with a capital
// 			if (cases['camelCase'] != '')
// 			{
// 				cases['camelCase'] += word.ucFirst();
// 			}
// 			// here we append the first word as a lowercase
// 			else
// 			{
// 				cases['camelCase'] += word;
// 			}

// 			cases['pascalCase'] += word.ucFirst()
// 		}
// 	);

	// singular.split(' ').forEach(
	// 	(word) =>
	// 	{
	// 		// this appends the next word with a capital
	// 		if (cases['singular']['camelCase'] != '')
	// 		{
	// 			cases['singular']['camelCase'] += word.ucFirst();
	// 		}
	// 		// here we append the first word as a lowercase
	// 		else
	// 		{
	// 			cases['singular']['camelCase'] += word;
	// 		}

	// 		cases['singular']['pascalCase'] += word.ucFirst()
	// 	}
	// );

// 	plural.split(' ').forEach(
// 		(word) =>
// 		{
// 			// this appends the next word with a capital
// 			if (cases['plural']['camelCase'] != '')
// 			{
// 				cases['plural']['camelCase'] += word.ucFirst();
// 			}
// 			// here we append the first word as a lowercase
// 			else
// 			{
// 				cases['plural']['camelCase'] += word;
// 			}

// 			cases['plural']['pascalCase'] += word.ucFirst()
// 		}
// 	);

// 	cases.singular['mysqlKey'] = singular.replace(/\:/g, ' ').replace(/ /g, '_');
// 	cases.plural['mysqlKey']   = plural.replace(/\:/g, ' ').replace(/ /g, '_');

// 	return cases;
// }