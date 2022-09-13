import React from 'react';
import { renderToString } from 'react-dom/server';
export const listeTilHtmlTabell = (tabell) => {
    return renderToString(React.createElement("table", null, tabell.map((row, rowIndeks) => {
        if (rowIndeks === 0) {
            return (React.createElement("tr", { key: rowIndeks }, row.map((cell, cellIndeks) => (React.createElement("th", { key: cellIndeks }, cell)))));
        }
        else {
            return (React.createElement("tr", { key: rowIndeks }, row.map((cell, cellIndeks) => (React.createElement("td", { key: cellIndeks }, cell)))));
        }
    })));
};
