"use client";
import { useEffect, useState } from "react";
import { Team, Player } from "@types";
import { TeamCard, PlayerCard } from "@components";
import { uniqueId } from "@utils";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTeams(JSON.parse(window.sessionStorage.getItem("teams") ?? "[]") ?? []);
    setPlayers(
      JSON.parse(window.sessionStorage.getItem("players") ?? "[]") ?? []
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading)
      window.sessionStorage.setItem("teams", JSON.stringify(teams));
  }, [teams, isLoading]);

  const addTeam = () => {
    setTeams([...teams, { id: uniqueId(), playerIds: [] }]);
  };

  const updateTeam = (name: string, index: number, playerIds: string[]) => {
    const updatedTeams = teams;
    updatedTeams[index] = {
      ...updatedTeams[index],
      playerIds,
      name,
    };
    setTeams([...updatedTeams]);
  };

  const removeTeam = (index: number) => {
    const updatedTeams = teams;
    updatedTeams.splice(index, 1);
    setTeams([...updatedTeams]);
  };

  const removeTeamPlayer = (id: string) => {};

  const getUnassignedPlayers = () => {
    const unassignedPlayers: Player[] = [];
    const assignedMap: { [key: string]: boolean } = {};
    teams.forEach((team) => {
      team.playerIds.forEach((id) => (assignedMap[id] = true));
    });

    players.forEach((player) => {
      if (!assignedMap[player.id]) unassignedPlayers.push(player);
    });
    return unassignedPlayers;
  };

  return (
    <div className="container">
      {/* Header */}
      <span className="flex flex-row items-center mb-4">
        <h2 className="text-lg font-bold mb-5">Add Teams</h2>
        <Button onClick={addTeam} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Add team
        </Button>
      </span>

      {/* Team Cards */}
      {teams.length === 0 && (
        <p className="my-3">
          No teams yet, add one by clicking the button above
        </p>
      )}
      <span className="flex flex-wrap gap-5">
        {teams.map((team, i) => {
          return (
            <div className="w-[48%]" key={i}>
              <TeamCard
                name={team.name}
                onRemove={removeTeam}
                onRemovePlayer={removeTeamPlayer}
                onSave={updateTeam}
                players={players}
                index={i}
              ></TeamCard>
            </div>
          );
        })}
      </span>

      {/* Unassigned Players */}
      <hr className="my-6"></hr>
      <p className="text-md font-bold">Unassigned Players</p>
      {getUnassignedPlayers().length === 0 && (
        <p className="my-3">No unassigned players!</p>
      )}
      {getUnassignedPlayers().map((player, i) => (
        <div className="w-2/5" key={i}>
          <PlayerCard name={player.name} index={i}></PlayerCard>
        </div>
      ))}
    </div>
  );
}
