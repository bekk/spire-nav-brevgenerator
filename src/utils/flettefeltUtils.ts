import { SanityDropdown, SanityTekst, SanityTekstObjekt } from '../typer/sanity';
import { FlettefeltVerdier, StateDropdown, StateFlettefelt, tomtFlettefelt } from '../typer/typer';
import { erInnholdTekstObjekt } from './sanityUtils';

export const finnFlettefeltITekst = (
    sanityTekst: SanityTekst,
    flettefeltTeller: number,
    mellomlagring?: StateFlettefelt[]
): FlettefeltVerdier[] => {
    const nyeFlettefelt: FlettefeltVerdier[] = [];
    sanityTekst.children.forEach((child) => {
        if (child.marks.length > 0) {
            sanityTekst.markDefs.forEach((markDef) => {
                if (
                    markDef._key === child.marks[0] &&
                    (markDef.tabell === undefined || markDef.tabell === null)
                ) {
                    const mellomlagringFinnes =
                        mellomlagring !== undefined &&
                        mellomlagring[flettefeltTeller] !== undefined;
                    nyeFlettefelt.push({
                        tekst: markDef.flettefelt ? markDef.flettefelt.flettefeltNavn : child.text,
                        marks: child.marks,
                        key: child._key,
                        verdi: mellomlagringFinnes
                            ? mellomlagring[flettefeltTeller].verdi
                            : child.text,
                        harBlittEndret: mellomlagringFinnes
                            ? mellomlagring[flettefeltTeller].harBlittEndret
                            : false,
                    });
                    flettefeltTeller++;
                }
            });
        }
    });
    return nyeFlettefelt;
};

export const finnFlettefeltIDropdown = (
    sanityDropdown: SanityDropdown,
    valgIndeks: number,
    mellomlagring?: StateDropdown
): FlettefeltVerdier[] => {
    let flettefeltTeller = 0;
    return sanityDropdown.valg[valgIndeks].tekst.flatMap((sanityTekst: SanityTekst) => {
        const flettefelt = finnFlettefeltITekst(
            sanityTekst,
            flettefeltTeller,
            mellomlagring !== undefined ? mellomlagring.flettefelt : undefined
        );
        flettefeltTeller += flettefelt.length;
        return flettefelt;
    });
};

export const innholdTilFlettefeltTabell = (
    innhold: (SanityDropdown | SanityTekstObjekt)[],
    delseksjonStateInnold?: (StateFlettefelt[] | StateDropdown)[]
): FlettefeltVerdier[][] => {
    let flettefeltTeller = 0;
    return innhold.map((innhold: SanityDropdown | SanityTekstObjekt, innholdIndeks: number) => {
        if (erInnholdTekstObjekt(innhold)) {
            return (innhold as SanityTekstObjekt).tekst.flatMap((sanityTekst: SanityTekst) => {
                const flettefelt = finnFlettefeltITekst(
                    sanityTekst,
                    flettefeltTeller,
                    delseksjonStateInnold !== undefined
                        ? (delseksjonStateInnold[innholdIndeks] as StateFlettefelt[])
                        : undefined
                );
                flettefeltTeller += flettefelt.length;
                return flettefelt;
            });
        } else {
            if (
                delseksjonStateInnold !== undefined &&
                (delseksjonStateInnold[innholdIndeks] as StateDropdown)?.valgVerdi !== undefined
            ) {
                const valgIndeks = (
                    delseksjonStateInnold[innholdIndeks] as StateDropdown
                ).valgVerdi!.split('@&#')[1];
                return finnFlettefeltIDropdown(
                    innhold as SanityDropdown,
                    parseInt(valgIndeks),
                    delseksjonStateInnold[innholdIndeks] as StateDropdown
                );
            }
            return [];
        }
    });
};

export const finnInnholdOgFlettefeltIndeks = (
    flettefeltNummer: number,
    flettefelter: FlettefeltVerdier[][]
): { innholdIndeks: number; flettefeltIndeks: number } => {
    let flettefeltTeller = 0;
    for (const [innholdIndeks, innhold] of flettefelter.entries()) {
        for (const [flettefeltIndeks, flettefelt] of innhold.entries()) {
            if (flettefeltTeller === flettefeltNummer) {
                return { innholdIndeks, flettefeltIndeks };
            }
            flettefeltTeller++;
        }
    }
    return { innholdIndeks: -1, flettefeltIndeks: -1 };
};

export const fyllInnFlettefeltIFritekstTabell = (
    fritekstTabellElement: string[],
    flettefelter: StateFlettefelt[]
): string[] => {
    let flettefeltIndeks = 0;
    for (let i = 1; i < fritekstTabellElement.length; i += 2) {
        const flettefeltVerdi = flettefelter[flettefeltIndeks].verdi;
        if (flettefeltVerdi !== '') {
            fritekstTabellElement[i] = flettefeltVerdi;
        }
        flettefeltIndeks++;
    }

    return fritekstTabellElement;
};

export const lagTomFlettefeltTabell = (tabellengde: number): StateFlettefelt[] => {
    const tomFlettefeltTabell = new Array(tabellengde);

    for (let i = 0; i < tabellengde; i++) {
        tomFlettefeltTabell[i] = { ...tomtFlettefelt };
    }

    return tomFlettefeltTabell;
};
