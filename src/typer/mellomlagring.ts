
export interface mellomlagringState {
    brevmalId: string;
    inkluderingsbrytere: boolean[];
    avsnitt: string[];
    delseksjoner: mellomlagringDelseksjon[]
}

export type mellomlagringDelseksjon = {
    innhold: (string[] | mellomlagringDropdown)[];
    fritekstTabell: string[][];
}

export interface mellomlagringDropdown {
    valgVerdi?: string;
    flettefelt: string[];
}  