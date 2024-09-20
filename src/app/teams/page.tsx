"use client";
import { useEffect, useState } from "react";
import { Team, Player } from "@types";
import { TeamCard, PlayerCard } from "@components";
import { uniqueId } from "@utils";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(
      JSON.parse(window.sessionStorage.getItem("players") ?? "[]") ?? []
    );
  }, []);

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
    window.sessionStorage.setItem("teams", JSON.stringify([...updatedTeams]));
  };

  const removeTeam = (index: number) => {
    const updatedTeams = teams;
    updatedTeams.splice(index, 1);
    setTeams([...updatedTeams]);
  };

  const removeTeamPlayer = (id: string) => {};

  return (
    <div className="container">
      <h2 className="text-lg font-bold mb-5">Add Teams</h2>
      {teams.map((team, i) => {
        return (
          <div className="w-2/5" key={i}>
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
      <button type="button" onClick={addTeam}>
        Add a team
      </button>
      <p className="my-5">Unassigned Players</p>
      {players.map((player, i) => (
        <div className="w-2/5" key={i}>
          <PlayerCard name={player.name} index={i}></PlayerCard>
        </div>
      ))}
    </div>
  );
}
