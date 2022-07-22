module.exports = {
	name: "broadcastgroup",
	alias: ["bcgc"],
	desc: "sending a chat to a group whose bots have",
	use: "<text>",
	category: "private",
	isOwner: true,
	query: "Masukan text yg ingin di bc",
	async run({ msg, conn }, { q }) {
		let getGroups = await conn.groupFetchAllParticipating();
		let groups = Object.entries(getGroups)
			.slice(0)
			.map((entry) => entry[1]);
		let anu = groups.map((v) => v.id);
		for (let i of anu) {
			await require("delay")(3000);
			//await conn.sendMessage(i, { text: q + "\n\n*Broadcast Message*" });
			const templateButtons = [
      {index: 3, quickReplyButton: {displayText: 'Menu', id: '.menu'}},
      {index: 3, quickReplyButton: {displayText: 'Dashboard', id: '.db'}},
      ]
      const templateMessage = {
        text: q,
        footer: 'Broadcast Message',
        templateButtons: templateButtons 
      }
conn.sendMessage(i, templateMessage)
		}
		await msg.reply("Sukses");
	},
};
