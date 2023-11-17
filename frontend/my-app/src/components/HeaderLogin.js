import React from 'react';
import { Link } from 'react-router-dom';

function Login(){
    return <div className="login" >
      <article>
        <form onSubmit={event=>{
  
        }}>
          <Link to='/login'>Log In →</Link>
          <Link to='/register'>Register →</Link>
  
        </form>
      </article>
    </div>
  }
  
export default Login;