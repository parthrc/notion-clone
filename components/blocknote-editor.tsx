"use client"; // this registers <Editor> as a Client Component
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  preview?: boolean;
}

type BlockNoteEditorOptions = {
  initialContent?: PartialBlock[];
  domAttributes?: Record<string, string>;
  defaultStyles?: boolean;
  uploadFile: (file: File) => Promise<string>;
};

// Our <Editor> component we can reuse later
export default function Editor({
  initialContent,
  editable,
  preview,
}: EditorProps) {
  // to upload image files in the document
  const { edgestore } = useEdgeStore();

  const handleImageUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });

    return res.url;
  };
  const { resolvedTheme } = useTheme();
  //Set options for blocknote editor
  const options: BlockNoteEditorOptions = {
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleImageUpload,
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote(options);

  if (preview) {
    return (
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    );
  }

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
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
