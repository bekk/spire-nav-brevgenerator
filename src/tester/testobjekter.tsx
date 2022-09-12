import { SanityTekstObjekt } from '../src/brevgenerator/typer/sanity';

export const sanityTekstPlain: SanityTekstObjekt = {
	_createdAt: 'createdAt',
	_id: 'id',
	_rev: 'rev',
	_type: 'type',
	_updatedAt: 'updatedAt',
	tekstTittel: 'Har inntekt og andre stønader',
	tekst: [
		{
			_key: 'key',
			_type: 'block',
			children: [
				{
					_key: 'key',
					_type: 'span',
					marks: [],
					text: 'Dette er en en plain tekst uten flettefelt og bold-text',
				},
			],
			markDefs: [],
			style: 'normal',
		},
	],
};

export const sanityTekstMedFlettefelt: SanityTekstObjekt = {
	_createdAt: 'createdAt',
	_id: 'id',
	_rev: 'rev',
	_type: 'type',
	_updatedAt: 'updatedAt',
	tekstTittel: 'Har inntekt og andre stønader',
	tekst: [
		{
			_key: 'key',
			_type: 'block',
			children: [
				{
					_key: 'key',
					_type: 'span',
					marks: [],
					text: 'Vi har beregnet dette både ut ifra arbeidsinntekten din og ',
				},
				{
					_key: 'key',
					_type: 'span',
					marks: ['e8151d558937'],
					text: '[stønad]',
				},
				{
					_key: 'key',
					_type: 'span',
					marks: [],
					text: ' du får fra oss. Dette gir en forventet årsinntekt på ',
				},
				{
					_key: 'key',
					_type: 'span',
					marks: ['b8c64e274136'],
					text: '[beløp]',
				},
				{
					_key: 'key',
					_type: 'span',
					marks: [],
					text: ' kroner.',
				},
			],
			markDefs: [
				{
					_key: 'e8151d558937',
					_type: 'flettefeltReferanse',
					tabell: {
						tabellNavn: 'tabell1',
						tabell: {
							rows: [
								{
									cells: ['cell1', 'cell2'],
									_key: '12364e274134',
									_type: 'string',
								},
							],
							_key: 'f8c64e274134',
							_type: 'tabell',
						},
						_createdAt: 'createdAt',
						_id: 'id',
						_rev: 'rev',
						_type: 'type',
						_updatedAt: 'updatedAt',
					},
					referanse: [
						{
							_ref: 'ref',
							_type: 'reference',
						},
					],
				},
				{
					_key: 'b8c64e274136',
					_type: 'flettefeltReferanse',
					tabell: {
						tabellNavn: 'tabell1',
						tabell: {
							rows: [
								{
									cells: ['cell1', 'cell2'],
									_key: '12364e274134',
									_type: 'string',
								},
							],
							_key: 'f8c64e274134',
							_type: 'tabell',
						},
						_createdAt: 'createdAt',
						_id: 'id',
						_rev: 'rev',
						_type: 'type',
						_updatedAt: 'updatedAt',
					},
					referanse: [
						{
							_ref: '1dcb5e96-ef54-413d-a0c5-4bdd99c94101',
							_type: 'reference',
						},
					],
				},
			],
			style: 'normal',
		},
	],
};
