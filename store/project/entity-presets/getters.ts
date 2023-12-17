// /store/getters.js
export default {
    actionInputTypes(state: any) {
        const out: any = [], ignoreTypes: string[] = [
            'LONG-TEXT',
            'IMAGE',
            'IMAGE GALLERY',
            'REGEX',
            'RELATION',
            'DICTIONARY',
            'JWT-TOKEN',
        ];

        let type: any;

        for (type of Object.values(state.keyTypes)) {
            if (ignoreTypes.includes(type.label.toUpperCase())) continue;

            out.push(type);
        }

        return out;
    },
    logicReturnTypes(state: any) {
        const out: any = [], ignoreTypes: string[] = [
            'DATE-TIME',
            'LONG-TEXT',
            'EMAIL',
            'IMAGE',
            'IMAGE GALLERY',
            'RELATION',
            'ARRAY',
            'DICTIONARY',
            'REGEX',
            'DECIMAL',
            'JWT-TOKEN',
        ];

        let type: any;

        for (type of Object.values(state.keyTypes)) {
            if (ignoreTypes.includes(type.label.toUpperCase())) continue;

            out.push(type);
        }

        return out;
    },
    primitiveReturnTypes(state: any) {
        const out: any = [], ignoreTypes: string[] = [
            'DATE-TIME',
            'LONG-TEXT',
            'EMAIL',
            'IMAGE',
            'IMAGE GALLERY',
            'RELATION',
            'ARRAY',
            'DICTIONARY',
            'REGEX',
            'DECIMAL',
        ];

        let type: any;

        for (type of Object.values(state.keyTypes)) {
            if (ignoreTypes.includes(type.label.toUpperCase())) continue;

            out.push(type);
        }

        return out;
    },
}