import React from "react";
import { SanityChildren } from "../typer/sanity";
export interface flettefeltProps {
    flettefelt: SanityChildren;
    flettefeltIndeks: number;
    innholdIndeks: number;
    håndterEndringIFletteFelt: (e: React.ChangeEvent<HTMLInputElement>, flettefeltIndeks: number, innholdIndeks: number) => void;
}
export declare function Flettefelt({ flettefelt, flettefeltIndeks, innholdIndeks, håndterEndringIFletteFelt, }: flettefeltProps): JSX.Element;
