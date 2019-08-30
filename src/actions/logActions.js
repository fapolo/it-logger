import { GET_LOGS, SET_LOADING, LOGS_ERROR } from "./types";

//set loading = true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

//recupera logs do db
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const response = await fetch("/logs");
    const data = await response.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};
