import Image from "next/image";
import React from "react";
import { computeCardImageName } from "../core/core";

interface CardBoardProps {
  name: string;
  distribution: string[];
}

const CardBoard = ({ name, distribution }: CardBoardProps) => {
  return (
    <div className="grid gap-3 grid-cols-4 grid-rows-3">
      {distribution.map((card) => (
        <div className="" key={card}>
          <Image
            key={card}
            src={`/cards/${computeCardImageName(card)}`}
            alt={computeCardImageName(card)}
            width={64}
            height={64}
            layout="responsive"
          />
        </div>
      ))}
    </div>
  );
};

export default CardBoard;
