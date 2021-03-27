import Mat from "./mat.jsx";

export default function MergeSort({ countOfCards }) {
  async function mergeSort(sync, change) {
    async function merge(left, right, first, laster) {
      const n = laster - first;
      const half = Math.floor(n / 2 + 0.75);
      const m = (right - left + 2 - 57 * n) / 2;

      let i = first;
      let j = first + half;
      let pos = 0;
      let tmp = [];

      let cardi = 0;
      let cardj = 0;

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index >= first && index < laster) {
              if (index === i) {
                cardi = card.value;
                return { ...card, top: 115 };
              }
              if (index === j) {
                cardj = card.value;
                return { ...card, top: 115 };
              }
              return { ...card, top: 125 };
            }
            return { ...card, top: 135 };
          }),
        400
      );

      await sync();

      while (i < first + half && j < laster) {
        if (cardi <= cardj) {
          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === i)
                  return {
                    ...card,
                    left: left + m + 57 * pos,
                    top: 15,
                    zIndex: pos + 1,
                  };
                return card;
              }),
            300 + 50 * Math.abs(i - pos - first)
          );

          tmp.push(i);
          i++;

          if (i < first + half) {
            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === i) {
                    cardi = card.value;
                    return { ...card, top: 115 };
                  }
                  return card;
                }),
              400
            );
          }
        } else {
          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === j)
                  return {
                    ...card,
                    left: left + m + 57 * pos,
                    top: 15,
                    zIndex: pos + 1,
                  };
                return card;
              }),
            300 + 50 * Math.abs(j - pos - first)
          );

          tmp.push(j);
          j++;

          if (j < laster) {
            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === j) {
                    cardj = card.value;
                    return { ...card, top: 115 };
                  }
                  return card;
                }),
              400
            );
          }
        }

        await sync();

        pos++;
      }

      // On finit de traiter la liste non vide

      if (i < first + half) {
        while (i < first + half) {
          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === i)
                  return {
                    ...card,
                    left: left + m + 57 * pos,
                    top: 15,
                    zIndex: pos + 1,
                  };
                return card;
              }),
            200 + 50 * Math.abs(i - pos - first)
          );

          console.log(6);

          tmp.push(i);
          i++;
          pos++;
        }
      } else {
        // j < r
        while (j < laster) {
          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === j)
                  return {
                    ...card,
                    left: left + m + 57 * pos,
                    top: 15,
                    zIndex: pos + 1,
                  };
                return card;
              }),
            200 + 50 * Math.abs(j - pos - first)
          );

          console.log(7);

          tmp.push(j);
          j++;
          pos++;
        }
      }

      // On réordonne

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index >= first && index < laster)
              return cards[tmp[index - first]];
            return card;
          }),
        0
      );

      // On redescend le tout

      await change(
        (cards) =>
          cards.map((card, index) => {
            return {
              ...card,
              top: n < 13 ? 135 : 145,
              zIndex: 0,
              left: n < 13 ? card.left : 60 * index + 37,
            };
          }),
        400
      );
    }

    async function aux(left, right, first, laster) {
      const n = laster - first;

      if (n <= 1) return;

      const half = Math.floor(n / 2 + 0.75);
      const m = (right - left + 2 - 57 * n) / 2;
      const mid = left + m + 57 * half - 2;

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index >= first && index < first + half)
              return { ...card, left: left + m / 2 + 57 * (index - first) };
            if (index >= first + half && index < laster)
              return {
                ...card,
                left: mid + m / 2 + 57 * (index - first - half),
              };
            return card;
          }),
        400
      );

      if (n > 2) {
        await sync();
      }

      await aux(left, mid, first, first + half);
      await aux(mid, right, first + half, laster);

      await merge(left, right, first, laster);
    }

    await aux(0 - 20, 849 + 20, 0, 13);
  }

  return <Mat countOfCards={countOfCards} sort={mergeSort} />;
}
