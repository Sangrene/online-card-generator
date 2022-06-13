import React, { useReducer, useState } from "react";
import { nanoid } from "nanoid";
import { PlusCircleIcon } from "@heroicons/react/solid";

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
          p.id === action.type ? { id: p.id, name: action.name } : p
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

  return (
    <div className="shadow sm:rounded-md">
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Players
              </label>
              <button
                className="flex px-3 py-2 bg-red-500 mr-1 text-white font-semibold rounded"
                onClick={() => dispatch({ type: "addPlayer" })}
              >
                <PlusCircleIcon />
                <span className="ml-1">Add Player</span>
              </button>
            </div>
            <div className="mt-1 flex rounded-md shadow-sm">
              {state.players.map((player) => (
                <input
                  key={player.id}
                  type="text"
                  name="company-website"
                  id="company-website"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="John"
                  value={player.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGameForm;
