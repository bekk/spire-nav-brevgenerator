import React from "react";
import { SanityChildren } from "../typer/sanity";
export interface flettefeltProps {
    flettefelter: SanityChildren[];
    innholdIndeks: number;
    håndterEndringIFletteFelt: (e: React.ChangeEvent<HTMLInputElement>, flettefeltIndeks: number, innholdIndeks: number) => void;
}
export declare function Flettefelter({ flettefelter, innholdIndeks, håndterEndringIFletteFelt, }: flettefeltProps): JSX.Element;
