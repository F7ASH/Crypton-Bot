import { Command } from '../utils';
import { CommandInteraction, GuildMember } from 'discord.js';

const kick = new Command({
	name: 'kick',
	description: 'Kicks a user',
	options: [
		{
			name: 'user',
			description: 'The user to kick',
			type: 'USER',
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason for kicking',
			type: 'STRING',
		},
	],
	async run(interaction: CommandInteraction, args: any) {
		const memberToKick = interaction.guild?.members.resolve(args.user);
		// @ts-expect-error	Member will always be a guild member as we have GUILD intent for it
		const member: GuildMember = interaction.member;

		if (!memberToKick) {
			return interaction.editReply('The user was not found');
		}
		
		if (!member.permissions.has('KICK_MEMBERS')) {
			return interaction.editReply('You do not have `KICK MEMBERS` permission');
		}

		memberToKick.kick(args.reason || 'No reason provided').catch(() => interaction.editReply('An error occured!'));

		interaction.editReply(`${memberToKick.user.username} was kicked!`);
	},
});

export default kick;
