import { Alert, AlertDescription } from '@/shared/ui/alert'
import { AlertCircle } from 'lucide-react'

export function ErrorMessage({ error }: { error?: string }) {
	if (error) {
		return (
			<Alert variant={'destructive'} className="border-destructive">
				<AlertCircle />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		)
	}
  return null
}
