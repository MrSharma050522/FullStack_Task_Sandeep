import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import { RootState } from "../Store/store"; // Import RootState from the store file
import "./MyTask.css";
import NewTask from "./NewTask";
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  completed: boolean;
  text: string;
  updatedAt: string;
}

export default function MyTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  const token = useSelector((state: RootState) => state.auth.token); // Access token from the auth slice

  const getAllTask = () => {
    if (!token) {
      navigate("/login");
      return; // Prevent further execution if no token
    }
    fetch(`${backendURL}/task/mytask`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  };

  useEffect(() => {
    getAllTask();
  }, [token]); // Re-fetch tasks when the token changes

  return (
    <Fragment>
      <NewTask setTasks={setTasks} />
      <div className="div"> {/* Corrected the className */}
        {tasks.map((el) => (
          <TaskItem key={el._id} el={el} />
        ))}
      </div>
    </Fragment>
  );
}
