module.exports = {
	name: "meadmin",
	alias: ["admin", "meadmin"],
	category: "private",
	desc: "Promote to admin group",
	use: "",
	isGroup: true,
	isBotAdmin: true,
	isOwner: true,
	async run({ msg, conn }) {
		await conn.groupParticipantsUpdate(msg.from, [msg.sender], "promote");
		await msg.reply("Suksess");
	},
};
