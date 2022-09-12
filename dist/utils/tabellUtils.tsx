import React from 'react';
import { renderToString } from 'react-dom/server';

export const listeTilHtmlTabell = (tabell: string[][]) => {
	return renderToString(
		<table>
			{tabell.map((row, rowIndeks) => {
				if (rowIndeks === 0) {
					return (
						<tr key={rowIndeks}>
							{row.map((cell, cellIndeks) => (
								<th key={cellIndeks}>{cell}</th>
							))}
						</tr>
					);
				} else {
					return (
						<tr key={rowIndeks}>
							{row.map((cell, cellIndeks) => (
								<td key={cellIndeks}>{cell}</td>
							))}
						</tr>
					);
				}
			})}
		</table>
	);
};
