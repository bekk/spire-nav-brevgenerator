/// <reference types="react" />
import { SanityDropdown } from "../typer/sanity";
export interface dropdownProps {
    sanityDropdown: SanityDropdown;
    håndterEndringIDropdown: (e: string, indeks: number) => void;
    innholdIndeks: number;
}
export declare function Dropdown({ sanityDropdown, håndterEndringIDropdown, innholdIndeks, }: dropdownProps): JSX.Element;
