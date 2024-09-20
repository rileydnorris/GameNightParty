import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { AvatarImage, Avatar } from "./ui/avatar";
import { Pencil, Trash2 } from "lucide-react";

interface PlayerCardProps {
  onSave?: (name: string, index: number, icon?: string) => void;
  onRemove?: (index: number) => void;
  name?: string;
  index: number;
  canEdit?: boolean;
}

export default function PlayerCard(props: PlayerCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [index, setIndex] = useState<number>(props.index);

  useEffect(() => {
    setName(props.name);
    setIndex(props.index);
    if (props.name === undefined) {
      setIsEditing(true);
    }
  }, [props]);

  const save = (formData: FormData) => {
    const name: string = (formData.get("name") ?? "") as string;
    if (props.onSave) props.onSave(name, props.index);
    setIsEditing(false);
  };

  return (
    <div className="p-3">
      {isEditing ? (
        <form action={save}>
          <div className="w-full grid grid-cols-[auto_1fr_auto] gap-6">
            <Avatar className="flex h-10 w-10 overflow-hidden rounded-full self-center">
              <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
            </Avatar>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Thicc & Juicy"
                defaultValue={name}
              />
            </div>
            <Button type="submit" variant="outline" className="self-end">
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="w-full grid grid-cols-[auto_1fr_auto_auto] gap-6 items-center">
          <Avatar className="flex h-10 w-10 overflow-hidden rounded-full self-center">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
          </Avatar>
          <p>{name}</p>
          {props.canEdit && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {props.canEdit && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => props.onRemove && props.onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
