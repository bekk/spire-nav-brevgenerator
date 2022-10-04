import { delseksjonType, dropdown, flettefelt } from '../typer/typer';

export const erInnholdStateDropdown = (innhold: string[] | dropdown): boolean => {
    return (innhold as dropdown).valgVerdi !== undefined;
};

export const oppdaterFritekstTabellIDelseksjonState = (
    delseksjonStateKopi: delseksjonType,
    nyFritekstTabell: string[][]
): delseksjonType => {
    delseksjonStateKopi.fritekstTabell = nyFritekstTabell;
    return delseksjonStateKopi;
};

export const oppdaterDropdownIDelseksjonState = (
    delseksjonStateKopi: delseksjonType,
    nyFritekstTabell: string[][],
    innholdIndeks: number,
    nyDropodownValue: string,
    nyeFlettefelt: flettefelt[]
): delseksjonType => {
    (delseksjonStateKopi.innhold[innholdIndeks] as dropdown).valgVerdi = nyDropodownValue;

    delseksjonStateKopi.fritekstTabell = nyFritekstTabell;

    (delseksjonStateKopi.innhold[innholdIndeks] as dropdown).flettefelt = Array(
        nyeFlettefelt.length
    ).fill('');

    return delseksjonStateKopi;
};

export const oppdaterFlettefeltIDelseksjonerState = (
    delseksjonStateKopi: delseksjonType,
    nyFritekstTabell: string[][],
    innholdIndeks: number,
    flettefeltIndeks: number,
    nyFlettefeltVerdi: string
): delseksjonType => {
    delseksjonStateKopi.fritekstTabell = nyFritekstTabell;
    if (erInnholdStateDropdown(delseksjonStateKopi.innhold[innholdIndeks])) {
        (delseksjonStateKopi.innhold[innholdIndeks] as dropdown).flettefelt[flettefeltIndeks] =
            nyFlettefeltVerdi;
    } else {
        (delseksjonStateKopi.innhold[innholdIndeks] as string[])[flettefeltIndeks] =
            nyFlettefeltVerdi;
    }
    return delseksjonStateKopi;
};
