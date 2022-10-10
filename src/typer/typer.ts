import { Dispatch } from 'react';
export interface brevmal {
    tittel: string;
    id: string;
    updatedAt: string;
}

export type StateSkalAvsnittInkluderes = boolean[];

export type StateBrevmalTittel = string;

export type StateDelseksjon = {
    innhold: (StateFlettefelt[] | StateDropdown)[];
    fritekstTabell: string[][];
};

export type SkjemaContextType = {
    skalAvsnittInkluderesState: StateSkalAvsnittInkluderes;
    skalAvsnittInkluderesDispatch: Dispatch<StateSkalAvsnittInkluderes>;

    brevmalTittelState: StateBrevmalTittel;
    brevmalTittelDispatch: Dispatch<StateBrevmalTittel>;

    delseksjonerState: StateDelseksjon[];
    delseksjonerDispatch: Dispatch<StateDelseksjon[]>;
};
export interface StateDropdown {
    valgVerdi?: string;
    flettefelt: StateFlettefelt[];
}

export type tabellObjekt = {
    id: string;
    tabell: string[][];
};

export type StateFlettefelt = {
    verdi: string;
    harBlittEndret: boolean;
};

export const tomtFlettefelt: StateFlettefelt = {
    verdi: '',
    harBlittEndret: false,
};

export type FlettefeltVerdier = {
    tekst: string;
    marks: string[];
    key: string;
    verdi: string;
    harBlittEndret: boolean;
};
