import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await prisma.game.findMany();

  return (
    <div>
      <Button>hello</Button>
      {games.map((game) => (
        <Card key={game.id}>
          <CardHeader>
            <CardTitle>{game.name}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
