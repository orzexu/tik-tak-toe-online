import { gameEvents, getIdleGames } from '@/entities/game/server'
import { getCurrentUser } from '@/entities/user/server'
import { sseStream } from '@/shared/lib/sse/server'
import { NextRequest } from 'next/server'

export async function getGamesStreamRoute(req: NextRequest) {
	const user = await getCurrentUser()

	if (!user) {
		return new Response(`Game not found`, {
			status: 404,
		})
	}

	const { addCloseListener, response, write } = sseStream(req)
  write(await getIdleGames())


	addCloseListener(await gameEvents.addGamesCreatedListener(async () => {
    write(await getIdleGames())
  }))

	return response
}
