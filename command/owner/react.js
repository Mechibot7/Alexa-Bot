module.exports = {
	name: "react",
	alias: ["re"],
	category: "private",
	isOwner: true,
	isSpam: true,
	desc: "Reaction message",
	use: "<Tag Mess>",
	isQuoted: true,
	query: "Masukkan emoji",
	async run({ msg, conn }, { q }) {
	  if (!q)return msg.reply('where emoji ?')
	  anu = q.replace(/[a-zA-Z]/gi, '👍' )
		const reactionMessage = {
			react: {
				text: `${anu.slice(0, 2)}`,
				key: msg.quoted.key,
			},
		};
		await conn.sendMessage(msg.from, reactionMessage);
	},
};
