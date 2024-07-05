import axiosRequest from "./axiosRequest";

const login = async (data: { email: string, password: string }) => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `/user/login`,
    method: 'POST',
    data,
  });

  return { data: response, isError, error };
}

const register = async (data: { email: string, password: string, name: string }) => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `/user/register`,
    method: 'POST',
    data,
  });

  return { data: response, isError, error };
}

const authUser = async () => {
  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `/user/auth`,
    method: 'GET',
    isAuth: true,
  });

  return { data: response, isError, error };
}

export { login, authUser, register }