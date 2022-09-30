import { Button, Select } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { hentBrevmal, hentMellomlagretBrev, postMellomlagreBrev } from '../brev-api';
import { SanityBrevmalMedSeksjoner, SanitySeksjon } from '../typer/sanity';
import { brevmal } from '../typer/typer';
import { MellomlagringContext, SkjemaContext } from '../context/context';
import { Seksjon } from './seksjon';
import '../stiler/skjema.css';
import {
    finnInitielleAvsnittOgAntallDelseksjoner,
    finnInitielMellomlagringDelseksjonState,
} from '../utils/skjemaUtils';

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

    const {
        avsnittDispatch,
        avsnittState,
        skalAvsnittInkluderesDispatch,
        skalAvsnittInkluderesState,
        brevmalTittelDispatch,
    } = React.useContext(SkjemaContext);
    const { mellomlagringDelseksjonerDispatch, mellomlagringDelseksjonerState } =
        React.useContext(MellomlagringContext);

    useEffect(() => {
        setSkalAlleValgNullstilles(false);
        hentBrevmal(sanityBaseURL, gjeldendeBrevmalId).then((res: SanityBrevmalMedSeksjoner) => {
            if (res !== null && res.seksjoner.length > 0) {
                setGjeldendeBrevmal(res);
                brevmalTittelDispatch(res.brevmaloverskrift);
                const mellomlagretBrev = hentMellomlagretBrev(res._id);
                if (mellomlagretBrev !== undefined) {
                    avsnittDispatch(mellomlagretBrev.avsnitt);
                    skalAvsnittInkluderesDispatch(mellomlagretBrev.inkluderingsbrytere);
                    mellomlagringDelseksjonerDispatch(mellomlagretBrev.delseksjoner);
                } else {
                    initierContext(res.seksjoner);
                }
            }
        });
    }, [gjeldendeBrevmalId]);

    const initierContext = (seksjoner: SanitySeksjon[]) => {
        const { nyeAvsnitt, antallDelSeksjoner } =
            finnInitielleAvsnittOgAntallDelseksjoner(seksjoner);
        const nyeInkluderingsBrytere: boolean[] = new Array(antallDelSeksjoner).fill(true);
        const initelMellomlagringDelseksjonState =
            finnInitielMellomlagringDelseksjonState(seksjoner);

        avsnittDispatch(nyeAvsnitt);
        skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
        mellomlagringDelseksjonerDispatch(initelMellomlagringDelseksjonState);
    };

    const nullStillAlleValg = () => {
        setSkalAlleValgNullstilles(true);
        if (gjeldendeBrevmal !== null) {
            initierContext(gjeldendeBrevmal.seksjoner);
        }
    };

    const mellomlagreBrev = () => {
        const mellomlagringsobjekt = {
            brevmalId: gjeldendeBrevmalId,
            inkluderingsbrytere: skalAvsnittInkluderesState,
            avsnitt: avsnittState,
            delseksjoner: mellomlagringDelseksjonerState,
        };
        postMellomlagreBrev(mellomlagringsobjekt);
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
                    <div className="skjema-knapper">
                        <Button variant="secondary" onClick={nullStillAlleValg}>
                            Nullstill valg
                        </Button>
                        <Button onClick={mellomlagreBrev}>Mellomlagre brev</Button>
                    </div>
                </>
            )}
        </div>
    );
}
