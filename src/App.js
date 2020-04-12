import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import Expenseform from "./components/ExpenseForm";
import Alert from "./components/Alert";
import {v4 as uuid} from "uuid";
import "./App.css";

const initialExpense = [
  { id: uuid(), charge: "rent-1", amount: 1600 },
  { id: uuid(), charge: "rent-2", amount: 500 },
  { id: uuid(), charge: "rent-3", amount: 600 },
  { id: uuid(), charge: "rent-4", amount: 600 },
];
const App = () => {
  // ******************state values ******************************************
  // ******************all expenses add expenses *****************************
  const [expenses, setExpenses] = useState(initialExpense);
  // single expenses
  const [charge, setCharge] = useState("");
  // single Amount
  const [amount, setAmount] = useState("");
  // alert 

  const [alert,setAlert]= useState({show:false})
  // ******************functionality ******************************************
  
  // handle charge 
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //  handle Amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  //  handle alert
  const handleAlert = ({type,text})=>{
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false})
    },4000);
  };
  //  handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge!=='' && amount>0){
      const singleExpense = {id:uuid(),charge,amount};
      setExpenses([...expenses,singleExpense]);
      handleAlert({type:'success',text:'Item addded successfully !!'})
      setCharge('');
      setAmount('');
    }else{
      // handle alert call
      handleAlert({type:'danger',text:`charge cant be empty and amount must be greater than zero !!`})

    }
  };

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text} /> } 

      <h1>budget calculator</h1>
      <main className="App">
        <Expenseform
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
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
