import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './Command';
import DisTube from 'distube';

export class CryptonClient extends Client {
	commands: Collection<string, Command> = new Collection();
	events: Collection<string, Event> = new Collection();
	distube: DisTube

	constructor(options: ClientOptions) {
		super(options);

		dotenv.config();

		if (process.argv[2] === '--dev' || process.env.NODE_ENV === 'development') {
			this.on('debug', (data) => {
				console.log(data);
			});
			this.on('error', (data) => {
				console.log(data);
			});
			this.on('rateLimit', (data) => {
				console.log(data);
			});
		}

		this.distube = new DisTube(this);

		const commandFiles = readdirSync('.crypton/commands');
		const eventFiles = readdirSync('.crypton/listeners').filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			(async () => {
				const command = await import(`../../commands/${file}`);
				this.commands.set(command.default.name.toLowerCase(), command.default);
				this.emit('debug', `[Command => CryptonClient]: Loaded ${command.default.name}`);
			})();
		}

		for (const eventFile of eventFiles) {
			(async () => {
				const event = await import(`../../listeners/${eventFile}`);
				if (event.default.once) {
					this.once(event.default.name, (...args) => event.default.run(...args, this));
				} else {
					this.on(event.default.name, (...args) => event.default.run(...args, this));
				}
				this.emit('debug', `[Event => CryptonClient]: Loaded ${event.default.name}`);
			})();
		}

		process.on('unhandledRejection', (err) => console.log(err));
	}
}
