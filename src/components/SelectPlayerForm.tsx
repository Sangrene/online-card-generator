import React from "react";

interface SelectPlayerForm {
  players: string[];
  setSelectedPlayer: (p: string) => void;
}

const SelectPlayerForm = ({ players, setSelectedPlayer }: SelectPlayerForm) => {
  return (
    <div>
      <label
        htmlFor="players"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Select your pseudo
      </label>
      <select
        id="players"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setSelectedPlayer(e.target.value)}
      >
        <option selected>Choose your pseudo</option>
        {players.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPlayerForm;
