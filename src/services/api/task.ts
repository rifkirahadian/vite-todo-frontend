import axiosRequest from "./axiosRequest";

const getTasks = async () => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `/task`,
    method: 'GET',
    isAuth: true,
  });

  return { data: response, isError, error };
}

export { getTasks }
