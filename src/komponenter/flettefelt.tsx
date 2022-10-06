import React from 'react';
import { TextField } from '@navikt/ds-react';
import { flettefelt } from '../typer/typer';

export interface flettefeltProps {
    flettefelt: flettefelt;
    flettefeltIndeks: number;
    innholdIndeks: number;
    håndterEndringIFletteFelt: (
        nyTekst: string,
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
    const tømFlettefelt = () => {
        if (flettefelt.harBlittEndret === false) {
            håndterEndringIFletteFelt('', flettefeltIndeks, innholdIndeks);
        }
    };

    return (
        <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                håndterEndringIFletteFelt(e.target.value, flettefeltIndeks, innholdIndeks)
            }
            onClick={tømFlettefelt}
            key={flettefelt.key}
            label={flettefelt.tekst}
            size="small"
            value={flettefelt.verdi}
        />
    );
}
