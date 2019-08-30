import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG } from "./types";

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

//adiciona novo log
export const addLog = log => async dispatch => {
  try {
    setLoading();

    const response = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data
    });
  }
};
