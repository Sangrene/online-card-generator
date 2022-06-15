import React, { useEffect, useReducer, useState } from "react";
import { nanoid } from "nanoid";
import { PlusCircleIcon } from "@heroicons/react/solid";
import TextField from "./ui/TextField";
import Link from "next/link";
import { createGameDistribution, createGameHash } from "../core/core";

type State = {
  players: { id: string; name: string }[];
  numberOfCardsToDistribute: number;
};

type Action =
  | { type: "addPlayer" }
  | { type: "updatePlayer"; id: string; name: string }
  | { type: "removePlayer"; id: string }
  | { type: "updateNumberOfCardsToDistribute"; number: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "addPlayer": {
      return {
        ...state,
        players: [...state.players, { id: nanoid(), name: "" }],
      };
    }
    case "removePlayer": {
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.id),
      };
    }
    case "updatePlayer": {
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.id ? { id: p.id, name: action.name } : p
        ),
      };
    }
    case "updateNumberOfCardsToDistribute": {
      return { ...state, numberOfCardsToDistribute: action.number };
    }
  }
};

const DEFAULT_STATE: State = { players: [], numberOfCardsToDistribute: 52 };

const CreateGameForm = () => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  const [hash, setHash] = useState<string>();
  useEffect(() => {
    const game = createGameDistribution({
      players: state.players.map((p) => p.name),
      numberOfCardsToDistribute: state.numberOfCardsToDistribute,
    });
    setHash(createGameHash(game));
  }, [state]);

  return (
    <div className="shadow sm:rounded-md m-5 p-4">
      <div className="flex flex-row items-center">
        <label className="text-lg font-semibold text-gray-700">Players</label>
        <button
          type="button"
          className="text-blue-700 ml-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center mr-2  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => dispatch({ type: "addPlayer" })}
        >
          <PlusCircleIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4 flex flex-col rounded-md shadow-sm">
        {state.players.map((player) => (
          <TextField
            label={"Player name"}
            key={player.id}
            textFieldProps={{
              value: player.name,
              onChange: (e) =>
                dispatch({
                  type: "updatePlayer",
                  id: player.id,
                  name: e.target.value,
                }),
            }}
          />
        ))}
      </div>
      <div className="flex items-center content-between mt-4">
        <label className="text-lg font-semibold text-gray-700">
          Number of cards to distribute
        </label>
      </div>
      <input
        type="number"
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 mt-1"
        value={state.numberOfCardsToDistribute}
        onChange={(e) =>
          dispatch({
            type: "updateNumberOfCardsToDistribute",
            number: Number(e.target.value),
          })
        }
      />
      <Link href={`/game?hash=${hash}`}>Create distribution</Link>
    </div>
  );
};

export default CreateGameForm;
