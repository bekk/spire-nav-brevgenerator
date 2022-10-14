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
            <p>
                {'+47 ' +
                    bruker.telefon.toString().slice(0, 3) +
                    ' ' +
                    bruker.telefon.toString().slice(3, 5) +
                    ' ' +
                    bruker.telefon.toString().slice(5, 8)}
            </p>
        </div>
    );
};
