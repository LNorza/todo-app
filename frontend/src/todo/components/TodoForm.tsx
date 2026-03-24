import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NotebookPen } from "lucide-react";
import { HintModal } from "@/components/custom/HintModal";

interface Props {
  onAdd: (values: { title: string; description: string }) => Promise<boolean>;
}

export const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async () => {
    const wasCreated = await onAdd({ title, description });
    if (wasCreated) {
      setTitle("");
      setDescription("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="rounded-xl border border-border bg-card p-4"
      >
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Titulo de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="relative">
            <Textarea
              placeholder="Descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              className="resize-none pr-10"
            />

            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="hidden sm:flex absolute top-2 right-2 h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <NotebookPen className="h-4 w-4" />
            </button>
          </div>

          <Button type="submit" className="px-5">
            Agregar
          </Button>
        </div>
      </form>

      {/* Modal Para mostrar un tip rápido */}
      <HintModal
        open={showHint}
        onClose={() => setShowHint(false)}
        icon={<NotebookPen className="h-6 w-6 text-primary" />}
        title="Tip rápido"
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          Puedes presionar{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
            Enter
          </kbd>{" "}
          en el campo de descripción para crear el todo automáticamente, sin
          necesidad de presionar el botón{" "}
          <span className="font-medium text-foreground">Agregar</span>.
        </p>
        <p className="text-xs text-muted-foreground">
          Usa{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono">
            Shift + Enter
          </kbd>{" "}
          si necesitas un salto de línea.
        </p>
      </HintModal>
    </>
  );
};
