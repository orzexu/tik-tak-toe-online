import { useState, useEffect } from 'react'

export function useEventsSource<T>(url: string) {
  const [isPending, setIsPending] = useState(true)
	const [data, setData] = useState<T>()
  const [error, setError] = useState<unknown | undefined>()

	useEffect(() => {
		const gameEvents = new EventSource(url)

		gameEvents.addEventListener('message', message => {
			try {
        setIsPending(false)
				setData(JSON.parse(message.data))
        setError(undefined)
			} catch(e) {
				setError(e)
			}
		})

    gameEvents.addEventListener('error', (e) => {
      setError(e)
    })

		return () => gameEvents.close()
	}, [url])

	return {
    dataStream: data,
    error,
    isPending,
  }
}
