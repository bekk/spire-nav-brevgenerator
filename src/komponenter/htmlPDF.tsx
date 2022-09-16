import React, { useContext } from "react";
import { NavIkon } from "../ikoner/navikon";
import "../stiler/htmlPDF.css";
import parse from "html-react-parser";
import { tabellObjekter } from "../mockdata/tabeller";
import { SkjemaContext } from "../context/context";
import {
	avsnittTilParagraftabell,
	beregnAntallLinjerIParagraf,
	MAKS_ANTALL_LINJER,
	settInnTabell,
} from "../utils/htmlPdfUtils";
import { avsnittType, skalAvsnittInkluderesType } from "../typer/typer";

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

interface ArkProps {
	innhold: string;
}

const Ark = ({ innhold }: ArkProps) => {
	return (
		<div className="ark">
			<div className="innhold">
				<>{parse(innhold)}</>
			</div>
		</div>
	);
};

interface ArkMedBrevhodeProps {
	brevmaltittel: string;
	innhold: string;
}

const ArkMedBrevhode = ({ brevmaltittel, innhold }: ArkMedBrevhodeProps) => {
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

export default HTMLPDF;
