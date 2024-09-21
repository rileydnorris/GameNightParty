"use client";
import { useEffect, useState } from "react";
import { Team, Player } from "@types";
import { TeamCard, PlayerCard } from "@components";
import { getUnassignedPlayers, uniqueId } from "@utils";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTeams(JSON.parse(window.sessionStorage.getItem("teams") ?? "[]") ?? []);
    setUnassignedPlayers(getUnassignedPlayers());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading)
      window.sessionStorage.setItem("teams", JSON.stringify(teams));
    setUnassignedPlayers(getUnassignedPlayers());
  }, [teams, isLoading]);

  const addTeam = () => {
    setTeams([...teams, { id: uniqueId(), playerIds: [] }]);
  };

  const updateTeam = (updatedTeam: Team) => {
    const updatedTeams = teams;
    const i = updatedTeams.findIndex((t) => t.id === updatedTeam.id);
    updatedTeams[i] = updatedTeam;
    setTeams([...updatedTeams]);
  };

  const removeTeam = (index: number) => {
    const updatedTeams = teams;
    updatedTeams.splice(index, 1);
    setTeams([...updatedTeams]);
  };

  const removeTeamPlayer = (id: string) => {};

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
                team={team}
                onRemove={removeTeam}
                onRemovePlayer={removeTeamPlayer}
                onSave={updateTeam}
                index={i}
              ></TeamCard>
            </div>
          );
        })}
      </span>

      {/* Unassigned Players */}
      {unassignedPlayers.length !== 0 && (
        <span>
          <hr className="my-6"></hr>
          <p className="text-md font-bold">Unassigned Players</p>
          {unassignedPlayers.map((player, i) => (
            <div className="w-2/5" key={i}>
              <PlayerCard name={player.name} index={i}></PlayerCard>
            </div>
          ))}
        </span>
      )}
    </div>
  );
}
