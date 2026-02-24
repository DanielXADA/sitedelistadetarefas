import { useAuth } from "@/hooks/useAuth";
import { useTodos } from "@/hooks/useTodos";
import { Navigate } from "react-router-dom";
import TodoItem from "@/components/TodoItem";
import AddTodo from "@/components/AddTodo";
import { CheckSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { todos, loading: todosLoading, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos(user?.id);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <CheckSquare className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">Minhas Tarefas</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        <AddTodo onAdd={addTodo} />

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 mb-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{todos.length} tarefa{todos.length !== 1 && "s"}</span>
            <span>{completedCount} concluída{completedCount !== 1 && "s"}</span>
          </div>
        )}

        {todosLoading ? (
          <div className="mt-12 text-center text-muted-foreground animate-pulse">
            Carregando tarefas...
          </div>
        ) : todos.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
              <CheckSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma tarefa ainda. Adicione uma acima!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
            {completedTodos.length > 0 && pendingTodos.length > 0 && (
              <div className="pt-2 pb-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Concluídas
                </span>
              </div>
            )}
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
