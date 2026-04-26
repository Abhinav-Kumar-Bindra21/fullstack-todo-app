import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("failed to fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const createTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:3000/todo/create",
        {
          title: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data.todos);
      setTodos([...todos, response.data.todos]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todos");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);

      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todos status");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`, { withCredentials: true });
      setTodos(todos.filter((t) => t._id != id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      toast.success("User logout successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error in logout");
    }
  };

  const remainingTodo = todos.filter((todo) => !todo.completed).length;
  return (
    <>
      <div className="my-8 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
        <h1 className="text-2xl font-bold text-center">Todo App</h1>
        <div className="flex mb-4 ">
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            className=" grow p-2 border rounded-l-md border-none bg-white focus:outline-none"
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createTodo()}
          />

          <button
            onClick={createTodo}
            className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
          >
            Add
          </button>
        </div>

        {loading ? (
          <div className="text-center justify-around">
            <span className="text-gray-500">Loading....</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li key={todo._id || index} className="flex items-center justify-between p-3  bg-gray-100 rounded-md">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => todoStatus(todo._id)}
                    className="mr-2"
                  />

                  <span
                    className={`${todo.completed ? "line-through text-gray-500 font-semibold" : " text-gray-800 font-semibold"}`}
                  >
                    {todo.title}
                  </span>
                </div>

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 font-semibold hover:text-red-800 duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-center text-sm text-gray-700">{remainingTodo} remaining todos</p>
        <button
          onClick={logout}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Home;
