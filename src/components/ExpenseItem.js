import React from 'react';
import {MdEdit,MdDelete} from 'react-icons/md';
const ExpenseItem = ({expense}) => {
   const {id,charge,amount}=expense;
    return ( 
        <li className='item'>
            <div className="info">
              <spna className="expense"> {charge}</spna>
              <spna className="amount"> ${amount}</spna>
            </div>
            <div>
                <button className="edit-btn" aria-label='edit-btn'>
                    <MdEdit />
                </button>
                <button className="clear-btn" aria-label='delete-btn'>
                    <MdDelete />
                </button>
            </div>
        </li>
     );
}
 
export default ExpenseItem;