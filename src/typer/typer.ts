import { Dispatch } from 'react';
import { mellomlagringDelseksjon } from './mellomlagring';

export interface brevmal {
    tittel: string;
    id: string;
	updatedAt: string;
}

export type avsnittType = string[];

export type skalAvsnittInkluderesType = boolean[];

export type brevmalTittelType = string;

export type SkjemaContextType = {
    avsnittState: avsnittType;
    avsnittDispatch: Dispatch<avsnittType>;

    skalAvsnittInkluderesState: skalAvsnittInkluderesType;
    skalAvsnittInkluderesDispatch: Dispatch<skalAvsnittInkluderesType>;

    brevmalTittelState: brevmalTittelType;
    brevmalTittelDispatch: Dispatch<brevmalTittelType>;
};

export type MellomlagringContextType = {
    mellomlagringDelseksjonerState: mellomlagringDelseksjon[];
    mellomlagringDelseksjonerDispatch: Dispatch<mellomlagringDelseksjon[]>;
};

export type tabellObjekt = {
    id: string;
    tabell: string[][];
};

export type flettefelt = {
    tekst: string;
    marks: string[];
    key: string;
    verdi: string;
    harBlittEndret: boolean;
};
