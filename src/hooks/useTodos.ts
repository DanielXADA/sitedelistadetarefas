import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Todo = Tables<"todos">;

export function useTodos(userId: string | undefined) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });
    setTodos(data ?? []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string) => {
    if (!userId) return;
    const { error } = await supabase
      .from("todos")
      .insert({ title, user_id: userId });
    if (!error) fetchTodos();
    return { error };
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id);
    if (!error) fetchTodos();
  };

  const updateTodo = async (id: string, title: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ title })
      .eq("id", id);
    if (!error) fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);
    if (!error) fetchTodos();
  };

  return { todos, loading, addTodo, toggleTodo, updateTodo, deleteTodo };
}
