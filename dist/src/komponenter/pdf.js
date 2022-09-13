import React, { useContext } from "react";
import { NavIkon } from "../ikoner/navikon";
import "../stiler/pdf.css";
import parse from "html-react-parser";
import { tabellObjekter } from "../mockdata/tabeller";
import { listeTilHtmlTabell } from "../utils/tabellUtils";
import { SkjemaContext } from "../context/context";
const PDF = () => {
    const { avsnittState, skalAvsnittInkluderesState, brevmalTittelState } = useContext(SkjemaContext);
    const settInnTabell = (avsnittStateKopi, tabeller = tabellObjekter) => {
        return avsnittStateKopi.map((avsnitt) => {
            let nyttAvsnitt = avsnitt;
            for (const tabell of tabeller) {
                nyttAvsnitt = nyttAvsnitt.replaceAll(`[${tabell.id}]`, listeTilHtmlTabell(tabell.tabell));
            }
            return nyttAvsnitt;
        });
    };
    const avsnittMedTabell = settInnTabell(avsnittState);
    return (React.createElement("div", { className: "a4" },
        React.createElement("div", { className: "logo-dato-kontainer" },
            React.createElement(NavIkon, null),
            React.createElement("p", null, new Date().toISOString().slice(0, 10))),
        React.createElement("div", { className: "hoved-brev" },
            React.createElement("h2", null, brevmalTittelState),
            avsnittMedTabell.length !== 0 &&
                avsnittMedTabell.map((avsnitt, index) => (React.createElement("div", { className: "avsnitt", key: index }, skalAvsnittInkluderesState[index] === true && avsnitt && (React.createElement(React.Fragment, null, parse(avsnitt.replaceAll("<p></p>", "<br></br>"))))))))));
};
export default PDF;
