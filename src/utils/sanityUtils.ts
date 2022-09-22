import {
	SanityTekstObjekt,
	SanityChildren,
	SanityDropdown,
	SanityTekst,
} from '../typer/sanity';

export const sanityBlocktekstToHtml = (tekst: SanityTekstObjekt): string[] => {
	const outStrengTabell: string[] = [];
	let gjeldendeTabellElement = '';
	tekst.tekst.forEach((tekstElement) => {
		tekstElement.children.forEach((child, childIndeks) => {
			const erChildFlettefeltReferanse = erFlettefeltReferanse(
				tekstElement,
				child
			);

			if (childIndeks === 0) {
				gjeldendeTabellElement += '<p>';
				if (erChildFlettefeltReferanse) {
					outStrengTabell.push(gjeldendeTabellElement);
					gjeldendeTabellElement = '';
				}
			}
			if (child.marks.includes('strong')) {
				gjeldendeTabellElement += `<strong>${child.text}</strong>`;
			} else {
				gjeldendeTabellElement += child.text;
			}

			if (erTabellReferanse(tekstElement, child)) {
				gjeldendeTabellElement =
					'[' + tekstElement.markDefs[0].tabell.tabellReferanse + ']';
			}

			if (erChildFlettefeltReferanse) {
				outStrengTabell.push(gjeldendeTabellElement);
				gjeldendeTabellElement = '';
				if (
					childIndeks !== tekstElement.children.length - 1 &&
					erChildFlettefeltReferanse
				) {
					outStrengTabell.push(gjeldendeTabellElement);
				}
			} else if (
				childIndeks !== tekstElement.children.length - 1 &&
				erChildFlettefeltReferanse
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

const erFlettefeltReferanse = (
	tekstElement: SanityTekst,
	child: SanityChildren
): boolean => {
	if (child.marks.length === 1 && !child.marks.includes('strong')) {
		for (let i = 0; i < tekstElement.markDefs.length; i++) {
			if (tekstElement.markDefs[i]._type === 'flettefeltReferanse') {
				return true;
			}
		}
	}
	return false;
};

const erTabellReferanse = (
	tekstElement: SanityTekst,
	child: SanityChildren
): boolean => {
	if (child.marks.length === 1 && !child.marks.includes('strong')) {
		for (let i = 0; i < tekstElement.markDefs.length; i++) {
			if (tekstElement.markDefs[i]._type === 'tabellReferanse') {
				return true;
			}
		}
	}
	return false;
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
