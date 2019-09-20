import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from "./types";

//set loading = true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

//recupera techs do db
export const getTechs = () => async dispatch => {
  try {
    setLoading();

    const response = await fetch("/techs");
    const data = await response.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

//adiciona um técnico no servidor
export const addTech = tech => async dispatch => {
  try {
    setLoading();

    const response = await fetch("/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    dispatch({
      type: ADD_TECH,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

//remove técnico do DB
export const deleteTech = id => async dispatch => {
  try {
    setLoading();

    await fetch(`/techs/${id}`, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};
