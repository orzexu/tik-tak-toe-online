import { Connection, Channel } from 'amqplib'
import amqplib from 'amqplib'

let connection: Connection | undefined = undefined

export class EventsChannel {
	constructor(private channelName: string) {}

	async createChannel(): Promise<Channel> {
		if (!connection) {
			connection = await amqplib.connect(process.env.MB_URL!)
		}

		const channel = await connection.createChannel()
		await channel.assertExchange(this.channelName, 'direct', {
			durable: false,
		})

		return channel
	}

	async emit(key: string, data: Record<string, unknown>): Promise<void> {
		const channel = await this.createChannel()

		channel.publish(
			this.channelName,
			key,
			Buffer.from(
				JSON.stringify({
					...data,
					date: new Date(),
				})
			)
		)
	}

	async consume(
		key: string,
		listener: (data: unknown) => Promise<void> | void
	): Promise<() => Promise<void>> {
		const channel = await this.createChannel()

		const queue = await channel.assertQueue('', { exclusive: true })
		await channel.bindQueue(queue.queue, this.channelName, key)

		const consumer = await channel.consume(queue.queue, async data => {
			if (data) {
				await listener(JSON.parse(data.content.toString()))
				channel.ack(data)
			}
		})

		return async () => {
			await channel.cancel(consumer.consumerTag)
			await channel.close()
		}
	}
}
