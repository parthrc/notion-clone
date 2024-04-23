"use client"; // this registers <Editor> as a Client Component
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

type BlockNoteEditorOptions = {
  initialContent?: PartialBlock[];
  domAttributes?: Record<string, string>;
  defaultStyles?: boolean;
};

// Our <Editor> component we can reuse later
export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  //Set options for blocknote editor
  const options: BlockNoteEditorOptions = {
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote(options);

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      editable
      onChange={() => onChange(JSON.stringify(editor.document))}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      formattingToolbar
      linkToolbar
      sideMenu
      slashMenu
      imageToolbar
      tableHandles
    />
  );
}
