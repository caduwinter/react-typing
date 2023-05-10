import React, { useState, useEffect, useRef } from "react";

const TextoAleatorio = () => {
  const [textoGerado, setTextoGerado] = useState("");
  const [textoDigitado, setTextoDigitado] = useState("");
  const [tempoInicial, setTempoInicial] = useState(null);
  const [tempoFinal, setTempoFinal] = useState(null);

  const textInputRef = useRef(null);

  useEffect(() => {
    gerarTextoAleatorio();
  }, []);

  const gerarTextoAleatorio = () => {
    // Aqui você pode implementar a lógica para gerar um texto aleatório
    const texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    setTextoGerado(texto);
  };

  const iniciarTeste = () => {
    setTempoInicial(new Date());
    textInputRef.current.focus();
  };

  const finalizarTeste = () => {
    if (tempoInicial && tempoFinal) {
      setTempoFinal(new Date());
      const tempoDecorrido = tempoFinal.getTime() - tempoInicial.getTime();
      console.log("Tempo decorrido (ms):", tempoDecorrido);
    }
  };

  const handleInputChange = (event) => {
    setTextoDigitado(event.target.value);
  };

  return (
    <div>
      <h1>Teste de Digitação</h1>
      <p>Texto gerado: {textoGerado}</p>
      <input
        ref={textInputRef}
        type="text"
        value={textoDigitado}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={iniciarTeste}>Iniciar</button>
      <button onClick={finalizarTeste}>Finalizar</button>
    </div>
  );
};

export default TextoAleatorio;
