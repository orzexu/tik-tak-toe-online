import cuid from 'cuid'
import { PlayerEntity } from '../domain'
import { gameRepository } from '../repositories/game'
import { left, right } from '@/shared/lib/either'

export async function createGame(player: PlayerEntity) {
	const playerGames = await gameRepository.gamesList({
		players: { some: { id: player.id } },
		status: 'idle',
	})

  const isGameInIdleStatus = playerGames.some(
    game => game.status === 'idle' && game.creator.id === player.id
  )

	if (isGameInIdleStatus) {
		return left('You already have an idle game' as const)
	}

	const createdGame = await gameRepository.createGame({
		id: cuid(),
    field: Array(9).fill(null),
		creator: player,
		status: 'idle',
	})

	return right(createdGame)
}
