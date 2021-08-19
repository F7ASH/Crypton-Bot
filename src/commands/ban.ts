import { Command } from '../utils';
import { CommandInteraction, GuildMember } from 'discord.js';

const ban = new Command({
	name: 'ban',
	description: 'bans a user',
	options: [
		{
			name: 'user',
			description: 'The user to ban',
			type: 'USER',
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason for banning',
			type: 'STRING',
		},
	],
	async run(interaction: CommandInteraction, args: any) {
		const memberToban = interaction.guild?.members.resolve(args.user);
		// @ts-expect-error	Member will always be a guild member as we have GUILD intent for it
		const member: GuildMember = interaction.member;

		if (!memberToban) {
			return interaction.editReply('The user was not found');
		}
		
		if (!member.permissions.has('BAN_MEMBERS')) {
			return interaction.editReply('You do not have `ban MEMBERS` permission');
		}

		memberToban.ban(args.reason || 'No reason provided').catch(() => interaction.editReply('An error occured!'));

		interaction.editReply(`${memberToban.user.username} was banned!`);
	},
});

export default ban;
