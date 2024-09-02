import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      alert("Congratulation, You won !");
    }
    //console.log("Dice state changed")
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie);
    }
    //console.log(newDice);
    return newDice;
  }

  function rollDice() {
    //setDice(allNewDice());
    /*setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? 
        die : 
        generateNewDie();
      })
    );*/

    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1> Tenzies</h1>
      <p className="w-50 text-dark text-center  mx-auto my-4">
       Clicca su Ricarica, scegli un numero da 1 a 6 clicca sul numero che hai scleto e rigenera fino a qundo tutti i numeri non diventano con lo sfondo verde
      </p>
      <div className="app--container">{diceElements}</div>
      <button
        className="btn btn-sm  btn-outline-primary mt-5 border-2 rounded-3 btnDice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Ricarica"}
      </button>
    </main>
  );
}

export default App;
