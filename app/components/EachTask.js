"use client";

import { FaEdit } from "react-icons/fa";
import { FcCalendar, IconName } from "react-icons/fc";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "./../../api/api";

const EachTask = ({ task }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEditTitle, setTaskToEditTitle] = useState(task.title);
  const [taskToEditDue, setTaskToEditDue] = useState(task.due);
  const [taskToEditDesc, setTaskToEditDesc] = useState(task.desc);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    await editToDo({
      id: task.id,
      title: taskToEditTitle,
      desc: taskToEditDesc

    });
    setEditModalOpen(false);
    router.refresh();
  };

  const handleDeleteTask = async (id) => {
    await deleteToDo(id);
    setDeleteModalOpen(false);
    router.refresh();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!taskToEditTitle) newErrors.title = "Title Flied can't be empty";
    if (!taskToEditDesc) newErrors.desc = "Description can't be empty";
    if (!taskToEditDue) newErrors.due = "Due date can't be empty";
    return newErrors;
  };


  return (
    <tr key={task.id} className="hover">
      <td className="w-full text-neutral w-3/4 sm:w-2/4">
        <h1 className=" font-bold sm:text-lg text-md">
          {task.title}
        </h1>
        <p className="sm:text-lg text-md">
          {task.desc}
        </p>
        <div className="flex flex-col items-start justify-start sm:hidden text-xs text-gray-500 font-semibold">
          <div className="flex items-center justify-center gap-1 ">
            <FcCalendar size={15} /> Due On:
          </div>
          <div>

            {task.due}
          </div>
        </div>
      </td>
      <td className="w-1/4 hidden sm:table-cell">
        <div className="flex justify-center align-center gap-1">
          <FcCalendar size={20} />{task.due}
        </div>
      </td>
      <td className="w-1/4  ">
        <div className="flex justify-center flex sm:gap-4 gap-0 align-center">
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
                  <div className="flex flex-col w-full gap-2">
                    <input
                      value={taskToEditTitle}
                      onChange={(e) => setTaskToEditTitle(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                    {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
                    <input
                      value={taskToEditDesc}
                      onChange={(e) => setTaskToEditDesc(e.target.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                    />
                    {errors.desc && <span className="text-red-600 text-sm">{errors.desc}</span>}
                    <input
                      value={taskToEditDue}
                      onChange={(e) => setTaskToEditDue(e.target.value)}
                      type="date"
                      placeholder="Select a Due Date"
                      className={`input input-bordered w-full`}
                      style={{ color: setTaskToEditDue ? 'inherit' : 'rgba(0, 0, 0, 0.5)' }} // Custom placeholder color
                    />
                    {errors.due && <span className="text-red-600 text-sm">{errors.due}</span>}
                    <button type="submit" className="btn btn-primary">Done</button>
                  </div>
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
        </div>

      </td>
    </tr>
  );
};

export default EachTask;