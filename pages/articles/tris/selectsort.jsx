import Mat from "./mat.jsx";

export default function SelectSort({ countOfCards }) {
  async function selectsort(sync, change) {
    await change((cards) => {
      return cards.map((card, index) => {
        return {
          ...card,
          left: 97 + index * 58,
          top: 125,
        };
      });
    }, 400);

    await sync();

    for (let i = 0; i < countOfCards; i++) {
      let curr = i;
      let currVal = 0;

      await change((cards) => {
        return cards.map((card, index) => {
          if (index === i) {
            currVal = card.value;
            return { ...card, top: 65 };
          }
          return card;
        });
      }, 400);

      await sync();

      for (let j = i + 1; j < countOfCards; j++) {
        let cand = j;
        let candVal = 0;
        await change((cards) => {
          return cards.map((card, index) => {
            if (index === j) {
              candVal = card.value;
              return { ...card, top: 65 };
            }
            return card;
          });
        }, 400);

        await sync();

        if (currVal > candVal) {
          cand = curr;
          currVal = candVal;
          curr = j;
        }

        await change((cards) => {
          return cards.map((card, index) => {
            if (index === cand) {
              return { ...card, top: 125 };
            }
            return card;
          });
        }, 400);
      }

      // On a la prochaîne carte, c'est curr.

      if (i !== curr) {
        await change((cards) => {
          return cards.map((card, index) => {
            if (index === curr)
              return {
                ...card,
                top: 15,
              };
            return card;
          });
        }, 400);

        await sync();

        await change((cards) => {
          return cards.map((card, index) => {
            if (index === i)
              return {
                ...cards[curr],
              };
            if (index === curr)
              return {
                ...cards[i],
              };
            return card;
          });
        }, 0);

        await change((cards) => {
          return cards.map((card, index) => {
            if (index === curr)
              return {
                ...card,
                left: 97 + curr * 58,
              };
            return card;
          });
        }, 300 + 50 * Math.abs(curr - i));

        await sync();
      }

      await change((cards) => {
        return cards.map((card, index) => {
          return {
            ...card,
            zIndex: 1,
          };
        });
      }, 0);

      await change((cards) => {
        return cards.map((card, index) => {
          if (index === i)
            return {
              ...card,
              left: 60 * i + 37,
              top: 145,
              zIndex: 8,
            };
          return card;
        });
      }, 300 + 50 * Math.abs(1 + curr - i));
    }
  }

  return <Mat countOfCards={countOfCards} sort={selectsort} />;
}
