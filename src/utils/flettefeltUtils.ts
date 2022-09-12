import { SanityChildren, SanityTekst } from '../brevgenerator/typer/sanity';

export const finnFlettefelt = (sanityTekst: SanityTekst) => {
	const flettefeltNy: SanityChildren[] = [];
	sanityTekst.markDefs &&
		sanityTekst.markDefs.forEach((markdef) => {
			sanityTekst.children.forEach((child) => {
				child.marks.forEach((mark) => {
					if (
						mark === markdef._key &&
						(markdef.tabell === undefined || markdef.tabell === null)
					) {
						flettefeltNy.push(child);
					}
				});
			});
		});
	return flettefeltNy;
};
