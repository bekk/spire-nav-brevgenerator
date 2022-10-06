import {
    mellomlagringDelseksjon,
    mellomlagringDropdown,
    mellomlagringFlettefelt,
    tomtMellomlagringFlettefelt,
} from '../typer/mellomlagring';
import { SanityDropdown, SanitySeksjon, SanityTekstObjekt } from '../typer/sanity';
import { finnFlettefeltITekst } from './flettefeltUtils';
import { erInnholdDropdown, sanityBlocktekstToHtml } from './sanityUtils';

const finnInitelleAvsnittISeksjon = (seksjon: SanitySeksjon): string[] => {
    return seksjon.delseksjoner.map((delseksjon) => {
        let nyFritekst = '';
        delseksjon.innhold.forEach((innhold: SanityDropdown | SanityTekstObjekt) => {
            if ((innhold as SanityTekstObjekt).tekstTittel !== undefined) {
                nyFritekst += sanityBlocktekstToHtml(innhold as SanityTekstObjekt).join(' ');
            }
        });
        return nyFritekst;
    });
};

export const finnInitielleAvsnittOgAntallDelseksjoner = (
    seksjoner: SanitySeksjon[]
): { nyeAvsnitt: string[]; antallDelSeksjoner: number } => {
    let antallDelSeksjoner = 0;
    const nyeAvsnitt: string[] = seksjoner.flatMap((seksjon) => {
        antallDelSeksjoner += seksjon.delseksjoner.length;
        return finnInitelleAvsnittISeksjon(seksjon);
    });
    return { nyeAvsnitt, antallDelSeksjoner };
};

export const finnInitiellMellomlagringDelseksjonState = (
    seksjoner: SanitySeksjon[]
): mellomlagringDelseksjon[] => {
    return seksjoner.flatMap((seksjon) => {
        return seksjon.delseksjoner.map((delseksjon) => {
            const innhold = delseksjon.innhold.map(
                (innhold): mellomlagringFlettefelt[] | mellomlagringDropdown => {
                    if (erInnholdDropdown(innhold)) {
                        return {
                            valgVerdi: undefined,
                            flettefelt: [],
                        };
                    } else {
                        let antallFlettefelt = 0;
                        (innhold as SanityTekstObjekt).tekst.forEach((tekst) => {
                            const flettefelt = finnFlettefeltITekst(tekst, 0);
                            antallFlettefelt += flettefelt.length;
                        });
                        return Array(antallFlettefelt).fill(tomtMellomlagringFlettefelt);
                    }
                }
            );
            return { innhold: innhold, fritekstTabell: [] };
        });
    });
};
