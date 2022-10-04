import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from '@navikt/ds-react';
import { MellomlagringContext, SkjemaContext } from '../context/context';
import { SanityDelseksjon, SanityDropdown, SanityTekstObjekt } from '../typer/sanity';
import { Fritekst } from './fritekst';
import {
    dobbelTabellTilStreng,
    innholdTilFritekstTabell,
    oppdaterFritekstTabellMedTekst,
    oppdaterFritekstTabellMedDropdown,
    oppdaterFritekstTabellMedFlettefelt,
} from '../utils/fritekstUtils';
import '../stiler/delseksjon.css';
import { erInnholdDropdown, erInnholdTekstObjekt } from '../utils/sanityUtils';
import { Dropdown } from './dropdown';
import { Flettefelter } from './flettefelter';
import {
    finnFlettefeltIDropdown,
    finnInnholdOgFlettefletIndeks,
    innholdTilFlettefeltTabell,
} from '../utils/flettefeltUtils';
import { flettefelt } from '../typer/typer';
import { mellomlagringDelseksjon, mellomlagringDropdown } from '../typer/mellomlagring';
import {
    erDataMellomlagret,
    oppdaterDropdownIMellomlagring,
    oppdaterFlettefeltIMellomlagring,
    oppdaterFritekstTabellIMellomlagring,
} from '../utils/mellomlagring';

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
        avsnittState,
        avsnittDispatch,
        skalAvsnittInkluderesState,
        skalAvsnittInkluderesDispatch,
    } = useContext(SkjemaContext);
    const { mellomlagringDelseksjonerDispatch, mellomlagringDelseksjonerState } =
        React.useContext(MellomlagringContext);
    const [fritekstTabell, settFritekstTabell] = useState<string[][]>([]);
    const [fritekst, settFritekst] = useState<string>('');
    const [flettefelt, settFlettefelt] = useState<flettefelt[][]>([]);

    useEffect(() => {
        settFritekst('');
        if (delseksjon.innhold !== null) {
            const mellomlagretDelseskjon = mellomlagringDelseksjonerState[delseksjonIndeks];

            if (erDataMellomlagret(mellomlagretDelseskjon)) {
                const nyFlettefeltTabell = innholdTilFlettefeltTabell(
                    delseksjon.innhold,
                    mellomlagretDelseskjon.innhold
                );
                settFlettefelt(nyFlettefeltTabell);

                settFritekstTabell(mellomlagretDelseskjon.fritekstTabell);
                settFritekst(avsnittState[delseksjonIndeks]);
            } else {
                const nyFlettefeltTabell = innholdTilFlettefeltTabell(delseksjon.innhold);
                settFlettefelt(nyFlettefeltTabell);

                const nyFritekstTabell = innholdTilFritekstTabell(delseksjon.innhold);
                settFritekstTabell(nyFritekstTabell);
                settFritekst(dobbelTabellTilStreng(nyFritekstTabell));
            }
        }
    }, [delseksjon]);

    useEffect(() => {
        if (skalAlleValgNullstilles) {
            const nyFritekstTabell = innholdTilFritekstTabell(delseksjon.innhold);
            settFritekstTabell(nyFritekstTabell);
            settFritekst(dobbelTabellTilStreng(nyFritekstTabell));

            setSkalAlleValgNullstilles(false);
        }
    }, [skalAlleValgNullstilles]);

    const oppdaterFlettefeltFraDropdowns = (nyeFlettefelt: flettefelt[], indeks: number) => {
        const flettefeltKopi = [...flettefelt];
        flettefeltKopi[indeks] = nyeFlettefelt;
        settFlettefelt(flettefeltKopi);
    };

    const oppdaterFlettefelt = (
        flettefeltKopi: flettefelt[][],
        innholdIndeks: number,
        flettefeltIndeks: number,
        verdi: string
    ) => {
        flettefeltKopi[innholdIndeks][flettefeltIndeks].verdi = verdi;
        flettefeltKopi[innholdIndeks][flettefeltIndeks].harBlittEndret = true;
        settFlettefelt(flettefeltKopi);
    };

    const oppdaterAvsnitt = (avsnittStreng: string) => {
        const nyeAvsnitt = [...avsnittState];
        nyeAvsnitt[delseksjonIndeks] = avsnittStreng;
        avsnittDispatch(nyeAvsnitt);
    };

    const handterToggle = () => {
        const nyeInkluderingsBrytere = [...skalAvsnittInkluderesState];
        nyeInkluderingsBrytere[delseksjonIndeks] = !skalAvsnittInkluderesState[delseksjonIndeks];
        skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
    };

    const setMellomlagringDelseksjonState = (mellomlagringDelseksjon: mellomlagringDelseksjon) => {
        const mellomlagringDelseksjonStateKopi = [...mellomlagringDelseksjonerState];
        mellomlagringDelseksjonStateKopi[delseksjonIndeks] = mellomlagringDelseksjon;
        mellomlagringDelseksjonerDispatch(mellomlagringDelseksjonStateKopi);
    };

    const håndterEndringIFritekstFelt = (nyFritekst: string) => {
        const { nyFritekstTabell, flettefeltNummer, nyttFritekstElement } =
            oppdaterFritekstTabellMedTekst([...fritekstTabell], nyFritekst);
        let nyMellomlagringDelseksjon = oppdaterFritekstTabellIMellomlagring(
            { ...mellomlagringDelseksjonerState[delseksjonIndeks] },
            nyFritekstTabell
        );

        if (flettefeltNummer !== undefined && nyttFritekstElement !== undefined) {
            const { innholdIndeks, flettefeltIndeks } = finnInnholdOgFlettefletIndeks(
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
                nyMellomlagringDelseksjon = oppdaterFlettefeltIMellomlagring(
                    { ...mellomlagringDelseksjonerState[delseksjonIndeks] },
                    nyFritekstTabell,
                    innholdIndeks,
                    flettefeltIndeks,
                    nyttFritekstElement
                );
            }
        }
        oppdaterAvsnitt(nyFritekst);
        settFritekstTabell(nyFritekstTabell);
        setMellomlagringDelseksjonState(nyMellomlagringDelseksjon);
    };

    const håndterEndringIDropdown = (nyTekstOgIndeksStreng: string, innholdIndeks: number) => {
        const nyTekstOgIndeks = nyTekstOgIndeksStreng.split('@&#');
        const valgIndeks = Number(nyTekstOgIndeks[1]);
        const nyFritekstTabell = oppdaterFritekstTabellMedDropdown(
            [...fritekstTabell],
            innholdIndeks,
            delseksjon,
            valgIndeks
        );
        const fritekstStreng = dobbelTabellTilStreng(nyFritekstTabell);
        const nyeFlettefelt = finnFlettefeltIDropdown(
            delseksjon.innhold[innholdIndeks] as SanityDropdown,
            valgIndeks
        );
        const nyMellomlagringDelseksjon = oppdaterDropdownIMellomlagring(
            { ...mellomlagringDelseksjonerState[delseksjonIndeks] },
            nyFritekstTabell,
            innholdIndeks,
            nyTekstOgIndeksStreng,
            nyeFlettefelt
        );

        settFritekstTabell(nyFritekstTabell);
        oppdaterAvsnitt(fritekstStreng);
        settFritekst(fritekstStreng);
        oppdaterFlettefeltFraDropdowns(nyeFlettefelt, innholdIndeks);
        setMellomlagringDelseksjonState(nyMellomlagringDelseksjon);
    };

    const håndterEndringIFletteFelt = (
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
        const nyFritekst = dobbelTabellTilStreng(nyFritekstTabell);
        const nyMellomlagringDelseksjon = oppdaterFlettefeltIMellomlagring(
            { ...mellomlagringDelseksjonerState[delseksjonIndeks] },
            nyFritekstTabell,
            innholdIndeks,
            flettefeltIndeks,
            nyTekst
        );

        oppdaterFlettefelt([...flettefelt], innholdIndeks, flettefeltIndeks, nyTekst);
        settFritekstTabell(nyFritekstTabell);
        settFritekst(nyFritekst);
        oppdaterAvsnitt(nyFritekst);
        setMellomlagringDelseksjonState(nyMellomlagringDelseksjon);
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
                                if (erInnholdDropdown(innhold)) {
                                    return (
                                        <div key={innholdIndeks}>
                                            <Dropdown
                                                sanityDropdown={innhold as SanityDropdown}
                                                håndterEndringIDropdown={håndterEndringIDropdown}
                                                innholdIndeks={innholdIndeks}
                                                mellomlagretVerdi={
                                                    (
                                                        mellomlagringDelseksjonerState[
                                                            delseksjonIndeks
                                                        ].innhold[
                                                            innholdIndeks
                                                        ] as mellomlagringDropdown
                                                    )?.valgVerdi
                                                }
                                            />
                                            {flettefelt[innholdIndeks] !== undefined && (
                                                <Flettefelter
                                                    flettefelter={flettefelt[innholdIndeks]}
                                                    innholdIndeks={innholdIndeks}
                                                    håndterEndringIFletteFelt={
                                                        håndterEndringIFletteFelt
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
                                                håndterEndringIFletteFelt={
                                                    håndterEndringIFletteFelt
                                                }
                                            />
                                        );
                                    }
                                }
                            }
                        )}
                    <label className="navds-form-field__label navds-label">Fritekst</label>

                    <Fritekst
                        håndterEndringIFritekstFelt={håndterEndringIFritekstFelt}
                        defaultTekst={fritekst}
                    />
                </div>
            )}
        </div>
    );
}
