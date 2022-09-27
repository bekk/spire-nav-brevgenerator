
export interface mellomlagringState {
    brevmalId: number;
    inkluderingsbrytere: boolean[];
    avsnitt: String[];
    delseksjoner: mellomlagringDelseksjon[]
}

export type mellomlagringDelseksjon = {
    flettefelt: String[];
    dropdowns: mellomlagringDropdowns[]
}

export interface mellomlagringDropdowns {
    valgId: number | null;
    flettefelt: String[];
}  