import { Task } from "../../types/Task";
import axiosRequest from "./axiosRequest";

const getTasks = async () => {
  const { data, isError, error } = await axiosRequest({
    url: `/task`,
    method: 'GET',
    isAuth: true,
  });

  return { data, isError, error };
}

const addTask = async (payload: Task) => {
  const { data, isError, error } = await axiosRequest({
    url: `/task`,
    method: 'POST',
    isAuth: true,
    data: payload,
  });

  return { data, isError, error };
}

const getTask = async (id: number) => {
  const { data, isError, error } = await axiosRequest({
    url: `/task/${id}`,
    method: 'GET',
    isAuth: true,
  });

  return { data, isError, error };
}

const updateTask = async (id: number, payload: Task) => {
  const { data, isError, error } = await axiosRequest({
    url: `/task/${id}`,
    method: 'PATCH',
    isAuth: true,
    data: payload,
  });

  return { data, isError, error };
}

const assignTask = async (payload: { email: string, taskId: number }) => {
  const { data, isError, error } = await axiosRequest({
    url: `/task/assign`,
    method: 'PATCH',
    isAuth: true,
    data: payload,
  });

  return { data, isError, error };
}

const deleteTask = async (id: number) => {
  const { data, isError, error } = await axiosRequest({
    url: `/task/${id}`,
    method: 'DELETE',
    isAuth: true,
  });

  return { data, isError, error };
}

export {
  getTasks,
  addTask,
  getTask,
  updateTask,
  assignTask,
  deleteTask
}
