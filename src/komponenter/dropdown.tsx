import React from 'react';
import { Select } from '@navikt/ds-react';
import { SanityDropdown, SanityTekstObjekt } from '../typer/sanity';
import { sanityBlocktekstToHtml } from '../utils/sanityUtils';

export interface dropdownProps {
    sanityDropdown: SanityDropdown;
    håndterEndringIDropdown: (nyStreng: string, innholdIndeks: number) => void;
    innholdIndeks: number;
    mellomlagretVerdi?: string;
}

export function Dropdown({
    sanityDropdown,
    håndterEndringIDropdown,
    innholdIndeks,
    mellomlagretVerdi,
}: dropdownProps) {
    return (
        <Select
            label={sanityDropdown.dropdowntittel}
            onChange={(e) => håndterEndringIDropdown(e.target.value, innholdIndeks)}
            value={mellomlagretVerdi ? mellomlagretVerdi : ''}
            data-cy="dropdown"
        >
            <option value={''} disabled>
                Velg et alternativ
            </option>
            {sanityDropdown.valg !== undefined &&
                sanityDropdown.valg.map((valg: SanityTekstObjekt, indeks2: number) => (
                    <option
                        key={indeks2}
                        value={sanityBlocktekstToHtml(valg).join('|') + `@&#${indeks2.toString()}`}
                    >
                        {valg.tekstTittel}
                    </option>
                ))}
        </Select>
    );
}
