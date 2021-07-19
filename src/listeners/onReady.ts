import { Listener, PieceContext } from "@sapphire/framework";
/**
 * Logs when the bot is ready to start
 */
class OnReady extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			name: "ready",
			once: true,
		});
	}
  
	run(): void {
		this.container.logger.info("Bot has started!");
	}
}

export default OnReady;