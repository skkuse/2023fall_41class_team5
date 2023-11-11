import React from "react";
import './LoginBox.css';

function Loginbox(){
	return (
		<div className="loginbox">
			<p>Login</p>
			<div className="block">
				<div className="idinput">
					<span className="tag">ID </span>
					<input className='inputtag' type="text" placeholder="ID"></input>
				</div>
			</div>
			<div className="block">
				<div className="pwdinput">
					<span className="tag">PWD </span>
					<input className='inputtag' type="password" placeholder="PWD"></input>
				</div>
			</div>
			<button className="loginbtn">Login</button>
			<button>Sign up</button>
		</div>
	)
}

export default Loginbox;