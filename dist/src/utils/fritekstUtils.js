export const dobbelTabellTilStreng = (fritekstTabell) => {
    let tekst = '';
    fritekstTabell.map((liste) => {
        liste.map((element) => {
            tekst = tekst + element;
        });
    });
    return tekst;
};
export const sanityTekstObjektTilStreng = (valg) => {
    let returnStreng = '';
    valg.tekst.forEach((valgtekst) => {
        valgtekst.children.forEach((child) => {
            returnStreng += child.text;
        });
    });
    return returnStreng;
};
export const finnEndringsIndeks = (nyFritekst, gammelTekst) => {
    const endringsIndeks = nyFritekst
        .split('')
        .findIndex((char, i) => char !== gammelTekst.charAt(i));
    if (endringsIndeks >= 0)
        return endringsIndeks;
    else {
        if (nyFritekst === gammelTekst)
            return -1;
        else
            return nyFritekst.length; //Endring lagt til på slutten av nyFritekst
    }
};
export const finnAntallTegnLagtTil = (nyFritekst, gammelFritekst) => {
    return nyFritekst.length - gammelFritekst.length;
};
export const finnTabellIndeksOgNyttFritekstElement = (endringsIndeks, nyFritekst, fritekstTabellKopi, antallTegnLagtTil, antallTegnITidligereElementer) => {
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
        nyttFritekstElement = nyFritekst.slice(antallTegnFørElement + tabellIndeks * skilletegnLengde, indeksTilSisteTegn + tabellIndeks * skilletegnLengde + 1);
    }
    else {
        nyttFritekstElement = nyFritekst.slice(antallTegnITidligereElementer + antallTegnFørElement + tabellIndeks * skilletegnLengde, antallTegnITidligereElementer + indeksTilSisteTegn +
            tabellIndeks * skilletegnLengde +
            antallTegnLagtTil +
            1);
    }
    return {
        tabellIndeks: tabellIndeks,
        nyttFritekstElement: nyttFritekstElement,
    };
};
export const finnKaraktererIListeMedStrenger = (listeMedStrenger) => {
    let teller = 0;
    listeMedStrenger.forEach((element) => {
        teller += element.length;
    });
    return teller;
};
