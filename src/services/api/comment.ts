import axiosRequest from "./axiosRequest";

const getComments = async (taskId: number) => {
  const { data, isError, error } = await axiosRequest({
    url: `/comment?taskId=${taskId}`,
    method: 'GET',
    isAuth: true,
  });

  return { data, isError, error };
}

export { getComments }
