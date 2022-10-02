import { useEffect, useState } from 'react';
import './App.css';
import Jimmy from './media/oponents/Jimmy.png';
import Martin from './media/oponents/Martin.png';
import Emir from './media/oponents/Emir.png';
import Wally from './media/oponents/Wally.png';
import Hikaru from './media/oponents/Hikaru.png';

function Oponent(props) {
    return (
        <div onClick={
            () => {
                props.setSelected({
                    name: props.name,
                    rating: props.rating,
                    displayRating: props.display ? props.display : null,
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
    const [selected, setSelected] = useState({
        name: "Jimmy",
        rating: 3,
        displayRating: 10,
        picture: Jimmy
    })

    const [log, setLog] = useState([["Let the games begin!"]])
    const [to, setTo] = useState(5)
    const [settings, setSettings] = useState(false)
    const [style, setStyle] = useState(false)
    
    useEffect(() => {
        setLog([["Your oponent is " + selected.name], ...log])
    }, [selected.name])
    useEffect(() => {
        if (yourScore == to) {
            alert('Congratulations, you win!')
            restart()
        }
        if (enemyScore == to) {
            alert('Oh no you lost')
            restart()
        }
    }, [yourScore, enemyScore])
    const showLog = () => {
        return log.map((entry) =>
            <h4>{entry.map((entr) => <div>{entr}</div>)}</h4>
        )
    }

    const handleOption = (yourChoice) => {
        let enemyChoice = Math.floor(Math.random() * selected.rating)
        if (selected.rating < 3 && Math.random() < 0.5) enemyChoice = -1
        const options = ['Rock', 'Paper', 'Scissors']
        let win, lose, message
        if (yourChoice == 0 && enemyChoice == 1) lose = true
        if (yourChoice == 0 && enemyChoice == 2) win = true
        if (yourChoice == 1 && enemyChoice == 0) win = true
        if (yourChoice == 1 && enemyChoice == 2) lose = true
        if (yourChoice == 2 && enemyChoice == 0) lose = true
        if (yourChoice == 2 && enemyChoice == 1) win = true
        if (enemyChoice > 2) {
            lose = true
            if (yourChoice == 0) enemyChoice = 1
            if (yourChoice == 1) enemyChoice = 2
            if (yourChoice == 2) enemyChoice = 0
        }
        if (enemyChoice < 0) {
            win = true
            if (yourChoice == 0) enemyChoice = 1
            if (yourChoice == 1) enemyChoice = 2
            if (yourChoice == 2) enemyChoice = 0
        }
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
            selected.name + " chose " + options[enemyChoice],
            message
        ]
        setLog([newLog, ...log])
    }
    const handleTo = (e) => {
        setTo(e.target.valueAsNumber)
    }
    const restart = () => {
        setYourScore(0)
        setEmenyScore(0)
        setLog([['Let the games begin!']])
    }

    return (
        <main>
            <div className='title'>
                <h1>Welcome to Rock Paper Scissors</h1>
            </div>
            <div className='wrap'>
                <section className='wrap-log'>
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <h2>Game History</h2>
                        <button onClick={
                            () => {
                                setLog([])
                            }
                        } className='round-button' title='Delete game history'><i className='bi bi-trash' /></button>
                    </div>
                    <div className='log'>
                        {showLog()}
                    </div>
                </section>
                <section className='wrap-option'>
                    <div className='wrap-options'>
                        <button onClick={
                            () => {
                                handleOption(0)
                            }} className='option'>
                        <h1>🪨</h1>
                        </button>
                        <button onClick={
                            () => {
                                handleOption(1)
                            }
                        } className='option'>
                        <h1>📄</h1>
                        </button>
                        <button onClick={
                            () => {
                                handleOption(2)
                            }
                        } className='option'>
                        <h1>✂️</h1>
                        </button>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <h3>First to {to} wins</h3>
                        <button onClick={restart} style={{marginLeft: 'auto'}} className='round-button' title='Restart Game'><i className='bi bi-arrow-counterclockwise' /></button>
                    </div>
                    <div className='wrap-scores'>
                        <h3>Your Score: {yourScore}</h3>
                        <progress value={yourScore} max={to} />
                        <h3>Enemy Score: {enemyScore}</h3>
                        <progress value={enemyScore} max={to} />
                    </div>
                    <button onClick={
                        () => {
                            setSettings(prevSettings => !prevSettings)
                        }
                    } className={settings ? 'round-button open' : 'round-button closed'}><i className='bi bi-gear' /></button>
                    <div className={settings ? 'settings-open' : 'settings-closed'}>
                        <div className='wrap-setting'>
                            <h4>Game ends on {to} points:</h4>
                            <input min="1" onChange={handleTo} defaultValue={5} max="100" type="range" />
                        </div>
                    </div>
                </section>
                <section className='wrap-oponent'>
                    <div className='wrap-selected-oponent'>
                        <img src={selected.picture} />
                        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                            <h2>{selected.name}</h2>
                            {selected.displayRating && <h3>{selected.displayRating}⭐</h3>}
                            {!selected.displayRating && <h3>{selected.rating}⭐</h3>}
                        </div>
                    </div>
                    <div className='wrap-oponents'>
                        <Oponent name="Jimmy" rating={3} display={10} picture={Jimmy} setSelected={setSelected} />
                        <Oponent name="Martin" rating={2} display={5} picture={Martin} setSelected={setSelected} />
                        <Oponent name="Emir" rating={4} display={12} picture={Emir} setSelected={setSelected} />
                        <Oponent name="Wally" rating={5} display={15} picture={Wally} setSelected={setSelected} />
                        <Oponent name="Hikaru" rating={999999} display="∞" picture={Hikaru} setSelected={setSelected} />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default App;