import { Dispatch } from 'react';

export interface brevmal {
    tittel: string;
    id: string;
}

export type avsnittType = string[];

export type skalAvsnittInkluderesType = boolean[];

export type brevmalTittelType = string;

export type ContextType = {
    avsnittState: avsnittType;
    avsnittDispatch: Dispatch<avsnittType>;

    skalAvsnittInkluderesState: skalAvsnittInkluderesType;
    skalAvsnittInkluderesDispatch: Dispatch<skalAvsnittInkluderesType>;

    brevmalTittelState: brevmalTittelType;
    brevmalTittelDispatch: Dispatch<brevmalTittelType>;
};

export type tabellObjekt = {
    id: string;
    tabell: string[][];
};
