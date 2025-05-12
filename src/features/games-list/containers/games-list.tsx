import { getIdleGames } from '@/entities/game/server'
import { Layout } from '../ui/layout'
import { GameCard } from '../ui/game-card'
import { CreateButton } from './create-button'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { routes } from '@/kernel/routes'

export async function GamesList() {
	const games = await getIdleGames()

	return (
		<Layout actions={<CreateButton/>}>
			{games.map(game => (
				<GameCard
					key={game.id}
					login={game.creator.login}
					rating={game.creator.rating}
          action={<Button asChild><Link href={routes.game(game.id)}>Подключиться</Link></Button>}
				/>
			))}
		</Layout>
	)
}
