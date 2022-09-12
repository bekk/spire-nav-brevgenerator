import React, { useContext } from "react";
import { NavIkon } from "../ikoner/navikon";
import "../stiler/pdf.css";
import parse from "html-react-parser";
import { avsnittType, tabellObjekt } from "../typer/typer";
import { tabellObjekter } from "../mockdata/tabeller";
import { listeTilHtmlTabell } from "../utils/tabellUtils";
import { SkjemaContext } from "../context/context";

const PDF = () => {
  const { avsnittState, skalAvsnittInkluderesState, brevmalTittelState } =
    useContext(SkjemaContext);

  const settInnTabell = (
    avsnittStateKopi: avsnittType,
    tabeller: tabellObjekt[] = tabellObjekter
  ): string[] => {
    return avsnittStateKopi.map((avsnitt) => {
      let nyttAvsnitt = avsnitt;
      for (const tabell of tabeller) {
        nyttAvsnitt = nyttAvsnitt.replaceAll(
          `[${tabell.id}]`,
          listeTilHtmlTabell(tabell.tabell)
        );
      }
      return nyttAvsnitt;
    });
  };

  const avsnittMedTabell = settInnTabell(avsnittState);

  return (
    <div className="a4">
      <div className="logo-dato-kontainer">
        <NavIkon />
        <p>{new Date().toISOString().slice(0, 10)}</p>
      </div>
      <div className="hoved-brev">
        <h2>{brevmalTittelState}</h2>
        {avsnittMedTabell.length !== 0 &&
          avsnittMedTabell.map((avsnitt, index) => (
            <div className="avsnitt" key={index}>
              {skalAvsnittInkluderesState[index] === true && avsnitt && (
                <>{parse(avsnitt.replaceAll("<p></p>", "<br></br>"))}</>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PDF;
