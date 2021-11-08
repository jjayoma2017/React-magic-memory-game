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

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // duplicate cards using spread
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
    //console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    const resetTurn = async () => {
      await setChoiceOne(null)
      await setChoiceTwo(null)
      await setTurns((prevTurns) => prevTurns + 1)
      console.log('turns:' + turns)
    }

    if (choiceOne && choiceTwo) {
      console.log('choiceOne.src:' + choiceOne.src)
      console.log('choiceTwo.src:' + choiceTwo.src)

      if (choiceOne.src === choiceTwo.src) {
        console.log('has a winner')
      } else {
        console.log('has a loser')
      }
      resetTurn()
    }
  }, [choiceOne, choiceTwo, turns])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  )
}

export default App
