import React from "react";
import { Delseksjon } from "./delseksjon";
import "../stiler/seksjon.css";
export function Seksjon({ seksjon, seksjonStartIndeks }) {
    return (React.createElement("div", { className: "seksjon" },
        React.createElement("h1", null, seksjon.seksjonstittel),
        seksjon.delseksjoner.map((delseksjon, indeks) => (React.createElement(Delseksjon, { delseksjon: delseksjon, delseksjonIndeks: seksjonStartIndeks + indeks, key: indeks })))));
}
