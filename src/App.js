import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // duplicate cards using spread
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceTwo(null)
    setChoiceOne(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
    //console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        // update the cards with a matched fields using the prev state
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true } // return the previous value using spread and add a new matched props
            } else {
              return card // return as is value
            }
          })
        })
      } else {
      }
      setTimeout(() => resetTurn(), 1000) // adding a delay to reset
    }
  }, [choiceOne, choiceTwo, turns])
  console.log(cards)
  const resetTurn = async () => {
    await setChoiceOne(null)
    await setChoiceTwo(null)
    await setTurns((prevTurns) => prevTurns + 1) // prev keywords check for the previous state values
    setDisabled(false)
  }
  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            Flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
