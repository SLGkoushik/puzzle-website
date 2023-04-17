
import React, { useState, useEffect } from 'react';
import Link from "next/link";
const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let timer = setInterval(() => {
      randomHole();
    }, 800);
    if (gameOver) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (gameOver) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  const randomHole = () => {
    let hole = Math.floor(Math.random() * 16);
    setCurrent(hole);
  };

  const hit = (id) => {
    if (id === current) {
      setScore((prevScore) => prevScore + 1);
      setCurrent(null);
    }
  };

  const replay = () => {
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
  };

  return (
    <div class="container">
  <div class="left-column">
    <h1 className='scary'>Room 3</h1>
    <img src="\0df518e8-c94c-4660-995c-5ff644bdc4aa.jpeg" alt="image"/>
    <h1>Rules</h1>
    <ul>
      <li>The game begins with moles, or in this case, colored boxes, popping up at random from holes on a board. </li>
      <li>The player has to use a mallet, or in this case, the cursor, to hit or click on the boxes as quickly as possible before they disappear.</li>
      <li>Each hit earns the player points, and the player with the most points at the end of the game wins.</li>
      <li>The game is timed, and the player has to hit as many boxes as possible within the time limit.</li>
    </ul>
  </div>
  <div class="right-column">
  <h1>Whack-a-Color</h1>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}</h2>
      
      
      <table>
        <tbody>
          {[...Array(4)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(4)].map((_, colIndex) => {
                let id = rowIndex * 3 + colIndex;
                return (
                  <td
                    key={id}
                    onClick={() => hit(id)}
                    style={{
                      backgroundColor: id === current ? 'green' : 'white',
                      width: '50px',
                      height: '50px',
                    }}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {gameOver && (
        <>
          <h2>Game Over</h2>
          <button onClick={replay}>Replay</button>
        </>
      )}
      <Link href="/final">
          <buton className="button">Next room</buton>
        </Link>
  </div>
</div>

  );
};

export default WhackAMole;  