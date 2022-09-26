export interface SanityDocument {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface SanityBrevmalUtenSeksjoner extends SanityDocument {
    brevmaltittel: string;
    brevmaloverskrift: string;
}

export interface SanityBrevmalMedSeksjoner extends SanityBrevmalUtenSeksjoner {
    seksjoner: SanitySeksjon[];
}

export interface SanitySeksjon extends SanityDocument {
    seksjonstittel: string;
    delseksjoner: SanityDelseksjon[];
}

export interface SanityDelseksjon extends SanityDocument {
    delseksjonstittel: string;
    innhold: (SanityDropdown | SanityTekstObjekt)[];
}

export interface SanityDropdown extends SanityDocument {
    dropdowntittel: string;
    valg: SanityTekstObjekt[];
}

export interface SanityTekstObjekt extends SanityDocument {
    tekst: SanityTekst[];
    tekstTittel: string;
}

export interface SanityTabell extends SanityDocument {
    tabellReferanse: string;
}

export interface SanityTekst {
    children: SanityChildren[];
    markDefs: SanityMarkDefs[];
    style: string;
    _key: string;
    _type: string;
}

export interface SanityChildren {
    //TODO: Finne ut hva denne typen er
    marks: any[];
    text: string;
    _key: string;
    _type: string;
}

export interface SanityMarkDefs {
    tabell: SanityTabell;
    referanse: SanityReferanse[];
    _key: string;
    _type: string;
}

export interface SanityReferanse {
    _ref: string;
    _type: string;
}
