import React from 'react';
import { NavIkon } from '../ikoner/navikon';
import parse from 'html-react-parser';

interface ArkMedBrevhodeProps {
    brevmaltittel: string;
    innhold: string;
}

export const ArkMedBrevhode = ({ brevmaltittel, innhold }: ArkMedBrevhodeProps) => {
    return (
        <div className="ark">
            <div className="brevhode">
                <NavIkon />
                <p>{new Date().toISOString().slice(0, 10)}</p>
            </div>
            <div className="innhold">
                <h1 className="brevmaloverskrift">{brevmaltittel}</h1>
                <>{parse(innhold)}</>
            </div>
        </div>
    );
};
