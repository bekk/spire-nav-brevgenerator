var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import css from './stiler/css';
const genererSanityURL = (query) => {
    const datasett = "production";
    const prosjektid = 'nrbknng4';
    const QUERY = encodeURIComponent(query);
    return `https://${prosjektid}.api.sanity.io/v2021-10-21/data/query/${datasett}?query=${QUERY}`;
};
export const hentData = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    return axios.get(URL).then((res) => {
        console.log('BREV API', res.data.result);
    });
});
export const hentAvsnitt = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    return axios.get(URL).then((res) => {
        return res.data.result;
    });
});
export const hentBrevmaler = () => __awaiter(void 0, void 0, void 0, function* () {
    const URL = genererSanityURL('*[_type == "brevmal"]');
    return axios.get(URL).then((res) => {
        return res.data.result;
    });
});
export const hentBrevmal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = genererSanityURL(`*[_id=="${id}"][0]{
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
	}`);
    return axios.get(URL).then((res) => {
        return res.data.result;
    });
});
const genererPDFKontekst = (html) => {
    const head = `<head><meta httpEquiv="content-type" content="text/html; charset=utf-8" /><style type="text/css">${css}</style><title>{tittel}</title></head>`;
    return `<html>${head}<body>${html}</body></html>`;
};
export const genererPDF = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://localhost:8082/api/html-til-pdf';
    const htmlMedKontekst = genererPDFKontekst(html);
    const pdf = yield axios
        .post(url, htmlMedKontekst, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/html',
            Accept: 'application/pdf',
        },
    })
        .then((res) => new Blob([res.data], { type: 'application/pdf' }));
    const pdfURL = URL.createObjectURL(pdf);
    const vindu = window.open(pdfURL);
    setTimeout(() => {
        if (vindu) {
            vindu.document.title = 'Vedtaksbrev';
        }
    }, 500);
});
