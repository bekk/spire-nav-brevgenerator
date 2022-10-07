import React, { useContext } from 'react';
import { NavIkon } from '../ikoner/navikon';
import parse from 'html-react-parser';
import { SkjemaContext } from '../context/context';
import { settInnTabell } from '../utils/htmlPdfUtils';
import { dobbelTabellTilStreng } from '../utils/fritekstUtils';
import { StateDelseksjon } from '../typer/typer';

const PDF = () => {
    const { skalAvsnittInkluderesState, brevmalTittelState, delseksjonerState } =
        useContext(SkjemaContext);

    const avsnitt = delseksjonerState.map((delseksjoner: StateDelseksjon) => {
        return dobbelTabellTilStreng(delseksjoner.fritekstTabell);
    });

    const avsnittMedTabell = settInnTabell(avsnitt);

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
                                <>{parse(avsnitt.replaceAll('<p></p>', '<br></br>'))}</>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PDF;
