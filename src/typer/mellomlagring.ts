import { delseksjonType } from './typer';

export interface mellomlagringState {
    brevmalId: string;
    inkluderingsbrytere: boolean[];
    avsnitt: string[];
    delseksjoner: delseksjonType[];
}
