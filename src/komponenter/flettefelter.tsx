import React from 'react';
import { SanityChildren } from '../typer/sanity';
import { flettefelt } from '../typer/typer';
import { Flettefelt } from './flettefelt';

export interface flettefeltProps {
    flettefelter: flettefelt[];
    innholdIndeks: number;
    håndterEndringIFletteFelt: (
        e: React.ChangeEvent<HTMLInputElement>,
        flettefeltIndeks: number,
        innholdIndeks: number,
        dropdownIndeks?: number
    ) => void;
    dropdownIndeks?: number;
}

export function Flettefelter({
    flettefelter,
    innholdIndeks,
    håndterEndringIFletteFelt,
    dropdownIndeks,
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
                    dropdownIndeks={dropdownIndeks}
                />
            ))}
        </>
    );
}
