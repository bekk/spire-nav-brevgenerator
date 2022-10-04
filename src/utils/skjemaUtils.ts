import { SanityDelseksjon, SanitySeksjon, SanityTekstObjekt } from '../typer/sanity';
import { dropdown } from '../typer/typer';
import { finnFlettefeltITekst } from './flettefeltUtils';
import { innholdTilFritekstTabell } from './fritekstUtils';
import { erInnholdSanityDropdown } from './sanityUtils';

export const finnInitiellDelseksjonerState = (seksjoner: SanitySeksjon[]) => {
    let antallDelSeksjoner = 0;
    return seksjoner.flatMap((seksjon) => {
        antallDelSeksjoner += seksjon.delseksjoner.length;
        return seksjon.delseksjoner.map((delseksjon) => {
            const innhold = lagInitieltInnhold(delseksjon);
            const fritekstTabell = innholdTilFritekstTabell(delseksjon.innhold);

            return {
                innhold: innhold,
                fritekstTabell: fritekstTabell,
            };
        });
    });
};

export const finnAntallDelseksjoner = (seksjoner: SanitySeksjon[]) => {
    let antallDelSeksjoner = 0;
    seksjoner.forEach((seksjon) => {
        antallDelSeksjoner += seksjon.delseksjoner.length;
    });

    return antallDelSeksjoner;
};

const lagInitieltInnhold = (delseksjon: SanityDelseksjon) => {
    return delseksjon.innhold.map((innhold): string[] | dropdown => {
        if (erInnholdSanityDropdown(innhold)) {
            return {
                valgVerdi: undefined,
                flettefelt: [],
            };
        } else {
            let antallFlettefelt = 0;
            (innhold as SanityTekstObjekt).tekst.forEach((tekst) => {
                const flettefelt = finnFlettefeltITekst(tekst);
                antallFlettefelt += flettefelt.length;
            });
            return Array(antallFlettefelt).fill('');
        }
    });
};
