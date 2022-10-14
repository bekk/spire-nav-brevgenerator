import React from 'react';
import { Bruker } from '../typer/typer';

interface SignaturProps {
    bruker: Bruker;
}

export const Signatur = ({ bruker }: SignaturProps) => {
    return (
        <div className="signatur">
            <p>{bruker.navn}</p>
            <p>{bruker.email}</p>
            <p>{bruker.telefon}</p>
        </div>
    );
};
