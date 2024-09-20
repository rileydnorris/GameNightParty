import { useEffect, useState } from "react";

interface PlayerCardProps {
  onSave: (name: string, index: number, icon?: string) => void;
  onRemove: (index: number) => void;
  name: string;
  index: number;
}

export default function PlayerCard(props: PlayerCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [index, setIndex] = useState<number>(props.index);

  useEffect(() => {
    console.log("Setting name");
    setName(props.name);
    setIndex(props.index);
    if (props.name === undefined) {
      setIsEditing(true);
    }
  }, [props]);

  const save = (formData: FormData) => {
    const name: string = (formData.get("name") ?? "") as string;
    props.onSave(name, props.index);
    setIsEditing(false);
  };

  return (
    <div className="w-2/5 p-5 light:bg-slate-200 dark:bg-slate-900 shadow-lg rounded-md mb-3">
      {isEditing ? (
        <form action={save}>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <div className="w-full grid grid-cols-[1fr_auto] gap-4">
            <input
              id="name"
              name="name"
              placeholder="Thicc & Juicy"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            <button
              type="submit"
              className="w-min text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full grid grid-cols-[1fr_auto_auto] gap-4">
          <p>{name}</p>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={() => props.onRemove(index)}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
