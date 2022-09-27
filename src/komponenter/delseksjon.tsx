import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from '@navikt/ds-react';
import { MellomlagringContext, SkjemaContext } from '../context/context';
import {
    SanityChildren,
    SanityDelseksjon,
    SanityDropdown,
    SanityTekst,
    SanityTekstObjekt,
} from '../typer/sanity';

import { Fritekst } from './fritekst';
import {
    finnEndringsIndeks,
    finnTabellIndeksOgNyttFritekstElement,
    finnAntallTegnLagtTil,
    dobbelTabellTilStreng,
    finnKaraktererIListeMedStrenger,
} from '../utils/fritekstUtils';
import '../stiler/delseksjon.css';
import {
    erInnholdDropdown,
    erInnholdTekstObjekt,
    sanityBlocktekstToHtml,
} from '../utils/sanityUtils';
import { Dropdown } from './dropdown';
import { Flettefelter } from './flettefelter';
import {
    finnFlettefeltIDropdown,
    innholdTilFlettefeltTabell,
} from '../utils/flettefeltUtils';
import { flettefelt } from '../typer/typer';
import { mellomlagringDelseksjon } from '../typer/mellomlagring';
import { dypKopi } from '../utils/utils';

interface seksjonProps {
    delseksjon: SanityDelseksjon;
    delseksjonIndeks: number;
}

export function Delseksjon({ delseksjon, delseksjonIndeks }: seksjonProps) {
    const {
        avsnittState,
        avsnittDispatch,
        skalAvsnittInkluderesState,
        skalAvsnittInkluderesDispatch,
    } = useContext(SkjemaContext);
    const {
        mellomlagringDelseksjonerDispatch,
        mellomlagringDelseksjonerState,
    } = React.useContext(MellomlagringContext);
    const [fritekstTabell, settFritekstTabell] = useState<string[][]>([]);
    const [fritekst, settFritekst] = useState<string>('');
    const [flettefelt, settFlettefelt] = useState<flettefelt[][]>([]);

    useEffect(() => {
        settFritekst('');
        if (delseksjon.innhold !== null) {
            const nyFritekstTabell = innholdTilFritekstTabell(
                delseksjon.innhold
            );
            const nyFlettefeltTabell = innholdTilFlettefeltTabell(
                delseksjon.innhold
            );

            settFritekstTabell(nyFritekstTabell);
            settFlettefelt(nyFlettefeltTabell);
            const nyFritekst = dobbelTabellTilStreng(nyFritekstTabell);
            settFritekst(nyFritekst);
        }
    }, [delseksjon]);

    const innholdTilFritekstTabell = (
        innhold: (SanityDropdown | SanityTekstObjekt)[]
    ): string[][] => {
        return innhold.map((innhold: SanityDropdown | SanityTekstObjekt) => {
            if (erInnholdTekstObjekt(innhold)) {
                return sanityBlocktekstToHtml(innhold as SanityTekstObjekt);
            } else {
                return [];
            }
        });
    };

    const oppdaterFlettefeltFraDropdowns = (
        nyeFlettefelt: flettefelt[],
        indeks: number
    ) => {
        const flettefeltKopi = [...flettefelt];
        flettefeltKopi[indeks] = nyeFlettefelt;
        settFlettefelt(flettefeltKopi);
    };

    const oppdaterAvsnitt = (avsnittStreng: string) => {
        const nyeAvsnitt = [...avsnittState];
        nyeAvsnitt[delseksjonIndeks] = avsnittStreng;
        avsnittDispatch(nyeAvsnitt);
    };

    const handterToggle = () => {
        const nyeInkluderingsBrytere = [...skalAvsnittInkluderesState];
        nyeInkluderingsBrytere[delseksjonIndeks] =
            !skalAvsnittInkluderesState[delseksjonIndeks];

        skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
    };

    const genererNyFritekstTabell = (
        nyTekst: string,
        fritekstTabellKopi: string[],
        indeks: number
    ) => {
        fritekstTabellKopi[indeks] = nyTekst;
        return fritekstTabellKopi;
    };

    const håndterEndringIFritekstFelt = (nyFritekst: string) => {
        oppdaterAvsnitt(nyFritekst);

        const nyFritekstSterialisert = nyFritekst
            .replaceAll('&nbsp;', ' ')
            .replaceAll('\n', '')
            .replaceAll('&lt;', '')
            .replaceAll('&gt;', '');

        const gammelTekst = dobbelTabellTilStreng(fritekstTabell);

        const endringsIndeks = finnEndringsIndeks(
            nyFritekstSterialisert,
            gammelTekst
        );

        if (endringsIndeks === -1) return;

        const fritekstTabellKopi = [...fritekstTabell];
        const antallTegnLagtTil = finnAntallTegnLagtTil(
            nyFritekstSterialisert,
            gammelTekst
        );

        let karakterTeller = 0;
        let erEndringGjort = false;
        const nyFritekstTabell = fritekstTabellKopi.map((liste) => {
            const gammelKarakterTeller = karakterTeller;
            karakterTeller += finnKaraktererIListeMedStrenger(liste);

            if (karakterTeller > endringsIndeks && !erEndringGjort) {
                erEndringGjort = true;
                const { tabellIndeks, nyttFritekstElement } =
                    finnTabellIndeksOgNyttFritekstElement(
                        endringsIndeks,
                        nyFritekstSterialisert,
                        liste,
                        antallTegnLagtTil,
                        gammelKarakterTeller
                    );

                const nyFritekstTabellElement = genererNyFritekstTabell(
                    nyttFritekstElement,
                    liste,
                    tabellIndeks
                );
                return nyFritekstTabellElement;
            } else {
                return liste;
            }
        });

        settFritekstTabell(nyFritekstTabell);
    };

    const håndterEndringIDropdown = (
        nyTekstOgIndeksStreng: string,
        innholdIndeks: number,
        dropdownIndeks: number
    ) => {
        const fritekstTabellKopi = [...fritekstTabell];
        const nyTekstOgIndeks = nyTekstOgIndeksStreng.split('@&#');
        const optionValgIndeks = Number(nyTekstOgIndeks[1]);

        fritekstTabellKopi[innholdIndeks] = sanityBlocktekstToHtml(
            (delseksjon.innhold[innholdIndeks] as SanityDropdown).valg[
                optionValgIndeks
            ]
        );

        settFritekstTabell(fritekstTabellKopi);
        const fritekstStreng = dobbelTabellTilStreng(fritekstTabellKopi);
        oppdaterAvsnitt(fritekstStreng);
        settFritekst(fritekstStreng);

        const mellomlagringDelseksjonKopi = dypKopi(
            mellomlagringDelseksjonerState[delseksjonIndeks]
        );
        mellomlagringDelseksjonKopi.dropdowns[dropdownIndeks].valgId =
            optionValgIndeks;

        //finner flettefelt referanser i valgt dropdown option og setter nye flettefelt i flettefeltDropdown state.
        if (erInnholdDropdown(delseksjon.innhold[innholdIndeks])) {
            const flettefeltNy = finnFlettefeltIDropdown(
                delseksjon.innhold[innholdIndeks] as SanityDropdown,
                optionValgIndeks
            );
            oppdaterFlettefeltFraDropdowns(flettefeltNy, innholdIndeks);

            mellomlagringDelseksjonKopi.dropdowns[dropdownIndeks].flettefelt =
                Array(flettefeltNy.length).fill('');
        }

        setmellomlagringDelseksjonState(mellomlagringDelseksjonKopi);
    };

    const håndterEndringIFletteFelt = (
        e: any,
        flettefeltIndeks: number,
        listeindeks: number,
        dropdownIndeks?: number
    ) => {
        const friteksttabellKopi = [...fritekstTabell];

        friteksttabellKopi[listeindeks][flettefeltIndeks * 2 + 1] =
            e.target.value;

        const nyFritekst = dobbelTabellTilStreng(friteksttabellKopi);

        settFritekstTabell(friteksttabellKopi);
        settFritekst(nyFritekst);
        oppdaterAvsnitt(nyFritekst);

        const mellomlagringDelseksjonKopi = dypKopi(
            mellomlagringDelseksjonerState[delseksjonIndeks]
        );
        if (dropdownIndeks == undefined) {
            mellomlagringDelseksjonKopi.flettefelt[flettefeltIndeks] =
                e.target.value;
        } else {
            mellomlagringDelseksjonKopi.dropdowns[dropdownIndeks].flettefelt[
                flettefeltIndeks
            ] = e.target.value;
        }
        setmellomlagringDelseksjonState(mellomlagringDelseksjonKopi);
    };

    const setmellomlagringDelseksjonState = (
        mellomlagringDelseksjon: mellomlagringDelseksjon
    ) => {
        const mellomlagringDelseksjonStateKopi = [
            ...mellomlagringDelseksjonerState,
        ];
        mellomlagringDelseksjonStateKopi[delseksjonIndeks] =
            mellomlagringDelseksjon;
        mellomlagringDelseksjonerDispatch(mellomlagringDelseksjonStateKopi);
    };

    let dropdownTeller = -1;
    return (
        <div className='delseksjon'>
            <Checkbox
                checked={skalAvsnittInkluderesState[delseksjonIndeks]}
                value={skalAvsnittInkluderesState[delseksjonIndeks]}
                onClick={() => handterToggle()}
                className={
                    skalAvsnittInkluderesState[delseksjonIndeks]
                        ? ''
                        : 'disabled-tekst'
                }
                data-cy='delseksjon_checkbox'
            >
                {delseksjon.delseksjonstittel}
            </Checkbox>
            {skalAvsnittInkluderesState[delseksjonIndeks] === true && (
                <div className='delseksjon-felter'>
                    {delseksjon.innhold !== null &&
                        delseksjon.innhold.map(
                            (
                                innhold: SanityDropdown | SanityTekstObjekt,
                                innholdIndeks: number
                            ) => {
                                if (erInnholdDropdown(innhold)) {
                                    dropdownTeller++;
                                    return (
                                        <div key={innholdIndeks}>
                                            <Dropdown
                                                sanityDropdown={
                                                    innhold as SanityDropdown
                                                }
                                                håndterEndringIDropdown={
                                                    håndterEndringIDropdown
                                                }
                                                innholdIndeks={innholdIndeks}
                                                dropdownIndeks={dropdownTeller}
                                            />
                                            {flettefelt[innholdIndeks] !==
                                                undefined && (
                                                <Flettefelter
                                                    flettefelter={
                                                        flettefelt[
                                                            innholdIndeks
                                                        ]
                                                    }
                                                    innholdIndeks={
                                                        innholdIndeks
                                                    }
                                                    dropdownIndeks={
                                                        dropdownTeller
                                                    }
                                                    håndterEndringIFletteFelt={
                                                        håndterEndringIFletteFelt
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                } else if (erInnholdTekstObjekt(innhold)) {
                                    if (
                                        flettefelt[innholdIndeks] !== undefined
                                    ) {
                                        return (
                                            <Flettefelter
                                                key={innholdIndeks}
                                                flettefelter={
                                                    flettefelt[innholdIndeks]
                                                }
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
                    <label className='navds-form-field__label navds-label'>
                        Fritekst
                    </label>

                    <Fritekst
                        håndterEndringIFritekstFelt={
                            håndterEndringIFritekstFelt
                        }
                        defaultTekst={fritekst}
                    />
                </div>
            )}
        </div>
    );
}
