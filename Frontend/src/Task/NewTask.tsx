import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store"; // Import RootState from the store file
import { backendURL } from "../App";
import "../User/Form.css";

interface Task {
  _id: string;
  completed: boolean;
  text: string;
  updatedAt: string;
}

interface NewTaskProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const NewTask: React.FC<NewTaskProps> = (props) => {
  const taskRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const addTaskHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const text = taskRef.current!.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.token = token;
    }

    fetch(`${backendURL}/task/addtask`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setTasks((tasks: Task[]) => [...tasks, data.task]);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setLoading(false);
        if (taskRef.current) {
          taskRef.current.value = "";
        }
      });
  };

  return (
    <div className="div"> {/* Corrected the className */}
      {loading && <Spinner variant="info" />}
      <form onSubmit={addTaskHandler}>
        <h1>Create New Task</h1>
        <p>Enter Task</p>
        <input type="text" required ref={taskRef} />
        <br />
        <button className="button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default NewTask;
