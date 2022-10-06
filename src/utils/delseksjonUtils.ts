import {
    FlettefeltVerdier,
    StateDelseksjon,
    StateDropdown,
    StateFlettefelt,
    tomtFlettefelt,
} from '../typer/typer';

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

    (delseksjonStateKopi.innhold[innholdIndeks] as StateDropdown).flettefelt = Array(
        nyeFlettefelt.length
    ).fill(tomtFlettefelt);

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
