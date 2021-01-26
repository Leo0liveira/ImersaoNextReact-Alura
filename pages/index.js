import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Head from 'next/head';
import {Router, useRouter} from 'next/router';
import { useState } from 'react';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;
export const BotaoJogar = styled.button`
    font-size: 1.2rem;
    font-weight: 700;
    color: #fbf5de;
    padding: .4rem;
    width: 100%;
    background: #30271e;
    border: none;
    border-radius: .2rem;
    transition: all .2s;
    cursor: pointer;
    &:hover {
      background: #706677;

    }
`;

export const Input1 = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid rgba(255,255,255, .1);
    border-radius: .2rem;
    margin-bottom: 1rem;
    background: white;
    font-size: 16px;
   
`;

export default function Home() {
    const router = useRouter();
      const [name, setName] = React.useState('');
  
    return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Chess Quiz - Alura</title>
      </Head>
      <QuizContainer>
        <QuizLogo src={db.logo}/>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onChange= {function(event) {
              setName(event.target.value);
            }}  
              onSubmit = {function (event){
              event.preventDefault();
              router.push(`/quiz?name=${name}`)
            }}>
              <Input1 placeholder = 'Digite seu nome '/>
              <BotaoJogar type="Onsubmit" disabled={name.length === 0}>
                Jogar
              </BotaoJogar>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Leo0liveira" />
    </QuizBackground>
  );
}