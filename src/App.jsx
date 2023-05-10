import React, { useState, useRef, useEffect } from "react";
import "./App.css";

var array = [];
const string = `algumas coisas são é era às horas Brasil Portugal pessoas vezes ontem hoje dia texto hospital palácio aquele audiência próprio pena polícia civil justiça liberação livros Egito porta cabelo helicóptero história Mateus Davi iônico dente fábrica velocidade jogador querer possível  casa é grande bonita sol brilha no céu azul flores coloridas enfeitam jardim pássaros cantam alegremente nas árvores família se reúne para almoço gato preto caminha silenciosamente pelo quintal cachorro late animado ao ver visitantes música toca suavemente ao fundo crianças brincam felizes no parque balanço escorrega diversão risadas amigos sorrisos calor verão praia mar piscina sol brilha areia férias descanso tranquilidade brisa leve refrescante sorvete derrete sob sol quente cidade movimentada trânsito intenso prédios altos agitação correria trabalho estresse cansaço encontro amigos restaurante comida deliciosa bebida refrescante conversa animada sorrisos felicidade alegria encontro amizade carinho abraços afeto cuidado união celebração festa dança música alegria brilho luz estrelas lua noite serenidade calmaria tranquilidade silêncio paz reflexão introspecção pensamentos sonhos esperanças realizações conquistas desafios superação aprendizado crescimento evolução determinação perseverança paixão amor família lar aconchego segurança proteção apoio carinho sorrisos abraços união harmonia beleza natureza floresta animais selvagens biodiversidade preservação sustentabilidade ar puro montanhas aventura trilha descoberta deslumbrante paisagem horizonte infinito liberdade voar criatividade inspiração arte pintura escrita leitura conhecimento aprendizado descoberta ciência tecnologia inovação progresso humanidade futuro promissor saúde bem-estar equilíbrio corpo mente espírito harmonia equanimidade felicidade plenitude realização gratidão`;

const getCloud = () =>
  `algumas coisas são é era às horas Brasil Portugal pessoas vezes ontem hoje dia texto hospital palácio aquele audiência próprio pena polícia civil justiça liberação livros Egito porta cabelo helicóptero história Mateus Davi iônico dente fábrica velocidade jogador querer possível `
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

for (var i = 0; i < 60; i++) {
  var coisa = string.split(" ");
  var random = Math.floor(Math.random() * 231) + 1;

  array.push(coisa[random]);
}

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }

  if (correct === false) {
    return <span className="incorrect">{text} </span>;
  }

  if (active) {
    return <span className="active">{text} </span>;
  }

  return <span>{text} </span>;
}

Word = React.memo(Word);

function Timer(props) {
  const { correctWords, startCounting, maxTime } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let id;
    if (props.startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [props.startCounting]);

  useEffect(() => {
    if (timeElapsed >= maxTime) {
      props.onTimeUp();
    }
  }, [timeElapsed, props]);

  const minutes = timeElapsed / 60;

  return (
    <div class="time-speed">
      <p>Time: {timeElapsed}s</p>
      <p>Speed: {Math.ceil(correctWords / minutes) || 0} WPM</p>
    </div>
  );
}

function App() {
  const [userInput, setUserInput] = useState("");

  //   const cloud = useRef(getCloud());
  //   console.log(cloud);
  const cloud = useRef(array);

  const [startCounting, setStartCounting] = useState(false);

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);

  const [secondsType, setSecondsType] = useState(15);

  const [inputReadOnly, setInputReadOnly] = useState(false);

  function processInput(value) {
    if (!startCounting) {
      setStartCounting(true);
    }

    if (activeWordIndex === cloud.current.length) {
      return;
    }

    if (value.endsWith(" ")) {
      //   if (startCounting === false) {
      //     setUserInput("Completed");
      //     return;
      //   }
      if (activeWordIndex === cloud.current.length - 1) {
        setInputReadOnly(true);
        setStartCounting(false);
        setUserInput("Completed");
        return;
      }
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];

        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  function handleTimeUp() {
    setStartCounting(false);
    setInputReadOnly(true);
    setUserInput("Completed");
    return;
  }

  function restartTest() {
    window.location.reload();
  }

  return (
    <div className="wrapper">
      <h1>Typing Test</h1>
      <div className="buttons-timer">
        <div className="options">
          <p>Seconds</p>
          <div className="buttons-time">
            <span
              onClick={() => setSecondsType(15)}
              className={secondsType === 15 ? "selected" : ""}
            >
              15
            </span>
            <span
              onClick={() => setSecondsType(30)}
              className={secondsType === 30 ? "selected" : ""}
            >
              30
            </span>
            <span
              onClick={() => setSecondsType(60)}
              className={secondsType === 60 ? "selected" : ""}
            >
              60
            </span>
          </div>
        </div>
        <Timer
          maxTime={secondsType}
          startCounting={startCounting}
          correctWords={correctWordArray.filter(Boolean).length}
          onTimeUp={handleTimeUp}
        />
      </div>
      <i className="fas fa-rotate-right" onClick={() => restartTest()}></i>
      <div className="middle">
        <p className="words">
          {cloud.current.map((word, index) => {
            return (
              <Word
                text={word}
                active={index === activeWordIndex}
                correct={correctWordArray[index]}
              />
            );
          })}
        </p>
        <input
          className="input"
          type="text"
          value={userInput}
          readOnly={inputReadOnly}
          onChange={(e) => processInput(e.target.value)}
        />
      </div>
    </div>
  );
}
export default App;
