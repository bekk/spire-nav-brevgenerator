export const finnFlettefelt = (sanityTekst) => {
    const flettefeltNy = [];
    sanityTekst.markDefs &&
        sanityTekst.markDefs.forEach((markdef) => {
            sanityTekst.children.forEach((child) => {
                child.marks.forEach((mark) => {
                    if (mark === markdef._key &&
                        (markdef.tabell === undefined || markdef.tabell === null)) {
                        flettefeltNy.push(child);
                    }
                });
            });
        });
    return flettefeltNy;
};
