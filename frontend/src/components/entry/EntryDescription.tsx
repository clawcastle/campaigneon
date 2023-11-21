import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Entry } from "../../__generated__/graphql";
import { Button } from "@mui/material";
import { gql } from "../../__generated__";
import { useMutation } from "@apollo/client";

const UPDATE_ENTRY_MUTATION = gql(`
    mutation UpdateEntry($entryId: UUID!, $title: String!, $entryTextRich: String!, $entryTextRaw: String!, $entryTextSummary: String) {
        updateEntry(
            entryId: $entryId
            title: $title
            entryTextRich: $entryTextRich
            entryTextRaw: $entryTextRaw
            entryTextSummary: $entryTextSummary
        ) {
            id
            title
            entryTextRich
            entryTextRaw
            entryTextSummary
        }
    }
`);

type EntryDescriptionProps = {
  readonly: boolean;
  entry: Omit<Entry, "entryTextRaw">;
};

export const EntryDescription = ({
  readonly,
  entry,
}: EntryDescriptionProps) => {
  const [editorState, setEditorState] = useState(entry.entryTextRich);
  const editorRef = useRef<ReactQuill | null>(null);

  const [updateEntryMutationFn] = useMutation(UPDATE_ENTRY_MUTATION);

  const onSaveClicked = async () => {
    if (!editorRef.current) return;

    const editor = editorRef.current.getEditor();

    const entryTextRaw = editor.getText();

    await updateEntryMutationFn({
      variables: {
        entryId: entry.id,
        title: entry.title,
        entryTextRaw: entryTextRaw,
        entryTextRich: editorState,
        entryTextSummary: null,
      },
    });
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorState}
        onChange={setEditorState}
        style={{ height: 600 }}
        readOnly={readonly}
        ref={editorRef}
      />
      <Button
        sx={{ marginTop: 6, marginLeft: 1, float: "right" }}
        variant="contained"
        color="secondary"
      >
        Undo
      </Button>
      <Button
        sx={{ marginTop: 6, float: "right" }}
        variant="contained"
        color="primary"
        onClick={onSaveClicked}
      >
        Save
      </Button>
    </div>
  );
};
