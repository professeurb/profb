import Mat from "./mat.jsx";

export default function QuickSort({ countOfCards }) {
  async function quickSort(sync, change) {
    async function aux(left, right, first, laster) {
      const n = laster - first;

      if (n <= 1) {
        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index === first) return { ...card, left: left, top: 145 };
              return card;
            }),
          100
        );

        await sync();

        return;
      }

      let leftTight = left + 55 + (4 - left - 57 * n + right) / 2;

      // Select pivot

      let pivot = 0;

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index === first) {
              pivot = card.value;
              return { ...card, top: 15, left: left, zIndex: 8 };
            }
            if (index > first && index < laster)
              return {
                ...card,
                top: 95,
                left: leftTight + 57 * (index - first - 1),
              };
            return card;
          }),
        400
      );

      let posLeft = first + 1;
      let posRight = laster;

      // Invariant:
      // posLeft - 1 is empty
      // everything < posLeft - 1 is smaller than the pivot
      // everything >= posRight is greater than the pivot

      while (posLeft < posRight) {
        // First, we look at posLeft

        let valPosLeft = 0;

        await change(
          (cards) =>
            cards.map((card, index) => {
              if (index === posLeft) {
                valPosLeft = card.value;
                return { ...card, top: 65 };
              }
              return card;
              s;
            }),
          400
        );

        await sync();

        while (posLeft < posRight && valPosLeft <= pivot) {
          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === posLeft - 1) return cards[posLeft];
                if (index === posLeft) return cards[posLeft - 1];
                return card;
              }),
            0
          );

          await change(
            (cards) =>
              cards.map((card, index) => {
                if (index === posLeft - 1) {
                  return {
                    ...card,
                    left: left + 57 * (posLeft - first - 1),
                    top: 125,
                    zIndex: 4,
                  };
                }
                return card;
              }),
            400
          );

          posLeft += 1;

          if (posLeft < posRight) {
            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === posLeft) {
                    valPosLeft = card.value;
                    return { ...card, top: 65 };
                  }
                  return card;
                }),
              400
            );
          }

          await sync();
        }

        // either posLeft == posRight
        // or posLeft < posRight && cards[posLeft] > pivot

        if (posLeft < posRight) {
          posRight -= 1;

          let valPosRight = 0;

          while (posRight > posLeft) {
            // console.log('B')

            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === posRight) {
                    valPosRight = card.value;
                    return { ...card, top: 65 };
                  }
                  return card;
                }),
              400
            );

            await sync();

            if (valPosRight > pivot) {
              await change(
                (cards) =>
                  cards.map((card, index) => {
                    if (index === posRight)
                      return {
                        ...card,
                        left: right - 60 - 57 * (laster - 1 - posRight),
                        top: 125,
                      };
                    return card;
                  }),
                400
              );
              posRight -= 1;
            } else {
              break;
            }
          }

          // We have card at posLeft > pivot and
          // either posRight = posLeft or
          // card at posRight < pivot

          if (posLeft < posRight) {
            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === posRight) {
                    return {
                      ...card,
                      left: left + 57 * (posLeft - first - 1),
                      top: 125,
                      zIndex: 6,
                    };
                  }
                  return card;
                }),
              300 + 50 * (posRight - posLeft + 1)
            );

            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === posLeft - 1) return cards[posRight];
                  if (index === posLeft) return cards[posLeft - 1];
                  if (index === posRight) return cards[posLeft];
                  return card;
                }),
              0
            );

            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === posLeft - 1) {
                    return { ...card, zIndex: 1 };
                  }
                  if (index === posRight) {
                    return {
                      ...card,
                      left: right - 60 - 57 * (laster - 1 - posRight),
                      top: 125,
                      zIndex: 6,
                    };
                  }
                  return card;
                }),
              300 + 50 * (posRight - posLeft + 1)
            );

            posLeft += 1;
          } else {
            // posLeft === posRight
            await sync();
            await change(
              (cards) =>
                cards.map((card, index) => {
                  if (index === posLeft) {
                    return {
                      ...card,
                      left: right - 60 - 57 * (laster - 1 - posRight),
                      top: 125,
                    };
                  }
                  return card;
                }),
              400
            );
          }
        }
      }

      await change(
        (cards) =>
          cards.map((card, index) => {
            if (index === posLeft - 1) {
              return {
                ...card,
                left: left + 60 * (posLeft - 1 - first),
                top: 145,
                zIndex: 8,
              };
            }
            return { ...card, zIndex: 1 };
          }),
        300 + 50 * (posLeft - 1 - first)
      );

      await sync();

      await aux(left, left + 60 * (posLeft - 1 - first), first, posLeft - 1);
      await aux(left + 60 * (posLeft - first), right, posLeft, laster);
    }

    await aux(37, 60 * 13 + 37, 0, 13);
  }

  return <Mat countOfCards={countOfCards} sort={quickSort} />;
}
