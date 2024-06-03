import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "../App";
import "./MyTask.css";

interface TaskItemProps {
  el: {
    completed: boolean;
    text: string;
    updatedAt: string;
    _id: string;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ el }) => {
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(el.completed);
  const [task, setTask] = useState(el.text);
  const [showTask, setShowTask] = useState(true);
  const taskEditRef = useRef<HTMLInputElement>(null);
  const token = useSelector((state: any) => state.token);

  const updateTaskHandler = (event: React.MouseEvent<HTMLButtonElement>, text: string, completed = false) => {
    fetch(`${backendURL}/task/update-task/${event.currentTarget.id}`, {
      method: "PATCH",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        completed,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const editHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (edit && !done) {
      const text = taskEditRef.current!.value;
  
      if (text.trim().length === 0) {
        return;
      } else {
        setTask(text);
        updateTaskHandler(event as React.MouseEvent<HTMLButtonElement>, text);
      }
      taskEditRef.current!.value = "";
    }
    setEdit(!edit);
  };
  
  const taskDoneHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!done) {
      updateTaskHandler(event, el.text, true);
      setDone(true);
    } else {
      setShowTask(false);
      fetch(`${backendURL}/task/delete/${event.currentTarget.id}`, {
        method: "DELETE",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTask("");
        });
    }
  };

  const closeHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEdit(false);
  };

  return (
    <Fragment>
      {showTask && (
        <div
          className="item"
          // style={{
          //   backgroundColor: `${done ? "grey" : "aqua"}`,
          // }}
        >
          <h3 style={{ textDecoration: `${done ? "line-through" : ""}` }}>
            {task}
          </h3>

          <p>{new Date(el.updatedAt).toLocaleString()}</p>
          {edit && !done && (
            <input
              className="edit"
              type="text"
              required
              ref={taskEditRef}
            />
          )}
          <br />
          <div className="buttonHolder">
            <button
              className="button"
              id={el._id}
              onClick={editHandler}
            >
              {edit && !done ? "Save" : "Edit"}
            </button>
            {edit && !done && (
              <button
                className="button"
                id={el._id}
                onClick={closeHandler}
              >
                Cancel
              </button>
            )}
            <button
              onClick={taskDoneHandler}
              id={el._id}
              className="btnDelete"
            >
              {!done ? "Done" : "Delete"}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TaskItem;
