import React from 'react';
import { flettefelt } from '../typer/typer';
import { Flettefelt } from './flettefelt';

export interface flettefeltProps {
    flettefelter: flettefelt[];
    innholdIndeks: number;
    håndterEndringIFletteFelt: (
        nyTekst: string,
        flettefeltIndeks: number,
        innholdIndeks: number,
        dropdownIndeks?: number
    ) => void;
}

export function Flettefelter({
    flettefelter,
    innholdIndeks,
    håndterEndringIFletteFelt,
}: flettefeltProps) {
    return (
        <>
            {flettefelter.map((flettefelt: flettefelt, flettefeltIndeks: number) => (
                <Flettefelt
                    key={flettefeltIndeks}
                    flettefelt={flettefelt}
                    flettefeltIndeks={flettefeltIndeks}
                    innholdIndeks={innholdIndeks}
                    håndterEndringIFletteFelt={håndterEndringIFletteFelt}
                />
            ))}
        </>
    );
}
