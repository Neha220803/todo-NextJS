"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { addToDo } from "./../../api/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [addNewTaskTile, setAddNewTaskTile] = useState('');
    const [addNewTaskDesc, setAddNewTaskDesc] = useState('');
    const [addNewTaskDeu, setAddNewTaskDeu] = useState('');

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleAddNewTask = async (e) => {
        e.preventDefault();
        await addToDo({
            id: uuidv4(),
            title: addNewTaskTile,
            desc: addNewTaskDesc,
            due: addNewTaskDeu
        });
        setAddNewTaskTile("");
        setAddNewTaskDesc("");
        setAddNewTaskDeu("");
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
                            <div className="flex flex-col gap-2 w-full">
                                <input
                                    value={addNewTaskTile}
                                    onChange={(e) => setAddNewTaskTile(e.target.value)}
                                    type="text"
                                    placeholder="Title"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    value={addNewTaskDesc}
                                    onChange={(e) => setAddNewTaskDesc(e.target.value)}
                                    type="text"
                                    placeholder="Description"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    value={addNewTaskDeu}
                                    onChange={(e) => setAddNewTaskDeu(e.target.value)}
                                    type="date"
                                    placeholder="Select a Dew Date"
                                    className="input input-bordered w-full"
                                />
                                <button type="submit" className="btn btn-secondary w-full">Submit</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;