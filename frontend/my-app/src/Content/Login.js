import React from 'react';

function Login(){
    return <div className="login" >
      <article>
        <form onSubmit={event=>{
  
        }}>
          <input type="text" placeholder='ID'></input>
          <input type="text" placeholder='PASSWORD'></input>
          <input type="submit" value="LOGIN"></input>
          <input type="submit" value="SING UP" ></input> 
  
        </form>
      </article>
    </div>
  }
  
export default Login;