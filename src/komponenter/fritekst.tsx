import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../stiler/fritekst.css";

interface fritekstProps {
  defaultTekst: string;
  håndterEndringIFritekstFelt(nyFritekst: string): void;
}

export function Fritekst({
  defaultTekst,
  håndterEndringIFritekstFelt,
}: fritekstProps) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(defaultTekst).contentBlocks
        )
      )
    );
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
        onEditorStateChange={(e) => handterEditorEndring(e)}
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ["inline"],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline"],
          },
        }}
      />
    </>
  );
}
