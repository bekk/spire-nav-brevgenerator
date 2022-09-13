import React from 'react';
import { Heading } from '@navikt/ds-react';
export function Overskrift() {
    return (React.createElement("div", { className: "app-overskrift", id: "sideOverskrift" },
        React.createElement(Heading, { level: "1", size: "xlarge" }, "Vedtaksbrev")));
}
