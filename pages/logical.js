import React, { useState } from 'react';

const Maze = () => {
  const [maze, setMaze] = useState([
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
  ]);

  const renderMaze = () => {
    return maze.map((row, i) => (
      <div className="maze-row" key={i}>
        {row.map((cell, j) => (
          <div
            className={`maze-cell ${cell === 1 ? 'wall' : ''}`}
            key={`${i}-${j}`}
          ></div>
        ))}
      </div>
    ));
  };

  return (
    <div className="maze-container">
      {renderMaze()}
    </div>
  );
};
 // import React, { useState } from 'react';

// const TowerOfHanoi = () => {
//   const [towers, setTowers] = useState([
//     [[3, 2, 1], 'line1'],
//     [[], 'line2'],
//     [[], 'line3']
//   ]);
//   const [moves, setMoves] = useState(0);
//   const [selectedTower, setSelectedTower] = useState(null);

//   const clear = () => {
//     towers.forEach((tower) => {
//       const towerElement = document.querySelector(`.${tower[1]}`);
//       towerElement.innerHTML = '';
//     });
//   };

//   const drawDiscs = () => {
//     clear();
//     towers.forEach((tower) => {
//       const towerElement = document.querySelector(`.${tower[1]}`);
//       tower[0].forEach((discSize) => {
//         const discElement = document.createElement('li');
//         discElement.id = `disc${discSize}`;
//         discElement.setAttribute('value', discSize);
//         discElement.innerText = discSize;
//         towerElement.appendChild(discElement);
//       });
//     });
//   };

//   const init = () => {
//     const discs = document.getElementById('box').value;
//     const initialTowers = [
//       [Array.from({ length: discs }, (_, i) => discs - i), 'line1'],
//       [[], 'line2'],
//       [[], 'line3']
//     ];
//     setTowers(initialTowers);
//     setMoves(0);
//     setSelectedTower(null);
//     drawDiscs();
//     document.querySelector('.moves').innerText = '0 moves';
//   };

//   const handleTowerClick = (towerIndex) => {
//     if (selectedTower === null) {
//       const topDisc = towers[towerIndex][0][towers[towerIndex][0].length - 1];
//       if (topDisc !== undefined) {
//         setSelectedTower(towerIndex);
//         const topDiscElement = document.querySelector(`#disc${topDisc}`);
//         topDiscElement.style.marginTop = '-170px';
//       }
//     } else {
//       const moveResult = moveDisc(selectedTower, towerIndex);
//       setMoves((moves) => moves + 1);
//       document.querySelector('.moves').innerText = `${moves + 1} moves`;
//       if (moveResult === 1) {
//         drawDiscs();
//       } else {
//         alert("You can't place a bigger disc on a smaller one");
//       }
//       setSelectedTower(null);
//     }
//     if (solved()) {
//       document.querySelector('.moves').innerText = `Solved with ${moves + 1} moves!`;
//     }
//   };

//   const moveDisc = (from, to) => {
//     const fromTower = towers[from][0];
//     const toTower = towers[to][0];
//     if (fromTower.length === 0) {
//       return 0;
//     } else if (toTower.length === 0 || fromTower[fromTower.length - 1] < toTower[toTower.length - 1]) {
//       toTower.push(fromTower.pop());
//       return 1;
//     } else {
//       return 0;
//     }
//   };

//   const solved = () => {
//     const lastTower = towers[towers.length - 1][0];
//     return towers.slice(0, -1).every((tower) => tower[0].length === 0) && lastTower.length === discs;
//   };

//   return (
//     <div>
//       <div className="towers">
//         {towers.map((tower, towerIndex) => (
//           <div key={tower[1]} className="tower">
//             <ul className={tower[1]}>
//               {tower[0].map((discSize, discIndex) => (
//                 <li
//                   key={discSize}
//                   className="disc"
//                   data-size={discSize}
//                   style={{
//                     width: `${(discSize * 100) / totalDiscs}%`,
//                     left: `${
//                       50 - ((discSize * 100) / totalDiscs) / 2
//                     }%`,
//                     backgroundColor: `hsl(${(360 / totalDiscs) *
//                       discSize}, 70%, 70%)`,
//                     zIndex: discIndex + 1
//                   }}
//                 >
//                   {discSize}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//       <div className="buttons">
//         <button onClick={resetGame}>Reset Game</button>
//         <button onClick={solveGame}>Solve Game</button>
//       </div>
//     </div>
//   );
  
//                 };