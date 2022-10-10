import React, { useState, useEffect, useReducer } from 'react';
import { renderToString } from 'react-dom/server';
import './stiler/brevGenerator.css';
import '@navikt/ds-css';
import { Skjema } from './komponenter/skjema';
import { Overskrift } from './komponenter/overskrift';
import PDF from './komponenter/pdf';
import { brevmal } from './typer/typer';
import { Button } from '@navikt/ds-react';
import { genererPDF, hentBrevmaler } from './brev-api';
import {
    brevmalTittelStateReducer,
    initialBrevmalTittelState,
    initialSkalAvsnittInkluderesState,
    skalAvsnittInkluderesStateReducer,
    initialDelseksjonerState,
    delseksjonerStateReducer,
} from './context/reducer';
import { SkjemaContext } from './context/context';
import { SanityBrevmalUtenSeksjoner } from './typer/sanity';
import HTMLPDF from './komponenter/htmlPDF';

interface brevGeneratorProps {
    sanityBaseURL: string;
}

function BrevGenerator({ sanityBaseURL }: brevGeneratorProps) {
    const [skalAvsnittInkluderesState, skalAvsnittInkluderesDispatch] = useReducer(
        skalAvsnittInkluderesStateReducer,
        initialSkalAvsnittInkluderesState
    );
    const [brevmalTittelState, brevmalTittelDispatch] = useReducer(
        brevmalTittelStateReducer,
        initialBrevmalTittelState
    );
    const [delseksjonerState, delseksjonerDispatch] = useReducer(
        delseksjonerStateReducer,
        initialDelseksjonerState
    );

    const [brevmaler, setBrevmaler] = useState<brevmal[]>([]);

    const skjemaContextValue = {
        skalAvsnittInkluderesState,
        skalAvsnittInkluderesDispatch,
        brevmalTittelState,
        brevmalTittelDispatch,
        delseksjonerState,
        delseksjonerDispatch,
    };

    useEffect(() => {
        hentBrevmaler(sanityBaseURL).then((results) => {
            const hentetBrevmaler = results.map((result: SanityBrevmalUtenSeksjoner) => {
                return {
                    id: result._id,
                    tittel: result.brevmaltittel,
                    updatedAt: result._updatedAt,
                };
            });
            setBrevmaler(hentetBrevmaler);
        });
    }, []);

    const genererHTMLString = () => {
        return renderToString(
            <SkjemaContext.Provider value={skjemaContextValue}>
                <PDF />
            </SkjemaContext.Provider>
        );
    };

    return (
        <SkjemaContext.Provider value={skjemaContextValue}>
            <div>
                <Overskrift />
                <div className="side-om-side">
                    <Skjema brevmaler={brevmaler} sanityBaseURL={sanityBaseURL} />
                    <HTMLPDF />
                </div>
                <div className="bottomBar">
                    <Button onClick={() => genererPDF(genererHTMLString())}>Generer PDF</Button>
                </div>
            </div>
        </SkjemaContext.Provider>
    );
}

export default BrevGenerator;
