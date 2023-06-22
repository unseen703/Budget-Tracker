import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// import { getTransaction , deleteTransaction, addTransaction } from "./Actions";
// Initital State
const initialState = {
  transactions: [],
  error: null,
  loading: true,

};
const url = process.env.REACT_APP_URL;
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  const getTransaction = async () => {
    try {
      const {data} = await axios.get(`${url}`);
      console.log(data);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  };
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  };

  const addTransaction = async (transaction) => {
    const config = {
      headers: {
        "Content-Type":"application/json",
      },
    };
    try {
      const res = await axios.post(`${url}`, transaction, config);
      // console.log(res);
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  };
  console.log(state);
  const balance = state.transactions.reduce((acc, cur) =>  cur.type === "Expense" ? acc - cur.amount : acc + cur.amount,   0);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        balance,
        deleteTransaction,
        addTransaction,
        getTransaction,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
