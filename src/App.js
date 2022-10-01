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

    const [log, setLog] = useState([["Let the games begin!"]])
    
    useEffect(() => {
        console.log(...log)
    }, [log])

    const showLog = () => {
        const allLogs = log.map((entry) =>
            <h4>{entry.map((entr) => <div>{entr}</div>)}</h4>
        )
        return allLogs
    }

    const handleOption = (yourChoice) => {
        const enemyChoice = Math.floor(Math.random() * 3)
        const options = ['Rock', 'Paper', 'Scissors']
        let win, lose, message
        if (yourChoice == 0 && enemyChoice == 1) lose = true
        if (yourChoice == 0 && enemyChoice == 2) win = true
        if (yourChoice == 1 && enemyChoice == 0) win = true
        if (yourChoice == 1 && enemyChoice == 2) lose = true
        if (yourChoice == 2 && enemyChoice == 0) lose = true
        if (yourChoice == 2 && enemyChoice == 1) win = true
        if (enemyChoice > 2) lose = true
        if (win) {
            setYourScore(prevYourScore => prevYourScore + 1)
            message = "You win!"
        }
        if (lose) {
            setEmenyScore(prevEnemeyScore => prevEnemeyScore + 1)
            message = "You lose!"
        }
        if (!win && !lose) {
            message = "It's a tie!"
        }
        const newLog = [
            "You chose " + options[yourChoice],
            selectedOponent.name + " chose " + options[enemyChoice],
            message
        ]
        setLog([newLog, ...log])
    }

    return (
        <main>
            <h1>Welcome to Rock Paper Scissors</h1>
            <div className='wrap'>
                <section className='wrap-log'>
                    {showLog()}
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
