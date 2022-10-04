export interface mellomlagringState {
    brevmalId: string;
    inkluderingsbrytere: boolean[];
    avsnitt: string[];
    delseksjoner: mellomlagringDelseksjon[];
}

export type mellomlagringDelseksjon = {
    innhold: (mellomlagringFlettefelt[] | mellomlagringDropdown)[];
    fritekstTabell: string[][];
};

export type mellomlagringDropdown = {
    valgVerdi?: string;
    flettefelt: mellomlagringFlettefelt[];
};

export type mellomlagringFlettefelt = {
    verdi: string;
    harBlittEndret: boolean;
};

export const tomtMellomlagringFlettefelt: mellomlagringFlettefelt = {
    verdi: '',
    harBlittEndret: false,
};
