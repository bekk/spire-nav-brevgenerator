/// <reference types="react" />
import { SanityDelseksjon } from "../typer/sanity";
import "../stiler/delseksjon.css";
interface seksjonProps {
    delseksjon: SanityDelseksjon;
    delseksjonIndeks: number;
}
export declare function Delseksjon({ delseksjon, delseksjonIndeks }: seksjonProps): JSX.Element;
export {};
