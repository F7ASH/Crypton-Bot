import { ApplicationCommandData } from 'discord.js';
import { CryptonClient } from '../utils';
import { Event } from '../utils';

const OnReady = new Event({
	name: 'ready',
	once: true,
	run(client: CryptonClient) {
		client.emit('debug', 'Bot has started!');

		const data: ApplicationCommandData[] = [];

		client.commands.map((command) =>
			data.push({
				name: command.name.toLowerCase(),
				description: command.description,
				options: command.options || [],
				defaultPermission: command.defaultPermission || true,
			}),
		);

		client.guilds.cache.forEach((guild) => {
			try {
				guild.commands.set(data);
			} catch (e) {
				client.emit('error', e);
			}
		});
	},
});

export default OnReady;
