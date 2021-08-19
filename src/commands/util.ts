import { Command } from '../utils';
import { EmbedColors } from '../types/constants';
import { CommandInteraction, MessageEmbed } from 'discord.js';
/**
 * Basic utility commands merged into one
 */
const utility = new Command({
	name: 'util',
	description: 'Utility commands!',
	options: [
		{
			name: 'ping',
			description: 'Sends ping of the bot',
			type: 'SUB_COMMAND',
		},
		{
			name: 'userinfo',
			description: 'Sends info about the user',
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
			name: 'serverinfo',
			description: 'Sends general info of the server',
			type: 'SUB_COMMAND',
		},
	],
	async run(interaction: CommandInteraction, args: any) {
		if (args.subcommand === 'ping') {
			interaction.editReply(`${interaction.client.ws.ping}ms`);
		}
		if (args.subcommand === 'userinfo') {
			const user = interaction.guild?.members.resolve(args.user)?.user || interaction.user;
			const userInfoEmbed: MessageEmbed = new MessageEmbed()
				.setTitle(`Information About User ${user?.username}`)
				.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
				.setColor(EmbedColors.INVISIBLE)
				.setDescription('Hello');
			interaction.editReply({ embeds: [userInfoEmbed] });
		}
		if (args.subcommand === 'serverinfo') {
			const { guild } = interaction;
			let premiumTier: string;

			switch (guild?.premiumTier) {
				case 'TIER_1':
					premiumTier = `<:CryptonDPremiumL1:869131727107395615> **Level 1** with ${guild?.premiumSubscriptionCount} boosts`;
					break;
				case 'TIER_2':
					premiumTier = `<:CryptonDPremiumL2:869131696740634634> **Level 2** with ${guild?.premiumSubscriptionCount} boosts`;
					break;
				case 'TIER_3':
					premiumTier = `<:CryptonDPremiumL3:869131662435446864> **Level 3** with ${guild?.premiumSubscriptionCount} boosts`;
					break;
				case 'NONE':
					premiumTier = 'No boosts';
					break;
				default:
					premiumTier = 'No Data';
			}

			const stats = {
				roleCount: guild?.roles.cache.size,
				stickerCount: guild?.stickers.cache.size,
				emojiCount: guild?.emojis.cache.size,
				humans: guild?.members.cache.filter((member) => !member.user.bot).size || 0,
				bots: guild?.members.cache.filter((member) => member.user.bot).size || 0,
				textChannels:
					guild?.channels.cache.filter((c) => c.type === 'GUILD_TEXT').size || 'No Data',
				voiceChannels:
					guild?.channels.cache.filter((c) => c.type === 'GUILD_VOICE').size || 'No Data',
				stageChannels:
					guild?.channels.cache.filter((c) => c.type === 'GUILD_STAGE_VOICE').size || 'No Data',
				publicThreads:
					guild?.channels.cache.filter((c) => c.type === 'GUILD_PUBLIC_THREAD').size || 'No Data',
			};

			const owner = await guild?.fetchOwner();
			const serverInfoEmbed = new MessageEmbed()
				.setColor(EmbedColors.INVISIBLE)
				.setAuthor(`Server Info of ${guild?.name}`)
				.setThumbnail(`${guild?.iconURL({ dynamic: true })}`)
				.setDescription(`${guild?.description || 'No Description'}\n`)
				.setImage(guild?.bannerURL() || '')
				.addFields(
					{
						name: 'General',
						value: `:white_small_square: **Server Id :**${
							guild?.id
						}\n:white_small_square: **Owner :** ${owner?.user.tag}(${
							owner?.id
						})\n:white_small_square: **Created :** ${new Date(
							guild?.createdTimestamp || '',
						).toDateString()}\n:white_small_square: **Boosts :** ${premiumTier}\n :white_small_square: **Partnered :** ${
							guild?.partnered ? '<:CryptonDPartner:869132408463695902> Yes' : 'No'
						}\n:white_small_square: **Verified :** ${
							guild?.verified ? '<:CryptonDVerified:871322249792221224> Yes' : 'No'
						}`,
					},
					{
						name: 'Stats',
						inline: true,
						value: `:white_small_square: **Role Count :** ${
							stats.roleCount
						}\n:white_small_square: **Emoji Count :** ${
							stats.emojiCount
						}\n:white_small_square: **Stickers :** ${
							stats.stickerCount
						}\n:white_small_square: **Total Members :** ${
							stats.bots + stats.humans
						}\n:white_small_square: **Humans :** ${stats.humans}\n:white_small_square: **Bots :** ${
							stats.bots
						}\n:white_small_square: **Text Channels :** ${
							stats.textChannels
						}\n:white_small_square: **Voice Channels :** ${
							stats.voiceChannels
						}\n:white_small_square: **Stages :** ${
							stats.stageChannels
						}\n:white_small_square: **Public Threads :** ${stats.publicThreads}`,
					},
					{
						name: 'Crypton',
						inline: true,
						value:
							':white_small_square: **Premium :** No\n:white_small_square: **Enabled Commands :** 0\n:white_small_square: **Dashboard :** [Click Here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
					},
					{
						name: 'Features',
						value: `\`\`\`${guild?.features.join(', ')}\`\`\``,
					},
				);
			interaction.editReply({ embeds: [serverInfoEmbed] });
		}
	},
});

export default utility;
