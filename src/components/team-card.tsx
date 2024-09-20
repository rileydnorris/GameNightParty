import { useEffect, useState } from "react";
import { Player } from "@types";
import { PlayerCard } from "@components";
import { AvatarImage, Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface TeamCardProps {
  onSave: (name: string, index: number, playerIds: string[]) => void;
  onRemove: (index: number) => void;
  onRemovePlayer: (id: string) => void;
  name?: string;
  index: number;
  players: Player[];
}

export default function TeamCard(props: TeamCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [index, setIndex] = useState<number>(props.index);

  useEffect(() => {
    setName(props.name);
    setIndex(props.index);
    setPlayers(props.players);
    if (props.name === undefined) {
      setIsEditing(true);
    }
  }, [props]);

  const save = (formData: FormData) => {
    const name: string = (formData.get("name") ?? "") as string;
    props.onSave(
      name,
      props.index,
      players.map((p) => p.id)
    );
    setIsEditing(false);
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
            <p className="font-extrabold">{name}</p>
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
          <form action={save} className="p-6">
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
                  defaultValue={name}
                />
              </div>
              <Button type="submit" variant="outline" className="self-end">
                Save
              </Button>
            </div>
          </form>
        )}

        {/* Players */}
        <hr className="mb-3"></hr>
        <p className="my-3">Players:</p>
        {players.map((player, i) => (
          <PlayerCard key={i} name={player.name} index={i}></PlayerCard>
        ))}
      </CardContent>
    </Card>
  );
}
