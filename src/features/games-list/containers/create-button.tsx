'use client'

import { Button } from '@/shared/ui/button'
import { createGameAction } from '../actions/create-game'
import { matchEither, right } from '@/shared/lib/either'
import { useActionState } from '@/shared/lib/react'
import { startTransition } from 'react'

export function CreateButton() {
	const [data, dispatch, isPending] = useActionState(
		createGameAction,
		right(undefined)
	)

	return (
		<div className='flex flex-col gap-1'>
			<Button className='cursor-pointer' disabled={isPending} onClick={() => startTransition(dispatch)}>
				Создать игру
			</Button>
			{matchEither(data, {
				right: () => null,
				left: (e) => ({
					['User not found']: 'Пользователь не найден',
					['You already have an idle game']: 'Вы уже создали игру и ожидаете',
				})[e],
			})}
		</div>
	)
}
