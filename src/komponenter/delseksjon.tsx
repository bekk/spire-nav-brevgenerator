import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from '@navikt/ds-react';
import { SkjemaContext } from '../context/context';
import {
	SanityChildren,
	SanityDelseksjon,
	SanityDropdown,
	SanityTekst,
	SanityTekstObjekt,
} from '../typer/sanity';

import { Fritekst } from './fritekst';
import {
	finnEndringsIndeks,
	finnTabellIndeksOgNyttFritekstElement,
	finnAntallTegnLagtTil,
	dobbelTabellTilStreng,
	finnKaraktererIListeMedStrenger,
} from '../utils/fritekstUtils';
import '../stiler/delseksjon.css';
import {
	erInnholdDropdown,
	erInnholdTekstObjekt,
	sanityBlocktekstToHtml,
} from '../utils/sanityUtils';
import { Dropdown } from './dropdown';
import { Flettefelter } from './flettefelter';
import { finnFlettefelt } from '../utils/flettefeltUtils';

interface seksjonProps {
	delseksjon: SanityDelseksjon;
	delseksjonIndeks: number;
}

export function Delseksjon({ delseksjon, delseksjonIndeks }: seksjonProps) {
	const {
		avsnittState,
		avsnittDispatch,
		skalAvsnittInkluderesState,
		skalAvsnittInkluderesDispatch,
	} = useContext(SkjemaContext);
	const [fritekstTabell, settFritekstTabell] = useState<string[][]>([]);
	const [fritekst, settFritekst] = useState<string>('');
	const [flettefelt, settFlettefelt] = useState<SanityChildren[][]>([]);

	useEffect(() => {
		settFritekst('');
		if (delseksjon.innhold !== null) {
			const { nyFritekstTabell, nyFlettefelttabell } =
				innholdTilFritekstTabellOgFlettefeltTabell(delseksjon.innhold);

			settFritekstTabell(nyFritekstTabell);
			settFlettefelt(nyFlettefelttabell);
			const nyFritekst = dobbelTabellTilStreng(nyFritekstTabell);
			settFritekst(nyFritekst);
		}
	}, [delseksjon]);

	const innholdTilFritekstTabellOgFlettefeltTabell = (
		innhold: (SanityDropdown | SanityTekstObjekt)[]
	): {
		nyFritekstTabell: string[][];
		nyFlettefelttabell: SanityChildren[][];
	} => {
		const nyFritekstTabell: string[][] = [];
		const nyFlettefelttabell: SanityChildren[][] = [];

		innhold.forEach(
			(innhold: SanityDropdown | SanityTekstObjekt, indeks: number) => {
				if ((innhold as SanityTekstObjekt).tekstTittel !== undefined) {
					nyFritekstTabell[indeks] = sanityBlocktekstToHtml(
						innhold as SanityTekstObjekt
					);
					let flettefeltNy: SanityChildren[] = [];
					(innhold as SanityTekstObjekt).tekst.forEach((del: SanityTekst) => {
						flettefeltNy = [...flettefeltNy, ...finnFlettefelt(del)];
					});

					nyFlettefelttabell[indeks] = flettefeltNy;
				} else {
					nyFritekstTabell[indeks] = [];
					nyFlettefelttabell[indeks] = [];
				}
				return '';
			}
		);

		return {
			nyFritekstTabell: nyFritekstTabell,
			nyFlettefelttabell: nyFlettefelttabell,
		};
	};

	const oppdaterFlettefeltFraDropdowns = (
		nyeFlettefelt: SanityChildren[],
		indeks: number
	) => {
		const flettefeltKopi = [...flettefelt];
		flettefeltKopi[indeks] = nyeFlettefelt;
		settFlettefelt(flettefeltKopi);
	};

	const oppdaterAvsnitt = (avsnittStreng: string) => {
		const nyeAvsnitt = [...avsnittState];
		nyeAvsnitt[delseksjonIndeks] = avsnittStreng;
		avsnittDispatch(nyeAvsnitt);
	};

	const handterToggle = () => {
		const nyeInkluderingsBrytere = [...skalAvsnittInkluderesState];
		nyeInkluderingsBrytere[delseksjonIndeks] =
			!skalAvsnittInkluderesState[delseksjonIndeks];

		skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
	};

	const genererNyFritekstTabell = (
		nyTekst: string,
		fritekstTabellKopi: string[],
		indeks: number
	) => {
		fritekstTabellKopi[indeks] = nyTekst;
		return fritekstTabellKopi;
	};

	const håndterEndringIFritekstFelt = (nyFritekst: string) => {
		oppdaterAvsnitt(nyFritekst);

		const nyFritekstSterialisert = nyFritekst
			.replaceAll('&nbsp;', ' ')
			.replaceAll('\n', '')
			.replaceAll('&lt;', '')
			.replaceAll('&gt;', '');

		const gammelTekst = dobbelTabellTilStreng(fritekstTabell);

		const endringsIndeks = finnEndringsIndeks(
			nyFritekstSterialisert,
			gammelTekst
		);

		if (endringsIndeks === -1) return;

		const fritekstTabellKopi = [...fritekstTabell];
		const antallTegnLagtTil = finnAntallTegnLagtTil(
			nyFritekstSterialisert,
			gammelTekst
		);

		let karakterTeller = 0;
		let erEndringGjort = false;
		const nyFritekstTabell = fritekstTabellKopi.map((liste) => {
			const gammelKarakterTeller = karakterTeller;
			karakterTeller += finnKaraktererIListeMedStrenger(liste);

			if (karakterTeller > endringsIndeks && !erEndringGjort) {
				erEndringGjort = true;
				const { tabellIndeks, nyttFritekstElement } =
					finnTabellIndeksOgNyttFritekstElement(
						endringsIndeks,
						nyFritekstSterialisert,
						liste,
						antallTegnLagtTil,
						gammelKarakterTeller
					);

				const nyFritekstTabellElement = genererNyFritekstTabell(
					nyttFritekstElement,
					liste,
					tabellIndeks
				);
				return nyFritekstTabellElement;
			} else {
				return liste;
			}
		});

		settFritekstTabell(nyFritekstTabell);
	};

	const håndterEndringIDropdown = (
		nyTekstOgIndeksStreng: string,
		innholdIndeks: number
	) => {
		const fritekstTabellKopi = [...fritekstTabell];
		const nyTekstOgIndeks = nyTekstOgIndeksStreng.split('@&#');
		const optionValgIndeks = Number(nyTekstOgIndeks[1]);

		fritekstTabellKopi[innholdIndeks] = sanityBlocktekstToHtml(
			(delseksjon.innhold[innholdIndeks] as SanityDropdown).valg[
				optionValgIndeks
			]
		);

		settFritekstTabell(fritekstTabellKopi);
		const fritekstStreng = dobbelTabellTilStreng(fritekstTabellKopi);
		oppdaterAvsnitt(fritekstStreng);
		settFritekst(fritekstStreng);

		//finner flettefelt referanser i valgt dropdown option og setter nye flettefelt i flettefeltDropdown state.
		if (erInnholdDropdown(delseksjon.innhold[innholdIndeks])) {
			let flettefeltNy: SanityChildren[] = [];

			(delseksjon.innhold[innholdIndeks] as SanityDropdown).valg[
				optionValgIndeks
			].tekst.forEach((del) => {
				flettefeltNy = [...flettefeltNy, ...finnFlettefelt(del)];
			});
			oppdaterFlettefeltFraDropdowns(flettefeltNy, innholdIndeks);
		}
	};

	const håndterEndringIFletteFelt = (
		e: any,
		elementindeks: number,
		listeindeks: number
	) => {
		const friteksttabellKopi = [...fritekstTabell];

		friteksttabellKopi[listeindeks][elementindeks * 2 + 1] = e.target.value;

		const nyFritekst = dobbelTabellTilStreng(friteksttabellKopi);

		settFritekstTabell(friteksttabellKopi);
		settFritekst(nyFritekst);
		oppdaterAvsnitt(nyFritekst);
	};

	return (
		<div className="delseksjon">
			<Checkbox
				checked={skalAvsnittInkluderesState[delseksjonIndeks]}
				value={skalAvsnittInkluderesState[delseksjonIndeks]}
				onClick={() => handterToggle()}
				className={
					skalAvsnittInkluderesState[delseksjonIndeks] ? '' : 'disabled-tekst'
				}
				data-cy="delseksjon_checkbox"
			>
				{delseksjon.delseksjonstittel}
			</Checkbox>
			{skalAvsnittInkluderesState[delseksjonIndeks] === true && (
				<div className="delseksjon-felter">
					{delseksjon.innhold !== null &&
						delseksjon.innhold.map(
							(
								innhold: SanityDropdown | SanityTekstObjekt,
								innholdIndeks: number
							) => {
								if (erInnholdDropdown(innhold)) {
									return (
										<div key={innholdIndeks}>
											<Dropdown
												sanityDropdown={innhold as SanityDropdown}
												håndterEndringIDropdown={håndterEndringIDropdown}
												innholdIndeks={innholdIndeks}
											/>
											{flettefelt[innholdIndeks] !== undefined && (
												<Flettefelter
													flettefelter={flettefelt[innholdIndeks]}
													innholdIndeks={innholdIndeks}
													håndterEndringIFletteFelt={håndterEndringIFletteFelt}
												/>
											)}
										</div>
									);
								} else if (erInnholdTekstObjekt(innhold)) {
									if (flettefelt[innholdIndeks] !== undefined) {
										return (
											<Flettefelter
												key={innholdIndeks}
												flettefelter={flettefelt[innholdIndeks]}
												innholdIndeks={innholdIndeks}
												håndterEndringIFletteFelt={håndterEndringIFletteFelt}
											/>
										);
									}
								}
							}
						)}
					<label className="navds-form-field__label navds-label">
						Fritekst
					</label>

					<Fritekst
						håndterEndringIFritekstFelt={håndterEndringIFritekstFelt}
						defaultTekst={fritekst}
					/>
				</div>
			)}
		</div>
	);
}
