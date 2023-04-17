import React, { useState } from 'react';
import Link from "next/link";

const castleWords = [
  ['C', 'R', 'O', 'W', 'N', 'S', 'A', 'R', 'M', 'O'],
  ['H', 'R', 'O', 'Y', 'A', 'L', 'T', 'Y', 'T', 'R'],
  ['A', 'I', 'K', 'N', 'I', 'G', 'H', 'T', 'S', 'E'],
  ['L', 'L', 'C', 'A', 'S', 'T', 'L', 'E', 'S', 'P'],
  ['L', 'E', 'M', 'O', 'A','T','D','R','A','W'],
  ['E','B','R','I','D','G','E','S','P','E'],
  ['N','A','R','C','H','E','R','Y','S','A'],
  ['G','U','A','R','D','S','M','O','A','T'],
  ['E','M','O','N','A','R','C','H','Y','T'],
  ['S','T','H','R','O','N','E','P','S','A']
];

const validWords = ["CASTLE", "KNIGHT", "CROWN", "ROYALTY", "ARCHERY", "GUARDS", "MOAT", "MONARCHY", "THRONE"];

const WordSearch = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const handleMouseDown = (row, col) => {
    setSelectedCells([[row, col]]);
  };

  const handleMouseEnter = (row, col) => {
    if (selectedCells.length > 0) {
      setSelectedCells([...selectedCells, [row, col]]);
    }
  };

  const handleMouseUp = () => {
    const selectedWord = selectedCells
      .map(([row, col]) => castleWords[row][col])
      .join('');
    if (validWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
    }
    setSelectedCells([]);
  };

  const renderCell = (row, col) => {
    const isSelected = selectedCells.some(
      ([r, c]) => r === row && c === col
    );
    return (
      <td
        key={`${row}+${col}`}
        className={`cell ${isSelected ? 'selected' : ''}`}
        onMouseDown={() => handleMouseDown(row, col)}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseUp={handleMouseUp}
      >
        {castleWords[row][col]}
      </td>
    );
  };

  return (
    <div className="word-search-container">
      <div className="left-container">
        <h1 className='scary'>Room 2</h1>
        <img src="/0df518e8-c94c-4660-995c-5ff644bdc4aa.jpeg" alt="Castle"  style={{width: '100%'}}/>
        <h1>Rules:</h1>
        <ul>
        <li>The aim to find longest and shortest word</li>
          <li>The words may be hidden in any direction (horizontal, vertical, diagonal) </li>
          <li>You can select the letters by clicking and dragging your mouse to highlight them. Once you have highlighted a word, release the mouse button to select it.</li>
          <li>Once you have found atleast 5 hidden words, the door to the next room will unlock and you may proceed in your quest to find Mr. Smith.</li>
        </ul>
        <Link href="/speed">
          <buton className="button">Next room</buton>
        </Link>
      </div>
      <div className="right-container">
        <h3>Castle Word Search</h3>
        <h4>The goal of the puzzle is to find a specific set of hidden words that will unlock the door to the next room.</h4>
        <table className="word-search-table">
          <tbody>
            {[...Array(10)].map((_, row) => (
              <tr key={row}>
                {[...Array(10)].map((_, col) => renderCell(row, col))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="found-words">
          <p>Found words:</p>
          {foundWords.map(word => (
  <span key={word}>{word} </span>
))}
        </div>
        
      </div>
    </div>
  );

};

export default WordSearch;

