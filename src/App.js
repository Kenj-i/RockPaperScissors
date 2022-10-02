import { useEffect, useState } from 'react';
import './App.css';
import Jimmy from './media/oponents/Jimmy.png'
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
    const [selectedOponent, setSelectedOponent] = useState({
        name: "Jimmy",
        rating: 10,
        displayRating: null,
        picture: Jimmy
    })

    const [log, setLog] = useState([["Let the games begin!"]])
    
    useEffect(() => {
        setLog([["Your oponent is " + selectedOponent.name], ...log])
    }, [selectedOponent.name])

    const showLog = () => {
        return log.map((entry) =>
            <h4>{entry.map((entr) => <div>{entr}</div>)}</h4>
        )
    }

    const handleOption = (yourChoice) => {
        let enemyChoice = Math.floor(Math.random() * ((selectedOponent.rating - 1) / 3))
        console.log(enemyChoice)
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
            <div className='title'>
                <h1>Welcome to Rock Paper Scissors</h1>
            </div>
            <div className='wrap'>
                <section className='wrap-log'>
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <h2>Game History</h2>
                        <button onClick={
                            () => {
                                setLog([["Let the games begin!"]])
                            }
                        }>Clear</button>
                    </div>
                    <div className='log'>
                        {showLog()}
                    </div>
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
                    <div className='wrap-selected-oponent'>
                        <img src={selectedOponent.picture} />
                        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                            <h2>{selectedOponent.name}</h2>
                            {selectedOponent.displayRating && <h3>{selectedOponent.displayRating}⭐</h3>}
                            {!selectedOponent.displayRating && <h3>{selectedOponent.rating}⭐</h3>}
                        </div>
                    </div>
                    <div className='wrap-oponents'>
                        <Oponent name="Jimmy" rating={10} picture={Jimmy} setSelected={setSelectedOponent} />
                        <Oponent name="Emir" rating={12} picture={Emir} setSelected={setSelectedOponent} />
                        <Oponent name="Wally" rating={15} picture={Wally} setSelected={setSelectedOponent} />
                        <Oponent name="Hikaru" rating={999999} display="∞" picture={Hikaru} setSelected={setSelectedOponent} />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default App;