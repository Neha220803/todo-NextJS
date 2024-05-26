const baseUrl = 'https://todo-next-js-rose.vercel.app/api';

export const getAllTodos = async () => {
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
    const todos = await res.json();
    return todos;
};

export const addToDo = async (todo) => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    const newTodo = await res.json();
    return newTodo;
};

export const editToDo = async (todo) => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    const updatedTodo = await res.json();
    return updatedTodo;
};

export const deleteToDo = async (id) => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: "DELETE",
    });
};