import React from 'react';
import { TextField } from '@navikt/ds-react';
import { flettefelt } from '../typer/typer';

export interface flettefeltProps {
    flettefelt: flettefelt;
    flettefeltIndeks: number;
    innholdIndeks: number;
    håndterEndringIFletteFelt: (
        e: React.ChangeEvent<HTMLInputElement>,
        flettefeltIndeks: number,
        innholdIndeks: number,
        dropdownIndeks?: number
    ) => void;
}

export function Flettefelt({
    flettefelt,
    flettefeltIndeks,
    innholdIndeks,
    håndterEndringIFletteFelt,
}: flettefeltProps) {
    return (
        <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                håndterEndringIFletteFelt(e, flettefeltIndeks, innholdIndeks)
            }
            key={flettefelt.key}
            label={flettefelt.tekst}
            size="small"
        />
    );
}
