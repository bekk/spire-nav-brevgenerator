import {
	dobbelTabellTilStreng,
	finnAntallTegnLagtTil,
	finnEndringsIndeks,
	finnKaraktererIListeMedStrenger,
	finnTabellIndeksOgNyttFritekstElement,
	sanityTekstObjektTilStreng,
} from '../utils/fritekstUtils';
import { sanityTekstMedFlettefelt, sanityTekstPlain } from './testobjekter';

describe('test av sanityTekstObjektTilStreng()', () => {
	it('gitt tekst uten markDefs og marks', () => {
		const testObjekt = sanityTekstPlain;
		const streng = sanityTekstObjektTilStreng(testObjekt);
		expect(streng).toBe(
			'Dette er en en plain tekst uten flettefelt og bold-text'
		);
	});

	it('gitt tekst med markDefs', () => {
		const testObjekt = sanityTekstMedFlettefelt;
		const streng = sanityTekstObjektTilStreng(testObjekt);
		expect(streng).toBe(
			'Vi har beregnet dette både ut ifra arbeidsinntekten din og [stønad] du får fra oss. Dette gir en forventet årsinntekt på [beløp] kroner.'
		);
	});
});

describe('test av finnEndringsIndeks', () => {
	const gammelTekst = 'dette er en test';

	describe('gitt endring ved starten av streng', () => {
		it('eksisterende tegn endret', () => {
			const nyTekst = 'Dette er en test';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(0);
		});

		it('tegn lagt til', () => {
			const nyTekst = 'xdette er en test';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(0);
		});

		it('tegn fjernet', () => {
			const nyTekst = 'ette er en test';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(0);
		});
	});

	describe('gitt endring i slutten av streng', () => {
		it('eksisterende tegn endret', () => {
			const nyTekst = 'dette er en tesT';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(15);
		});

		it('tegn lagt til', () => {
			const nyTekst = 'dette er en test!';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(16);
		});

		it('tegn fjernet', () => {
			const nyTekst = 'dette er en tes';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(15);
		});
	});

	describe('gitt endring i midten av streng', () => {
		it('eksisterende tegn endret', () => {
			const nyTekst = 'dette Er en test';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(6);
		});

		it('tegn lagt til', () => {
			const nyTekst = 'dette exr en test!';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(7);
		});

		it('tegn fjernet', () => {
			const nyTekst = 'dette e en tes';
			const endringsIndeks = finnEndringsIndeks(gammelTekst, nyTekst);

			expect(endringsIndeks).toBe(7);
		});
	});

	it('streng uten endring', () => {
		const endringsIndeks = finnEndringsIndeks(gammelTekst, gammelTekst);

		expect(endringsIndeks).toBe(-1);
	});
});

describe('test av finnAntallTegnEndret', () => {
	const gammelFritekst = 'dette er en test';

	it('gitt ingen tegn endret', () => {
		const nyFritekst = 'dette er en test';
		const antallTegnEndret = finnAntallTegnLagtTil(nyFritekst, gammelFritekst);
		expect(antallTegnEndret).toBe(0);
	});

	it('gitt tegn lagt til', () => {
		const nyFritekst = 'dette er en test!!!';
		const antallTegnEndret = finnAntallTegnLagtTil(nyFritekst, gammelFritekst);
		expect(antallTegnEndret).toBe(3);
	});

	it('gitt tegn fjernet', () => {
		const nyFritekst = 'dette er en';
		const antallTegnEndret = finnAntallTegnLagtTil(nyFritekst, gammelFritekst);
		expect(antallTegnEndret).toBe(-5);
	});
});

describe('test av finnTabellIndeksOgNyttFritekstElement(HTML)', () => {
	const fritekstTabellKopi = [
		'<p>Tekst nr 1.</p>',
		'<p>Tekst nr 2.</p>',
		'<p>Tekst nr 3.</p>',
	];

	describe('gitt endringstype = eksisterendeTegnEndret', () => {
		it('endring i første element', () => {
			const nyFritekst =
				'<p>Tekst Nr 1.</p><p>Tekst nr 2.</p><p>Tekst nr 3.</p>';

			const endringsIndeks = 9;
			const antallTegnLagtTil = 0;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(0);
			expect(nyttFritekstElement).toBe('<p>Tekst Nr 1.</p>');
		});

		it('endring i andre element', () => {
			const nyFritekst =
				'<p>Tekst nr 1.</p><p>Tekst Nr 2.</p><p>Tekst nr 3.</p>';

			const endringsIndeks = 27;
			const antallTegnLagtTil = 0;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(1);
			expect(nyttFritekstElement).toBe('<p>Tekst Nr 2.</p>');
		});

		it('endring i siste element', () => {
			const nyFritekst =
				'<p>Tekst nr 1.</p><p>Tekst nr 2.</p><p>Tekst Nr 3.</p>';

			const endringsIndeks = 45;
			const antallTegnLagtTil = 0;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(2);
			expect(nyttFritekstElement).toBe('<p>Tekst Nr 3.</p>');
		});

		it('flere tegn endret', () => {
			const nyFritekst =
				'<p>XXXXX nr 1.</p><p>Tekst nr 2.</p><p>Tekst Nr 3.</p>';

			const endringsIndeks = 0;
			const antallTegnLagtTil = 0;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(0);
			expect(nyttFritekstElement).toBe('<p>XXXXX nr 1.</p>');
		});
	});

	describe('gitt endringstype = tegnLagtTil', () => {
		it('endring i første element', () => {
			const nyFritekst =
				'<p>Tekst nr 1..</p><p>Tekst nr 2.</p><p>Tekst nr 3.</p>';

			const endringsIndeks = 14;
			const antallTegnLagtTil = 1;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(0);
			expect(nyttFritekstElement).toBe('<p>Tekst nr 1..</p>');
		});

		it('endring i andre element', () => {
			const nyFritekst =
				'<p>Tekst nr 1.</p><p>Tekst nr 2..</p><p>Tekst nr 3.</p>';

			const endringsIndeks = 32;
			const antallTegnLagtTil = 1;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(1);
			expect(nyttFritekstElement).toBe('<p>Tekst nr 2..</p>');
		});

		it('endring i siste element', () => {
			const nyFritekst =
				'<p>Tekst nr 1.</p><p>Tekst nr 2.</p><p>Tekst nr 3..</p>';

			const endringsIndeks = 50;
			const antallTegnLagtTil = 1;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(2);
			expect(nyttFritekstElement).toBe('<p>Tekst nr 3..</p>');
		});

		it('flere tegn lagt til', () => {
			const nyFritekst =
				'<p>TTTTTTTTTekst nr 1.</p><p>Tekst nr 2.</p><p>Tekst nr 3..</p>';

			const endringsIndeks = 1;
			const antallTegnLagtTil = 8;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(0);
			expect(nyttFritekstElement).toBe('<p>TTTTTTTTTekst nr 1.</p>');
		});
	});

	describe('gitt endringstype = tegnFjernet', () => {
		it('endring i første element', () => {
			const nyFritekst =
				'<p>Tekst nr 1</p><p>Tekst nr 2.</p><p>Tekst nr 3.</p>';

			const endringsIndeks = 13;
			const antallTegnLagtTil = -1;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(0);
			expect(nyttFritekstElement).toBe('<p>Tekst nr 1</p>');
		});

		it('endring i andre element', () => {
			const nyFritekst =
				'<p>Tekst nr 1.</p><p>Tekst nr 2</p><p>Tekst nr 3.</p>';

			const endringsIndeks = 31;
			const antallTegnLagtTil = -1;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(1);
			expect(nyttFritekstElement).toBe('<p>Tekst nr 2</p>');
		});

		it('endring i siste element', () => {
			const nyFritekst =
				'<p>Tekst nr 1.</p><p>Tekst nr 2.</p><p>Tekst nr 3</p>';

			const endringsIndeks = 49;
			const antallTegnLagtTil = -1;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(2);
			expect(nyttFritekstElement).toBe('<p>Tekst nr 3</p>');
		});

		it('flere tegn fjernet', () => {
			const nyFritekst = '<p>Tekst nr 1.</p><p>Tekst .</p><p>Tekst nr 3</p>';

			const endringsIndeks = 29;
			const antallTegnLagtTil = -4;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(1);
			expect(nyttFritekstElement).toBe('<p>Tekst .</p>');
		});

		it('helt element fjernet', () => {
			const nyFritekst = '<p>Tekst nr 1.</p><p>Tekst .</p>';

			const endringsIndeks = 40;
			const antallTegnLagtTil = -18;

			const { tabellIndeks, nyttFritekstElement } =
				finnTabellIndeksOgNyttFritekstElement(
					endringsIndeks,
					nyFritekst,
					fritekstTabellKopi,
					antallTegnLagtTil,
					0
				);

			expect(tabellIndeks).toBe(2);
			expect(nyttFritekstElement).toBe('');
		});
	});

	describe("dobbelTabellTilStreng", () => {
		it('Vanlig data', () => {
			const tabell = [["dette ", "er ", "en ", "tabell "], ["med ", "to ", "rader"]];

			const streng = dobbelTabellTilStreng(tabell);
			expect(streng).toBe("dette er en tabell med to rader");
		})

		it('Tom indre liste midten', () => {
			const tabell = [["dette ", "er ", "en ", "tabell "],[], ["med ", "to ", "rader"]];

			const streng = dobbelTabellTilStreng(tabell);
			expect(streng).toBe("dette er en tabell med to rader");
		})

		it('Tom indre liste start', () => {
			const tabell = [[], ["dette ", "er ", "en ", "tabell "], ["med ", "to ", "rader"]];

			const streng = dobbelTabellTilStreng(tabell);
			expect(streng).toBe("dette er en tabell med to rader");
		})

		it('Tom indre liste slutt', () => {
			const tabell = [ ["dette ", "er ", "en ", "tabell "], ["med ", "to ", "rader"]];

			const streng = dobbelTabellTilStreng(tabell);
			expect(streng).toBe("dette er en tabell med to rader");
		})

		it('Tom liste', () => {
			const tabell = [[]];

			const streng = dobbelTabellTilStreng(tabell);
			expect(streng).toBe("");
		})
	})

	describe("test av finnKaraktererIListeMedStenger", () => {
		it("liste elementer med karakterer", () => {
			const listeMedStrenger = ["en", "tekst", "med", "karakterer"];

			const resultat = finnKaraktererIListeMedStrenger(listeMedStrenger);

			expect(resultat).toBe(20);
		})

		it("liste elementer med karakterer og tomme liste elementer", () => {
			const listeMedStrenger = ["", "tekst", "med", ""];

			const resultat = finnKaraktererIListeMedStrenger(listeMedStrenger);

			expect(resultat).toBe(8);
		})
	})

});
