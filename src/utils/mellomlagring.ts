import {
    mellomlagringDelseksjon,
    mellomlagringDropdown,
    mellomlagringFlettefelt,
    tomtMellomlagringFlettefelt,
} from '../typer/mellomlagring';
import { flettefelt } from '../typer/typer';

export const erMellomLagringInnholdDropdown = (
    innhold: mellomlagringFlettefelt[] | mellomlagringDropdown
): boolean => {
    return (innhold as mellomlagringDropdown).valgVerdi !== undefined;
};

export const oppdaterFritekstTabellIMellomlagring = (
    mellomlagringDelseksjonKopi: mellomlagringDelseksjon,
    nyFritekstTabell: string[][]
): mellomlagringDelseksjon => {
    mellomlagringDelseksjonKopi.fritekstTabell = nyFritekstTabell;
    return mellomlagringDelseksjonKopi;
};

export const oppdaterDropdownIMellomlagring = (
    mellomlagringDelseksjonKopi: mellomlagringDelseksjon,
    nyFritekstTabell: string[][],
    innholdIndeks: number,
    nyDropodownValue: string,
    nyeFlettefelt: flettefelt[]
): mellomlagringDelseksjon => {
    (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown).valgVerdi =
        nyDropodownValue;
    mellomlagringDelseksjonKopi.fritekstTabell = nyFritekstTabell;
    (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown).flettefelt =
        Array(nyeFlettefelt.length).fill(tomtMellomlagringFlettefelt);
    return mellomlagringDelseksjonKopi;
};

export const oppdaterFlettefeltIMellomlagring = (
    mellomlagringDelseksjonKopi: mellomlagringDelseksjon,
    nyFritekstTabell: string[][],
    innholdIndeks: number,
    flettefeltIndeks: number,
    nyFlettefeltVerdi: string
): mellomlagringDelseksjon => {
    mellomlagringDelseksjonKopi.fritekstTabell = nyFritekstTabell;
    if (erMellomLagringInnholdDropdown(mellomlagringDelseksjonKopi.innhold[innholdIndeks])) {
        (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown).flettefelt[
            flettefeltIndeks
        ].verdi = nyFlettefeltVerdi;
        (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown).flettefelt[
            flettefeltIndeks
        ].harBlittEndret = true;
    } else {
        (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringFlettefelt[])[
            flettefeltIndeks
        ].verdi = nyFlettefeltVerdi;
        (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringFlettefelt[])[
            flettefeltIndeks
        ].harBlittEndret = true;
    }
    return mellomlagringDelseksjonKopi;
};

export const erDataMellomlagret = (mellomlagringDelseksjon: mellomlagringDelseksjon): boolean => {
    return mellomlagringDelseksjon && mellomlagringDelseksjon.fritekstTabell.length > 0;
};
