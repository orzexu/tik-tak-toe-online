import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'

export function GameCard({ login, rating, action }: { login: string; rating: number, action: React.ReactNode }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Игра с {login}</CardTitle>
			</CardHeader>
			<CardContent>Рейтинг: {rating}</CardContent>
      <CardFooter>{action}</CardFooter>
		</Card>
	)
}
