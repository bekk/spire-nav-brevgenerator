import React from 'react';
import { Heading } from '@navikt/ds-react';

export function Overskrift() {
	return (
		<div className="app-overskrift" id="sideOverskrift">
			<Heading level="1" size="xlarge">
				Vedtaksbrev
			</Heading>
		</div>
	);
}
