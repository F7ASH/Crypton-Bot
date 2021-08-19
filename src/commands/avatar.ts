import { Command } from '../utils';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../types/constants';
/**
 * Sends the ping of the bot to the user.
 */
const Avatar = new Command({
	name: 'avatar',
	description: 'Shows the persons profile pic',
	options: [{
		name: 'user',
		description: 'The target user',
		type: 'USER',
	}],
	async run(interaction: CommandInteraction, args: any) {
		const user = interaction.guild?.members.resolve(args.user)?.user || interaction.user;
		const userAvatar = user.displayAvatarURL({ dynamic: true, size: 256 });
		const avatarCommandReplyEmbed: MessageEmbed = new MessageEmbed()
			.setImage(userAvatar)
			.setColor(EmbedColors.INVISIBLE)
			.setTitle('Looking good today!');
		interaction.editReply({ embeds: [avatarCommandReplyEmbed] });
	},
});

export default Avatar;
