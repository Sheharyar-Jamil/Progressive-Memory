import { useEffect, useState } from "react";

const initialItems = [
  {
    id: 2674,
    obj: "🎧",
  },

  {
    id: 3476,
    obj: "🚀",
  },

  {
    id: 7854,
    obj: "🔥",
  },

  {
    id: 8409,
    obj: "🍁",
  },

  {
    id: 9653,
    obj: "🚂",
  },

  {
    id: 6543,
    obj: "🎵",
  },

  {
    id: 1234,
    obj: "💧",
  },

  {
    id: 4321,
    obj: "🧤",
  },

  {
    id: 6789,
    obj: "🏠",
  },

  {
    id: 9876,
    obj: "🍁",
  },

  {
    id: 6778,
    obj: "📷",
  },

  {
    id: 6666,
    obj: "🚙",
  },
  {
    id: 6799,
    obj: "🚀",
  },

  {
    id: 9896,
    obj: "✏️",
  },

  {
    id: 6798,
    obj: "🧤",
  },

  {
    id: 5555,
    obj: "🚂",
  },
];

function App() {
  const [selectedObj, setSelectedObj] = useState(null);
  const [prevSelectedObj, setPrevSelectedObj] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * initialItems.length);
    return initialItems[randomIndex];
  }

  useEffect(() => {
    const initialItems = getRandomImage();
    console.log(initialItems);
    setSelectedObj(initialItems);
  }, []);

  function handleSelectedObject(id, obj) {
    // console.log(obj);
    // console.log(prevSelectedObj);

    if (gameOver) return;
    if (prevSelectedObj === obj) {
      setGameOver(true);
    } else {
      const newObj = getRandomImage();

      setSelectedObj(newObj);

      setScore(function (score) {
        return score + 1;
      });
    }

    setPrevSelectedObj(obj);
  }
  return (
    <div className="container ">
      <ProgressiveMemory />
      <Cards
        onSelected={handleSelectedObject}
        selectedObj={selectedObj}
        gameOver={gameOver}
      />
      <Score score={score} />
    </div>
  );
}

function ProgressiveMemory() {
  return (
    <>
      <h1 className="heading-primary center">
        Click an image and memorize it. Do not click the same image again
      </h1>
    </>
  );
}

function Score({ score }) {
  return (
    <>
      <h3 className="heading-tertiary">
        Your Score <span className="span-info">{score}</span>
      </h3>
    </>
  );
}

function Cards({ onSelected, selectedObj, gameOver }) {
  const objects = initialItems;
  return (
    <>
      {gameOver ? (
        <h3 className="heading-game-over center">Game Over </h3>
      ) : (
        <ul className="big-box">
          {objects.map(function (item) {
            return (
              <Card
                itemObj={item}
                key={item.id}
                onSelected={onSelected}
                selectedObj={selectedObj}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

function Card({ itemObj, onSelected, selectedObj }) {
  const isSelected = selectedObj && selectedObj.id === itemObj.id;

  return (
    <li
      className="small-box"
      onClick={() => onSelected(itemObj.id, itemObj.obj)}
    >
      {isSelected && itemObj.obj}
    </li>
  );
}

export default App;
