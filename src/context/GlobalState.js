import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// import { getTransaction , deleteTransaction, addTransaction } from "./Actions";
// Initital State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  // { id: 1, text: "Flower", amount: -20 },
  // { id: 2, text: "Salary", amount: +500 },
  // { id: 3, text: "Book", amount: +48 },
  // { id: 4, text: "Cycle", amount: -202 },
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  const getTransaction = async () => {
    try {
      const res = await axios.get("/api/v1/transactions/");
      dispatch({
        type: "GET_TRANSACTIONS",
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
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
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
      const res = await axios.post("/api/v1/transactions", transaction, config);
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
