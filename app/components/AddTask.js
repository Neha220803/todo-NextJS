"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { addToDo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [addNewTask, setAddNewTask] = useState('');

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleAddNewTask = async (e) => {
        e.preventDefault();
        await addToDo({
            id: uuidv4(),
            text: addNewTask
        });
        setAddNewTask("");
        setModalOpen(false);
        router.refresh();
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                ADD NEW TASK <FaPlus />
            </button>
            <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleAddNewTask}>
                        <h3 className="font-bold text-lg">Add New Task</h3>
                        <div className="modal-action">
                            <input
                                value={addNewTask}
                                onChange={(e) => setAddNewTask(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;