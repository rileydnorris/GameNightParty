import GameSelectCard from "../../components/game-select-card";

export default function GameSelectPage() {
  return (
    <GameSelectCard
      name="Family Feud"
      description="Two teams battle it out and shock a mustached man in the process"
      numTeams="2"
      numPlayers="2-16"
      location="/family-feud"
    ></GameSelectCard>
  );
}
