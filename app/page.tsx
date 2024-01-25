import { createClient } from "@supabase/supabase-js";
import addTodo from '@/actions/addTodo';

export default async function Home() {
  const supabaseUrl = "YOUR_SUP_URL";
  const supabaseKey = process.env.SUPABASE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from("todos").select("todo").range(0, 50);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 my-4">🚀 Server Actions Demo 🚀</h2>
      <ul>
        {data &&
          data.map((todo: any, idx: number) => (
            <li className="w-full grid items-center"
              key={idx}>
              <span className="my-1 w-full text-white bg-blue-500 py-2 px-20 rounded-2xl text-center">{todo.todo}</span>
            </li>
          ))}
      </ul>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form action={addTodo} className="w-full">
          <div className="mb-4">
            <label htmlFor="todo" className="block text-sm font-medium text-gray-700">
              Todo
            </label>
            <div className="mt-1">
              <input
                id="todo"
                name="todo"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="What needs to be done?"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
