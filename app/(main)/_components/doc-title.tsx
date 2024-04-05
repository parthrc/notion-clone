import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ElementRef, useRef, useState } from "react";

interface DocTitleProps {
  document: Doc<"documents">;
}

export const DocTitle = ({ document }: DocTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(document.title || "Untitled");

  const titleInputRef = useRef<HTMLInputElement>(null);

  const update = useMutation(api.documents.updateDocument);

  const enableInput = () => {
    setTitle(document.title);
    setIsEditing(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.setSelectionRange(
        0,
        titleInputRef.current.value.length
      );
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    update({ id: document._id, title: event.target.value || "Untitled" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className=" w-full flex items-center">
      {isEditing ? (
        <Input
          ref={titleInputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
        />
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className=" h-auto p-1"
          onClick={enableInput}
        >
          {document.title}
        </Button>
      )}
    </div>
  );
};
