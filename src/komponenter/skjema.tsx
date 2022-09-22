import { Select } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { hentBrevmal } from '../brev-api';
import {
	SanityBrevmalMedSeksjoner,
	SanityDropdown,
	SanitySeksjon,
	SanityTekstObjekt,
} from '../typer/sanity';
import { brevmal } from '../typer/typer';
import { SkjemaContext } from '../context/context';
import { Seksjon } from './seksjon';
import '../stiler/skjema.css';
import { sanityBlocktekstToHtml } from '../utils/sanityUtils';

interface SkjemaProps {
	brevmaler: brevmal[];
}

export function Skjema({ brevmaler }: SkjemaProps) {
	const [gjeldendeBrevmalId, setGjeldendeBrevmalId] = useState<string>('-1');
	const [gjeldendeBrevmal, setGjeldendeBrevmal] =
		useState<SanityBrevmalMedSeksjoner | null>(null);
	const {
		avsnittDispatch,
		skalAvsnittInkluderesDispatch,
		brevmalTittelDispatch,
	} = React.useContext(SkjemaContext);

	const finnInitelleAvsnittISeksjon = (seksjon: SanitySeksjon) => {
		return seksjon.delseksjoner.map((delseksjon) => {
			let nyFritekst = '';
			delseksjon.innhold.forEach(
				(innhold: SanityDropdown | SanityTekstObjekt) => {
					if ((innhold as SanityTekstObjekt).tekstTittel !== undefined) {
						nyFritekst += sanityBlocktekstToHtml(
							innhold as SanityTekstObjekt
						).join(' ');
					}
				}
			);
			return nyFritekst;
		});
	};

	const finnInitielleAvsnittOgAntallDelseksjoner = (
		seksjoner: SanitySeksjon[]
	) => {
		let antallDelSeksjoner = 0;
		const nyeAvsnitt: string[] = seksjoner.flatMap((seksjon) => {
			antallDelSeksjoner += seksjon.delseksjoner.length;
			return finnInitelleAvsnittISeksjon(seksjon);
		});
		return { nyeAvsnitt, antallDelSeksjoner };
	};

	useEffect(() => {
		hentBrevmal(gjeldendeBrevmalId).then((res: SanityBrevmalMedSeksjoner) => {
			setGjeldendeBrevmal(res);
			if (res !== null && res.seksjoner.length > 0) {
				brevmalTittelDispatch(res.brevmaloverskrift);
				const { nyeAvsnitt, antallDelSeksjoner } =
					finnInitielleAvsnittOgAntallDelseksjoner(res.seksjoner);
				const nyeInkluderingsBrytere: boolean[] = new Array(
					antallDelSeksjoner
				).fill(true);

				avsnittDispatch(nyeAvsnitt);
				skalAvsnittInkluderesDispatch(nyeInkluderingsBrytere);
			}
		});
	}, [gjeldendeBrevmalId]);

	const renderSeksjoner = () => {
		let delseksjonTeller = 0;
		return (
			gjeldendeBrevmal !== null &&
			gjeldendeBrevmal.seksjoner.map(
				(seksjon: SanitySeksjon, indeks: number) => {
					const seksjonsKomponent = (
						<Seksjon
							seksjon={seksjon as SanitySeksjon}
							key={indeks}
							seksjonStartIndeks={delseksjonTeller}
						/>
					);
					delseksjonTeller += (seksjon as SanitySeksjon).delseksjoner.length;
					return seksjonsKomponent;
				}
			)
		);
	};

	return (
		<div className="skjema">
			<Select
				label="Velg brevmal"
				size="medium"
				onChange={(e) => setGjeldendeBrevmalId(e.target.value)}
				defaultValue={''}
				data-cy="velgBrevmal"
			>
				<option value="" disabled>
					Velg brevmal
				</option>
				{brevmaler.map((brevmal) => (
					<option key={brevmal.id} value={brevmal.id}>
						{brevmal.tittel}
					</option>
				))}
			</Select>
			{renderSeksjoner()}
		</div>
	);
}
