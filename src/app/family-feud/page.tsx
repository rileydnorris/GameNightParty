"use client";
import { useEffect, useState } from "react";
import Scorebar from "../../components/scorebar";
import { Team } from "../../types";
import FamilyFeudGame from "../../types/FamilyFeudGame";
import { getTeams } from "../../lib/utils";

export default function FamilyFeudPage() {
  const [gameInfo, setGameInfo] = useState<FamilyFeudGame>();
  const [teamOne, setTeamOne] = useState<Team>();
  const [teamTwo, setTeamTwo] = useState<Team>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const gameInfo = JSON.parse(
      window.sessionStorage.getItem("familyFeudTeams") ?? "{}"
    ) as FamilyFeudGame;
    setGameInfo(gameInfo);

    const teamOne = getTeams().find((t) => t.id === gameInfo.teamOneId);
    setTeamOne(teamOne);

    const teamTwo = getTeams().find((t) => t.id === gameInfo.teamTwoId);
    setTeamTwo(teamTwo);

    setIsLoading(false);
  }, []);

  return (
    !isLoading && (
      <Scorebar
        teamOne={teamOne!}
        teamTwo={teamTwo!}
        teamOneScore={gameInfo?.teamOneScore ?? 0}
        teamTwoScore={gameInfo?.teamTwoScore ?? 0}
      ></Scorebar>
    )
  );
}
