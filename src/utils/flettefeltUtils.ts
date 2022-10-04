import { SanityDropdown, SanityTekst, SanityTekstObjekt } from '../typer/sanity';
import { dropdown, flettefelt } from '../typer/typer';
import { erInnholdTekstObjekt } from './sanityUtils';

export const finnFlettefeltITekst = (sanityTekst: SanityTekst): flettefelt[] => {
    const flettefeltNy: flettefelt[] = [];
    sanityTekst.markDefs &&
        sanityTekst.markDefs.forEach((markdef) => {
            sanityTekst.children.forEach((child) => {
                child.marks.forEach((mark) => {
                    if (
                        mark === markdef._key &&
                        (markdef.tabell === undefined || markdef.tabell === null)
                    ) {
                        flettefeltNy.push({
                            tekst: markdef.flettefelt
                                ? markdef.flettefelt.flettefeltNavn
                                : child.text,
                            marks: child.marks,
                            key: child._key,
                        });
                    }
                });
            });
        });
    return flettefeltNy;
};

export const finnFlettefeltIDropdown = (
    sanityDropdown: SanityDropdown,
    valgIndeks: number
): flettefelt[] => {
    return sanityDropdown.valg[valgIndeks].tekst.flatMap((sanityTekst: SanityTekst) =>
        finnFlettefeltITekst(sanityTekst)
    );
};

export const innholdTilFlettefeltTabell = (
    innhold: (SanityDropdown | SanityTekstObjekt)[],
    delseksjonState: (string[] | dropdown)[]
): flettefelt[][] => {
    return innhold.map((innhold: SanityDropdown | SanityTekstObjekt, innholdIndeks: number) => {
        if (erInnholdTekstObjekt(innhold)) {
            return (innhold as SanityTekstObjekt).tekst.flatMap((sanityTekst: SanityTekst) =>
                finnFlettefeltITekst(sanityTekst)
            );
        } else {
            if (
                delseksjonState !== undefined &&
                (delseksjonState[innholdIndeks] as dropdown)?.valgVerdi !== undefined
            ) {
                const valgIndeks = (delseksjonState[innholdIndeks] as dropdown).valgVerdi!.split(
                    '@&#'
                )[1];
                return finnFlettefeltIDropdown(innhold as SanityDropdown, parseInt(valgIndeks));
            }
            return [];
        }
    });
};
