import Mat from "./mat.jsx";

export default function InsertSort({ countOfCards }) {
  async function insertsort(sync, change) {
    await change(
      (cards) =>
        cards.map((card, index) => {
          if (index === 0)
            return {
              ...card,
              left: 37,
              top: 145,
              zIndex: 1,
            };
          return {
            ...card,
            left: 97 + index * 58,
            top: 125,
            zIndex: 1,
          };
        }),
      400
    );

    await sync();

    for (let i = 1; i < 13; i++) {
      let x = 0;

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index === i) {
              x = card.value;
              return { ...card, top: 65 };
            }
            return card;
          }),
        400
      );

      await sync();

      let j = i - 1;

      let y = 0;

      while (j >= 0) {
        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index === j) {
                y = card.value;
                return { ...card, top: 135 };
              }
              return card;
            }),
          400
        );

        await sync();

        if (y <= x) break;

        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index === j) {
                return { ...card, left: 60 * (j + 1) + 37, top: 145 };
              }
              return card;
            }),
          400
        );

        j--;
      }

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index === i)
              return { ...card, left: 60 * (j + 1) + 37, top: 145, zIndex: 8 };
            if (index === j) return { ...card, top: 145 };
            return card;
          }),
        400
      );

      j++;

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index === j) return { ...cards[i], zIndex: 1 };
            if (index > j && index <= i) return cards[index - 1];
            return card;
          }),
        0
      );
    }
  }

  return <Mat countOfCards={countOfCards} sort={insertsort} />;
}
