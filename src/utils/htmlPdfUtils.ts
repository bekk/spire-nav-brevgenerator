import { tabellObjekter } from "../mockdata/tabeller";
import { avsnittType, tabellObjekt } from "../typer/typer";
import { listeTilHtmlTabell } from "./tabellUtils";

export const MAKS_ANTALL_LINJER = 33;
const ANTALL_TEGN_PER_SIDE = 3275;
const antallTegnPerLinje = ANTALL_TEGN_PER_SIDE / MAKS_ANTALL_LINJER;
const antallTegnTag = "<p></p>".length;

export const beregnAntallLinjerIParagraf = (paragraf: string) => {
	let antallTegnIParagraf = paragraf.length - antallTegnTag;

	// Egen beregning for tabeller
	if (paragraf.match(/<table>/)) {
		return (paragraf.match(/<tr>/g) || []).length;
	}

	return Math.ceil(antallTegnIParagraf / antallTegnPerLinje);
};

export const avsnittTilParagraftabell = (avsnitt: string[]) => {
	const enStreng = avsnitt.join("");
	const doc = new DOMParser().parseFromString(enStreng, "text/html");
	return [...doc.body.children].map((el) => el.outerHTML);
};

export const settInnTabell = (
	avsnittStateKopi: avsnittType,
	tabeller: tabellObjekt[] = tabellObjekter
): string[] => {
	console.log(avsnittStateKopi);
	return avsnittStateKopi.map((avsnitt: string) => {
		let nyttAvsnitt = avsnitt;
		for (const tabell of tabeller) {
			nyttAvsnitt = nyttAvsnitt.replaceAll(
				`[${tabell.id}]`,
				listeTilHtmlTabell(tabell.tabell)
			);
		}
		return nyttAvsnitt;
	});
};
