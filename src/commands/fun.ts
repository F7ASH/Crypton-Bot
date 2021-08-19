import { Command } from '../utils';
import { EmbedColors } from '../types/constants';
import JokeResponse from '../types/JokeResponse';
import MemeResponse from '../types/MemeResponse';
import fetch from 'node-fetch';
import { CommandInteraction, MessageEmbed } from 'discord.js';
/**
 * Basic Fun commands merged into one
 */
const Fun = new Command({
	name: 'fun',
	description: 'Fun commands for funny uses!',
	options: [
		{
			name: '8ball',
			description: 'An eight ball command that does random things',
			type: 'SUB_COMMAND',
		},
		{
			name: 'epicgamerrate',
			description: 'epiccc',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'user',
					description: 'The target user',
					type: 'USER',
				},
			],
		},
		{
			name: 'joke',
			description: 'Sends a Random Joke',
			type: 'SUB_COMMAND',
		},
		{
			name: 'meme',
			description: 'Sends a Random Meme from Reddit',
			type: 'SUB_COMMAND',
		},
		{
			name: 'roast',
			description: 'Roasts anyone',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'user',
					description: 'The target user',
					type: 'USER',
				},
			],
		},
	],
	async run(interaction: CommandInteraction, args: any) {
		if (args.subcommand === '8ball') {
			const answers = [
				'Absolutely',
				'no',
				'Maybe',
				'Sure',
				'Yes',
				'Alright thats just not',
				'Shut up, he is kinda correct',
				'I gotta agree on that one',
				'Too busy for that one',
			];
			const answer = answers[Math.floor(Math.random() * answers.length)];
			interaction.editReply(answer);
		}
		if (args.subcommand === 'epicgamerate') {
			const user = interaction.guild?.members.resolve(args.user)?.user || interaction.user;
			const answer = Math.floor(Math.random() * 100);
			interaction.editReply(`${user.username} is ${answer}%  Epicgamer :sunglasses:!`);
		}
		if (args.subcommand === 'joke') {
			const response: JokeResponse = await (
				await fetch('https://official-joke-api.appspot.com/random_joke')
			).json();

			interaction.editReply(`**${response.setup}**\n ${response.punchline}`);
		}
		if (args.subcommand === 'meme') {
			const response = await (
				await fetch('https://meme-api.herokuapp.com/gimme/wholesomememes/3')
			).json();
			const memesArray: MemeResponse[] = response.memes.filter(
				(meme: MemeResponse) => meme.nsfw === false,
			);
			const memeData: MemeResponse = memesArray[0];
			const memeEmbed: MessageEmbed = new MessageEmbed()
				.setColor(EmbedColors.INVISIBLE)
				.setAuthor(`${interaction.client.user?.username || 'Crypton'} Memes`)
				.setImage(memeData.url)
				.setDescription(`**[${memeData.title}](${memeData.url})**`)
				.setFooter(`👍 ${memeData.ups}`)
				.setTimestamp();
			interaction.editReply({ embeds: [memeEmbed] });
		}
		if (args.subcommand === 'roast') {
			const user = interaction.guild?.members.resolve(args.user)?.user || interaction.user;
			const answers = [
				'Sup normie?',
				'Hey idiot',
				'whats up noob',
				'Did i ask?',
				'I dont care',
				'Another idiot',
				'The king of loosers',
				'BOOMER',
				'Novice',
				'Normie be like',
				'Sup edot',
				'Man you should see a mental doctor',
				'I am calling FBI now',
				'I gotta say you are pretty dumb',
			];
			const answer = answers[Math.floor(Math.random() * answers.length)];

			interaction.editReply(`${user.username}, ${answer}`);
		}
	},
});

export default Fun;
