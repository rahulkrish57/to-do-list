import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  Alert,
  Button,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setCurrentPage,
  setTotalPages,
} from "../../slices/listSlice";
import { setLoading, setAlert } from "../../slices/loaderSlice";
import { Task, ListItem, ListData } from "../../services/types";
import { apiService } from "../../services/api";
import Loader from "../loader/Loader";
import "./Home.css";

const TaskComp = lazy(() => import("../task/TaskComp"));
const EmptyComp = lazy(() => import("../empty/EmptyComp"));
const EditTask = lazy(() => import("../task/EditTask"));

const HomeComp: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.list.tasks);
  const currentPage = useSelector((state: RootState) => state.list.currentPage);
  const totalPages = useSelector((state: RootState) => state.list.totalPages);
  const loading = useSelector((state: RootState) => state.loader.loading);
  const alert = useSelector((state: RootState) => state.loader.alert);

  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editId, setEditId] = useState("");
  const alertStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "auto",
    maxWidth: "600px",
    zIndex: 1050,
    margin: "10px",
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [dispatch]);
  const fetchTasks = async (page: number) => {
    dispatch(setLoading(true));
    try {
      const response = await apiService.showAllLists(page);
      const { totalPages, lists }: any = response.data;

      const taskData: Task[] = lists.map((list: ListItem) => ({
        _id: list._id,
        name: list.name,
        status: list.status,
      }));

      dispatch(setTasks(taskData));
      dispatch(setTotalPages(totalPages)); // Update totalPages in Redux state
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const body: Task = {
        _id: String(Date.now()),
        name: newTask,
        status: false,
      };
      try {
        const response = await apiService.addNewList(body);
        const { data } = response;
        if (data) {
          dispatch(addTask(data));
          setNewTask("");
        }
      } catch (error) {
        console.error("Failed to add new task", error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(
        setAlert({
          status: true,
          variant: "danger",
          label: "Task should not be empty",
        })
      );
      setTimeout(() => {
        dispatch(setAlert({ status: false, variant: "", label: "" }));
      }, 3000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiService.deleteList(id);
      const { data } = response;
      if (data) {
        dispatch(deleteTask(id));
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateStatus = async (id: string, task: Task) => {
    const body = { ...task, status: !task.status };
    try {
      const response = await apiService.updateList(id, body);
      const { data } = response;
      if (data) {
        dispatch(updateTask(body));
      }
    } catch (error) {
      console.error("Failed to update task", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditEnabled = (id: string, name: string) => {
    setEditTask(name);
    setEditId(id);
  };

  const handleEditClear = () => {
    setEditTask("");
    setEditId("");
  };

  const handleUpdateTask = async (id: string, task: Task) => {
    if (editTask.trim()) {
      const body = { ...task, name: editTask, status: false };
      try {
        const response = await apiService.updateList(id, body);
        const { data } = response;
        if (data) {
          dispatch(updateTask(body));
          handleEditClear();
        }
      } catch (error) {
        console.error("Failed to update task", error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(
        setAlert({
          status: true,
          variant: "danger",
          label: "Task should not be empty",
        })
      );
      setTimeout(() => {
        dispatch(setAlert({ status: false, variant: "", label: "" }));
      }, 3000);
    }
  };
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    fetchTasks(page);
  };
  return (
    <>
      {alert?.status && (
        <Alert color={alert.variant} style={alertStyle}>
          {alert.label}
        </Alert>
      )}

      <Row className="header">
        <Col xs="auto">
          <img
            src="./apple-touch-icon.png"
            alt="Logo"
            className="logo"
            width={32}
            height={32}
          />
        </Col>
        <Col>
          <h4 className="p-2 mb-2">To Do List App</h4>
        </Col>
      </Row>
      <Row>
        <Form className="mt-4 ">
          <Row>
            <Col md={8} xs={8} className="m-0">
              <FormGroup className="form-class">
                <Input
                  id="newTask"
                  name="name"
                  placeholder="Enter New Task"
                  type="text"
                  maxLength={100}
                  autoComplete="off"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={4} xs={4}>
              <Button
                type="button"
                className="new-task-button"
                color="outline-success"
                onClick={handleAddTask}
              >
                Add Task
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="tasks">
        <Col>
          <Suspense fallback={<Loader />}>
            {loading ? (
              <Loader />
            ) : tasks?.length > 0 ? (
              tasks.map((task) => (
                <React.Fragment key={task._id}>
                  {editId === task._id ? (
                    <EditTask
                      id={task._id}
                      name={editTask}
                      onClear={handleEditClear}
                      onUpdateTask={() => handleUpdateTask(task._id, task)}
                      setEditTask={setEditTask}
                    />
                  ) : (
                    <TaskComp
                      id={task._id}
                      name={task.name}
                      status={task.status}
                      onDelete={() => handleDelete(task._id)}
                      onUpdateStatus={() => handleUpdateStatus(task._id, task)}
                      onEditEnabled={() =>
                        handleEditEnabled(task._id, task.name)
                      }
                    />
                  )}
                </React.Fragment>
              ))
            ) : (
              <EmptyComp />
            )}
          </Suspense>
        </Col>
      </Row>

      <Row className="pagination">
        <Col>
          <Pagination>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                <PaginationLink>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </>
  );
};

export default HomeComp;
