import React from "react";
import "./Task.css";
import { MdDelete, MdEdit } from "react-icons/md";

interface TaskProps {
  id: string;
  name: string;
  status: boolean;
  onDelete: () => void;
  onUpdateStatus: () => void;
  onEditEnabled: () => void;
}

const TaskComp: React.FC<TaskProps> = ({
  name,
  status,
  onDelete,
  onUpdateStatus,
  onEditEnabled,
}) => {
  return (
    <div className={`task-card ${status && "completed"}`}>
      <span
        className={`task-title ${status && "strikethrough"}`}
        onClick={onUpdateStatus}
      >
        {name}
      </span>
      <div>
        <MdEdit className="button-class edit-button" onClick={onEditEnabled} />
        <MdDelete className="button-class delete-button" onClick={onDelete} />
      </div>
    </div>
  );
};

export default TaskComp;
