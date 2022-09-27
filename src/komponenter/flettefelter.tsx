import React from 'react';
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
    mellomlagretVerdier?: string[];
}

export function Flettefelter({
    flettefelter,
    innholdIndeks,
    håndterEndringIFletteFelt,
    mellomlagretVerdier,
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
                    mellomlagretVerdi={
                        mellomlagretVerdier ? mellomlagretVerdier[flettefeltIndeks] : undefined
                    }
                />
            ))}
        </>
    );
}
