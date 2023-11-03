import logo from './logo.svg';
import './App.css';


function Header(){
  return <div className="header">
    <Login></Login>
    <div className="siteName">사이트 이름</div>
  </div>
}

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

function Content(){
  return <div className="content">
    <CodeInput></CodeInput>
    
    <div className='result'>
      <HorizontalLayout></HorizontalLayout>
    </div>
  </div>
}


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


function HorizontalLayout(){
  return (
    <div className='horizontalLayout' style={{ display: 'flex'}}>
      <div className='details' style={{ flex: 1 }}>Details abouut your algorithm</div>
      <div className='resultGrid' style={{ flex: 2}}><GridLayout></GridLayout></div>
    </div>
  );
}

function GridLayout(){
  return (
    <div className="grid-container">
      <div className="grid-itemA" style={{gridArea: 'a'}}>1</div>
      <div className="grid-itemA" style={{gridArea: 'b'}}>2</div>
      <div className="grid-itemA" style={{gridArea: 'c'}}>3</div>
      <div className="grid-itemB" style={{gridArea: 'd'}}>4</div>
      <div className="grid-itemB" style={{gridArea: 'e'}}>5</div>
      <div className="grid-itemC" style={{gridArea: 'f'}}>6</div>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      
      <div className='layout'>
        <Header></Header>
        <Content></Content>
      </div>

    </div>
  );
}

export default App;


