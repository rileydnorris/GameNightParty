"use client";
import { Player } from "@types";
import { useEffect, useState } from "react";
import { PlayerCard } from "@components";
import { uniqueId } from "@utils";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setPlayers(
      JSON.parse(window.sessionStorage.getItem("players") ?? "[]") ?? []
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading)
      window.sessionStorage.setItem("players", JSON.stringify(players));
  }, [players, isLoading]);

  const savePlayer = (name: string, index: number, icon?: string) => {
    const updatedPlayers = players;
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      name,
      icon,
    };
    setPlayers([...updatedPlayers]);
  };

  const removePlayer = (index: number) => {
    const updatedPlayers = players;
    updatedPlayers.splice(index, 1);
    setPlayers([...updatedPlayers]);
  };

  const addPlayer = () => {
    setPlayers([...players, { id: uniqueId() }]);
  };

  return (
    <div className="container">
      <span className="flex flex-row">
        <h2 className="text-lg font-bold mb-5">Add Players</h2>
        <Button onClick={addPlayer} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Add player
        </Button>
      </span>
      {players.map((player, i) => (
        <div className="min-w-[500px] max-w-[600px]" key={i}>
          <PlayerCard
            name={player.name}
            onSave={savePlayer}
            onRemove={removePlayer}
            index={i}
            canEdit={true}
          ></PlayerCard>
        </div>
      ))}
    </div>
  );
}
