import React, { useState, useContext } from "react";
import Carte from "@components/UI/carte.jsx";
import { Button, Icon, Segment } from "semantic-ui-react";

import { DurationContext, DurationProvider } from "@contexts/animContext.js";

import { AnimButton } from "@components/animbutton.jsx";

function Mat({ cards }) {
  return (
    <div
      style={{
        position: "relative" /* it is a container */,
        width: "849px !important",
        height: "250px",
      }}
    >
      {cards.map((card, index) => (
        <Carte {...card} key={index} />
      ))}
    </div>
  );
}

function generateCards(len = 50) {
  const items = [...Array(len).keys()];

  // initialize random values
  let cnt = 1;

  let cards = items.map((index) => {
    cnt = cnt + Math.floor(Math.random() * 6);
    return {
      id: index,
      value: cnt,
      top: 145,
      left: 60 * index + 37,
      zIndex: 1,
      rotate: 2 * Math.random() - 1,
      pos: "",
    };
  });

  // pre-shuffle cards
  for (let i = len - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    if (j < i) {
      let x = cards[i].value;
      cards[i].value = cards[j].value;
      cards[j].value = x;
    }
  }

  return cards;
}

function SortBox2({ countOfCards, sort }) {
  const [animButtonDisabled, setAnimButtonDisabled] = useState(false);
  const [shuffleButtonDisabled, setShuffleButtonDisabled] = useState(false);
  const [cards, setCards] = useState(generateCards(countOfCards));
  const [duration, setDuration] = useContext(DurationContext);

  async function animState(updateState, d) {
    setDuration(d);
    updateState();
    await new Promise((resolve) => setTimeout(resolve, d * 1.1));
  }

  async function changeCards(cardChanger, d) {
    await animState(() => {
      setCards(cardChanger);
    }, d);
  }

  async function anim(waiter) {
    await waiter();
    setShuffleButtonDisabled(true);
    await sort(waiter, changeCards);
    setShuffleButtonDisabled(false);
  }

  async function shuffle() {
    setAnimButtonDisabled(true);
    setShuffleButtonDisabled(true);

    await changeCards(
      (cards) =>
        cards.map((card) => {
          return {
            ...card,
            pos: "",
          };
        }),
      0
    );

    for (let i = countOfCards - 1; i >= 1; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      if (j < i) {
        await changeCards(
          (cards) =>
            cards.map((card, index) => {
              if (index === i)
                return {
                  ...card,
                  top: 45,
                };
              return card;
            }),
          200
        );

        await changeCards(
          (cards) =>
            cards.map((card, index) => {
              if (index === j)
                return {
                  ...card,
                  left: 60 * i + 37,
                  zIndex: 8,
                };
              return card;
            }),
          50 + 25 * Math.abs(1 + i - j)
        );

        await changeCards(
          (cards) =>
            cards.map((card, index) => {
              if (index === i)
                return {
                  ...card,
                  top: 145,
                  left: 60 * j + 37,
                  zIndex: 8,
                };
              return card;
            }),
          50 + 25 * Math.abs(2 + i - j)
        );

        await changeCards(
          (cards) =>
            cards.map((card, index) => {
              if (index === i) return { ...cards[j], zIndex: 1 };
              if (index === j) return { ...cards[i], zIndex: 1 };
              return card;
            }),
          0
        );
      }
    }

    setAnimButtonDisabled(false);
    await changeCards(
      (cards) =>
        cards.map((card, index) => {
          return {
            ...card,
            pos: index + 1,
          };
        }),
      0
    );
    setShuffleButtonDisabled(false);
  }

  return (
    <Segment.Group>
      <Segment secondary>
        <Mat cards={cards} />
      </Segment>
      <Segment>
        <Button
          icon
          labelPosition="right"
          onClick={shuffle}
          disabled={shuffleButtonDisabled}
        >
          Mélanger
          <Icon name="random" />
        </Button>
        <AnimButton name="Trier" anim={anim} disabled={animButtonDisabled} />
      </Segment>
    </Segment.Group>
  );
}

function SortBox({ countOfCards, sort }) {
  return (
    <DurationProvider>
      <SortBox2 countOfCards={countOfCards} sort={sort} />
    </DurationProvider>
  );
}

export default SortBox;
