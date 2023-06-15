import "./GameOver.css";

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <p>A sua pontuação foi: {score}</p>
        <button className="button" onClick={retry}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver