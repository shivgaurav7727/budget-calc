import React, { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import Expenseform from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuid } from "uuid";
import "./App.css";

// const initialExpense = [
//   { id: uuid(), charge: "rent-1", amount: 1600 },
//   { id: uuid(), charge: "rent-2", amount: 500 },
//   { id: uuid(), charge: "rent-3", amount: 600 },
//   { id: uuid(), charge: "rent-4", amount: 600 },
// ];
const initialExpense = localStorage.getItem('expenses')? 
JSON.parse(localStorage.getItem('expenses')) : []
const App = () => {
  // ******************state values ******************************************
  // ******************all expenses add expenses *****************************
  const [expenses, setExpenses] = useState(initialExpense);
  // single expenses
  const [charge, setCharge] = useState("");
  // single Amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit,setEdit]= useState(false);
  //edit Items
  const [id,setId]= useState(0);
// **********************useEffect *******************************************
useEffect (()=>{
  console.log('we called useeffect');
  localStorage.setItem('expenses',JSON.stringify(expenses))
},[expenses])

// ******************functionality ******************************************

  // handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle Amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  // clear items

  const handleClearList = () => {
    setExpenses([]);
    handleAlert({type:'success',text:'List Cleared sucessfully !!'})    

  };

  // handle delete
  const handleDelete = (id) => {
    console.log("handle delete ", id);
    let tempExpenses = expenses.filter(item=>item.id!==id);
    setExpenses(tempExpenses);
    handleAlert({type:'danger',text:'Item Deleted'})    
  };

  //  handle Edit
  const handleEdit = (id) => {
    let expense = expenses.find(item=>item.id===id);
    let {charge,amount}=expense
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    console.log(expense)
  };

  //  handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if(edit){
        let tempExpenses = expenses.map(item=>{
          return item.id === id ? {...item,charge,amount} :item;
        });
        setExpenses(tempExpenses);
        setEdit(false)
        handleAlert({ type: "success", text: "Item Edited successfully !!" });

      }else{
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item addded successfully !!" });
        setCharge("");
        setAmount("");
      }

    } else {
      // handle alert call
      handleAlert({
        type: "danger",
        text: `charge cant be empty and amount must be greater than zero !!`,
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className="App">
        <Expenseform
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleClearList={handleClearList}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
