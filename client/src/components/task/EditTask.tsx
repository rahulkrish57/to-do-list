import React from "react";
import "./Task.css";
import { Form, FormGroup, Input } from "reactstrap";
import { MdSave, MdCancel } from "react-icons/md";
interface TaskProps {
  id: string;
  name: string;
  onClear: () => void;
  onUpdateTask: () => void;
  setEditTask: (name: string) => void;
}

const EditTask: React.FC<TaskProps> = ({
  name,
  onClear,
  onUpdateTask,
  setEditTask,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask(e.target.value);
  };
  return (
    <div className={`task-card`}>
      <FormGroup className="form-class">
        <Input
          id="editTask"
          name="editTask"
          placeholder="Update Task"
          type="text"
          maxLength={100}
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
          required={true}
        />
      </FormGroup>
      <div>
        <MdSave className="button-class edit-button" onClick={onUpdateTask} />
        <MdCancel className="button-class delete-button" onClick={onClear} />
      </div>
    </div>
  );
};

export default EditTask;
