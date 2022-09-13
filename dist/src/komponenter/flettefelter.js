import React from "react";
import { Flettefelt } from "./flettefelt";
export function Flettefelter({ flettefelter, innholdIndeks, håndterEndringIFletteFelt, }) {
    return (React.createElement(React.Fragment, null, flettefelter.map((flettefelt, flettefeltIndeks) => (React.createElement(Flettefelt, { key: flettefeltIndeks, flettefelt: flettefelt, flettefeltIndeks: flettefeltIndeks, innholdIndeks: innholdIndeks, "h\u00E5ndterEndringIFletteFelt": håndterEndringIFletteFelt })))));
}
