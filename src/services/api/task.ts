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

export { getTasks, addTask }
