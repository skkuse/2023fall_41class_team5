import React from 'react';

function CodeInput(){
    return <div className='codeInput' >
      <article>
        <form onSubmit={event=>{
  
        }}> 
          <p>
            <input type='text'></input>
          </p>
  
          <p>
            <input type='submit' value="Submit"></input>
          </p>
        </form>
      </article>
    </div>
  }

export default CodeInput;