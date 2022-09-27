import {mellomlagringDropdown } from "../typer/mellomlagring";

export const erMellomLagringInnholdDropdown = (innhold: string[] | mellomlagringDropdown): boolean => {
    return (innhold as mellomlagringDropdown).valgVerdi !== undefined;
}