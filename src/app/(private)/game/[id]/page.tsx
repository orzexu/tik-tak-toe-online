import { Game } from '@/features/game/server'

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className="flex flex-col grow pt-20 w-full max-w-[400px] mx-auto">
			<Game gameId={id} />
		</div>
	)
}
