"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { addToDo } from "./../../api/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import "./../globals.css";

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [addNewTaskTitle, setAddNewTaskTitle] = useState('');
    const [addNewTaskDesc, setAddNewTaskDesc] = useState('');
    const [addNewTaskDue, setAddNewTaskDue] = useState('');
    const [errors, setErrors] = useState({});

    const handleClose = () => {
        setModalOpen(false);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!addNewTaskTitle) newErrors.title = "Title is required";
        if (!addNewTaskDesc) newErrors.desc = "Description is required";
        if (!addNewTaskDue) newErrors.due = "Due date is required";
        return newErrors;
    };

    const handleAddNewTask = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        await addToDo({
            id: uuidv4(),
            title: addNewTaskTitle,
            desc: addNewTaskDesc,
            due: addNewTaskDue
        });
        setAddNewTaskTitle("");
        setAddNewTaskDesc("");
        setAddNewTaskDue("");
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
                                    value={addNewTaskTitle}
                                    onChange={(e) => setAddNewTaskTitle(e.target.value)}
                                    type="text"
                                    placeholder="Title"
                                    className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                                />
                                {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
                                <input
                                    value={addNewTaskDesc}
                                    onChange={(e) => setAddNewTaskDesc(e.target.value)}
                                    type="text"
                                    placeholder="Description"
                                    className={`input input-bordered w-full ${errors.desc ? 'input-error' : ''}`}
                                />
                                {errors.desc && <span className="text-red-600 text-sm">{errors.desc}</span>}

                                <input
                                    value={addNewTaskDue}
                                    onChange={(e) => setAddNewTaskDue(e.target.value)}
                                    type="date"
                                    placeholder="Select a Due Date"
                                    className={`input input-bordered w-full ${errors.due ? 'input-error' : ''}`}
                                    style={{ color: addNewTaskDue ? 'inherit' : 'rgba(0, 0, 0, 0.5)' }} // Custom placeholder color
                                />
                                {errors.due && <span className="text-red-600 text-sm">{errors.due}</span>}
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
