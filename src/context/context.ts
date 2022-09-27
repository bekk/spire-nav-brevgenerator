import React from 'react';
import { SkjemaContextType, MellomlagringContextType } from '../typer/typer';

export const SkjemaContext = React.createContext<SkjemaContextType>(
	{} as SkjemaContextType
);

export const MellomlagringContext = React.createContext<MellomlagringContextType>(
	{} as MellomlagringContextType
);
