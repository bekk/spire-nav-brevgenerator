import { SanityDelseksjon, SanityDropdown, SanityTekstObjekt } from '../typer/sanity';
import { erInnholdTekstObjekt, sanityBlocktekstToHtml } from './sanityUtils';

export const dobbelTabellTilStreng = (fritekstTabell: string[][]) => {
    let tekst = '';
    fritekstTabell.map((liste) => {
        liste.map((element) => {
            tekst = tekst + element;
        });
    });
    return tekst;
};

export const finnEndringsIndeks = (nyFritekst: string, gammelTekst: string): number => {
    const endringsIndeks = nyFritekst
        .split('')
        .findIndex((char, i) => char !== gammelTekst.charAt(i));

    if (endringsIndeks >= 0) return endringsIndeks;
    else {
        if (nyFritekst === gammelTekst) return -1;
        else return nyFritekst.length; //Endring lagt til på slutten av nyFritekst
    }
};

export const finnAntallTegnLagtTil = (nyFritekst: string, gammelFritekst: string): number => {
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
        const antallTegnTelt =
            antallTegnITidligereElementer + indeksTilSisteTegn + indeks * skilletegnLengde;

        if (antallTegnTelt >= endringsIndeks - 1) {
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
        const fritekstElementStartIndeks =
            antallTegnITidligereElementer + antallTegnFørElement + tabellIndeks * skilletegnLengde;
        const fritekstElementSluttIndeks =
            antallTegnITidligereElementer +
            indeksTilSisteTegn +
            tabellIndeks * skilletegnLengde +
            antallTegnLagtTil +
            1;
        nyttFritekstElement = nyFritekst.slice(
            fritekstElementStartIndeks,
            fritekstElementSluttIndeks
        );
    }

    return {
        tabellIndeks: tabellIndeks,
        nyttFritekstElement: nyttFritekstElement,
    };
};

export const finnKaraktererIListeMedStrenger = (listeMedStrenger: string[]): number =>
    listeMedStrenger.join('').length;

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
};

export const oppdaterFritekstTabellMedTekst = (
    fritekstTabellKopi: string[][],
    nyFritekst: string
): { nyFritekstTabell: string[][]; flettefeltNummer?: number; nyttFritekstElement?: string } => {
    const nyFritekstSterilisert = fjernSpesialKarakterer(nyFritekst);
    const gammelFritekst = dobbelTabellTilStreng(fritekstTabellKopi);
    const antallTegnLagtTil = finnAntallTegnLagtTil(nyFritekstSterilisert, gammelFritekst);
    const endringsIndeks = finnEndringsIndeks(nyFritekstSterilisert, gammelFritekst);

    let karakterTeller = 0;
    let erEndringGjort = false;

    let nyttFritekstElement;
    let flettefeltIndeksITabell = 0;
    let nyFritekstTabell = fritekstTabellKopi;
    if (endringsIndeks !== -1) {
        nyFritekstTabell = fritekstTabellKopi.map((fritekstTabellElement) => {
            const gammelKarakterTeller = karakterTeller;
            karakterTeller += finnKaraktererIListeMedStrenger(fritekstTabellElement);

            if (karakterTeller > endringsIndeks && !erEndringGjort) {
                erEndringGjort = true;
                const tabellIndeksOgNyttFritekstElement = finnTabellIndeksOgNyttFritekstElement(
                    endringsIndeks,
                    nyFritekstSterilisert,
                    fritekstTabellElement,
                    antallTegnLagtTil,
                    gammelKarakterTeller
                );
                const tabellIndeks = tabellIndeksOgNyttFritekstElement.tabellIndeks;
                nyttFritekstElement = tabellIndeksOgNyttFritekstElement.nyttFritekstElement;
                fritekstTabellElement[tabellIndeks] = nyttFritekstElement;
                flettefeltIndeksITabell += tabellIndeks;
                return fritekstTabellElement;
            } else {
                if (!erEndringGjort) {
                    flettefeltIndeksITabell += fritekstTabellElement.length - 1;
                }
                return fritekstTabellElement;
            }
        });
    }

    //I flettefelt tabellen ligger tekst og flettefelt annen hver gang, og det vil alltid starte med en tekst.
    //Derfor sjekker vi om flettefeltIndeksITabell er oddetall og dermed indeksen til et flettefelt.
    if (nyttFritekstElement !== undefined && flettefeltIndeksITabell % 2 == 1) {
        return {
            nyFritekstTabell: nyFritekstTabell,
            flettefeltNummer: (flettefeltIndeksITabell - 1) / 2,
            nyttFritekstElement: nyttFritekstElement,
        };
    }
    return { nyFritekstTabell: nyFritekstTabell };
};

export const oppdaterFritekstTabellMedDropdown = (
    fritekstTabellKopi: string[][],
    innholdIndeks: number,
    delseksjon: SanityDelseksjon,
    valgIndeks: number
): string[][] => {
    fritekstTabellKopi[innholdIndeks] = sanityBlocktekstToHtml(
        (delseksjon.innhold[innholdIndeks] as SanityDropdown).valg[valgIndeks]
    );
    return fritekstTabellKopi;
};

export const oppdaterFritekstTabellMedFlettefelt = (
    fritekstTabellKopi: string[][],
    innholdIndeks: number,
    flettefeltIndeks: number,
    nyVerdi: string
): string[][] => {
    fritekstTabellKopi[innholdIndeks][flettefeltIndeks * 2 + 1] = nyVerdi;
    return fritekstTabellKopi;
};
