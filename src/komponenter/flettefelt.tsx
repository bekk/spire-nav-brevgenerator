import React from 'react';
import { TextField } from '@navikt/ds-react';
import { SanityChildren } from '../typer/sanity';

export interface flettefeltProps {
	flettefelt: SanityChildren;
	flettefeltIndeks: number;
	innholdIndeks: number;
	håndterEndringIFletteFelt: (
		e: React.ChangeEvent<HTMLInputElement>,
		flettefeltIndeks: number,
		innholdIndeks: number
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
			key={flettefelt._key}
			label={flettefelt.text}
			size="small"
		/>
	);
}
