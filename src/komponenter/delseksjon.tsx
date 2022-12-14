import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, Button, Label } from '@navikt/ds-react';
import { SkjemaContext } from '../context/context';
import { SanityDelseksjon, SanityDropdown, SanityTekstObjekt } from '../typer/sanity';
import { Fritekst } from './fritekst';
import {
    oppdaterFritekstTabellMedTekst,
    oppdaterFritekstTabellMedDropdown,
    oppdaterFritekstTabellMedFlettefelt,
    innholdTilFritekstTabell,
} from '../utils/fritekstUtils';
import '../stiler/delseksjon.css';
import { erInnholdSanityDropdown, erInnholdTekstObjekt } from '../utils/sanityUtils';
import { Dropdown } from './dropdown';
import { Flettefelter } from './flettefelter';
import {
    finnFlettefeltIDropdown,
    finnInnholdOgFlettefeltIndeks,
    innholdTilFlettefeltTabell,
} from '../utils/flettefeltUtils';
import { FlettefeltVerdier, StateDelseksjon, StateDropdown } from '../typer/typer';
import {
    oppdaterDropdownIDelseksjonState,
    oppdaterFlettefeltIDelseksjonerState,
    oppdaterFritekstTabellFraDelseksjonState,
    oppdaterFritekstTabellIDelseksjonState,
} from '../utils/delseksjonUtils';

interface seksjonProps {
    delseksjon: SanityDelseksjon;
    delseksjonIndeks: number;
    skalAlleValgNullstilles: boolean;
    setSkalAlleValgNullstilles: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Delseksjon({
    delseksjon,
    delseksjonIndeks,
    skalAlleValgNullstilles,
    setSkalAlleValgNullstilles,
}: seksjonProps) {
    const {
        skalAvsnittInkluderesState,
        skalAvsnittInkluderesDispatch,
        delseksjonerState,
        delseksjonerDispatch,
    } = useContext(SkjemaContext);

    const [fritekstTabell, settFritekstTabell] = useState<string[][]>([]);
    const [flettefelt, settFlettefelt] = useState<FlettefeltVerdier[][]>([]);
    const [oppdaterFritekst, settOppdaterFritekst] = useState(true);

    useEffect(() => {
        if (delseksjon.innhold !== undefined) {
            const delseksjonState = delseksjonerState[delseksjonIndeks];

            const nyFlettefeltTabell = innholdTilFlettefeltTabell(
                delseksjon.innhold,
                delseksjonState.innhold
            );

            settFlettefelt(nyFlettefeltTabell);
            settFritekstTabell(delseksjonState.fritekstTabell);
        }
        settOppdaterFritekst(true);
    }, [delseksjon]);

    useEffect(() => {
        if (skalAlleValgNullstilles) {
            const nyFritekstTabell = innholdTilFritekstTabell(delseksjon.innhold);
            const nyDelseksjonState = oppdaterFritekstTabellIDelseksjonState(
                { ...delseksjonerState[delseksjonIndeks] },
                nyFritekstTabell
            );

            settFritekstTabell(nyFritekstTabell);
            settDelseksjonerState(nyDelseksjonState);
            settOppdaterFritekst(true);
            setSkalAlleValgNullstilles(false);
        }
    }, [skalAlleValgNullstilles]);

    const oppdaterFlettefeltFraDropdowns = (nyeFlettefelt: FlettefeltVerdier[], indeks: number) => {
        const flettefeltKopi = [...flettefelt];
        flettefeltKopi[indeks] = nyeFlettefelt;
        settFlettefelt(flettefeltKopi);
    };

    const oppdaterFlettefelt = (
        flettefeltKopi: FlettefeltVerdier[][],
        innholdIndeks: number,
        flettefeltIndeks: number,
        verdi: string
    ) => {
        flettefeltKopi[innholdIndeks][flettefeltIndeks].verdi = verdi;
        flettefeltKopi[innholdIndeks][flettefeltIndeks].harBlittEndret = true;
        settFlettefelt(flettefeltKopi);
    };

    const handterToggle = () => {
        const nyeInkluderingsBrytere = [...skalAvsnittInkluderesState];
        nyeInkluderingsBrytere[delseksjonIndeks] = !skalAvsnittInkluderesState[delseksjonIndeks];

        skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
    };

    const settDelseksjonerState = (delseksjonState: StateDelseksjon) => {
        const delseksjonerStateKopi = [...delseksjonerState];
        delseksjonerStateKopi[delseksjonIndeks] = delseksjonState;

        delseksjonerDispatch(delseksjonerStateKopi);
    };

    const h??ndterEndringIFritekstFelt = (nyFritekst: string) => {
        const { nyFritekstTabell, flettefeltNummer, nyttFritekstElement } =
            oppdaterFritekstTabellMedTekst([...fritekstTabell], nyFritekst);
        let nyDelseksjonState = oppdaterFritekstTabellIDelseksjonState(
            { ...delseksjonerState[delseksjonIndeks] },
            nyFritekstTabell
        );

        if (flettefeltNummer !== undefined && nyttFritekstElement !== undefined) {
            const { innholdIndeks, flettefeltIndeks } = finnInnholdOgFlettefeltIndeks(
                flettefeltNummer,
                flettefelt
            );
            if (innholdIndeks !== -1) {
                oppdaterFlettefelt(
                    [...flettefelt],
                    innholdIndeks,
                    flettefeltIndeks,
                    nyttFritekstElement
                );
                nyDelseksjonState = oppdaterFlettefeltIDelseksjonerState(
                    { ...delseksjonerState[delseksjonIndeks] },
                    nyFritekstTabell,
                    innholdIndeks,
                    flettefeltIndeks,
                    nyttFritekstElement
                );
            }
        }
        settFritekstTabell(nyFritekstTabell);
        settDelseksjonerState(nyDelseksjonState);
    };

    const h??ndterEndringIDropdown = (nyTekstOgIndeksStreng: string, innholdIndeks: number) => {
        const nyTekstOgIndeks = nyTekstOgIndeksStreng.split('@&#');
        const valgIndeks = Number(nyTekstOgIndeks[1]);
        const nyFritekstTabell = oppdaterFritekstTabellMedDropdown(
            [...fritekstTabell],
            innholdIndeks,
            delseksjon,
            valgIndeks
        );

        const nyeFlettefelt = finnFlettefeltIDropdown(
            delseksjon.innhold[innholdIndeks] as SanityDropdown,
            valgIndeks
        );

        const nyDelseksjonState = oppdaterDropdownIDelseksjonState(
            { ...delseksjonerState[delseksjonIndeks] },
            nyFritekstTabell,
            innholdIndeks,
            nyTekstOgIndeksStreng,
            nyeFlettefelt
        );

        settFritekstTabell(nyFritekstTabell);
        oppdaterFlettefeltFraDropdowns(nyeFlettefelt, innholdIndeks);
        settDelseksjonerState(nyDelseksjonState);
        settOppdaterFritekst(true);
    };

    const h??ndterEndringIFletteFelt = (
        nyTekst: string,
        flettefeltIndeks: number,
        innholdIndeks: number
    ) => {
        const nyFritekstTabell = oppdaterFritekstTabellMedFlettefelt(
            [...fritekstTabell],
            innholdIndeks,
            flettefeltIndeks,
            nyTekst
        );

        const nyDelseksjonState = oppdaterFlettefeltIDelseksjonerState(
            { ...delseksjonerState[delseksjonIndeks] },
            nyFritekstTabell,
            innholdIndeks,
            flettefeltIndeks,
            nyTekst
        );

        oppdaterFlettefelt([...flettefelt], innholdIndeks, flettefeltIndeks, nyTekst);
        settFritekstTabell(nyFritekstTabell);
        settDelseksjonerState(nyDelseksjonState);
        settOppdaterFritekst(true);
    };

    const nullstillFritekst = () => {
        const nyFritekstTabell = oppdaterFritekstTabellFraDelseksjonState(
            delseksjon,
            delseksjonerState[delseksjonIndeks]
        );

        const nyDelseksjonState = oppdaterFritekstTabellIDelseksjonState(
            { ...delseksjonerState[delseksjonIndeks] },
            nyFritekstTabell
        );

        settFritekstTabell(nyFritekstTabell);
        settDelseksjonerState(nyDelseksjonState);
        settOppdaterFritekst(true);
    };

    return (
        <div className="delseksjon">
            <Checkbox
                checked={skalAvsnittInkluderesState[delseksjonIndeks]}
                value={skalAvsnittInkluderesState[delseksjonIndeks]}
                onClick={() => handterToggle()}
                className={skalAvsnittInkluderesState[delseksjonIndeks] ? '' : 'disabled-tekst'}
                data-cy="delseksjon_checkbox"
            >
                {delseksjon.delseksjonstittel}
            </Checkbox>
            {skalAvsnittInkluderesState[delseksjonIndeks] === true && (
                <div className="delseksjon-felter">
                    {delseksjon.innhold !== null &&
                        delseksjon.innhold.map(
                            (
                                innhold: SanityDropdown | SanityTekstObjekt,
                                innholdIndeks: number
                            ) => {
                                if (erInnholdSanityDropdown(innhold)) {
                                    return (
                                        <div key={innholdIndeks}>
                                            <Dropdown
                                                sanityDropdown={innhold as SanityDropdown}
                                                h??ndterEndringIDropdown={h??ndterEndringIDropdown}
                                                innholdIndeks={innholdIndeks}
                                                mellomlagretVerdi={
                                                    (
                                                        delseksjonerState[delseksjonIndeks].innhold[
                                                            innholdIndeks
                                                        ] as StateDropdown
                                                    )?.valgVerdi
                                                }
                                            />
                                            {flettefelt[innholdIndeks] !== undefined && (
                                                <Flettefelter
                                                    flettefelter={flettefelt[innholdIndeks]}
                                                    innholdIndeks={innholdIndeks}
                                                    h??ndterEndringIFletteFelt={
                                                        h??ndterEndringIFletteFelt
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                } else if (erInnholdTekstObjekt(innhold)) {
                                    if (flettefelt[innholdIndeks] !== undefined) {
                                        return (
                                            <Flettefelter
                                                key={innholdIndeks}
                                                flettefelter={flettefelt[innholdIndeks]}
                                                innholdIndeks={innholdIndeks}
                                                h??ndterEndringIFletteFelt={
                                                    h??ndterEndringIFletteFelt
                                                }
                                            />
                                        );
                                    }
                                }
                            }
                        )}
                    <div className="fritekst-label">
                        <Label>Fritekst</Label>
                    </div>

                    <Fritekst
                        h??ndterEndringIFritekstFelt={h??ndterEndringIFritekstFelt}
                        defaultTekst={fritekstTabell}
                        oppdaterFritekst={oppdaterFritekst}
                        settOppdaterFritekst={settOppdaterFritekst}
                    />
                    <div className="nullstill-fritekst-kontainer">
                        <Button onClick={nullstillFritekst}>Tilbakestill fritekstfelt</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
