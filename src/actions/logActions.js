import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT
} from "./types";

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
      payload: error.response.statusText
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
      payload: error.response.statusText
    });
  }
};

//Busca logs no DB
export const searchLogs = text => async dispatch => {
  try {
    setLoading();

    const response = await fetch(`/logs?q=${text}`);
    const data = await response.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//log ativo para edição
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

//limpa log ativo
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

//atualizar log no DB
export const updateLog = log => async dispatch => {
  try {
    setLoading();

    const response = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//remove log do DB
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};
