import axiosRequest from "./axiosRequest";

const getComments = async (taskId: number) => {
  const { data, isError, error } = await axiosRequest({
    url: `/comment?taskId=${taskId}`,
    method: 'GET',
    isAuth: true,
  });

  return { data, isError, error };
}

const addComment = async (payload: { taskId: number, comment: string }) => {
  const { data, isError, error } = await axiosRequest({
    url: `/comment`,
    method: 'POST',
    isAuth: true,
    data: payload,
  });

  return { data, isError, error };
}

export { getComments, addComment }
