import { useState } from 'react';
import './App.css';

function App() {
    const [yourScore, setYourScore] = useState(0)
    const [enemyScore, setEmenyScore] = useState(0)
    
    const handleOption = (yourChoice) => {
        const enemyChoice = Math.floor(Math.random() * 3)
        if (yourChoice == enemyChoice) console.log("Tie!")
        if (yourChoice == 0 && enemyChoice == 1) setYourScore(prevYourScore => prevYourScore + 1)
        if (yourChoice == 0 && enemyChoice == 2) setEmenyScore(prevEnemeyScore => prevEnemeyScore +1)
        if (yourChoice == 1 && enemyChoice == 0) setEmenyScore(prevEnemeyScore => prevEnemeyScore +1)
        if (yourChoice == 1 && enemyChoice == 2) setYourScore(prevYourScore => prevYourScore + 1)
        if (yourChoice == 2 && enemyChoice == 0) setYourScore(prevYourScore => prevYourScore + 1)
        if (yourChoice == 2 && enemyChoice == 1) setEmenyScore(prevEnemeyScore => prevEnemeyScore +1)
    }

    return (
        <main>
            <h1>Welcome to Rock Paper Scissors</h1>
            <div className='wrap'>
                <section className='wrap-log'>
                    Log
                </section>
                <section className='wrap-option'>
                    <div className='wrap-options'>
                      <div onClick={
                        () => {
                            handleOption(0)
                        }} className='option'>
                        <h1>🪨</h1>
                      </div>
                      <div onClick={
                        () => {
                            handleOption(1)
                        }
                      } className='option'>
                        <h1>📄</h1>
                      </div>
                      <div onClick={
                        () => {
                            handleOption(2)
                        }
                      } className='option'>
                        <h1>✂️</h1>
                      </div>
                    </div>
                    <div className='wrap-scores'>
                      <h3>Your Score: {yourScore}</h3>
                      <h3>Enemy Score: {enemyScore}</h3>
                    </div>
                </section>
                <section className='wrap-oponent'>

                </section>
            </div>
        </main>
    );
}

export default App;
