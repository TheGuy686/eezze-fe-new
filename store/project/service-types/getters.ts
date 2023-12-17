import { keyify } from '~/classes/globals';

export default {
    typesDict(state: any) {
        try {
            return keyify(state?.entities ?? [], 'key');
        }
        catch (err) { return [] }
    }
}