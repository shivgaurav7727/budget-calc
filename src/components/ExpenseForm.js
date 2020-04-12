import React from 'react';
import {MdSend} from 'react-icons/md';
const Expenseform = () => {
    return ( 
        <form>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge" className="expense">charge</label>
                    <input type="charge" className="form-control" 
                    id='charge'
                    placeholder='e.g. rent'/>    
                </div>
                <div className="form-group">
                    <label htmlFor="amount" className="expense">amount</label>
                    <input type="charge" className="form-control" 
                    id='amount'
                    placeholder='e.g. 100'/>    
                </div>
            </div>   
            <button className="btn" type='submit'>
                submit 
                <MdSend className='btn-icon'/>
                </button>     
        </form>
     );
}
 
export default Expenseform;