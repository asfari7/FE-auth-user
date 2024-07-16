import axios from "axios";

const baseURL: string = "https://backend-auth-omega.vercel.app";

export const usePost = async (path: string, data: any) => {
  try {
    const response = await axios.post(baseURL + path, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const useGet = async (path: string) => {
  try {
    const response = await axios.get(baseURL + path, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const useDelete = async (path: string) => {
  try {
    const response = await axios.delete(baseURL + path, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const usePut = async (path: string, data: any) => {
  try {
    const response = await axios.put(baseURL + path, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
