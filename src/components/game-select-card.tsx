"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { ChevronRight, Drama, UsersRound } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Team } from "../types";
import { useEffect, useState } from "react";

interface GameSelectCardProps {
  name: string;
  description: string;
  numTeams: string;
  numPlayers: string;
  location: string;
}

export default function GameSelectCard(props: GameSelectCardProps) {
  const [teamOne, setTeamOne] = useState<Team>();
  const [teamTwo, setTeamTwo] = useState<Team>();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(JSON.parse(window.sessionStorage.getItem("teams") ?? "[]") ?? []);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(
      "familyFeudTeams",
      JSON.stringify({
        teamOneId: teamOne?.id,
        teamTwoId: teamTwo?.id,
        teamOneScore: 0,
        teamTwoScore: 0,
      })
    );
  }, [teamOne, teamTwo]);

  const selectTeamOne = (id: string) => {
    const team = teams.find((t) => t.id === id);
    if (team) setTeamOne(team);
    console.log("Team One: " + id);
  };

  const selectTeamTwo = (id: string) => {
    const team = teams.find((t) => t.id === id);
    if (team) setTeamTwo(team);
    console.log("Team Two: " + id);
  };

  return (
    <Popover>
      <PopoverTrigger className="ml-auto">
        <Card className="px-3 max-w-md">
          <CardHeader>
            <p className="text-lg font-bold">{props.name}</p>
          </CardHeader>
          <CardContent>
            <p className="mb-4 font-light text-sm">{props.description}</p>
            <span className="flex flex-row mb-3">
              <Drama className="mr-3"></Drama> {props.numTeams} Teams
            </span>
            <span className="flex flex-row">
              <UsersRound className="mr-3"></UsersRound> {props.numPlayers}{" "}
              Players
            </span>
          </CardContent>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="flex flex-row gap-2">
        <Select onValueChange={selectTeamOne}>
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              {teams
                .filter((t) => t.id !== teamTwo?.id)
                .map((team, i) => (
                  <SelectItem key={i} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectGroup>
        </Select>
        <Select onValueChange={selectTeamTwo}>
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              {teams
                .filter((t) => t.id !== teamOne?.id)
                .map((team, i) => (
                  <SelectItem key={i} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectGroup>
        </Select>
        <Link href={props.location}>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
}
