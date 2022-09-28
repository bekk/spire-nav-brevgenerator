import { SanityDelseksjon, SanityDropdown, SanityTekstObjekt } from "../typer/sanity";
import { erInnholdTekstObjekt, sanityBlocktekstToHtml } from "./sanityUtils";

export const dobbelTabellTilStreng = (fritekstTabell: string[][]) => {
	let tekst = '';
	fritekstTabell.map((liste) => {
		liste.map((element) => {
			tekst = tekst + element;
		});
	});
	return tekst;
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
			antallTegnITidligereElementer +
				antallTegnFørElement +
				tabellIndeks * skilletegnLengde,
			antallTegnITidligereElementer +
				indeksTilSisteTegn +
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
): number => listeMedStrenger.join('').length;

export const innholdTilFritekstTabell = (
        innhold: (SanityDropdown | SanityTekstObjekt)[]
    ): string[][] => {
        return innhold.map((innhold: SanityDropdown | SanityTekstObjekt) => {
            if (erInnholdTekstObjekt(innhold)) {
                return sanityBlocktekstToHtml(innhold as SanityTekstObjekt);
            } else {
                return [];
            }
        });
    };


export const fjernSpesialKarakterer = (str: string): string => {
	return str
		.replaceAll('&nbsp;', ' ')
		.replaceAll('\n', '')
		.replaceAll('&lt;', '')
		.replaceAll('&gt;', '');
}

export const oppdaterFritekstTabellMedTekst =(fritekstTabellKopi: string[][], nyFritekst: string, gammelFritekstTabell: string[][]): string[][] => {

        const nyFritekstSterialisert = fjernSpesialKarakterer(nyFritekst);
        const gammelFritekst = dobbelTabellTilStreng(gammelFritekstTabell);
        const antallTegnLagtTil = finnAntallTegnLagtTil(nyFritekstSterialisert, gammelFritekst);
        const endringsIndeks = finnEndringsIndeks(nyFritekstSterialisert, gammelFritekst);

        let karakterTeller = 0;
        let erEndringGjort = false;

        return fritekstTabellKopi.map((fritekstTabellElement) => {
            const gammelKarakterTeller = karakterTeller;
            karakterTeller += finnKaraktererIListeMedStrenger(fritekstTabellElement);

            if (karakterTeller > endringsIndeks && !erEndringGjort) {
                erEndringGjort = true;
                const { tabellIndeks, nyttFritekstElement } = finnTabellIndeksOgNyttFritekstElement(
                    endringsIndeks,
                    nyFritekstSterialisert,
                    fritekstTabellElement,
                    antallTegnLagtTil,
                    gammelKarakterTeller
                );


                fritekstTabellElement[tabellIndeks] = nyttFritekstElement; 
				
                return fritekstTabellElement;
            } else {
                return fritekstTabellElement;
            }
        });
}

export const oppdaterFritekstTabellMedDropdown = (fritekstTabellKopi: string[][], innholdIndeks: number, delseksjon: SanityDelseksjon, valgIndeks: number): string[][] => {
	fritekstTabellKopi[innholdIndeks] = sanityBlocktekstToHtml(
		(delseksjon.innhold[innholdIndeks] as SanityDropdown).valg[valgIndeks]
	);
	return fritekstTabellKopi;
}

export const oppdaterFritekstTabellMedFlettefelt = (fritekstTabellKopi: string[][], innholdIndeks: number, flettefeltIndeks: number, nyVerdi: string): string[][] => {
        fritekstTabellKopi[innholdIndeks][flettefeltIndeks * 2 + 1] = nyVerdi;
		return fritekstTabellKopi
}
