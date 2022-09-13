export declare const hentData: (URL: string) => Promise<void>;
export declare const hentAvsnitt: (URL: string) => Promise<any>;
export declare const hentBrevmaler: () => Promise<any>;
export declare const hentBrevmal: (id: string) => Promise<any>;
export declare const genererPDF: (html: string) => Promise<void>;
