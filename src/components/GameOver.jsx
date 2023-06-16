import "./GameOver.css";

const GameOver = ({retry, score, word}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <p>A palavra era 
          <b> {word}</b>
          </p>
        <p>A sua pontuação foi: {score}</p>
        <button className="button" onClick={retry}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver