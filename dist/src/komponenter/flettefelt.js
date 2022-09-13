import React from "react";
import { TextField } from "@navikt/ds-react";
export function Flettefelt({ flettefelt, flettefeltIndeks, innholdIndeks, håndterEndringIFletteFelt, }) {
    return (React.createElement(TextField, { onChange: (e) => håndterEndringIFletteFelt(e, flettefeltIndeks, innholdIndeks), key: flettefelt._key, label: flettefelt.text, size: "small" }));
}
