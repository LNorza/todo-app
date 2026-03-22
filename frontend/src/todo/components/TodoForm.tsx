import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const TodoForm = () => {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={() => {}}
      className=" flex rounded-xl border border-border bg-card p-4 gap-2"
    >
      <Input
        placeholder="Nueva tarea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" className="px-5">
        Agregar
      </Button>
    </form>
  );
};
