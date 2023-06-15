import './App.css'

import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

import { useCallback, useState, useEffect } from 'react'

import { wordsList } from './data/words'

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickWord, setPickWord] = useState("");
  const [categorie, setCategorie] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pick = useCallback(() => {
    const categories = Object.keys(words);
    const categorie = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[categorie][Math.floor(Math.random() * words[categorie].length)];
    return {categorie, word};
  },[words])
  const startGame = useCallback(() => {
    setGuessedLetters([])
    setWrongLetters([])
    const {word, categorie} = pick();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    setLetters(wordLetters);
    setPickWord(word);
    setCategorie(categorie);
    setGameStage(stages[1].name);
  }, [pick]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ] )
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses) => (actualGuesses) - 1)
    }
  }

  useEffect(()=>{
    if (guesses<=0){
      setGuessedLetters([])
      setWrongLetters([])
      setGameStage(stages[2].name)
    }
  },[guesses])

  useEffect (()=>{
    const uniqueLetters = [... new Set(letters)]
    if (guessedLetters.length === uniqueLetters.length){
      setScore((actualScore)=> actualScore += 100)
      startGame()
    }

  },[guessedLetters, letters, startGame])

  const retry = () => {
    setGuesses(3)
    setScore(0)
    setGameStage(stages[0].name);
  }
  
  

  return (
    <div className="App" >
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game word={pickWord} categorie={categorie} verifyLetter={verifyLetter} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} score={score} guesses={guesses} />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
