import React from 'react';
import { Select } from '@navikt/ds-react';
import { SanityDropdown, SanityTekstObjekt } from '../typer/sanity';
import { sanityBlocktekstToHtml } from '../utils/sanityUtils';

export interface dropdownProps {
    sanityDropdown: SanityDropdown;
    håndterEndringIDropdown: (e: string, indeks: number) => void;
    innholdIndeks: number;
}

export function Dropdown({
    sanityDropdown,
    håndterEndringIDropdown,
    innholdIndeks,
}: dropdownProps) {
    return (
        <Select
            label={sanityDropdown.dropdowntittel}
            onChange={(e) => håndterEndringIDropdown(e.target.value, innholdIndeks)}
            defaultValue={''}
            data-cy="dropdown"
        >
            <option value={''} disabled>
                Velg et alternativ
            </option>
            {sanityDropdown.valg !== undefined &&
                sanityDropdown.valg.map((valg: SanityTekstObjekt, indeks2: number) => (
                    <option
                        key={indeks2}
                        value={sanityBlocktekstToHtml(valg) + `@&#${indeks2.toString()}`}
                    >
                        {valg.tekstTittel}
                    </option>
                ))}
        </Select>
    );
}
