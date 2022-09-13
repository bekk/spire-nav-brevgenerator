import { SanityTekstObjekt, SanityDropdown } from '../typer/sanity';
export declare const sanityToHtml: (tekst: SanityTekstObjekt) => string[];
export declare const erInnholdDropdown: (innhold: SanityDropdown | SanityTekstObjekt) => boolean;
export declare const erInnholdTekstObjekt: (innhold: SanityDropdown | SanityTekstObjekt) => boolean;
