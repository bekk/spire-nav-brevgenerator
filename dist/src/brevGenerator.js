import React, { useState, useEffect, useReducer } from "react";
import { renderToString } from "react-dom/server";
import "./App.css";
import "@navikt/ds-css";
import { Skjema } from "./komponenter/skjema";
import { Overskrift } from "./komponenter/overskrift";
import PDF from "./komponenter/pdf";
import { Button } from "@navikt/ds-react";
import { genererPDF, hentBrevmaler } from "./brev-api";
import { avsnittStateReducer, brevmalTittelStateReducer, initialAvsnittState, initialBrevmalTittelState, initialSkalAvsnittInkluderesState, skalAvsnittInkluderesStateReducer, } from "./context/reducer";
import { SkjemaContext } from "./context/context";
function BrevGenerator() {
    const [avsnittState, avsnittDispatch] = useReducer(avsnittStateReducer, initialAvsnittState);
    const [skalAvsnittInkluderesState, skalAvsnittInkluderesDispatch] = useReducer(skalAvsnittInkluderesStateReducer, initialSkalAvsnittInkluderesState);
    const [brevmalTittelState, brevmalTittelDispatch] = useReducer(brevmalTittelStateReducer, initialBrevmalTittelState);
    const [brevmaler, setBrevmaler] = useState([]);
    const contextValue = {
        avsnittState,
        avsnittDispatch,
        skalAvsnittInkluderesState,
        skalAvsnittInkluderesDispatch,
        brevmalTittelState,
        brevmalTittelDispatch,
    };
    useEffect(() => {
        hentBrevmaler().then((results) => {
            const hentetBrevmaler = results.map((result) => {
                return {
                    id: result._id,
                    tittel: result.brevmaltittel,
                };
            });
            setBrevmaler(hentetBrevmaler);
        });
    }, []);
    const genererHTMLString = () => {
        return renderToString(React.createElement(SkjemaContext.Provider, { value: contextValue },
            React.createElement(PDF, null)));
    };
    return (React.createElement(SkjemaContext.Provider, { value: contextValue },
        React.createElement("div", null,
            React.createElement(Overskrift, null),
            React.createElement("div", { className: "side-om-side" },
                React.createElement(Skjema, { brevmaler: brevmaler }),
                React.createElement(PDF, null)),
            React.createElement("div", { className: "bottomBar" },
                React.createElement(Button, { onClick: () => genererPDF(genererHTMLString()) }, "Generer PDF")))));
}
export default BrevGenerator;
