import React from "react";
import { Select } from "@navikt/ds-react";
import { sanityToHtml } from "../utils/sanityUtils";
export function Dropdown({ sanityDropdown, håndterEndringIDropdown, innholdIndeks, }) {
    return (React.createElement(Select, { label: sanityDropdown.dropdowntittel, onChange: (e) => håndterEndringIDropdown(e.target.value, innholdIndeks), defaultValue: "", "data-cy": "dropdown" },
        React.createElement("option", { value: "", disabled: true }, "Velg et alternativ"),
        sanityDropdown.valg !== undefined &&
            sanityDropdown.valg.map((valg, indeks2) => (React.createElement("option", { key: indeks2, value: sanityToHtml(valg) + `@&#${indeks2.toString()}` }, valg.tekstTittel)))));
}
