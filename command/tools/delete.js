let baileys = require("@adiwajshing/baileys");

module.exports = {
	name: "delete",
	alias: ["delete", "del"],
	desc: "delete bot messages",
	category: "tools",
	isQuoted: true,
	async run({ msg, conn }) {
		if (!msg.quoted.isSelf) throw "The message was not sent by a bot!"; 
		conn.sendMessage(msg.from, { delete: msg.quoted.key })
},
}
