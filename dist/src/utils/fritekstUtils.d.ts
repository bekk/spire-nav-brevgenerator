import { SanityTekstObjekt } from '../typer/sanity';
export declare const dobbelTabellTilStreng: (fritekstTabell: string[][]) => string;
export declare const sanityTekstObjektTilStreng: (valg: SanityTekstObjekt) => string;
export declare const finnEndringsIndeks: (nyFritekst: string, gammelTekst: string) => number;
export declare const finnAntallTegnLagtTil: (nyFritekst: string, gammelFritekst: string) => number;
export declare const finnTabellIndeksOgNyttFritekstElement: (endringsIndeks: number, nyFritekst: string, fritekstTabellKopi: string[], antallTegnLagtTil: number, antallTegnITidligereElementer: number) => {
    tabellIndeks: number;
    nyttFritekstElement: string;
};
export declare const finnKaraktererIListeMedStrenger: (listeMedStrenger: string[]) => number;
