
export interface mellomlagringState {
    brevmalId: number;
    inkluderingsbrytere: boolean[];
    avsnitt: String[];
    delseksjoner: mellomlagringDelseksjon[]
}

export type mellomlagringDelseksjon = {
    innhold: (string[] | mellomlagringDropdown)[];
}

export interface mellomlagringDropdown {
    valgId: number | null;
    flettefelt: String[];
}  