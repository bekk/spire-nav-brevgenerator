import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../stiler/fritekst.css';
import { dobbelTabellTilStreng } from '../utils/fritekstUtils';

interface fritekstProps {
    defaultTekst: string[][];
    oppdaterFritekst: boolean;
    håndterEndringIFritekstFelt(nyFritekst: string): void;
    settOppdaterFritekst: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Fritekst({
    defaultTekst,
    håndterEndringIFritekstFelt,
    oppdaterFritekst,
    settOppdaterFritekst,
}: fritekstProps) {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    useEffect(() => {
        if (oppdaterFritekst) {
            setEditorState(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        htmlToDraft(dobbelTabellTilStreng(defaultTekst)).contentBlocks
                    )
                )
            );
            settOppdaterFritekst(false);
        }
    }, [defaultTekst]);

    const handterEditorEndring = (e: EditorState) => {
        setEditorState(e);

        håndterEndringIFritekstFelt(
            draftToHtml(convertToRaw(e.getCurrentContent())).slice(0, -1) //Fjerne bakerste \n som legges til av parser
        );
    };

    return (
        <>
            <Editor
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                editorState={editorState}
                stripPastedStyles={true}
                onEditorStateChange={(e) => handterEditorEndring(e)}
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline'],
                    inline: {
                        inDropdown: false,
                        options: ['bold', 'italic', 'underline'],
                    },
                }}
            />
        </>
    );
}
