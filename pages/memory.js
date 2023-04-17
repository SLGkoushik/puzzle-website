import { useState, useEffect } from "react";
import GameBoard from "@/components/gameboard";
import { useRouter } from "next/router";
import Link from "next/link";
function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export async function getServerSideProps({ context }) {
    const cardValues = ['A', 'a', 'B', 'b', 'C', 'D', 'E', 'F'];
    const doubleCardValues = [...cardValues, ...cardValues];
    const shuffledArray = shuffle(doubleCardValues);

    // Pass data to the page via props
    return { props: { shuffledArray } };
}

const MemoryGamePage = ({ shuffledArray }) => {
    const router = useRouter();
    const [cards, setCards] = useState(() => {
        const shuffledCardValues = shuffledArray
        return shuffledCardValues.map((value) => ({ value, flipped: false }));
    });
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(() => {
        if (startTime) {
            const intervalId = setInterval(() => {
                setElapsedTime((Date.now() - startTime) / 1000);
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [startTime]);

    useEffect(() => {
        if (cards.every((card) => card.flipped)) {
            // TODO game completed
            //router.push({ pathname:'/analytical'});
        }
    }, [cards]);
    const [flippedCards, setFlippedCards] = useState([]);


    const handleCardClick = (cardIndex) => {
        if (!startTime) {
            setStartTime(Date.now());
        }
        if (flippedCards.length === 2) {
            return;
        }

        const newCards = [...cards];
        newCards[cardIndex].flipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, cardIndex];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const firstCard = cards[newFlippedCards[0]];
            const secondCard = cards[newFlippedCards[1]];

            if (firstCard.value === secondCard.value) {
                // cards match
                
                setFlippedCards([]);
            } else {
                // cards do not match
                setTimeout(() => {
                    newCards[newFlippedCards[0]].flipped = false;
                    newCards[newFlippedCards[1]].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    

    return (
        <div className="room-container">
          <div className="left-container">
            <h1 className="scary">Room 1</h1>
            <img src="/oie_BNMu2UCbVLZ5.jpg" alt="Game intro"  />
            <h3>Rules for the Memory Game Puzzle:</h3>
            <ul>
              <li>The memory game consists of a grid of cards with images on the back.</li>
              <li>The objective of the game is to match pairs of cards with the same image.</li>
              <li>The player can only flip two cards at a time, and if the images on the cards do not match, they will be flipped back over.</li>
              <li>The game ends when all pairs of cards have been matched.</li>
              <li>However, to solve the puzzle and open the door, the player must pay attention to the images on the cards as they match them.</li>
              <li>Some of the images contain hidden clues or symbols that will be useful in solving the next puzzle.</li>
              <li>The player must remember these clues and use them to unlock the next door in the Mystery Mansion.</li>
            </ul>
          </div>
          <div className="right-container">
          <h6>As you have entered the first room in the Mystery Mansion, you find yourself facing a door. The door has a puzzle that needs to be solved to open it.Read instructions properly before starting the puzzle.</h6>
            
            <div >Time: {elapsedTime.toFixed(1)}s</div>
            <div className="game-container">
  <div className="game-board">
    <GameBoard cards={cards} onCardClick={handleCardClick} />
  </div>
  <div className="game-buttons">
    <h3>Memory Game</h3>
    <h6>Remember the images that you have seen in this memory game.They can be helpful in opening further doors.</h6>
    <Link href="/analytical">
          <buton className="button">Next room</buton>
        </Link>
  </div>
</div>
          </div>
        </div>
      );
      
      
};

export default MemoryGamePage;