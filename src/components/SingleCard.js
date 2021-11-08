import './SingleCard.css'

function SingleCard({ card, handleChoice, Flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) handleChoice(card)
  }
  return (
    <div className="card">
      <div className={Flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard
