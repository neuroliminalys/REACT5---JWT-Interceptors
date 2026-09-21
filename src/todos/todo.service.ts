import httpClient from "../api/http-client";
import type { TodoItem } from "./todo-item";

export async function getTodos(): Promise<TodoItem[]> {
  const response = await httpClient.get<TodoItem[]>("/todos");
  return response.data;
}

export async function createTodo(title: string): Promise<TodoItem> {
  const response = await httpClient.post<TodoItem>("/todos", { title });
  return response.data;
}
