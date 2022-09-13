/// <reference types="react" />
import { SanitySeksjon } from "../typer/sanity";
import "../stiler/seksjon.css";
interface SeksjonsProps {
    seksjon: SanitySeksjon;
    seksjonStartIndeks: number;
}
export declare function Seksjon({ seksjon, seksjonStartIndeks }: SeksjonsProps): JSX.Element;
export {};
