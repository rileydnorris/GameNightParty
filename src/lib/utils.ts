import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Player, Team } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uniqueId() {
  return parseInt(`${Date.now() * Math.random()}`).toString();
}

export function getPlayers(): Player[] {
  return JSON.parse(window.sessionStorage.getItem("players") ?? "[]");
}

export function getTeams(): Team[] {
  return JSON.parse(window.sessionStorage.getItem("teams") ?? "[]");
}

export function getUnassignedPlayers() {
  const teams = JSON.parse(window.sessionStorage.getItem("teams") ?? "[]");
  const players = JSON.parse(window.sessionStorage.getItem("players") ?? "[]");

  const unassignedPlayers: Player[] = [];
  const assignedMap: { [key: string]: boolean } = {};
  teams.forEach((team: Team) => {
    team.playerIds.forEach((id) => (assignedMap[id] = true));
  });

  players.forEach((player: Player) => {
    if (!assignedMap[player.id]) unassignedPlayers.push(player);
  });
  return unassignedPlayers;
}

export function getPlayersById(ids: string[]) {
  const players = JSON.parse(
    window.sessionStorage.getItem("players") ?? "[]"
  ) as Player[];
  return players.filter((p) => ids.includes(p.id));
}
