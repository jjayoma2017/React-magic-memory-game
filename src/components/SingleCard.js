import './SingleCard.css'

function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card)
  }
  return (
    <div>
      <div className="card">
        <div className="card-image">
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src="/img/cover.png"
            alt="card back"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleCard
