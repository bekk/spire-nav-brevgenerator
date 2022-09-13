import React, { useState, useEffect, useReducer } from "react";
import { renderToString } from "react-dom/server";
import "./stiler/brevGenerator.css";
import "@navikt/ds-css";
import { Skjema } from "./komponenter/skjema";
import { Overskrift } from "./komponenter/overskrift";
import PDF from "./komponenter/pdf";
import { brevmal } from "./typer/typer";
import { Button } from "@navikt/ds-react";
import { genererPDF, hentBrevmaler } from "./brev-api";
import {
  avsnittStateReducer,
  brevmalTittelStateReducer,
  initialAvsnittState,
  initialBrevmalTittelState,
  initialSkalAvsnittInkluderesState,
  skalAvsnittInkluderesStateReducer,
} from "./context/reducer";
import { SkjemaContext } from "./context/context";
import { SanityBrevmalUtenSeksjoner } from "./typer/sanity";

function BrevGenerator() {
  const [avsnittState, avsnittDispatch] = useReducer(
    avsnittStateReducer,
    initialAvsnittState
  );
  const [skalAvsnittInkluderesState, skalAvsnittInkluderesDispatch] =
    useReducer(
      skalAvsnittInkluderesStateReducer,
      initialSkalAvsnittInkluderesState
    );
  const [brevmalTittelState, brevmalTittelDispatch] = useReducer(
    brevmalTittelStateReducer,
    initialBrevmalTittelState
  );

  const [brevmaler, setBrevmaler] = useState<brevmal[]>([]);

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
      const hentetBrevmaler = results.map(
        (result: SanityBrevmalUtenSeksjoner) => {
          return {
            id: result._id,
            tittel: result.brevmaltittel,
          };
        }
      );
      setBrevmaler(hentetBrevmaler);
    });
  }, []);

  const genererHTMLString = () => {
    return renderToString(
      <SkjemaContext.Provider value={contextValue}>
        <PDF />
      </SkjemaContext.Provider>
    );
  };

  return (
    <SkjemaContext.Provider value={contextValue}>
      <div>
        <Overskrift />
        <div className="side-om-side">
          <Skjema brevmaler={brevmaler} />
          <PDF />
        </div>
        <div className="bottomBar">
          <Button onClick={() => genererPDF(genererHTMLString())}>
            Generer PDF
          </Button>
        </div>
      </div>
    </SkjemaContext.Provider>
  );
}

export default BrevGenerator;
