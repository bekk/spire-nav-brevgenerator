import { Dispatch } from 'react';
export interface brevmal {
    tittel: string;
    id: string;
}

export type skalAvsnittInkluderesType = boolean[];

export type brevmalTittelType = string;

export type delseksjonType = {
    innhold: (string[] | dropdown)[];
    fritekstTabell: string[][];
};

export type SkjemaContextType = {
    skalAvsnittInkluderesState: skalAvsnittInkluderesType;
    skalAvsnittInkluderesDispatch: Dispatch<skalAvsnittInkluderesType>;

    brevmalTittelState: brevmalTittelType;
    brevmalTittelDispatch: Dispatch<brevmalTittelType>;

    delseksjonerState: delseksjonType[];
    delseksjonerDispatch: Dispatch<delseksjonType[]>;
};
export interface dropdown {
    valgVerdi?: string;
    flettefelt: string[];
}

export type tabellObjekt = {
    id: string;
    tabell: string[][];
};

export type flettefelt = {
    tekst: string;
    marks: string[];
    key: string;
};
