import { Dispatch } from 'react';
export interface brevmal {
    tittel: string;
    id: string;
}
export declare type avsnittType = string[];
export declare type skalAvsnittInkluderesType = boolean[];
export declare type brevmalTittelType = string;
export declare type ContextType = {
    avsnittState: avsnittType;
    avsnittDispatch: Dispatch<avsnittType>;
    skalAvsnittInkluderesState: skalAvsnittInkluderesType;
    skalAvsnittInkluderesDispatch: Dispatch<skalAvsnittInkluderesType>;
    brevmalTittelState: brevmalTittelType;
    brevmalTittelDispatch: Dispatch<brevmalTittelType>;
};
export declare type tabellObjekt = {
    id: string;
    tabell: string[][];
};
