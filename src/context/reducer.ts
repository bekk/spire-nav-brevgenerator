import { StateBrevmalTittel, StateDelseksjon, StateSkalAvsnittInkluderes } from '../typer/typer';

export const delseksjonerStateReducer = (
    delseksjonerState: StateDelseksjon[],
    action: StateDelseksjon[]
): StateDelseksjon[] => {
    return action;
};

export const skalAvsnittInkluderesStateReducer = (
    skalAvsnittInkluderesState: StateSkalAvsnittInkluderes,
    action: StateSkalAvsnittInkluderes
): StateSkalAvsnittInkluderes => {
    return action;
};

export const brevmalTittelStateReducer = (
    brevmalTittelState: StateBrevmalTittel,
    action: StateBrevmalTittel
): StateBrevmalTittel => {
    return action;
};

export const initialSkalAvsnittInkluderesState: StateSkalAvsnittInkluderes = [];

export const initialBrevmalTittelState: StateBrevmalTittel = '';

export const initialDelseksjonerState: StateDelseksjon[] = [];
