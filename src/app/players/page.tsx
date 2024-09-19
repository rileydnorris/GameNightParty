"use client";
import { Player } from "@types";
import { useState } from "react";
import PlayerCard from "../../components/player-card";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  const save = (name: string, index: number, icon?: string) => {
    const updatedPlayers = players;
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      name,
      icon,
    };
    setPlayers([...updatedPlayers]);
  };

  const addPlayer = () => {
    setPlayers([...players, { name: undefined }]);
  };

  return (
    <div className="container">
      <h2 className="text-lg font-bold mb-5">Add Players</h2>
      {players.map((player, i) => (
        <PlayerCard
          key={i}
          name={player.name}
          onSave={save}
          index={i}
        ></PlayerCard>
      ))}
      <button type="button" onClick={addPlayer}>
        Add a player
      </button>
    </div>
  );
}
