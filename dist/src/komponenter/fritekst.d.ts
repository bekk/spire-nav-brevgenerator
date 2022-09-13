/// <reference types="react" />
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../stiler/fritekst.css";
interface fritekstProps {
    defaultTekst: string;
    håndterEndringIFritekstFelt(nyFritekst: string): void;
}
export declare function Fritekst({ defaultTekst, håndterEndringIFritekstFelt, }: fritekstProps): JSX.Element;
export {};
