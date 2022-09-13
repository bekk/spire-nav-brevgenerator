import React, { useContext, useEffect, useState } from "react";
import { Checkbox } from "@navikt/ds-react";
import { SkjemaContext } from "../context/context";
import { Fritekst } from "./fritekst";
import { finnEndringsIndeks, finnTabellIndeksOgNyttFritekstElement, finnAntallTegnLagtTil, dobbelTabellTilStreng, finnKaraktererIListeMedStrenger, } from "../utils/fritekstUtils";
import "../stiler/delseksjon.css";
import { erInnholdDropdown, erInnholdTekstObjekt, sanityToHtml, } from "../utils/sanityUtils";
import { Dropdown } from "./dropdown";
import { Flettefelter } from "./flettefelter";
import { finnFlettefelt } from "../utils/flettefeltUtils";
export function Delseksjon({ delseksjon, delseksjonIndeks }) {
    const { avsnittState, avsnittDispatch, skalAvsnittInkluderesState, skalAvsnittInkluderesDispatch, } = useContext(SkjemaContext);
    const [fritekstTabell, settFritekstTabell] = useState([]);
    const [fritekst, settFritekst] = useState("");
    const [flettefelt, settFlettefelt] = useState([]);
    useEffect(() => {
        settFritekst("");
        if (delseksjon.innhold !== null) {
            const { nyFritekstTabell, nyFlettefelttabell } = innholdTilFritekstTabellOgFlettefeltTabell(delseksjon.innhold);
            settFritekstTabell(nyFritekstTabell);
            settFlettefelt(nyFlettefelttabell);
            const nyFritekst = dobbelTabellTilStreng(nyFritekstTabell);
            settFritekst(nyFritekst);
        }
    }, [delseksjon]);
    const innholdTilFritekstTabellOgFlettefeltTabell = (innhold) => {
        const nyFritekstTabell = [];
        const nyFlettefelttabell = [];
        innhold.forEach((innhold, indeks) => {
            if (innhold.tekstTittel !== undefined) {
                nyFritekstTabell[indeks] = sanityToHtml(innhold);
                let flettefeltNy = [];
                innhold.tekst.forEach((del) => {
                    flettefeltNy = [...flettefeltNy, ...finnFlettefelt(del)];
                });
                nyFlettefelttabell[indeks] = flettefeltNy;
            }
            else {
                nyFritekstTabell[indeks] = [];
                nyFlettefelttabell[indeks] = [];
            }
            return "";
        });
        return {
            nyFritekstTabell: nyFritekstTabell,
            nyFlettefelttabell: nyFlettefelttabell,
        };
    };
    const oppdaterFlettefeltFraDropdowns = (nyeFlettefelt, indeks) => {
        const flettefeltKopi = [...flettefelt];
        flettefeltKopi[indeks] = nyeFlettefelt;
        settFlettefelt(flettefeltKopi);
    };
    const oppdaterAvsnitt = (avsnittStreng) => {
        const nyeAvsnitt = [...avsnittState];
        nyeAvsnitt[delseksjonIndeks] = avsnittStreng;
        avsnittDispatch(nyeAvsnitt);
    };
    const handterToggle = () => {
        const nyeInkluderingsBrytere = [...skalAvsnittInkluderesState];
        nyeInkluderingsBrytere[delseksjonIndeks] =
            !skalAvsnittInkluderesState[delseksjonIndeks];
        skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
    };
    const genererNyFritekstTabell = (nyTekst, fritekstTabellKopi, indeks) => {
        fritekstTabellKopi[indeks] = nyTekst;
        return fritekstTabellKopi;
    };
    const håndterEndringIFritekstFelt = (nyFritekst) => {
        oppdaterAvsnitt(nyFritekst);
        const nyFritekstSterialisert = nyFritekst
            .replaceAll("&nbsp;", " ")
            .replaceAll("\n", "")
            .replaceAll("&lt;", "")
            .replaceAll("&gt;", "");
        const gammelTekst = dobbelTabellTilStreng(fritekstTabell);
        const endringsIndeks = finnEndringsIndeks(nyFritekstSterialisert, gammelTekst);
        if (endringsIndeks === -1)
            return;
        const fritekstTabellKopi = [...fritekstTabell];
        const antallTegnLagtTil = finnAntallTegnLagtTil(nyFritekstSterialisert, gammelTekst);
        let karakterTeller = 0;
        let erEndringGjort = false;
        const nyFritekstTabell = fritekstTabellKopi.map((liste) => {
            const gammelKarakterTeller = karakterTeller;
            karakterTeller += finnKaraktererIListeMedStrenger(liste);
            if (karakterTeller > endringsIndeks && !erEndringGjort) {
                erEndringGjort = true;
                const { tabellIndeks, nyttFritekstElement } = finnTabellIndeksOgNyttFritekstElement(endringsIndeks, nyFritekstSterialisert, liste, antallTegnLagtTil, gammelKarakterTeller);
                const nyFritekstTabellElement = genererNyFritekstTabell(nyttFritekstElement, liste, tabellIndeks);
                return nyFritekstTabellElement;
            }
            else {
                return liste;
            }
        });
        settFritekstTabell(nyFritekstTabell);
    };
    const håndterEndringIDropdown = (nyTekstOgIndeksStreng, innholdIndeks) => {
        const fritekstTabellKopi = [...fritekstTabell];
        const nyTekstOgIndeks = nyTekstOgIndeksStreng.split("@&#");
        const optionValgIndeks = Number(nyTekstOgIndeks[1]);
        fritekstTabellKopi[innholdIndeks] = sanityToHtml(delseksjon.innhold[innholdIndeks].valg[optionValgIndeks]);
        settFritekstTabell(fritekstTabellKopi);
        const fritekstStreng = dobbelTabellTilStreng(fritekstTabellKopi);
        oppdaterAvsnitt(fritekstStreng);
        settFritekst(fritekstStreng);
        //finner flettefelt referanser i valgt dropdown option og setter nye flettefelt i flettefeltDropdown state.
        if (erInnholdDropdown(delseksjon.innhold[innholdIndeks])) {
            let flettefeltNy = [];
            delseksjon.innhold[innholdIndeks].valg[optionValgIndeks].tekst.forEach((del) => {
                flettefeltNy = [...flettefeltNy, ...finnFlettefelt(del)];
            });
            oppdaterFlettefeltFraDropdowns(flettefeltNy, innholdIndeks);
        }
    };
    const håndterEndringIFletteFelt = (e, elementindeks, listeindeks) => {
        const friteksttabellKopi = [...fritekstTabell];
        friteksttabellKopi[listeindeks][elementindeks * 2 + 1] = e.target.value;
        const nyFritekst = dobbelTabellTilStreng(friteksttabellKopi);
        settFritekstTabell(friteksttabellKopi);
        settFritekst(nyFritekst);
        oppdaterAvsnitt(nyFritekst);
    };
    return (React.createElement("div", { className: "delseksjon" },
        React.createElement(Checkbox, { checked: skalAvsnittInkluderesState[delseksjonIndeks], value: skalAvsnittInkluderesState[delseksjonIndeks], onClick: () => handterToggle(), className: skalAvsnittInkluderesState[delseksjonIndeks] ? "" : "disabled-tekst", "data-cy": "delseksjon_checkbox" }, delseksjon.delseksjonstittel),
        skalAvsnittInkluderesState[delseksjonIndeks] === true && (React.createElement("div", { className: "delseksjon-felter" },
            delseksjon.innhold !== null &&
                delseksjon.innhold.map((innhold, innholdIndeks) => {
                    if (erInnholdDropdown(innhold)) {
                        return (React.createElement("div", { key: innholdIndeks },
                            React.createElement(Dropdown, { sanityDropdown: innhold, "h\u00E5ndterEndringIDropdown": håndterEndringIDropdown, innholdIndeks: innholdIndeks }),
                            flettefelt[innholdIndeks] !== undefined && (React.createElement(Flettefelter, { flettefelter: flettefelt[innholdIndeks], innholdIndeks: innholdIndeks, "h\u00E5ndterEndringIFletteFelt": håndterEndringIFletteFelt }))));
                    }
                    else if (erInnholdTekstObjekt(innhold)) {
                        if (flettefelt[innholdIndeks] !== undefined) {
                            return (React.createElement(Flettefelter, { key: innholdIndeks, flettefelter: flettefelt[innholdIndeks], innholdIndeks: innholdIndeks, "h\u00E5ndterEndringIFletteFelt": håndterEndringIFletteFelt }));
                        }
                    }
                }),
            React.createElement("label", { className: "navds-form-field__label navds-label" }, "Fritekst"),
            React.createElement(Fritekst, { "h\u00E5ndterEndringIFritekstFelt": håndterEndringIFritekstFelt, defaultTekst: fritekst })))));
}
