import { decode, encode } from "../encoder";

interface GameParams {
  players: string[];
  numberOfCardsToDistribute?: number;
}

interface Game {
  distribution: {
    [key: string]: string[];
  };
}

const CARD_NUMBERS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const CARD_COLORS = ["c", "d", "h", "s"];

/**
 * As clubs_02 or spades_A
 */
export const CARD_DECK = CARD_COLORS.reduce<string[]>(
  (deck, color) => [
    ...deck,
    ...CARD_NUMBERS.map((number) => `${color}_${number}`),
  ],
  []
);

export const createGameHash = (game: Game): string => {
  return encode(new TextEncoder().encode(JSON.stringify(game)));
};

export const getGameFromHash = (hash: string): Game => {
  const decoded = new TextDecoder().decode(decode(hash));
  const game: Game = JSON.parse(decoded);
  return game;
};

export const createGameDistribution = ({
  numberOfCardsToDistribute = 52,
  players,
}: GameParams): Game => {
  const cardLeftToDistributes = [...CARD_DECK];
  let numberOfCardLeftToDistributes = numberOfCardsToDistribute;
  const distribution: Game["distribution"] = players.reduce(
    (acc, player) => ({ ...acc, [player]: [] }),
    {}
  );
  for (let i = 0, n = numberOfCardsToDistribute; i < n; i++) {
    const currentPlayer = players[i % players.length];
    const randomIndex = Math.random() * numberOfCardLeftToDistributes;
    const card = cardLeftToDistributes
      .filter((c) => !!c)
      .splice(randomIndex, 1)[0];
    distribution[currentPlayer].push(card);
  }

  return {
    distribution,
  };
};
