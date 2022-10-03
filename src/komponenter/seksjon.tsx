import React from 'react';
import { SanitySeksjon } from '../typer/sanity';
import { Delseksjon } from './delseksjon';
import '../stiler/seksjon.css';

interface SeksjonsProps {
    seksjon: SanitySeksjon;
    seksjonStartIndeks: number;
    skalAlleValgNullstilles: boolean;
    setSkalAlleValgNullstilles: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Seksjon({
    seksjon,
    seksjonStartIndeks,
    skalAlleValgNullstilles,
    setSkalAlleValgNullstilles,
}: SeksjonsProps) {
    return (
        <div className="seksjon">
            <h1>{seksjon.seksjonstittel}</h1>
            {seksjon.delseksjoner.map((delseksjon, indeks) => (
                <Delseksjon
                    delseksjon={delseksjon}
                    delseksjonIndeks={seksjonStartIndeks + indeks}
                    key={indeks}
                    skalAlleValgNullstilles={skalAlleValgNullstilles}
                    setSkalAlleValgNullstilles={setSkalAlleValgNullstilles}
                />
            ))}
        </div>
    );
}
