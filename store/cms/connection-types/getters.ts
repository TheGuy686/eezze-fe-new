export default {
    comingSoon: (state: any) => {
        const out: any = [];

        for (let e of (state?.entities ?? [])) {
            if (!e.comingSoon) continue;

            out.push(e);
        }

        return out;
    },
}