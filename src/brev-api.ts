import axios, { AxiosResponse } from 'axios';
import css from './stiler/css';
import { CacheObjekt } from './typer/cache';
import { mellomlagringState } from './typer/mellomlagring';
import { SanityBrevmalMedSeksjoner } from './typer/sanity';

const skalCache = true;
const backendURL = 'http://34.88.177.137:8080';

const genererSanityURL = (sanityBaseURL: string, query: string): string => {
    return sanityBaseURL + '?query=' + query;
};

const dateToString = (date: Date): string => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

const erCacheGyldig = (cache: CacheObjekt): boolean => {
    return cache.dato === dateToString(new Date());
};

const hentCache = (key: string): any => {
    if (skalCache) {
        const cacheString = localStorage.getItem(key);
        if (cacheString != null) {
            const cacheObjekt = JSON.parse(cacheString) as CacheObjekt;
            if (erCacheGyldig(cacheObjekt)) {
                return JSON.parse(cacheObjekt.data);
            }
        }
    }
    return null;
};

const lagreCache = (key: string, data: any) => {
    if (skalCache) {
        const cache: CacheObjekt = {
            dato: dateToString(new Date()),
            data: JSON.stringify(data),
        };
        localStorage.setItem(key, JSON.stringify(cache));
    }
};

export const hentBrevmaler = async (sanityBaseURL: string) => {
    const cachedBrevmaler = hentCache('brevmaler');
    if (cachedBrevmaler !== null) {
        return cachedBrevmaler;
    } else {
        const URL = genererSanityURL(sanityBaseURL, '*[_type == "brevmal"]');
        return axios.get(URL).then((res) => {
            lagreCache('brevmaler', res.data.result);
            return res.data.result;
        });
    }
};

export const hentBrevmal = async (sanityBaseURL: string, id: string): Promise<SanityBrevmalMedSeksjoner> => {
    const cachedBrevmal = hentCache('brevmal' + id);
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
            lagreCache('brevmal' + id, res.data.result);
            return res.data.result;
        });
    }
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

export const hentMellomlagretBrev = async (
    brevmalId: string
): Promise<mellomlagringState | undefined> => {
    const brev = {
        soknadId: '1',
        brevmalId: brevmalId,
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
            if (res.data !== null || res.data !== undefined) {
                const brevFraBackend = JSON.parse(res.data.brev);
                return brevFraBackend;
            }
            return undefined
        }).catch((err) => {
            console.log('Kunne ikke hente mellomlagret brev', err);
            return undefined;
        });
};

export const postMellomlagreBrev = (mellomlagring: mellomlagringState) => {
    const brevTilBackend = {
        soknadId: '1',
        brevmalId: mellomlagring.brevmalId,
        brev: JSON.stringify(mellomlagring),
    };
    const token = localStorage.getItem('token');
    axios
        .post(`${backendURL}/mellomlagring/`, JSON.stringify(brevTilBackend), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((err) => {
            console.log("Kunne ikke mellomlagre brev", err);
        });
};

export const signUp = async () => {
    const user = {
        username: 'sigmund',
        email: 'sigmund@mail.no',
        password: 'password',
        roles: ['admin', 'mod', 'user'],
    };
    await axios
        .post(`${backendURL}/auth/signup`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .catch((err) => {
            console.log('Singup error:', err);
        });
};

export const signIn = async () => {
    const user = {
        username: 'sigmund',
        password: 'password',
    };
    await axios
        .post(`${backendURL}/auth/signin`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            localStorage.setItem('token', res.data.accessToken);
        }).catch((err) => {
            console.log("Singin error:", err);
        });
};

export const signUpSignIn = async () => {
    await signIn();
};
