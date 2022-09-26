import React from 'react';
import { SanityChildren } from '../typer/sanity';
import { Flettefelt } from './flettefelt';

export interface flettefeltProps {
    flettefelter: SanityChildren[];
    innholdIndeks: number;
    håndterEndringIFletteFelt: (
        e: React.ChangeEvent<HTMLInputElement>,
        flettefeltIndeks: number,
        innholdIndeks: number
    ) => void;
}

export function Flettefelter({
    flettefelter,
    innholdIndeks,
    håndterEndringIFletteFelt,
}: flettefeltProps) {
    return (
        <>
            {flettefelter.map((flettefelt: SanityChildren, flettefeltIndeks: number) => (
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
