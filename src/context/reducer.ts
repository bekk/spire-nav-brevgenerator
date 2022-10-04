import { brevmalTittelType, delseksjonType, skalAvsnittInkluderesType } from '../typer/typer';

export const delseksjonerStateReducer = (
    delseksjonerState: delseksjonType[],
    action: delseksjonType[]
): delseksjonType[] => {
    return action;
};

export const skalAvsnittInkluderesStateReducer = (
    skalAvsnittInkluderesState: skalAvsnittInkluderesType,
    action: skalAvsnittInkluderesType
): skalAvsnittInkluderesType => {
    return action;
};

export const brevmalTittelStateReducer = (
    brevmalTittelState: brevmalTittelType,
    action: brevmalTittelType
): brevmalTittelType => {
    return action;
};

export const initialSkalAvsnittInkluderesState: skalAvsnittInkluderesType = [];

export const initialBrevmalTittelState: brevmalTittelType = '';

export const initialDelseksjonerState: delseksjonType[] = [];
