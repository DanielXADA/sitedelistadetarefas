import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Tables } from "@/integrations/supabase/types";

type Todo = Tables<"todos">;

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim());
      setEditing(false);
    }
  };

  return (
    <div className="group flex items-center gap-3 rounded-xl bg-card px-4 py-3 todo-shadow transition-all hover:todo-shadow-hover">
      <button
        onClick={() => onToggle(todo.id, todo.completed)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          todo.completed
            ? "border-accent bg-accent"
            : "border-border hover:border-primary"
        }`}
      >
        {todo.completed && <Check className="h-3 w-3 text-accent-foreground" />}
      </button>

      {editing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="h-8 flex-1"
            autoFocus
          />
          <button onClick={handleSave} className="text-accent hover:text-accent/80">
            <Check className="h-4 w-4" />
          </button>
          <button onClick={() => setEditing(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-sm transition-colors ${
              todo.completed
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {todo.title}
          </span>
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => {
                setEditTitle(todo.title);
                setEditing(true);
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
