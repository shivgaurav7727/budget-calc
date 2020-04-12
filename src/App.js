import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import Expenseform from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";
import './App.css'

const initialExpense = [
    {id:1,charge:'rent-1',amount:1600},
    {id:2,charge:'rent-2',amount:500},
    {id:4,charge:'rent-3',amount:600},
    {id:5,charge:'rent-4',amount:600}
]
const App = () => {
    const [expenses,setExpenses] = useState(initialExpense);
  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
      <Expenseform />
      <ExpenseList  expenses={expenses}/>          
      </main>
        <h1>
            total spending : <span className="total">
                $ {expenses.reduce((acc,curr)=>{
                    return (acc+=curr.amount);
                },0)}
            </span>
        </h1>
    </>
  );
};

export default App;
