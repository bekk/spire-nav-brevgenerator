import { Button, Select, Alert } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { hentBrevmal, hentMellomlagretBrev, postMellomlagreBrev } from '../brev-api';
import { SanityBrevmalMedSeksjoner, SanitySeksjon } from '../typer/sanity';
import { brevmal } from '../typer/typer';
import { SkjemaContext } from '../context/context';
import { Seksjon } from './seksjon';
import '../stiler/skjema.css';
import { finnAntallDelseksjoner, finnInitiellDelseksjonerState } from '../utils/skjemaUtils';
import hash from 'object-hash';

interface SkjemaProps {
    brevmaler: brevmal[];
    sanityBaseURL: string;
}

export function Skjema({ brevmaler, sanityBaseURL }: SkjemaProps) {
    const [gjeldendeBrevmalId, setGjeldendeBrevmalId] = useState<string>('-1');
    const [gjeldendeBrevmal, setGjeldendeBrevmal] = useState<SanityBrevmalMedSeksjoner | null>(
        null
    );
    const [skalAlleValgNullstilles, setSkalAlleValgNullstilles] = useState(false);
    const [alertSkalVises, settAlertSkalVises] = useState(false);
    const [vellykketMellomlagring, settVellykketMellomlagring] = useState(false);

    const {
        skalAvsnittInkluderesDispatch,
        skalAvsnittInkluderesState,
        brevmalTittelDispatch,
        delseksjonerState,
        delseksjonerDispatch,
    } = React.useContext(SkjemaContext);

    useEffect(() => {
        const hentOgPopulerData = async () => {
            if (gjeldendeBrevmalId !== '-1') {
                const brevmalMetaData = brevmaler.find(
                    (brevmal) => brevmal.id === gjeldendeBrevmalId
                );
                if (brevmalMetaData) {
                    const brevmal = await hentBrevmal(
                        sanityBaseURL,
                        gjeldendeBrevmalId,
                        brevmalMetaData.updatedAt
                    );

                    if (brevmal) {
                        const mellomlagretBrev = await hentMellomlagretBrev(
                            brevmal._id,
                            hash(brevmal)
                        );

                        setGjeldendeBrevmal(brevmal);
                        brevmalTittelDispatch(brevmal.brevmaloverskrift);

                        if (mellomlagretBrev !== undefined && mellomlagretBrev !== null) {
                            skalAvsnittInkluderesDispatch(mellomlagretBrev.inkluderingsbrytere);
                            delseksjonerDispatch(mellomlagretBrev.delseksjoner);
                        } else {
                            initialiserContext(brevmal.seksjoner);
                        }
                    }
                }
            }
        };
        hentOgPopulerData();
    }, [gjeldendeBrevmalId]);

    const initialiserContext = (seksjoner: SanitySeksjon[]) => {
        const antallDelseksjoner = finnAntallDelseksjoner(seksjoner);
        const nyeInkluderingsBrytere: boolean[] = new Array(antallDelseksjoner).fill(true);
        skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);

        const initielleDelseksjoner = finnInitiellDelseksjonerState(seksjoner);
        delseksjonerDispatch(initielleDelseksjoner);
    };

    const nullStillAlleValg = () => {
        setSkalAlleValgNullstilles(true);
        if (gjeldendeBrevmal !== null) {
            initialiserContext(gjeldendeBrevmal.seksjoner);
        }
    };

    const h??ndterMellomlagringKlikk = (vellykket: boolean) => {
        settVellykketMellomlagring(vellykket);
        settAlertSkalVises(true);
        setTimeout(() => {
            settAlertSkalVises(false);
        }, 2500);
    };

    const AlertMellomlagring = (vellykket: boolean) => {
        return vellykket ? (
            <Alert variant="success">Mellomlagring vellykket!</Alert>
        ) : (
            <Alert variant="error">Feil: Brevet ble ikke mellomlagret.</Alert>
        );
    };

    const mellomlagreBrev = async (gjeldendeBrevmal: SanityBrevmalMedSeksjoner) => {
        const mellomlagringsobjekt = {
            brevmalId: gjeldendeBrevmalId,
            inkluderingsbrytere: skalAvsnittInkluderesState,
            delseksjoner: delseksjonerState,
        };
        h??ndterMellomlagringKlikk(
            await postMellomlagreBrev(mellomlagringsobjekt, gjeldendeBrevmal)
        );
    };

    let delseksjonTeller = 0;

    return (
        <div className="skjema">
            <Select
                label="Velg brevmal"
                size="medium"
                onChange={(e) => setGjeldendeBrevmalId(e.target.value)}
                defaultValue={''}
                data-cy="velgBrevmal"
            >
                <option value="" disabled>
                    Velg brevmal
                </option>
                {brevmaler.map((brevmal) => (
                    <option key={brevmal.id} value={brevmal.id}>
                        {brevmal.tittel}
                    </option>
                ))}
            </Select>
            {gjeldendeBrevmal !== null && (
                <>
                    <div className="skjema-knapper">
                        <Button variant="secondary" onClick={nullStillAlleValg}>
                            Nullstill valg
                        </Button>
                        <Button onClick={() => mellomlagreBrev(gjeldendeBrevmal)}>
                            Mellomlagre brev
                        </Button>
                    </div>

                    <div className="mellomlagring-alert">
                        {alertSkalVises && AlertMellomlagring(vellykketMellomlagring)}
                    </div>

                    {gjeldendeBrevmal.seksjoner.map((seksjon: SanitySeksjon, indeks: number) => {
                        const seksjonKomponent = (
                            <Seksjon
                                seksjon={seksjon as SanitySeksjon}
                                key={indeks}
                                seksjonStartIndeks={delseksjonTeller}
                                skalAlleValgNullstilles={skalAlleValgNullstilles}
                                setSkalAlleValgNullstilles={setSkalAlleValgNullstilles}
                            />
                        );
                        delseksjonTeller += (seksjon as SanitySeksjon).delseksjoner.length;
                        return seksjonKomponent;
                    })}
                </>
            )}
        </div>
    );
}
