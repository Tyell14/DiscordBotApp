const YoutubeDL = require('youtube-dl');
const Request = require('request');

/*
 * Takes a discord.js client and turns it into a music bot.
 *
 * @param client The discord.js client.
 * @param options (Optional) Options to configure the music bot. Acceptable options are:
 *                prefix: The prefix to use for the commands (default '!').
 */
module.exports = function(client, options) {
	// Get all options.
	let PREFIX = (options && options.prefix) || '!';
	
	// Catch message events.
	client.on('message', msg => {
		const message = msg.content.trim();
		
		// Check if the message is a command.
		if (message.startsWith(PREFIX)) {
			// Get the command and suffix.
			const command = message.split(/[ \n]/)[0].substring(PREFIX.length).toLowerCase().trim();
			const suffix = message.substring(PREFIX.length + command.length).trim();

			// Process the commands.
			switch (command) {
				case 'play': return play(msg, suffix);
			}
		}
	});

	/*
	 * Play command.
	 *
	 * @param msg Original message.
	 * @param suffix Command suffix.
	 */
	function play(msg, suffix) {
		// Make sure the suffix exists.
		if (!suffix) {
			msg.channel.sendMessage('cosa ti playo se non mi dici cosa cercare gio');
			return;
		}
		// Get the video information.
		msg.channel.sendMessage('gimme a sec...').then(response => {
			// If the suffix doesn't start with 'http', assume it's a search.
			if (!suffix.toLowerCase().startsWith('http')) {
				suffix = 'gvsearch1:' + suffix;
			}

			// Get the video info from youtube-dl.
			YoutubeDL.getInfo(suffix, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
				// Verify the info.
				// console.log(info);
				if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
					return msg.channel.sendMessage("...couldn't find it, sry bro");
				}
				// link the video
				msg.channel.sendMessage('Found: ' + info.title)
				.catch(() => {});
				msg.channel.sendMessage(info.webpage_url)
				.catch(() => {});
			});
		}).catch(() => {});
	}
}
