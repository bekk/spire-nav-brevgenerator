import React from "react";
import { SanitySeksjon } from "../typer/sanity";
import { Delseksjon } from "./delseksjon";
import "../stiler/seksjon.css";

interface SeksjonsProps {
  seksjon: SanitySeksjon;
  seksjonStartIndeks: number;
}

export function Seksjon({ seksjon, seksjonStartIndeks }: SeksjonsProps) {
  return (
    <div className="seksjon">
      <h1>{seksjon.seksjonstittel}</h1>
      {seksjon.delseksjoner.map((delseksjon, indeks) => (
        <Delseksjon
          delseksjon={delseksjon}
          delseksjonIndeks={seksjonStartIndeks + indeks}
          key={indeks}
        />
      ))}
    </div>
  );
}
