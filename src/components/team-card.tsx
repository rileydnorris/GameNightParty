import { useEffect, useState } from "react";
import { Player, Team } from "@types";
import { PlayerCard } from "@components";
import { AvatarImage, Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pencil, Save, Trash2, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getPlayersById, getUnassignedPlayers } from "../lib/utils";

interface TeamCardProps {
  onSave: (team: Team) => void;
  onRemove: (index: number) => void;
  onRemovePlayer: (id: string) => void;
  team: Team;
  index: number;
}

export default function TeamCard(props: TeamCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [team, setTeam] = useState<Team>();
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  const [index, setIndex] = useState<number>(props.index);

  useEffect(() => {
    setIndex(props.index);
    setTeam(props.team);
    setTeamPlayers(getPlayersById(props.team.playerIds));
    if (props.team && props.team.name === undefined) {
      setIsEditing(true);
    }
  }, [props]);

  const save = (formData: FormData) => {
    const updatedTeam = team;
    if (updatedTeam) {
      updatedTeam.name = (formData.get("name") ?? "") as string;
      updatedTeam.playerIds = teamPlayers.map((p) => p.id);
      props.onSave(updatedTeam);
      setIsEditing(false);
    }
  };

  const addPlayer = (id: string) => {
    const updatedTeam = team;
    if (updatedTeam && !updatedTeam.playerIds.includes(id)) {
      updatedTeam?.playerIds.push(id);
      props.onSave(updatedTeam);
    }
  };

  return (
    <Card className="mb-3">
      {/* Header */}
      {!isEditing && (
        <CardHeader>
          <div className="w-full grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
            <Avatar className="flex h-10 w-10 overflow-hidden rounded-full self-center">
              <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
            </Avatar>
            <p className="font-extrabold">{team?.name ?? "Loading"}</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => props.onRemove && props.onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent>
        {/* Editing */}
        {isEditing && (
          <form action={save} className="py-6">
            <div className="w-full grid grid-cols-[auto_1fr_auto] gap-6">
              <Avatar className="flex h-10 w-10 overflow-hidden rounded-full self-center">
                <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
              </Avatar>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Halloweiners"
                  defaultValue={team?.name}
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="self-end"
                size="icon"
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        {/* Players */}
        <Separator className="mb-3"></Separator>
        <div className="flex flex-row">
          <p className="my-3">Players:</p>
          <Popover>
            <PopoverTrigger className="ml-auto">
              <Button variant="outline" size="icon">
                <UserPlus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-row gap-2">
              <Select onValueChange={addPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player to add" />
                </SelectTrigger>
                <SelectGroup>
                  <SelectContent>
                    {getUnassignedPlayers().map((player, i) => (
                      <SelectItem key={i} value={player.id}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectGroup>
              </Select>
            </PopoverContent>
          </Popover>
        </div>
        {teamPlayers.map((player, i) => (
          <PlayerCard key={i} name={player.name} index={i}></PlayerCard>
        ))}
      </CardContent>
    </Card>
  );
}
