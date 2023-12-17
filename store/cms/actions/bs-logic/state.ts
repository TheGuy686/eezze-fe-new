import { InitStateCrudVars } from '~/factories/crud/State';
import { tr } from '../../../../classes/globals';

export default () => ({
    ...InitStateCrudVars(),
    entities: [
        {
            id: 'new',
            title: tr('new-action'),
        },
        {
            id: 'number-operation',
            title: tr('number-operation'),
        },
        {
            id: 'assign-values',
            title: tr('assign-values'),
        },
        {
            id: 'formatter',
            title: tr('formatter'),
        },
        {
            id: 'list-process',
            title: tr('list-process'),
            isMuliLevel: true,
        },
        {
            id: 'set-state-values',
            title: tr('set-state-values'),
        },
        {
            id: 'set-stash-values',
            title: tr('set-stash-values'),
        },
        {
            id: 'custom',
            title: tr('custom'),
        },
    ],
    actionTypes: [
        {
            id: 'text',
            name: tr('text'),
            color: 'volcano',
        },
        {
            id: 'number',
            name: tr('number'),
            color: 'pink',
        },
        {
            id: 'decimal',
            name: tr('decimal'),
            color: 'cyan',
        },
        {
            id: 'boolean',
            name: tr('boolean'),
            color: '#f50',
        },
        {
            id: 'date',
            name: tr('date'),
            color: 'blue',
        },
        {
            id: 'object',
            name: tr('object'),
            color: 'green',
        },
        {
            id: 'list',
            name: tr('list'),
            color: 'orange',
        },
    ],
    standardFormats: {
        help: tr('general-common-used-formats-help'),
        options: [
            {
                format: 'YYYY-MM-DD hh:mm:ss',
                label: 'YYYY-MM-DD hh:mm:ss',
                example: '2022-10-31 18:45:35',
            },
            {
                format: 'DD/MM/YYYY',
                label: 'DD/MM/YYYY',
                example: '01/10/2020',
            },
            {
                format: 'custom',
                label: tr('custom'),
                example: '',
            }
        ]
    },
    momentFormats: {
        year: {
            help: tr('year-formats'),
            options: [
                {
                    format: 'YYYY',
                    example: '2022',
                },
                {
                    format: 'YY',
                    example: '22',
                },
                {
                    format: 'Y',
                    example: '1970',
                },
                
            ]
        },
        'week-year': {
            help: tr('week-year-help'),
            options: [
                {
                    format: 'gg',
                    example: '29',
                },
                {
                    format: 'gggg',
                    example: '1970',
                },
            ]
        },
        quarter: {
            help: tr('quarter-help'),
            options: [
                {
                    format: 'Q',
                    example: '1',
                },
                {
                    format: 'Qo',
                    example: '1st',
                },
            ]
        },
        month: {
            help: tr('month-help'),
            options: [
                {
                    format: 'M',
                    example: '2',
                },
                {
                    format: 'Mo',
                    example: '1st',
                },
                {
                    format: 'MM',
                    example: '01',
                },
                {
                    format: 'MMM',
                    example: 'Jan',
                },
                {
                    format: 'MMMM',
                    example: 'January',
                },
            ]
        },
        'week-of-year': {
            help: tr('week-of-year-help'),
            options: [
                {
                    format: 'w',
                    example: '1',
                },
                {
                    format: 'wo',
                    example: '1st',
                },
                {
                    format: 'ww',
                    example: '01',
                },
            ]
        },
        day: {
            help: tr('day-help'),
            options: [
                {
                    format: 'D',
                    example: '1',
                },
                {
                    format: 'Do',
                    example: '1st',
                },
                {
                    format: 'DD',
                    example: '01',
                },
            ]
        },
        'day-of-the-year': {
            help: tr('day-of-the-year-help'),
            options: [
                {
                    format: 'DDD',
                    example: '365',
                },
                {
                    format: 'DDDo',
                    example: '1st',
                },
                {
                    format: 'DDDD',
                    example: '001',
                },
            ]
        },
        'day-of-the-week': {
            help: tr('day-of-the-week-help'),
            options: [
                {
                    format: 'd',
                    example: '1',
                },
                {
                    format: 'do',
                    example: '1st',
                },
                {
                    format: 'dd',
                    example: 'Sun',
                },
                {
                    format: 'ddd',
                    example: 'Sun',
                },
                {
                    format: 'dddd',
                    example: 'Sunday',
                },
            ]
        },
        hours: {
            help: tr('hours-help'),
            options: [
                {
                    format: 'H',
                    example: '1',
                },
                {
                    format: 'HH',
                    example: '01',
                },
                {
                    format: 'h',
                    example: '2',
                },
                {
                    format: 'hh',
                    example: '01',
                },
                {
                    format: 'k',
                    example: '2',
                },
                {
                    format: 'kk',
                    example: '22',
                },

            ]
        },
        minues: {
            help: tr('minues-help'),
            options: [
                {
                    format: 'm',
                    example: '1',
                },
                {
                    format: 'mm',
                    example: '01',
                },
            ]
        },
        seconds: {
            help: tr('seconds-help'),
            options: [
                {
                    format: 's',
                    example: '1',
                },
                {
                    format: 'ss',
                    example: '01',
                },
            ]
        },
        'am-pm': {
            help: tr('am-pm-help'),
            options:[
                {
                    format: 'a',
                    example: 'am',
                },
                {
                    format: 'A',
                    example: 'AM',
                },
            ]
        },
        'time-zone': {
            help: tr('time-zone-help'),
            options: [
                {
                    format: 'z',
                    example: 'EST',
                },
                {
                    format: 'Z',
                    example: '-06:00',
                },
                {
                    format: 'ZZ',
                    example: '-0700',
                },
            ]
        },
        timestamps: {
            help: tr('timestamps-help'),
            options: [
                {
                    format: 'X',
                    example: '1360013296',
                },
                {
                    format: 'x',
                    example: '1360013296123',
                },
            ]
        }
    },
    modifyDateOperations: {
        primative: 'date',
        options: [
            {
                id: 'add-days',
                title: tr('add-days'),
                desc: tr('add-days-desc'),
                returnType: 'date',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('number-of-days'),
                        desc: tr('add-days-arg-1-desc'),
                        type: 'number',
                        required: true,
                    },
                ]
            },
            {
                id: 'subtract-days',
                title: tr('subtract-days'),
                desc: tr('subtract-days-desc'),
                returnType: 'date',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('number-of-days'),
                        desc: tr('subtract-days-arg-1-desc'),
                        type: 'number',
                        required: true,
                    },
                ]
            },
        ],
    },
    format: {
        string: {
            primative: 'string',
            options: [
                {
                    id: 'string-interpolate',
                    title: tr('interpolate')
                },
            ]
        },
        date: {
            primative: 'string',
            options: [
                {
                    id: 'date-interpolate',
                    title: tr('interpolate')
                },
            ]
        },
    },
    numberOperations: { 
        primative: 'number',
        options: [
            {
                id: 'calculation',
                title: tr('calculation'),
            },
            {
                id: 'addition',
                title: tr('addition'),
                desc: tr('addition-desc'),
                returnType: 'number',
                operation: '$1 + $2',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('addition-arg-1-name'),
                        desc: tr('addition-arg-1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('addition-arg-2-name'),
                        desc: tr('addition-arg-2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'subtraction',
                title: tr('subtraction'),
                desc: tr('subtraction-desc'),
                returnType: 'number',
                operation: '$1 - $2',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('subtraction-arg-1-name'),
                        desc: tr('subtraction-arg-1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('subtraction-arg-2-name'),
                        desc: tr('subtraction-arg-2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'multiplication',
                title: tr('multiplication'),
                desc: tr('multiplication-desc'),
                returnType: 'number',
                operation: '$1 * $2',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('multiplication-arg-1-name'),
                        desc: tr('multiplication-arg-1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('multiplication-arg-2-name'),
                        desc: tr('multiplication-arg-2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
                
            },
            {
                id: 'division',
                title: tr('division'),
                desc: tr('division-desc'),
                returnType: 'number',
                operation: '$1 / $2',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('division-arg-1-name'),
                        desc: tr('division-arg-1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('division-arg-2-name'),
                        desc: tr('division-arg-2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'modulus',
                title: tr('modulus'),
                desc: tr('modulus-desc'),
                returnType: 'number',
                operation: '$1 % $2',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('modulus-arg1-name'),
                        desc: tr('modulus-arg1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('modulus-arg2-name'),
                        desc: tr('modulus-arg2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'exponentiation',
                title: tr('exponentiation'),
                desc: tr('exponentiation-desc'),
                returnType: 'number',
                operation: '$1 ** $2',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('exponentiation-arg1-name'),
                        desc: tr('exponentiation-arg1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('exponentiation-arg2-name'),
                        desc: tr('exponentiation-arg2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'increment',
                title: tr('increment'),
                desc: tr('increment-desc'),
                returnType: 'number',
                operation: '$1++',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('increment-arg-name'),
                        desc: tr('increment-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'decrement',
                title: tr('decrement'),
                desc: tr('decrement-desc'),
                returnType: 'number',
                operation: '$1--',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('decrement-arg-name'),
                        desc: tr('decrement-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'abs',
                title: tr('abs'),
                desc: tr('abs-desc'),
                returnType: 'number',
                operation: 'Math.abs($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('abs-arg1-name'),
                        desc: tr('abs-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'acos',
                title: tr('acos'),
                desc: tr('acos-desc'),
                returnType: 'number',
                operation: 'Math.acos($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('acos-arg1-name'),
                        desc: tr('acos-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'acosh',
                title: tr('acosh'),
                desc: tr('acosh-desc'),
                returnType: 'number',
                operation: 'Math.acosh($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('acosh-arg1-name'),
                        desc: tr('acosh-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'asin',
                title: tr('asin'),
                desc: tr('asin-desc'),
                returnType: 'number',
                operation: 'Math.asin($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('asin-arg1-name'),
                        desc: tr('asin-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'asinh',
                title: tr('asinh'),
                desc: tr('asinh-desc'),
                returnType: 'number',
                operation: 'Math.asinh($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('asinh-arg1-name'),
                        desc: tr('asinh-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'atan',
                title: tr('atan'),
                desc: tr('atan-desc'),
                returnType: 'number',
                operation: 'Math.atan($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('atan-arg-name'),
                        desc: tr('atan-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'atan2',
                title: tr('atan2'),
                desc: tr('atan2-desc'),
                returnType: 'number',
                operation: 'Math.atan2($1, $2)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('atan2-arg1-name'),
                        desc: tr('atan2-arg1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('atan2-arg2-name'),
                        desc: tr('atan2-arg2-desc'),
                        type: 'number',
                        required: true,
                    }
                    
                ]
            },
            {
                id: 'atanh',
                title: tr('atanh'),
                desc: tr('atanh-desc'),
                returnType: 'number',
                operation: 'Math.atanh($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('atanh-arg-name'),
                        desc: tr('atanh-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'cbrt',
                title: tr('cbrt'),
                desc: tr('cbrt-desc'),
                returnType: 'number',
                operation: 'Math.cbrt($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('cbrt-arg-name'),
                        desc: tr('cbrt-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'ceil',
                title: tr('ceil'),
                desc: tr('ceil-desc'),
                returnType: 'number',
                operation: 'Math.ceil($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('ceil-arg-name'),
                        desc: tr('ceil-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'clz32',
                title: tr('clz32'),
                desc: tr('clz32-desc'),
                returnType: 'number',
                operation: 'Math.clz32($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('clz32-arg-name'),
                        desc: tr('clz32-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'cos',
                title: tr('cos'),
                desc: tr('cos-desc'),
                returnType: 'number',
                operation: 'Math.cos($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('cos-arg1-name'),
                        desc: tr('cos-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'cosh',
                title: tr('cosh'),
                desc: tr('cosh-desc'),
                returnType: 'number',
                operation: 'Math.cosh($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('cosh-arg1-name'),
                        desc: tr('cosh-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'exp',
                title: tr('exp'),
                desc: tr('exp-desc'),
                returnType: 'number',
                operation: 'Math.exp($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('exp-arg-name'),
                        desc: tr('exp-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'expm1',
                title: tr('expm1'),
                desc: tr('expm1-desc'),
                returnType: 'number',
                operation: 'Math.expm1($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('expm1-arg-name'),
                        desc: tr('expm1-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'floor',
                title: tr('floor'),
                desc: tr('floor-desc'),
                returnType: 'number',
                operation: 'Math.floor($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('floor-arg-name'),
                        desc: tr('floor-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'fround',
                title: tr('fround'),
                desc: tr('fround-desc'),
                returnType: 'number',
                operation: 'Math.()',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('fround-arg-name'),
                        desc: tr('fround-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'hypot',
                title: tr('hypot'),
                desc: tr('hypot-desc'),
                returnType: 'number',
                operation: 'Math.hypot($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('hypot-arg-name'),
                        desc: tr('hypot-arg-desc'),
                        type: 'number-array',
                        required: true,
                    }
                ]
            },
            {
                id: 'imul',
                title: tr('imul'),
                desc: tr('imul-desc'),
                returnType: 'number',
                operation: 'Math.imul($1, $2)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('imul-arg1-name'),
                        desc: tr('imul-arg1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('imul-arg2-name'),
                        desc: tr('imul-arg2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'log',
                title: tr('log'),
                desc: tr('log-desc'),
                returnType: 'number',
                operation: 'Math.log($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('log-arg-name'),
                        desc: tr('log-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'log10',
                title: tr('log10'),
                desc: tr('log10-desc'),
                returnType: 'number',
                operation: 'Math.log10($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('log10-arg-name'),
                        desc: tr('log10-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'log1p',
                title: tr('log1p'),
                desc: tr('log1p-desc'),
                returnType: 'number',
                operation: 'Math.log1p($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('log1p-arg-name'),
                        desc: tr('log1p-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'log2',
                title: tr('log2'),
                desc: tr('log2-desc'),
                returnType: 'number',
                operation: 'Math.log2($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('log2-arg-name'),
                        desc: tr('log2-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'max',
                title: tr('max'),
                desc: tr('max-desc'),
                returnType: 'number',
                operation: 'Math.max($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('max-arg-name'),
                        desc: tr('max-arg-desc'),
                        type: 'number-array',
                        required: true,
                    }
                ]
            },
            {
                id: 'min',
                title: tr('min'),
                desc: tr('min-desc'),
                returnType: 'number',
                operation: 'Math.min($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('min-arg-name'),
                        desc: tr('min-arg-desc'),
                        type: 'number-array',
                        required: true,
                    }
                ]
            },
            {
                id: 'pow',
                title: tr('pow'),
                desc: tr('pow-desc'),
                returnType: 'number',
                operation: 'Math.pow($1, $2)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('pow-arg1-name'),
                        desc: tr('pow-arg1-desc'),
                        type: 'number',
                        required: true,
                    },
                    {
                        id: 'arg-2',
                        name: tr('pow-arg2-name'),
                        desc: tr('pow-arg2-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'random',
                title: tr('random'),
                desc: tr('random-desc'),
                returnType: 'number',
                operation: 'Math.random()',
                args: null
            },
            {
                id: 'round',
                title: tr('round'),
                desc: tr('round-desc'),
                returnType: 'number',
                operation: 'Math.round($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('round-arg-name'),
                        desc: tr('round-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'sign',
                title: tr('sign'),
                desc: tr('sign-desc'),
                returnType: 'number',
                operation: 'Math.sign($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('sign-arg-name'),
                        desc: tr('sign-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'sin',
                title: tr('sin'),
                desc: tr('sin-desc'),
                returnType: 'number',
                operation: 'Math.sin($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('sin-arg1-name'),
                        desc: tr('sin-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'sinh',
                title: tr('sinh'),
                desc: tr('sinh-desc'),
                returnType: 'number',
                operation: 'Math.sinh($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('sinh-arg1-name'),
                        desc: tr('sinh-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'sqrt',
                title: tr('sqrt'),
                desc: tr('sqrt-desc'),
                returnType: 'number',
                operation: 'Math.sqrt($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('sqrt-arg-name'),
                        desc: tr('sqrt-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'tan',
                title: tr('tan'),
                desc: tr('tan-desc'),
                returnType: 'number',
                operation: 'Math.tan($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('tan-arg1-name'),
                        desc: tr('tan-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'tanh',
                title: tr('tanh'),                                                                                                     
                desc: tr('tanh-desc'),
                returnType: 'number',
                operation: 'Math.tanh($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('tanh-arg1-name'),
                        desc: tr('tanh-arg1-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
            {
                id: 'trunc',
                title: tr('trunc'),
                desc: tr('trunc-desc'),
                returnType: 'number',
                operation: 'Math.trunc($1)',
                args: [
                    {
                        id: 'arg-1',
                        name: tr('trunc-arg-name'),
                        desc: tr('trunc-arg-desc'),
                        type: 'number',
                        required: true,
                    }
                ]
            },
        ],
    },
    booleanLinkOperattions: [
        {
            id: 'and',
            title: tr('and'),
            desc: tr('and-desc'),
            returnType: 'string',
            operation: ' && ',
            args: []
        },
        {
            id: 'or',
            title: tr('or'),
            desc: tr('or-desc'),
            returnType: 'string',
            operation: ' || ',
            args: []
        },
        {
            id: 'xor',
            title: tr('xor'),
            desc: tr('xor-desc'),
            returnType: 'string',
            operation: ' ^ ',
            args: []
        },
    ],
    booleanOperattions: [
        {
            id: 'is-true',
            title: tr('is-true'),
            desc: tr('is-true-desc'),
            returnType: 'boolean',
            operation: `( %1 === true || (!!%1) )`,
            args: [
                {
                    id: 'arg-1',
                    name: tr('condition-value'),
                    desc: tr('condition-value-desc'),
                    required: true,
                },
            ]
        },
        {
            id: 'is-not-true',
            title: tr('is-not-true'),
            desc: tr('is-not-true-desc'),
            returnType: 'boolean',
            operation: `( %1 === false || !(!!%1) )`,
            args: [
                {
                    id: 'arg-1',
                    name: tr('condition-value'),
                    desc: tr('condition-value-desc'),
                    required: true,
                },
            ]
        },
        {
            id: 'equals-to',
            title: tr('equals-to'),
            desc: tr('equals-to-desc'),
            returnType: 'boolean',
            operation: '%1 === %2',
            args: [
                {
                    id: 'arg-1',
                    name: tr('boolean-left-value'),
                    desc: tr('boolean-left-value-desc'),
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('boolean-right-value'),
                    desc: tr('boolean-right-value-desc'),
                    required: true,
                }
            ]
        },
        {
            id: 'is-not-equals-to',
            title: tr('is-not-equals-to'),
            desc: tr('is-not-equals-to-desc'),
            returnType: 'boolean',
            operation: '%1 !== %2',
            args: [
                {
                    id: 'arg-1',
                    name: tr('boolean-left-value'),
                    desc: tr('boolean-left-value-desc'),
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('boolean-right-value'),
                    desc: tr('boolean-right-value-desc'),
                    required: true,
                }
            ]
        },
        {
            id: 'is-greater-than',
            title: tr('is-greater-than'),
            desc: tr('is-greater-than-desc'),
            returnType: 'boolean',
            operation: 'Number(%1) > Number(%2)',
            args: [
                {
                    id: 'arg-1',
                    name: tr('boolean-left-value'),
                    desc: tr('boolean-left-value-desc'),
                    type: 'number',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('boolean-right-value'),
                    desc: tr('boolean-right-value-desc'),
                    type: 'number',
                    required: true,
                }
            ]
        },
        {
            id: 'is-greater-than-or-equal-to',
            title: tr('is-greater-than-or-equal-to'),
            desc: tr('is-greater-than-or-equal-to-desc'),
            returnType: 'boolean',
            operation: 'Number(%1) >= Number(%2)',
            args: [
                {
                    id: 'arg-1',
                    name: tr('boolean-left-value'),
                    desc: tr('boolean-left-value-desc'),
                    type: 'number',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('boolean-right-value'),
                    desc: tr('boolean-right-value-desc'),
                    type: 'number',
                    required: true,
                }
            ]
        },
        {
            id: 'is-less-than',
            title: tr('is-less-than'),
            desc: tr('is-less-than-desc'),
            returnType: 'boolean',
            operation: 'Number(%1) < Number(%2)',
            args: [
                {
                    id: 'arg-1',
                    name: tr('operand-1'),
                    desc: tr('operand-1-desc'),
                    type: 'number',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('operand-2'),
                    desc: tr('operand-2-desc'),
                    type: 'number',
                    required: true,
                },
            ]
        },
        {
            id: 'is-less-than-or-equal-to',
            title: tr('is-less-than-or-equal-to'),
            desc: tr('is-less-than-or-equal-to-desc'),
            returnType: 'boolean',
            operation: 'Number(%1) <= Number(%2)',
            args: [
                {
                    id: 'arg-1',
                    name: tr('operand-1'),
                    desc: tr('operand-1-desc'),
                    type: 'number',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('operand-2'),
                    desc: tr('operand-2-desc'),
                    type: 'number',
                    required: true,
                },
            ]
        },
        {
            id: 'number-is-between-range',
            title: tr('number-is-between-range'),
            desc: tr('number-is-between-range-desc'),
            returnType: 'boolean',
            operation: 'Number(%1) >= Number(%2) && Number(%1) <= Number(%3)',
            args: [
                {
                    id: 'arg-1',
                    name: tr('boolean-comparison-value'),
                    desc: tr('boolean-comparison-value-desc'),
                    type: 'number',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('operand-1'),
                    desc: tr('operand-1-desc'),
                    type: 'number',
                    required: true,
                },
                {
                    id: 'arg-3',
                    name: tr('operand-2'),
                    desc: tr('operand-2-desc'),
                    type: 'number',
                    required: true,
                },
            ]
        },
    ],
    listOperations: [
        {
            id: 'assign-empty-list',
            title: tr('assign-empty-list'),
            desc: tr('assign-empty-list-desc'),
            returnType: 'list',
            operation: `const %1 = []`,
            defaultExample: '[]',
            args: [
                {
                    id: 'assign-name',
                    name: tr('name'),
                    desc: tr('name-desc'),
                    type: 'number',
                    isVisible: false,
                    required: true,
                },
            ]
        },
        {
            id: 'list-combination',
            title: tr('combine-list'),
            desc: tr('combine-list-desc'),
            returnType: 'list',
            operation: `const %1 = [...Object.values(%2), ...Object.values(%3), %optional];`,
            defaultExample: '[...[{title: "Dummy Item"}], ...[{title: "List 2 Dummy Item"}]]',
            args: [
                {
                    id: 'assign-name',
                    name: tr('name'),
                    desc: tr('name-desc'),
                    isVisible: false,
                    type: 'text',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('list-1'),
                    desc: tr('list-desc'),
                    hasExample: false,
                    type: 'list',
                    required: true,
                },
                {
                    id: 'arg-3',
                    name: tr('list-2'),
                    desc: tr('list-desc'),
                    type: 'list',
                    hasExample: false,
                    required: true,
                },
                {
                    id: 'arg-4',
                    name: tr('list-3'),
                    desc: tr('list-desc'),
                    hasExample: false,
                    type: 'list',
                },
                {
                    id: 'arg-5',
                    name: tr('list-4'),
                    desc: tr('list-desc'),
                    hasExample: false,
                    type: 'list',
                },
                {
                    id: 'arg-6',
                    name: tr('list-5'),
                    desc: tr('list-desc'),
                    hasExample: false,
                    type: 'list',
                },
                {
                    id: 'arg-7',
                    name: tr('list-6'),
                    desc: tr('list-desc'),
                    hasExample: false,
                    type: 'list',
                },
            ]
        },
        {
            id: 'assign-even-number-list-to-range',
            title: tr('assign-even-number-list-to-range'),
            desc: tr('assign-even-number-list-to-range-desc'),
            returnType: 'list',
            operation: `const %1 = List.assignEvenToRange(%2, %3);`,
            defaultExample: '[2, 4, 6, 8, 10]',
            args: [
                {
                    id: 'assign-name',
                    name: tr('name'),
                    desc: tr('name-desc'),
                    isVisible: false,
                    type: 'text',
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('from-range'),
                    desc: tr('from-range-desc'),
                    type: 'number',
                    defaultExample: 1,
                    required: true,
                },
                {
                    id: 'arg-3',
                    name: tr('to-range'),
                    desc: tr('to-range-desc'),
                    type: 'number',
                    defaultExample: 100,
                    required: true,
                }
            ]
        },
        {
            id: 'assign-odd-number-list-to-range',
            title: tr('assign-odd-number-list-to-range'),
            desc: tr('assign-odd-number-list-to-range-desc'),
            returnType: 'list',
            operation: `const %1 = List.assignOddToRange(%2, %3);`,
            defaultExample: '[1, 3, 5, 7, 9]',
            args: [
                {
                    id: 'assign-name',
                    name: tr('name'),
                    desc: tr('name-desc'),
                    type: 'text',
                    isVisible: false,
                    required: true,
                },
                {
                    id: 'arg-2',
                    name: tr('from-range'),
                    desc: tr('from-range-desc'),
                    type: 'number',
                    defaultExample: 1,
                    required: true,
                },
                {
                    id: 'arg-3',
                    name: tr('to-range'),
                    desc: tr('to-range-desc'),
                    type: 'number',
                    defaultExample: 100,
                    required: true,
                }
            ]
        },
    ]
})