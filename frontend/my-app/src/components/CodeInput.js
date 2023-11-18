import React from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  const [javaCode, setJavaCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3306/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ javaCode }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Server Response:', data);

      // 서버 응답에 대한 추가 로직을 여기에 추가할 수 있습니다.
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return <div className='codeInput' >
      <article>
        <form onSubmit={handleSubmit}>
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