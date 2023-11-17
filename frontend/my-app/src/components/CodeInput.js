import React from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { Link } from 'react-router-dom';

const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: inline-block;
  margin-bottom: 5px;
`

const editorOptions = {
  fontSize: 15,
  lineNumbers: false,
  minimap:{enabled: false}
}

function CodeInput(){
    return <div className='codeInput' >
      <article>
        <form onSubmit={event=>{
          //제출 시 이벤트 구현?
        }}> 
          <CodeContainer>
            <p>아래에 JAVA 코드를 입력하세요</p>
            <Editor
              width="85%"
              height="350px"
              defaultLanguage="java"
              // theme="vs-dark"
              options={editorOptions}
            />
          </CodeContainer>
          <p>
            <input type='submit' value="Submit"></input>
          </p>
          <StyledLink to ='/login'>결과를 저장하고 싶으면 <u>로그인</u>하세요.→</StyledLink><br/>
          <StyledLink to='/register'>회원가입 →</StyledLink>
        </form>
      </article>
    </div>
  }

export default CodeInput;