import {
	SanityTekstObjekt,
	SanityChildren,
	SanityDropdown,
} from '../typer/sanity';

export const sanityToHtml = (tekst: SanityTekstObjekt): string[] => {
	const outStrengTabell: string[] = [];
	let gjeldendeTabellElement = '';
	tekst.tekst.forEach((tekstElement) => {
		tekstElement.children.forEach((child, childIndeks) => {
			if (childIndeks === 0) {
				gjeldendeTabellElement += '<p>';
				if (erFlettefelt(child)) {
					outStrengTabell.push(gjeldendeTabellElement);
					gjeldendeTabellElement = '';
				}
			}
			if (child.marks.includes('strong')) {
				gjeldendeTabellElement += `<strong>${child.text}</strong>`;
			} else {
				gjeldendeTabellElement += child.text;
			}

			if (erFlettefelt(child)) {
				outStrengTabell.push(gjeldendeTabellElement);
				gjeldendeTabellElement = '';
				if (
					childIndeks !== tekstElement.children.length - 1 &&
					erFlettefelt(tekstElement.children[childIndeks + 1])
				) {
					outStrengTabell.push(gjeldendeTabellElement);
				}
			} else if (
				childIndeks !== tekstElement.children.length - 1 &&
				erFlettefelt(tekstElement.children[childIndeks + 1])
			) {
				outStrengTabell.push(gjeldendeTabellElement);
				gjeldendeTabellElement = '';
			}
			if (childIndeks === tekstElement.children.length - 1) {
				gjeldendeTabellElement += '</p>';
			}
		});
	});
	outStrengTabell.push(gjeldendeTabellElement);
	return outStrengTabell;
};
const erFlettefelt = (child: SanityChildren): boolean => {
	return child.marks.length === 1 && !child.marks.includes('strong');
};

export const erInnholdDropdown = (
	innhold: SanityDropdown | SanityTekstObjekt
): boolean => {
	return (innhold as SanityDropdown).dropdowntittel !== undefined;
};

export const erInnholdTekstObjekt = (
	innhold: SanityDropdown | SanityTekstObjekt
): boolean => {
	return (innhold as SanityTekstObjekt).tekstTittel !== undefined;
};
