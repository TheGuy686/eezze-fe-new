const { TwingEnvironment, TwingLoaderArray, TwingFilter } = require('twing');
import {decode} from 'html-entities';

const marked = require('marked'), hljs = require('highlight.js');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code: any, lang: any) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: true,
    smartypants: true,
    xhtml: true
});

import {
    camelCase,
    kebabCase,
    pascalCase,
    randColor,
    randDarkColor,
    convertStrToKey,
    ucFirst,
    lcFirst,
    singularize,
    pluralize,
    generateRandomString,
    convertToStrToCode,
} from '~/classes/StringMethods';

let camelCaseFilter = new TwingFilter('camelCase', (str: string) => Promise.resolve(camelCase(str)));
let kebabCaseFilter = new TwingFilter('kebabCase', (str: string) => Promise.resolve(kebabCase(str)));
let pascalCaseFilter = new TwingFilter('pascalCase', (str: string) => Promise.resolve(pascalCase(str)));
let ucFirstFilter = new TwingFilter('ucFirst', (str: string) => Promise.resolve(ucFirst(str)));
let lcFirstFilter = new TwingFilter('lcFirst', (str: string) => Promise.resolve(lcFirst(str)));
let singularizeFilter = new TwingFilter('singularize', (str: string) => Promise.resolve(singularize(str)));
let pluralizeFilter = new TwingFilter('pluralize', (str: string) => Promise.resolve(pluralize(str)));

const tplMethods = {
    pj(obj: any) {
        return JSON.stringify(obj, null, 4);
    },
    camelCase(str: string) {return camelCase(str)},
    kebabCase(str: string) {return kebabCase(str)},
    pascalCase(str: string) {return pascalCase(str)},
    randColor() {return randColor()},
    randDarkColor() {return randDarkColor()},
    convertStrToKey(str: string) {return convertStrToKey(str)},
    ucFirst(str: string) {return ucFirst(str)},
    lcFirst(str: string) {return lcFirst(str)},
    singularize(str: string) {return singularize(str)},
    pluralize(str: string) {return pluralize(str)},
    generateRandomString(length: number = 10) {return generateRandomString(length)},
    convertToStrToCode(str: string) {return convertToStrToCode(str)},
}

interface ArgsI {
    templates?: object;
    templateName: string;
    templateVars?: any;
    prettify?: boolean;
    linter?: string;
    parseToHtml?: boolean;
    htmlDecode?: boolean;
}

export default class EezzeTpl {
    private static parseCustomMd(str: string) {
        str = str.replaceAll(/\+\+([\d\D\s\S\w\W]+?)\+\+/g, '<u>$1</u>');
        str = str.replaceAll(/\*\*\*([\d\D\s\S\w\W]+?)\*\*\*/g, '<b><i>$1</i></b>');
        str = str.replaceAll(/\*\*([\d\D\s\S\w\W]+?)\*\*/g, '<b>$1</b>');
        str = str.replaceAll(/::: hljs-right([\d\D\s\S\w\W]+?):::/g, '<div class="hljs-right"><p>$1</p></div>');
        str = str.replaceAll(/::: hljs-center([\d\D\s\S\w\W]+?):::/g, '<div class="hljs-center"><p>$1</p></div>');
        str = str.replaceAll(/::: hljs-left([\d\D\s\S\w\W]+?):::/g, '<div class="hljs-left"><p>$1</p></div>');
        str = str.replaceAll(/==([\d\D\s\S\w\W]+?)==/g, '<p><mark>$1</mark></p>');
        str = str.replaceAll(/:ct:([0-9a-zA-Z\(\),#\. ]+)\:-([\d\D\s\S\w\W]+?)-:/g, '<span style="color: $1;">$2</span>');
        str = str.replaceAll(/:ct:([0-9a-zA-Z\(\),#\. ]+):([0-9a-zA-Z\(\),#\. ]+)\:-([\d\D\s\S\w\W]+?)-:/g, '<span style="color: $1; background-color: $2;">$3</span>');
        /*

        :loop:someItems:-
            hello there
        -:

        */
        str = str.replaceAll(/:loop:([a-zA-Z0-9_]+):([a-zA-Z0-9_]+)-([\d\D\s\S\w\W]+?)-:/g, '{% for $2 in $1 %}$3{% endfor %}');
        str = str.replaceAll(/:loop:([a-zA-Z0-9_]+):-([\d\D\s\S\w\W]+?)-:/g, '{% for _item in $1 %}$2{% endfor %}');
        str = str.replaceAll(/\[([\s\S\d\D\w\W]+?)\]\(([\s\S\d\D\w\W]+?)\)/g, '<a href="$2">$1</a>');

        return str;
    }

    static eezzeifyElements(str: string) {
        return str
            .replaceAll(/<h1(.*?)>([\d\D\s\S\w\W]+?)<\/h1>/g, '<h1$1 class="eezze-h1">$2</h1>')
            .replaceAll(/<h2(.*?)>([\d\D\s\S\w\W]+?)<\/h2>/g, '<h2$1 class="eezze-h2">$2</h2>')
            .replaceAll(/<h3(.*?)>([\d\D\s\S\w\W]+?)<\/h3>/g, '<h3$1 class="eezze-h3">$2</h3>')
            .replaceAll(/<h4(.*?)>([\d\D\s\S\w\W]+?)<\/h4>/g, '<h4$1 class="eezze-h4">$2</h4>')
            .replaceAll(/<h5(.*?)>([\d\D\s\S\w\W]+?)<\/h5>/g, '<h5$1 class="eezze-h5">$2</h5>')
            .replaceAll(/<h6(.*?)>([\d\D\s\S\w\W]+?)<\/h6>/g, '<h6$1 class="eezze-h6">$2</h6>')
            .replaceAll('<\/li><br />', '<\/li>')
            .replaceAll('<ol><br />', '<ol class="eezze-ol">')
            .replaceAll('<ul><br />', '<ul class="eezze-ul">')
            .replaceAll('<table><br />', '<table class="eezze-table">')
            .replaceAll('<thead><br />', '<thead>')
            .replaceAll('</thead><br />', '</thead>')
            .replaceAll('<tbody><tr><br />', '<tbody><tr>')
            .replaceAll('</td><br />', '</td>')
            .replaceAll('</th><br />', '</th>')
            .replaceAll('<tr><br />', '<tr>')
            .replaceAll('</tr><br />', '</tr>')
            .replaceAll(/<pre><code>([\d\D\s\S\w\W]+?)<\/code><\/pre><br \/>/g, '$1')
            .replaceAll('<br><br />', '<br />')
    }

    static decode(str: string) {
        return decode(str);
    }

    static async render(args: ArgsI) {
        try {
            if (!args?.templateName && !Array.isArray(args?.templates)) {
                console.log('Args: ', args);
                throw new Error(`To render a template there needs to be a "templateName" or a "templates" parameter argument`);
            }

            if (!args?.linter) args.linter = 'babel';

            let temps: any = {...args.templates};

            temps[args?.templateName] = this.parseCustomMd(temps[args.templateName]);

            let loader = new TwingLoaderArray(temps);
            const twing = new TwingEnvironment(loader, { debug: true });

            twing.addFilter(camelCaseFilter);
            twing.addFilter(kebabCaseFilter);
            twing.addFilter(pascalCaseFilter);
            twing.addFilter(ucFirstFilter);
            twing.addFilter(lcFirstFilter);
            twing.addFilter(singularizeFilter);
            twing.addFilter(pluralizeFilter);

            let renderedCont: string = await new Promise((resolve, reject) => {
                twing.render(args?.templateName, {
                    ez: tplMethods,
                    ...args.templateVars,
                })
                .then((output: string) => {
                    resolve(output)
                })
                .catch ((e: any) => {
                    console.log("error: ", e.message);
                    reject(e);
                })
            });

            if (args?.parseToHtml ?? false) {
                renderedCont = marked.parse(renderedCont);
            }

            if (args?.prettify ?? false) {
                let cachedProps;

                if (args?.linter == 'babel' || args?.linter == 'babel-ts') {
                    cachedProps = renderedCont.match(/([a-zA-Z0-9-_'\[\]"]+)\?: (.*?);/g);

                    if (cachedProps) {
                        renderedCont = renderedCont.replace(
                            /([a-zA-Z0-9-_'"]+)\?: (.*?);/g,
                            '$1: $2;'
                        );
                    }

                    renderedCont = require('prettier').format(renderedCont, {
                        useTabs: true,
                        printWidth: 100,
                        singleQuote: true,
                        parser: args?.linter,
                    });

                    renderedCont = renderedCont.substr(0, renderedCont.length - 1);

                    // here we need to reinsert the "prop?: type;" syntax as its not supported
                    if (cachedProps) {
                        cachedProps.forEach(
                        (prop: string) => {
                            renderedCont = renderedCont.replace(prop.replace('?', ''), prop);
                        });
                    }
                }
            }

            renderedCont = renderedCont.replace(/\\#/g, '#');
            renderedCont = renderedCont.replaceAll(/(?:\r\n|\r|\n)/g, '<br />');

            if (args?.htmlDecode) {
                renderedCont = this.decode(renderedCont);
            }

            if (args?.parseToHtml ?? false) {
                renderedCont = this.eezzeifyElements(renderedCont);
            }

            // console.log('renderedCont: ', renderedCont);

            return renderedCont;
        }
        catch (e: any) {
            // console.log('ERROR PARSING EEZZE TEMPLATE: ', e, ' : ', args);
            return 'error';
        }
    }
}