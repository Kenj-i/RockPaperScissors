import { useEffect, useState } from 'react';
import './App.css';
import Jimmy from './media/oponents/Jimmy.png'
import Emir from './media/oponents/Emir.png';

function Oponent(props) {
    return (
        <div onClick={
            () => {
                props.setSelected({
                    name: props.name,
                    rating: props.rating,
                    picture: props.picture
                })
            }
        } className='oponent'>
            <img src={props.picture} />
        </div>
    )
}

function App() {
    const [yourScore, setYourScore] = useState(0)
    const [enemyScore, setEmenyScore] = useState(0)
    const [selectedOponent, setSelectedOponent] = useState({
        name: "Jimmy",
        rating: 10,
        picture: Jimmy
    })
    const [log, setLog] = useState({

    })

    useEffect(() => {
        console.log('test')
    }, [log])

    const handleOption = (yourChoice) => {
        const enemyChoice = Math.floor(Math.random() * 3)
        if (yourChoice == enemyChoice) console.log("Tie!")
        if (yourChoice == 0 && enemyChoice == 1) setYourScore(prevYourScore => prevYourScore + 1)
        if (yourChoice == 0 && enemyChoice == 2) setEmenyScore(prevEnemeyScore => prevEnemeyScore + 1)
        if (yourChoice == 1 && enemyChoice == 0) setEmenyScore(prevEnemeyScore => prevEnemeyScore + 1)
        if (yourChoice == 1 && enemyChoice == 2) setYourScore(prevYourScore => prevYourScore + 1)
        if (yourChoice == 2 && enemyChoice == 0) setYourScore(prevYourScore => prevYourScore + 1)
        if (yourChoice == 2 && enemyChoice == 1) setEmenyScore(prevEnemeyScore => prevEnemeyScore + 1)
        if (enemyChoice > 2) setEmenyScore(prevEnemeyScore => prevEnemeyScore + 1)
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
                      <progress value={yourScore} max="5" />
                      <h3>Enemy Score: {enemyScore}</h3>
                      <progress value={enemyScore} max="5" />
                    </div>
                </section>
                <section className='wrap-oponent'>
                    <h3>You're playing against: {selectedOponent.name}</h3>
                    <h4>{selectedOponent.name} has a rating of {selectedOponent.rating}</h4>
                    <img src={selectedOponent.picture} />
                    <div className='wrap-oponents'>
                        <Oponent name="Jimmy" rating={10} picture={Jimmy} setSelected={setSelectedOponent} />
                        <Oponent name="Emir" rating={15} picture={Emir} setSelected={setSelectedOponent} />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default App;
