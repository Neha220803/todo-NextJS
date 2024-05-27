const baseUrl = 'https://todo-server-pydy.onrender.com/api';

export const getAllTodos = async () => {
    try {
        const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const todos = await res.json();
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const addToDo = async (todo) => {
    try {
        const res = await fetch(`${baseUrl}/tasks`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        const newTodo = await res.json();
        return newTodo;
    } catch (error) {
        console.error('Error adding todo:', error);
    }
};

export const editToDo = async (todo) => {
    try {
        const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        const updatedTodo = await res.json();
        return updatedTodo;
    } catch (error) {
        console.error('Error editing todo:', error);
    }
};

export const deleteToDo = async (id) => {
    try {
        await fetch(`${baseUrl}/tasks/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};
