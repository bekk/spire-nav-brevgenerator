import {mellomlagringDelseksjon, mellomlagringDropdown } from "../typer/mellomlagring";
import { flettefelt } from "../typer/typer";

export const erMellomLagringInnholdDropdown = (innhold: string[] | mellomlagringDropdown): boolean => {
    return (innhold as mellomlagringDropdown).valgVerdi !== undefined;
}

export const oppdaterFritekstTabellIMellomlagring = (mellomlagringDelseksjonKopi: mellomlagringDelseksjon, nyFritekstTabell: string[][]): mellomlagringDelseksjon => {
    mellomlagringDelseksjonKopi.fritekstTabell = nyFritekstTabell;
    return mellomlagringDelseksjonKopi;
}

export const oppdaterDropdownIMellomlagring = (mellomlagringDelseksjonKopi: mellomlagringDelseksjon, nyFritekstTabell: string[][], innholdIndeks: number, nyDropodownValue: string, nyeFlettefelt: flettefelt[]): mellomlagringDelseksjon => {
    (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown).valgVerdi = nyDropodownValue;
    mellomlagringDelseksjonKopi.fritekstTabell = nyFritekstTabell;
    (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown).flettefelt = Array(nyeFlettefelt.length).fill('');
    return mellomlagringDelseksjonKopi;
}

export const oppdaterFlettefeltIMellomlagring = (mellomlagringDelseksjonKopi: mellomlagringDelseksjon, nyFritekstTabell: string[][], innholdIndeks: number, flettefeltIndeks: number, nyFlettefeltVerdi: string): mellomlagringDelseksjon => {
        mellomlagringDelseksjonKopi.fritekstTabell = nyFritekstTabell;
        if (erMellomLagringInnholdDropdown(mellomlagringDelseksjonKopi.innhold[innholdIndeks])) {
            (
                mellomlagringDelseksjonKopi.innhold[innholdIndeks] as mellomlagringDropdown
            ).flettefelt[flettefeltIndeks] = nyFlettefeltVerdi; 
        } else {
            (mellomlagringDelseksjonKopi.innhold[innholdIndeks] as string[])[flettefeltIndeks] =
                nyFlettefeltVerdi;
        }
        return mellomlagringDelseksjonKopi
}

export const erDataMellomlagret = (mellomlagringDelseksjon: mellomlagringDelseksjon): boolean => {
    return mellomlagringDelseksjon && mellomlagringDelseksjon.fritekstTabell.length > 0;
}