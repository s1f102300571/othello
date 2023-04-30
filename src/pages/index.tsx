import { useState } from 'react';
import styles from './index.module.css';

interface Box {
  id: number;
  state: 'empty' | 'white' | 'black';
}

const Home = () => {
  const [whiteTurn, setWhiteTurn] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<Box[]>(
    Array.from(Array(64), (_, index) => ({
      id: index + 1,
      state: (() => {
        if (index === 27 || index === 36) return 'white';
        if (index === 28 || index === 35) return 'black';
        return 'empty';
      })(),
    }))
  );

  // id = 番号
  // clickedBox

  const handleClickBox = (id: number) => {
    const functionNumber = [-8, -7, 1, 9, 8, 7, -1, -9];
    const listNumber = [0, 0, 0, 0, 0, 0, 0, 0];

    if (boxes.find((box) => box.id === id)?.state !== 'empty') {
      return;
    }
    for (let t = 0; t < functionNumber.length; t++) {
      let tempBox = id;
      for (let i = 0; i < 10; i++) {
        tempBox += functionNumber[t];
        if (
          tempBox <= 0 ||
          tempBox >= 65 ||
          ((t === 1 || t === 2 || t === 3) && (tempBox - 1) % 8 === 0) ||
          ((t === 5 || t === 6 || t === 7) && tempBox % 8 === 0)
        ) {
          listNumber[t] = 0;
          break;
        }
        const tempBoxState = boxes.find((box) => box.id === tempBox)?.state;
        if (whiteTurn) {
          if (tempBoxState === 'black') {
            listNumber[t] += 1;
          } else if (tempBoxState === 'white') {
            break;
          } else {
            listNumber[t] = 0;
            break;
          }
        } else {
          if (tempBoxState === 'white') {
            listNumber[t] += 1;
          } else if (tempBoxState === 'black') {
            break;
          } else {
            listNumber[t] = 0;
            break;
          }
        }
      }
    }
    let changeTurn = false;
    for (let t = 0; t < listNumber.length; t++) {
      if (listNumber[t] !== 0) {
        changeTurn = true;
        console.log(listNumber);
        for (let i = 0; i <= listNumber[t]; i++) {
          const boxToChange = id + functionNumber[t] * i;
          if (whiteTurn) {
            console.log(boxToChange, i, whiteTurn);
            changeBoxState(boxToChange, 'white');
          } else {
            console.log(boxToChange, i, whiteTurn);
            changeBoxState(boxToChange, 'black');
          }
        }
      }
      if (changeTurn === true) {
        setWhiteTurn(!whiteTurn);
      }
    }
  };

  const changeBoxState = (id: number, newState: 'empty' | 'white' | 'black') => {
    setBoxes((prevState) => {
      const newBoxes = prevState.map((box) => {
        if (box.id === id) {
          return {
            ...box,
            state: newState,
          };
        } else {
          return box;
        }
      });
      return newBoxes;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {boxes.map((box) => (
          <div className={styles.box} key={box.id} onClick={() => handleClickBox(box.id)}>
            <div className={`${styles.disc} ${styles[box.state]}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
