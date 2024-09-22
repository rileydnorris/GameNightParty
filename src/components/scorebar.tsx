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
import { Avatar, AvatarImage } from "./ui/avatar";

interface ScorebarProps {
  teamOne: Team;
  teamTwo: Team;
  teamOneScore: number;
  teamTwoScore: number;
}

export default function Scorebar(props: ScorebarProps) {
  const [teamOneScore, setTeamOneScore] = useState<number>();
  const [teamTwoScore, setTeamTwoScore] = useState<number>();

  useEffect(() => {
    setTeamOneScore(props.teamOneScore);
    setTeamTwoScore(props.teamTwoScore);
  }, [props]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-4 items-center">
          <Avatar className="flex h-10 w-10 overflow-hidden rounded-full self-center">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
          </Avatar>
          <p className="font-extrabold ml-auto">
            {props.teamOne?.name ?? "Loading"}
          </p>
        </div>
        <p className="text-7xl font-extrabold">{teamOneScore}</p>
      </div>
      <div className="flex flex-col ml-auto items-center">
        <div className="flex flex-row gap-4 items-center">
          <p className="font-extrabold ml-auto">
            {props.teamTwo?.name ?? "Loading"}
          </p>
          <Avatar className="flex h-10 w-10 overflow-hidden rounded-full self-center">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
          </Avatar>
        </div>
        <p className="text-7xl font-extrabold">{teamTwoScore}</p>
      </div>
    </div>
  );
}
