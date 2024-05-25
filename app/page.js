import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoTable from "./components/TodoTable";

export default async function Home() {
  const tasks = await getAllTodos();
  // console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-4  px-3">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">ToDo List App</h1>
        <AddTask />
      </div>
      <TodoTable tasks={tasks} />
    </main>
  );
}
