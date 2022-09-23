import axios, { AxiosResponse } from 'axios';
import css from './stiler/css';

const genererSanityURL = (sanityBaseURL: string, query: string): string => {
	return sanityBaseURL + query;
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
			(res: AxiosResponse<ArrayBuffer>) =>
				new Blob([res.data], { type: 'application/pdf' })
		);
	const pdfURL = URL.createObjectURL(pdf);
	const vindu = window.open(pdfURL);
	setTimeout(() => {
		if (vindu) {
			vindu.document.title = 'Vedtaksbrev';
		}
	}, 500);
};
