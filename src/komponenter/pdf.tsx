import React, { useContext } from "react";
import { NavIkon } from "../ikoner/navikon";
import parse from "html-react-parser";
import { SkjemaContext } from "../context/context";
import { settInnTabell } from "../utils/htmlPdfUtils";

const PDF = () => {
	const { avsnittState, skalAvsnittInkluderesState, brevmalTittelState } =
		useContext(SkjemaContext);

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
