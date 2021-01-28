import React from 'react';
import db from '../db.json';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';
import LoadingWidget from '../src/components/LoadingScreen';
// import LoadingResult from '../src/components/LoadingResult';

  function ResultWidget({ result }) {
    const router = useRouter();
    const {name} = router.query;return (

      <Widget>
        <Widget.Header>
            {name}, você acertou
            {' '}
            {result.reduce((somatoriaAtual, resultAtual) =>{
              const isAcerto = resultAtual === true;
              if (isAcerto) {
                  return somatoriaAtual + 1;
              }
              return somatoriaAtual;
            },0)}
            
            {' '}
            perguntas!
        </Widget.Header>
            
        <Widget.Content>
          <p>
            Continue Praticando logo estará apto a executar um gambito da rainha!
          </p>
          <ul>
            {result.map((results, index) => (
              <li key={`result_${results}`}>
                {index + 1}
                º Questão: {' '}
                {results === true ? 'Acertou': 'Errou'}
              </li>
            ))}
          </ul>
        </Widget.Content>
      </Widget>
    );
  }

function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
    addResult,
  }) {
    const [alternativaSelecionada, setAlternativaSelecionada] = React.useState(undefined);
    const questionId = `question__${questionIndex}`;
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const isCorrect = alternativaSelecionada === question.answer;
    const hasAlternativeSelected = alternativaSelecionada !== undefined;
    return (
      <Widget>
        <Widget.Header>
          {/* <BackLinkArrow href="/" /> */}
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>
  
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>
  
          <AlternativesForm
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(false);
                setAlternativaSelecionada(undefined);
              },1* 1000);
            }}
          >
             {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = alternativaSelecionada === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setAlternativaSelecionada(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
              );
            })}
  
            {/* <pre>
              {JSON.stringify(question, null, 4)}
            </pre> */}
            <Button type="submit" disabled ={!hasAlternativeSelected}>
              Confirmar
            </Button>
            {/* <p>selectedAlternative: {`$selectedAlternative`}</p> */}
            {isQuestionSubmited && isCorrect}
            {isQuestionSubmited && !isCorrect}
          </AlternativesForm>
        </Widget.Content>
      </Widget>
    );
  }
  
  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    // LOADINGFINAL: 'LOADINGFINAL',
    RESULT: 'RESULT',
  };

  export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [result, setResult] = React.useState([]);
    const totalQuestions = db.questions.length;
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];
    
    function addResult(){
      setResult([
        ...result,
        result,
      ]);
    }
    
    React.useEffect(() => {
      // fetch() ...
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 2.01 * 1000);

    // nasce === didMount
    }, []);
  
    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  
    return (
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo src ={db.logo}/>
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions} 
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )}
  
          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.RESULT && <ResultWidget result={result}/>}
          {/* {screenState === screenStates.LOADINGFINAL && <LoadingResult />} */}
        </QuizContainer>
      </QuizBackground>
    );
  }