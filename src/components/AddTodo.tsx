import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddTodoProps {
  onAdd: (title: string) => Promise<{ error: unknown } | undefined>;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    await onAdd(title.trim());
    setTitle("");
    setAdding(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="O que precisa ser feito?"
        className="h-11 flex-1"
        disabled={adding}
      />
      <Button type="submit" disabled={adding || !title.trim()} className="h-11 px-4">
        <Plus className="h-4 w-4 mr-1" />
        Adicionar
      </Button>
    </form>
  );
};

export default AddTodo;
