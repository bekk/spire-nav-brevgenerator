import { StateDelseksjon } from './typer';

export interface mellomlagringState {
    brevmalId: string;
    inkluderingsbrytere: boolean[];
    delseksjoner: StateDelseksjon[];
}
