"use client";
import { Player } from "@types";
import { useEffect, useState } from "react";
import PlayerCard from "../../components/player-card";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(
      JSON.parse(window.sessionStorage.getItem("players") ?? "[]") ?? []
    );
  }, []);

  const savePlayer = (name: string, index: number, icon?: string) => {
    const updatedPlayers = players;
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      name,
      icon,
    };
    setPlayers([...updatedPlayers]);
    window.sessionStorage.setItem(
      "players",
      JSON.stringify([...updatedPlayers])
    );
  };

  const removePlayer = (index: number) => {
    const updatedPlayers = players;
    updatedPlayers.splice(index, 1);
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
          onSave={savePlayer}
          onRemove={removePlayer}
          index={i}
        ></PlayerCard>
      ))}
      <button type="button" onClick={addPlayer}>
        Add a player
      </button>
    </div>
  );
}
