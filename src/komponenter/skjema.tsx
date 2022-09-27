import { Button, Select } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { hentBrevmal, hentMellomlagretBrev, postMellomlagreBrev } from '../brev-api';
import {
    SanityBrevmalMedSeksjoner,
    SanityDropdown,
    SanitySeksjon,
    SanityTekstObjekt,
} from '../typer/sanity';
import { brevmal } from '../typer/typer';
import { MellomlagringContext, SkjemaContext } from '../context/context';
import { Seksjon } from './seksjon';
import '../stiler/skjema.css';
import { erInnholdDropdown, sanityBlocktekstToHtml } from '../utils/sanityUtils';
import { finnFlettefeltITekst } from '../utils/flettefeltUtils';
import {
    mellomlagringDelseksjon,
    mellomlagringDropdown,
    mellomlagringState,
} from '../typer/mellomlagring';

interface SkjemaProps {
    brevmaler: brevmal[];
    sanityBaseURL: string;
}

export function Skjema({ brevmaler, sanityBaseURL }: SkjemaProps) {
    const [gjeldendeBrevmalId, setGjeldendeBrevmalId] = useState<string>('-1');
    const [gjeldendeBrevmal, setGjeldendeBrevmal] = useState<SanityBrevmalMedSeksjoner | null>(
        null
    );
    const {
        avsnittDispatch,
        avsnittState,
        skalAvsnittInkluderesDispatch,
        skalAvsnittInkluderesState,
        brevmalTittelDispatch,
    } = React.useContext(SkjemaContext);
    const { mellomlagringDelseksjonerDispatch, mellomlagringDelseksjonerState } =
        React.useContext(MellomlagringContext);

    const finnInitelleAvsnittISeksjon = (seksjon: SanitySeksjon) => {
        return seksjon.delseksjoner.map((delseksjon) => {
            let nyFritekst = '';
            delseksjon.innhold.forEach((innhold: SanityDropdown | SanityTekstObjekt) => {
                if ((innhold as SanityTekstObjekt).tekstTittel !== undefined) {
                    nyFritekst += sanityBlocktekstToHtml(innhold as SanityTekstObjekt).join(' ');
                }
            });
            return nyFritekst;
        });
    };

    const finnInitielleAvsnittOgAntallDelseksjoner = (seksjoner: SanitySeksjon[]) => {
        let antallDelSeksjoner = 0;
        const nyeAvsnitt: string[] = seksjoner.flatMap((seksjon) => {
            antallDelSeksjoner += seksjon.delseksjoner.length;
            return finnInitelleAvsnittISeksjon(seksjon);
        });
        return { nyeAvsnitt, antallDelSeksjoner };
    };

    const initierMellomlagringDelseksjonState = (seksjoner: SanitySeksjon[]) => {
        const mellomlagringDelseksjoner: mellomlagringDelseksjon[] = seksjoner.flatMap(
            (seksjon) => {
                return seksjon.delseksjoner.map((delseksjon) => {
                    const innhold = delseksjon.innhold.map(
                        (innhold): string[] | mellomlagringDropdown => {
                            if (erInnholdDropdown(innhold)) {
                                return {
                                    valgVerdi: undefined,
                                    flettefelt: [],
                                };
                            } else {
                                let antallFlettefelt = 0;
                                (innhold as SanityTekstObjekt).tekst.forEach((tekst) => {
                                    const flettefelt = finnFlettefeltITekst(tekst);
                                    antallFlettefelt += flettefelt.length;
                                });
                                return Array(antallFlettefelt).fill('');
                            }
                        }
                    );
                    return { innhold: innhold };
                });
            }
        );
        mellomlagringDelseksjonerDispatch(mellomlagringDelseksjoner);
    };

    useEffect(() => {
        hentBrevmal(sanityBaseURL, gjeldendeBrevmalId).then((res: SanityBrevmalMedSeksjoner) => {
            setGjeldendeBrevmal(res);
            if (res !== null && res.seksjoner.length > 0) {
                brevmalTittelDispatch(res.brevmaloverskrift);
                const mellomlagretBrev: mellomlagringState | undefined = hentMellomlagretBrev(
                    res._id
                );
                if (mellomlagretBrev === undefined) {
                    const { nyeAvsnitt, antallDelSeksjoner } =
                        finnInitielleAvsnittOgAntallDelseksjoner(res.seksjoner);
                    const nyeInkluderingsBrytere: boolean[] = new Array(antallDelSeksjoner).fill(
                        true
                    );

                    avsnittDispatch(nyeAvsnitt);
                    skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
                    initierMellomlagringDelseksjonState(res.seksjoner);
                } else if (mellomlagretBrev !== undefined) {
                    avsnittDispatch(mellomlagretBrev.avsnitt);
                    skalAvsnittInkluderesDispatch(mellomlagretBrev.inkluderingsbrytere);
                    mellomlagringDelseksjonerDispatch(mellomlagretBrev.delseksjoner);
                }
            }
        });
    }, [gjeldendeBrevmalId]);

    const renderSeksjoner = () => {
        let delseksjonTeller = 0;
        return (
            gjeldendeBrevmal !== null &&
            gjeldendeBrevmal.seksjoner.map((seksjon: SanitySeksjon, indeks: number) => {
                const seksjonsKomponent = (
                    <Seksjon
                        seksjon={seksjon as SanitySeksjon}
                        key={indeks}
                        seksjonStartIndeks={delseksjonTeller}
                    />
                );
                delseksjonTeller += (seksjon as SanitySeksjon).delseksjoner.length;
                return seksjonsKomponent;
            })
        );
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
            {/* <Button onClick={mellomlagreBrev} className={'mellomlagre-button'}>
                Mellomlagre brev
            </Button> */}
            {renderSeksjoner()}
        </div>
    );
}
