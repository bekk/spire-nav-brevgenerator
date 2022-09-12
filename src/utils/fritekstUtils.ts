import { SanityTekstObjekt } from '../typer/sanity';

export const dobbelTabellTilStreng = (fritekstTabell: string[][]) => {
	let tekst = '';
	fritekstTabell.map((liste) => {
		liste.map((element) => {
			tekst = tekst + element;
		});
	});
	return tekst;
};

export const sanityTekstObjektTilStreng = (valg: SanityTekstObjekt) => {
	let returnStreng = '';
	valg.tekst.forEach((valgtekst) => {
		valgtekst.children.forEach((child) => {
			returnStreng += child.text;
		});
	});
	return returnStreng;
};

export const finnEndringsIndeks = (
	nyFritekst: string,
	gammelTekst: string
): number => {
	const endringsIndeks = nyFritekst
		.split('')
		.findIndex((char, i) => char !== gammelTekst.charAt(i));

	if (endringsIndeks >= 0) return endringsIndeks;
	else {
		if (nyFritekst === gammelTekst) return -1;
		else return nyFritekst.length; //Endring lagt til på slutten av nyFritekst
	}
};

export const finnAntallTegnLagtTil = (
	nyFritekst: string,
	gammelFritekst: string
): number => {
	return nyFritekst.length - gammelFritekst.length;
};

export const finnTabellIndeksOgNyttFritekstElement = (
	endringsIndeks: number,
	nyFritekst: string,
	fritekstTabellKopi: string[],
	antallTegnLagtTil: number,
	antallTegnITidligereElementer: number
): { tabellIndeks: number; nyttFritekstElement: string } => {
	const skilletegnLengde = 1;
	let antallTegnFørElement = 0;
	let indeksTilSisteTegn = 0;
	let tabellIndeks = fritekstTabellKopi.length - 1;

	for (let indeks = 0; indeks < fritekstTabellKopi.length; indeks++) {
		antallTegnFørElement = indeksTilSisteTegn;
		indeksTilSisteTegn += fritekstTabellKopi[indeks].length - 1;

		if (indeksTilSisteTegn + indeks * skilletegnLengde >= endringsIndeks) {
			tabellIndeks = indeks;
			break;
		}
	}

	let nyttFritekstElement = '';

	if (antallTegnLagtTil === 0) {
		nyttFritekstElement = nyFritekst.slice(
			antallTegnFørElement + tabellIndeks * skilletegnLengde,
			indeksTilSisteTegn + tabellIndeks * skilletegnLengde + 1
		);
	} else {
		nyttFritekstElement = nyFritekst.slice(
			antallTegnITidligereElementer + antallTegnFørElement + tabellIndeks * skilletegnLengde,
			antallTegnITidligereElementer + indeksTilSisteTegn +
				tabellIndeks * skilletegnLengde +
				antallTegnLagtTil +
				1
		);
	}

	return {
		tabellIndeks: tabellIndeks,
		nyttFritekstElement: nyttFritekstElement,
	};
};

export const finnKaraktererIListeMedStrenger = (
	listeMedStrenger: string[]
): number => {
	let teller = 0;
	listeMedStrenger.forEach((element) => {
		teller += element.length;
	});
	return teller;
};
