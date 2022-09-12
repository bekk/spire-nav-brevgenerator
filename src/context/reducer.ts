import {
	avsnittType,
	brevmalTittelType,
	skalAvsnittInkluderesType,
} from '../typer/typer';

export const avsnittStateReducer = (
	avsnittState: avsnittType,
	action: avsnittType
): avsnittType => {
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

export const initialAvsnittState: avsnittType = [];

export const initialSkalAvsnittInkluderesState: skalAvsnittInkluderesType = [];

export const initialBrevmalTittelState: brevmalTittelType = '';
