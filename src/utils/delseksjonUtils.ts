import { SanityDelseksjon } from '../typer/sanity';
import { FlettefeltVerdier, StateDelseksjon, StateDropdown, StateFlettefelt } from '../typer/typer';
import { fyllInnFlettefeltIFritekstTabell, lagTomFlettefeltTabell } from './flettefeltUtils';
import { innholdTilFritekstTabell } from './fritekstUtils';

export const erInnholdStateDropdown = (innhold: StateFlettefelt[] | StateDropdown): boolean => {
    return (innhold as StateDropdown).valgVerdi !== undefined;
};

export const oppdaterFritekstTabellIDelseksjonState = (
    delseksjonStateKopi: StateDelseksjon,
    nyFritekstTabell: string[][]
): StateDelseksjon => {
    delseksjonStateKopi.fritekstTabell = nyFritekstTabell;
    return delseksjonStateKopi;
};

export const oppdaterDropdownIDelseksjonState = (
    delseksjonStateKopi: StateDelseksjon,
    nyFritekstTabell: string[][],
    innholdIndeks: number,
    nyDropodownValue: string,
    nyeFlettefelt: FlettefeltVerdier[]
): StateDelseksjon => {
    (delseksjonStateKopi.innhold[innholdIndeks] as StateDropdown).valgVerdi = nyDropodownValue;

    delseksjonStateKopi.fritekstTabell = nyFritekstTabell;

    (delseksjonStateKopi.innhold[innholdIndeks] as StateDropdown).flettefelt =
        lagTomFlettefeltTabell(nyeFlettefelt.length);

    return delseksjonStateKopi;
};

export const oppdaterFlettefeltIDelseksjonerState = (
    delseksjonStateKopi: StateDelseksjon,
    nyFritekstTabell: string[][],
    innholdIndeks: number,
    flettefeltIndeks: number,
    nyFlettefeltVerdi: string
): StateDelseksjon => {
    delseksjonStateKopi.fritekstTabell = nyFritekstTabell;
    if (erInnholdStateDropdown(delseksjonStateKopi.innhold[innholdIndeks])) {
        (delseksjonStateKopi.innhold[innholdIndeks] as StateDropdown).flettefelt[
            flettefeltIndeks
        ].verdi = nyFlettefeltVerdi;
        (delseksjonStateKopi.innhold[innholdIndeks] as StateDropdown).flettefelt[
            flettefeltIndeks
        ].harBlittEndret = true;
    } else {
        (delseksjonStateKopi.innhold[innholdIndeks] as StateFlettefelt[])[flettefeltIndeks].verdi =
            nyFlettefeltVerdi;
        (delseksjonStateKopi.innhold[innholdIndeks] as StateFlettefelt[])[
            flettefeltIndeks
        ].harBlittEndret = true;
    }
    return delseksjonStateKopi;
};

export const oppdaterFritekstTabellFraDelseksjonState = (
    delseksjon: SanityDelseksjon,
    delseksjonState: StateDelseksjon
) => {
    let nyFritekstTabell = innholdTilFritekstTabell(delseksjon.innhold);

    delseksjonState.innhold.forEach(
        (innhold: StateFlettefelt[] | StateDropdown, indeks: number) => {
            if ((innhold as StateDropdown).valgVerdi != undefined) {
                nyFritekstTabell[indeks] = (innhold as StateDropdown).valgVerdi
                    ?.split('@&#')[0]
                    .split('|') || [''];
                if ((innhold as StateDropdown).flettefelt.length > 0) {
                    nyFritekstTabell[indeks] = fyllInnFlettefeltIFritekstTabell(
                        nyFritekstTabell[indeks],
                        (innhold as StateDropdown).flettefelt
                    );
                }
            } else if (innhold as StateFlettefelt[]) {
                nyFritekstTabell[indeks] = fyllInnFlettefeltIFritekstTabell(
                    nyFritekstTabell[indeks],
                    innhold as StateFlettefelt[]
                );
            }
        }
    );

    return nyFritekstTabell;
};
