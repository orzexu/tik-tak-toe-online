import { GamesList } from "@/features/games-list/server";

export default function Home() {


  return (
    <div className="container mx-auto flex flex-col gap-8 pt-[100px]">
      <h1 className="text-4xl font-bold">Список игр</h1>
      <GamesList />
    </div>
  );
}
