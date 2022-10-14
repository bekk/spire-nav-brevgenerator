import React from 'react';
import { NavIkon } from '../ikoner/navikon';
import parse from 'html-react-parser';
import { Signatur } from './signatur';
import { Bruker } from '../typer/typer';

interface ArkMedBrevhodeProps {
    brevmaltittel: string;
    innhold: string;
    bruker: Bruker;
}

export const ArkMedBrevhode = ({ brevmaltittel, innhold, bruker }: ArkMedBrevhodeProps) => {
    return (
        <div className="ark">
            <div className="brevhode">
                <NavIkon />
                <p>{new Date().toISOString().slice(0, 10)}</p>
            </div>
            <div className="innhold">
                <h1 className="brevmaloverskrift">{brevmaltittel}</h1>
                <>{parse(innhold)}</>
                <Signatur bruker={bruker} />
            </div>
        </div>
    );
};
