import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="start" >
        <h1>SECRET WORD</h1>
        <p>Clique no botão abaixo para inicar</p>
        <button onClick={startGame} className="button" >Clique para começar!</button>
    </div>
  )
}

export default StartScreen