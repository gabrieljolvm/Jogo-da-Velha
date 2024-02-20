import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState('');
  const [resultCondition, setResultCondition] = useState(null);
  const winConditions = [
    { indexes: [0, 3, 6], direction: 'horizontal' },
    { indexes: [1, 4, 7], direction: 'horizontal' },
    { indexes: [2, 5, 8], direction: 'horizontal' },
    
    { indexes: [0, 1, 2], direction: 'vertical' },
    { indexes: [3, 4, 5], direction: 'vertical' },
    { indexes: [6, 7, 8], direction: 'vertical' },
    
    { indexes: [0, 4, 8], direction: 'diagonal-1' },
    { indexes: [2, 4, 6], direction: 'diagonal-2' },
    
  ]
  
  let winningCombo = null;

  
  const handleClick = (clickedIndex) => {

    if (gameData[clickedIndex] !== 0 || winner !== '') return

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = player;

      return newGameData;
    })

    setPlayer((prev) => prev === 1 ? 2 : 1);

  }

  const checkWinner = () => {
    for (let numbers of winConditions) {
      const { indexes } = numbers

      if (gameData[indexes[0]] === 1 && gameData[indexes[1]] === 1 && gameData[indexes[2]] === 1) {
        setWinner('Player 1');

        winningCombo = gameData.map((data, ind) => { if (data === 1) return ind })
        .filter(elem => { if (indexes.includes(elem)) return typeof elem === 'number' })

      }
      if (gameData[indexes[0]] === 2 && gameData[indexes[1]] === 2 && gameData[indexes[2]] === 2) {
        setWinner('Player 2');

        winningCombo = gameData.map((data, ind) => { if (data === 2) return ind })
        .filter(elem => { if (indexes.includes(elem)) return typeof elem === 'number' })

      }
      if (!gameData.includes(0)) {
        setWinner('Empate!');
      }
    
      if(JSON.stringify(indexes) === JSON.stringify(winningCombo)){
        setResultCondition(numbers);
      }

    }

  }

  useEffect(() => {
    checkWinner();
    console.log(resultCondition)
  }, [gameData])

  return (
    <>
      <span className='announcement'>{winner !== '' ? `Resultado: ${winner}` : ''}</span>
      <main className="table">
        {gameData.map((value, index) => (
          <div className="square" key={index} onClick={() => handleClick(index)}>
            {value === 1 ? 'X' : value === 2 ? 'O' : ''}

            <span className={resultCondition?.indexes.includes(index) ? resultCondition.direction : null}></span>
          </div>

        ))}
      </main>
      {winner !== '' ?
        <div>
          <button onClick={() => {
            setGameData(gameData.fill(0));
            setWinner('');
            setResultCondition(null);
            setPlayer(1)
          }}>Restart</button>
        </div> : null
      }

    </>
  )
}
export default App
