import { Select } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { hentBrevmal } from "../brev-api";
import { SkjemaContext } from "../context/context";
import { Seksjon } from "./seksjon";
import "../stiler/skjema.css";
import { sanityToHtml } from "../utils/sanityUtils";
export function Skjema({ brevmaler }) {
    const [gjeldendeBrevmalId, setGjeldendeBrevmalId] = useState("-1");
    const [gjeldendeBrevmal, setGjeldendeBrevmal] = useState(null);
    const { avsnittDispatch, skalAvsnittInkluderesDispatch, brevmalTittelDispatch, } = React.useContext(SkjemaContext);
    const finnInitelleAvsnittISeksjon = (seksjon) => {
        return seksjon.delseksjoner.map((delseksjon) => {
            let nyFritekst = "";
            delseksjon.innhold.forEach((innhold) => {
                if (innhold.tekstTittel !== undefined) {
                    nyFritekst += sanityToHtml(innhold).join(" ");
                }
            });
            return nyFritekst;
        });
    };
    const finnInitielleAvsnittOgAntallDelseksjoner = (seksjoner) => {
        let antallDelSeksjoner = 0;
        const nyeAvsnitt = seksjoner.flatMap((seksjon) => {
            antallDelSeksjoner += seksjon.delseksjoner.length;
            return finnInitelleAvsnittISeksjon(seksjon);
        });
        return { nyeAvsnitt, antallDelSeksjoner };
    };
    useEffect(() => {
        hentBrevmal(gjeldendeBrevmalId).then((res) => {
            setGjeldendeBrevmal(res);
            if (res !== null && res.seksjoner.length > 0) {
                brevmalTittelDispatch(res.brevmaloverskrift);
                const { nyeAvsnitt, antallDelSeksjoner } = finnInitielleAvsnittOgAntallDelseksjoner(res.seksjoner);
                const nyeInkluderingsBrytere = new Array(antallDelSeksjoner).fill(true);
                avsnittDispatch(nyeAvsnitt);
                skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
            }
        });
    }, [gjeldendeBrevmalId]);
    const renderSeksjoner = () => {
        let delseksjonTeller = 0;
        return (gjeldendeBrevmal !== null &&
            gjeldendeBrevmal.seksjoner.map((seksjon, indeks) => {
                const seksjonsKomponent = (React.createElement(Seksjon, { seksjon: seksjon, key: indeks, seksjonStartIndeks: delseksjonTeller }));
                delseksjonTeller += seksjon.delseksjoner.length;
                return seksjonsKomponent;
            }));
    };
    return (React.createElement("div", { className: "skjema" },
        React.createElement(Select, { label: "Velg brevmal", size: "medium", onChange: (e) => setGjeldendeBrevmalId(e.target.value), defaultValue: "", "data-cy": "velgBrevmal" },
            React.createElement("option", { value: "", disabled: true }, "Velg brevmal"),
            brevmaler.map((brevmal) => (React.createElement("option", { key: brevmal.id, value: brevmal.id }, brevmal.tittel)))),
        renderSeksjoner()));
}
