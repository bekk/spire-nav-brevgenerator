import React, { useContext } from "react";
import "../stiler/htmlPDF.css";
import { tabellObjekter } from "../mockdata/tabeller";
import { SkjemaContext } from "../context/context";
import {
	avsnittTilParagraftabell,
	beregnAntallLinjerIParagraf,
	MAKS_ANTALL_LINJER,
	settInnTabell,
} from "../utils/htmlPdfUtils";
import { Ark } from "./ark";
import { ArkMedBrevhode } from "./arkMedBrevhode";

const HTMLPDF = () => {
	const { avsnittState, brevmalTittelState, skalAvsnittInkluderesState } =
		useContext(SkjemaContext);

	const genererInnholdTilArk = (paragraftabell: string[]) => {
		let arkinnhold: string[] = [];
		let antallLinjerLagtTil = 0;
		let innhold = "";
		let stoppIndeks = 0;

		for (let indeks = 0; indeks < paragraftabell.length; indeks++) {
			const nyeLinjer = beregnAntallLinjerIParagraf(paragraftabell[indeks]);

			if (antallLinjerLagtTil + nyeLinjer >= MAKS_ANTALL_LINJER) {
				stoppIndeks = indeks;
				break;
			}

			antallLinjerLagtTil += nyeLinjer + 1;
			innhold += paragraftabell[indeks];
		}

		arkinnhold.push(innhold);

		if (stoppIndeks > 0) {
			arkinnhold = arkinnhold.concat(
				genererInnholdTilArk(paragraftabell.slice(stoppIndeks))
			);
		}

		return arkinnhold;
	};

	const finnAvsnittSomSkalInkluderes = (): string[] => {
		const avsnittSomSkalInkluderes: string[] = [];

		for (let indeks = 0; indeks < avsnittState.length; indeks++) {
			if (skalAvsnittInkluderesState[indeks]) {
				avsnittSomSkalInkluderes.push(avsnittState[indeks]);
			}
		}

		return avsnittSomSkalInkluderes;
	};

	const avsnittMedTabell = settInnTabell(
		finnAvsnittSomSkalInkluderes(),
		tabellObjekter
	);
	const paragraftabell = avsnittTilParagraftabell(avsnittMedTabell);
	const arkinnhold = genererInnholdTilArk(paragraftabell);

	return (
		<div className="pdf-viser">
			{arkinnhold.map((innhold, indeks) =>
				indeks === 0 ? (
					<ArkMedBrevhode
						innhold={innhold}
						brevmaltittel={brevmalTittelState}
					/>
				) : (
					<Ark innhold={innhold} />
				)
			)}
		</div>
	);
};

export default HTMLPDF;
