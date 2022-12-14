import axios, { AxiosResponse } from 'axios';
import css from './stiler/css';
import { CacheObjekt } from './typer/cache';
import { mellomlagringState } from './typer/mellomlagring';
import { SanityBrevmalMedSeksjoner } from './typer/sanity';
import hash from 'object-hash';

const skalCache = false;
const backendURL = 'https://spire-nav.kolbjorn.tech';

const genererSanityURL = (sanityBaseURL: string, query: string): string => {
    return sanityBaseURL + '?query=' + query;
};

const finnSanityDatasett = (sanityBaseURL: string): string | undefined => {
    return sanityBaseURL.split('/').pop();
};

const erCacheGyldig = (cache: CacheObjekt, utløpsDato: string): boolean => {
    return new Date(cache.dato) > new Date(utløpsDato);
};

const hentCache = (key: string, utløpsDato: string): any => {
    if (skalCache) {
        const cacheString = localStorage.getItem(key);
        if (cacheString != null) {
            const cacheObjekt = JSON.parse(cacheString) as CacheObjekt;
            if (erCacheGyldig(cacheObjekt, utløpsDato)) {
                return JSON.parse(cacheObjekt.data);
            }
        }
    }
    return null;
};

const lagreCache = (key: string, data: any) => {
    if (skalCache) {
        const cache: CacheObjekt = {
            dato: new Date().toISOString(),
            data: JSON.stringify(data),
        };
        localStorage.setItem(key, JSON.stringify(cache));
    }
};

export const hentBrevmaler = async (sanityBaseURL: string) => {
    const URL = genererSanityURL(sanityBaseURL, '*[_type == "brevmal"]');
    return axios.get(URL).then((res) => {
        return res.data.result;
    });
};

export const hentBrevmal = async (
    sanityBaseURL: string,
    id: string,
    cacheUtløpsDato: string
): Promise<SanityBrevmalMedSeksjoner> => {
    const cachedBrevmal = hentCache(
        finnSanityDatasett(sanityBaseURL) + '/brevmal/' + id,
        cacheUtløpsDato
    );
    if (cachedBrevmal !== null) {
        return cachedBrevmal;
    } else {
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
            lagreCache(finnSanityDatasett(sanityBaseURL) + '/brevmal/' + id, res.data.result);
            return res.data.result;
        });
    }
};

const genererPDFKontekst = (html: string): string => {
    const head = `<head><meta httpEquiv="content-type" content="text/html; charset=utf-8" /><style type="text/css">${css}</style><title>{tittel}</title></head>`;
    return `<html>${head}<body>${html}</body></html>`;
};

export const genererPDF = async (html: string) => {
    const url = backendURL + '/pdf/';
    const htmlMedKontekst = genererPDFKontekst(html);
    const token = localStorage.getItem('token');
    const pdf = await axios
        .post(url, htmlMedKontekst, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/html',
                Accept: 'application/pdf',
                Authorization: `Bearer ${token}`,
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

export const hentMellomlagretBrev = async (
    brevmalId: string,
    brevmalToken: string
): Promise<mellomlagringState | undefined | null> => {
    const brev = {
        soknadId: '1',
        brevmalId: brevmalId,
        brevmalToken: brevmalToken,
    };
    const token = localStorage.getItem('token');
    return axios
        .post(`${backendURL}/mellomlagring/hentEttBrev`, JSON.stringify(brev), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data !== undefined) {
                return JSON.parse(res.data.brev);
            }
            return undefined;
        })
        .catch((err) => {
            if (err.response.status === 418) {
                console.log(
                    'The server refuses to brew coffee because it is, permanently, a teapot.'
                );
                return null;
            }
            return undefined;
        });
};

export const postMellomlagreBrev = async (
    mellomlagring: mellomlagringState,
    brevmal: SanityBrevmalMedSeksjoner
): Promise<boolean> => {
    const brevTilBackend = {
        soknadId: '1',
        brevmalId: mellomlagring.brevmalId,
        brev: JSON.stringify(mellomlagring),
        brevmalToken: hash(brevmal),
    };

    const token = localStorage.getItem('token');
    return await axios
        .post(`${backendURL}/mellomlagring/`, JSON.stringify(brevTilBackend), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log('Kunne ikke mellomlagre brev:', err);
            return false;
        });
};
