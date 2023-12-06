import React from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loadToken } from '../lib/api/auth';
import { useSelector } from 'react-redux';

const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: darkgreen;
  display: inline-block;
  margin-bottom: 5px;
`
const SubmitBtn = styled.input`
  margin-top: 4px;
  display: inline-block;
  margin-left: 15px;
  margin-right: 5px;
  padding: 0.25rem 1rem;
  color: white;
  background-color: seagreen;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

const editorOptions = {
  fontSize: 15,
  lineNumbers: false,
  minimap: { enabled: false }
}

function CodeInput(props) {
  const [javaCode, setJavaCode] = useState("");
  const { user } = useSelector(({ user }) => ({
    user: user.user
  }))

  const handleEditorChange = (value, event) => {
    setJavaCode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = loadToken();

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      // user 정보가 있을 경우에만 토큰 추가
      if (user) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8000/calculate', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ javaCode }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('JAVACODE: ', javaCode);
      console.log('Server Response:', data);
      if (data.executionTime >= 0) {
        props.setData(data)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='codeInput' >
      <article>
        <form onSubmit={handleSubmit}>
          <CodeContainer>
            <p>아래에 JAVA 코드를 입력하세요</p>
            <Editor
              width="85%"
              height="350px"
              defaultLanguage="java"
              options={editorOptions}
              onChange={handleEditorChange}
            />
          </CodeContainer>
          <p>
            <SubmitBtn type='submit' value="Submit"></SubmitBtn>
          </p>
          {!user && (
            <>
              결과를 저장하고 싶으면 <StyledLink to = '/login'><u>로그인</u></StyledLink> 하세요.
            </>
          )}
        </form>
      </article>
    </div>
  )
}

export default CodeInput;
