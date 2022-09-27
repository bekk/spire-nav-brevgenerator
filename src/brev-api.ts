import axios, { AxiosResponse } from 'axios';
import css from './stiler/css';
import { mellomlagringState } from './typer/mellomlagring';

const genererSanityURL = (sanityBaseURL: string, query: string): string => {
    return sanityBaseURL + '?query=' + query;
};

export const hentData = async (URL: string) => {
    return axios.get(URL).then((res) => {
        console.log('BREV API', res.data.result);
    });
};

export const hentAvsnitt = async (URL: string) => {
    return axios.get(URL).then((res) => {
        return res.data.result;
    });
};

export const hentBrevmaler = async (sanityBaseURL: string) => {
    const URL = genererSanityURL(sanityBaseURL, '*[_type == "brevmal"]');

    return axios.get(URL).then((res) => {
        return res.data.result;
    });
};

export const hentBrevmal = async (sanityBaseURL: string, id: string) => {
    const URL = genererSanityURL(
        sanityBaseURL,
        `*[_id=="${id}"][0]{
		...,
		seksjoner[]->{
			...,
			delseksjoner[]->{
				...,
				innhold[]->{
					...,
          			tekst[]{
						...,
						markDefs[]{
							...,
							_type=="flettefeltReferanse" => {
								"flettefelt": *[_id==^.referanse._ref][0]
							},
							_type=="tabellReferanse" => {
								"tabell": *[_id==^.referanse._ref][0]
							}
						}
					},
					valg[]->{
						...,
						tekst[]{
							...,
							markDefs[]{
								...,
								_type=="flettefeltReferanse" => {
									"flettefelt": *[_id==^.referanse._ref][0]
								},
								_type=="tabellReferanse" => {
									"tabell": *[_id==^.referanse._ref][0]
								}
							}
						}
					}
				}
			}
		}
	}`
    );

    return axios.get(URL).then((res) => {
        return res.data.result;
    });
};

const genererPDFKontekst = (html: string): string => {
    const head = `<head><meta httpEquiv="content-type" content="text/html; charset=utf-8" /><style type="text/css">${css}</style><title>{tittel}</title></head>`;
    return `<html>${head}<body>${html}</body></html>`;
};

export const genererPDF = async (html: string) => {
    const url = 'http://localhost:8082/api/html-til-pdf';
    const htmlMedKontekst = genererPDFKontekst(html);
    const pdf = await axios
        .post(url, htmlMedKontekst, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/html',
                Accept: 'application/pdf',
            },
        })
        .then(
            (res: AxiosResponse<ArrayBuffer>) => new Blob([res.data], { type: 'application/pdf' })
        );
    const pdfURL = URL.createObjectURL(pdf);
    const vindu = window.open(pdfURL);
    setTimeout(() => {
        if (vindu) {
            vindu.document.title = 'Vedtaksbrev';
        }
    }, 500);
};

export const hentMellomlagretBrev = (brevmalId: string): mellomlagringState | undefined => {
    if(brevmalId == "ea1eed05-915e-4609-b255-b051acf4a753"){
        const string = '{"brevmalId":"ea1eed05-915e-4609-b255-b051acf4a753","inkluderingsbrytere":[true,true,true,true,true],"avsnitt":["<p>Navn: Sigmund Berbom</p><p>Fødselsnummer: 25.11.96</p><p></p><p><strong>Fake ny overksrift</strong></p><p>Ny ubrukelig tekst.</p>","[Tabellnr2]</p><p>No siste </p>","<p>Du får overgangsstønad fra 25.11.23, som er måneden etter at du har vært i Norge i 5 år.</p><p>Stønaden varer til og med 12.12.23. Da har du fått stønad i 3 år i tillegg til 2 måneder i forbindelse med fødsel.</p>","<p><strong>Her er det fet tekst</strong></p><p>Du får [beløp] kroner før <strong>skatt</strong> innen den 20. hver måned fra [måned] til [måned]. Fra og med [måned] endrer beløpet seg til [beløp], på grunn av årlige reguleringer av stønader. Du kan lese mer om utbetaling på nav.no/utbetaling.</p><p>Ut ifra våre opplysninger har du ikke inntekt.</p><p>Hvis du har fått økonomisk sosialhjelp fra oss, kan vi trekke dette beløpet fra etterbetalingen din. Vi betaler derfor ikke ut pengene før vi har fått beskjed fra Oslo. Dette kan ta inntil 4 uker.</p><p></p><p>Du må si ifra til oss hvis månedsinntekten din blir høyere 4 433 enn kroner før skatt. Da må vi beregne stønaden din på nytt, fordi 4433 kroner er den høyeste månedsinntekten du kan ha før vi må redusere stønaden din. Du kan si ifra om endringene i inntekt på Ditt NAV på nav.no.</p>",""],"delseksjoner":[{"innhold":[["Sigmund Berbom","25.11.96"]]},{"innhold":[[]]},{"innhold":[{"flettefelt":["25.11.23"],"valgVerdi":"<p>Du får overgangsstønad fra ,[dato],, som er måneden etter at du har vært i Norge i 5 år.</p>@&#2"},{"flettefelt":["12.12.23"],"valgVerdi":"<p>Stønaden varer til og med ,[dato],. Da har du fått stønad i 3 år i tillegg til 2 måneder i forbindelse med fødsel.</p>@&#1"}]},{"innhold":[{"flettefelt":["","","","","","Oslo"],"valgVerdi":"<p><strong>Her er det fet tekst</strong></p><p>Du får ,[beløp], kroner før <strong>skatt</strong> innen den 20. hver måned fra ,[måned], til ,[måned],. Fra og med ,[måned], endrer beløpet seg til ,[beløp],, på grunn av årlige reguleringer av stønader. Du kan lese mer om utbetaling på nav.no/utbetaling.</p><p>Ut ifra våre opplysninger har du ikke inntekt.</p><p>Hvis du har fått økonomisk sosialhjelp fra oss, kan vi trekke dette beløpet fra etterbetalingen din. Vi betaler derfor ikke ut pengene før vi har fått beskjed fra ,[NAV-kontoret],. Dette kan ta inntil 4 uker.</p><p></p><p>Du må si ifra til oss hvis månedsinntekten din blir høyere 4 433 enn kroner før skatt. Da må vi beregne stønaden din på nytt, fordi 4433 kroner er den høyeste månedsinntekten du kan ha før vi må redusere stønaden din. Du kan si ifra om endringene i inntekt på Ditt NAV på nav.no.</p>@&#1"}]},{"innhold":[{"flettefelt":[]},{"flettefelt":[]},{"flettefelt":[]}]}]}'
        return JSON.parse(string);
    }
    return undefined;
}

export const postMellomlagreBrev = (mellomlagring: mellomlagringState) => {
    console.log(mellomlagring)
}