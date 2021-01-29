import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import {motion} from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

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
        <Widget 
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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
              <Input placeholder = 'Digite seu nome '/>
              <Button type="Onsubmit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget 
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>Confira algum dos quizes criados durante a Imersão Alura: </p>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                    as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
         as={motion.footer}
         transition={{ delay: 0.8, duration: 0.5 }}
         variants={{
          show: { opacity: 1, x: '0' },
          hidden: { opacity: 0, x: '100%' },
         }}
         initial="hidden"
         animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Leo0liveira" />
    </QuizBackground>
  );
}