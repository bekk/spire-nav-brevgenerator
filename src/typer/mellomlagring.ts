
export interface mellomlagringState {
    brevmalId: string;
    inkluderingsbrytere: boolean[];
    avsnitt: string[];
    delseksjoner: mellomlagringDelseksjon[]
}

export type mellomlagringDelseksjon = {
    innhold: (string[] | mellomlagringDropdown)[];
}

export interface mellomlagringDropdown {
    valgVerdi?: string;
    flettefelt: string[];
}  