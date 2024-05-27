"use client";

import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "./../../api/api";

const EachTask = ({ task }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.text);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    await editToDo({
      id: task.id,
      text: taskToEdit
    });
    setEditModalOpen(false);
    router.refresh();
  };

  const handleDeleteTask = async (id) => {
    await deleteToDo(id);
    setDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className="hover">
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FaEdit
          size={20}
          className="text-neutral btn btn-sm btn-square btn-ghost p-1"
          cursor="pointer"
          onClick={() => setEditModalOpen(true)}
        />
        <div className={`modal ${editModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <form method="dialog">
              <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form onSubmit={handleEditTask}>
              <h3 className="font-bold text-lg">Edit Task</h3>
              <div className="modal-action">
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">Done</button>
              </div>
            </form>
          </div>
        </div>
        <FiTrash2
          className="text-red-600 btn btn-sm btn-square btn-ghost p-1"
          size={23}
          cursor="pointer"
          onClick={() => setDeleteModalOpen(true)}
        />
        <div className={`modal ${deleteModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <form method="dialog">
              <button onClick={handleDeleteClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div>
              <h3 className="font-bold text-lg">Delete Task</h3>
              <p className="text-lg pt-5">Are you sure you want to delete this task?</p>
              <div className="modal-action">
                <button type="button" className="btn btn-outline btn-primary px-5" onClick={handleDeleteClose}>No</button>
                <button type="button" className="btn btn-primary px-5" onClick={() => handleDeleteTask(task.id)}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default EachTask;