module.exports = {
	name: "linkgc",
	alias: ["linkgc", "link"],
	category: "group",
	desc: "to get the group link",
	isGroup: true,
	isAdmin: true,
	isBotAdmin: true,
	async run({ msg, conn }, { q }) {
	  const code = await conn.groupInviteCode(msg.from)
		const templateButtons = [
    {index: 1, urlButton: {displayText: 'Copy Link', url: 'https://www.whatsapp.com/otp/copy/ https://chat.whatsapp.com/' + code}} 
    ]
    const templateMessage = {
    text: 'Successfully got the link',
    footer: '',
    templateButtons: templateButtons 
    }
    await conn.sendMessage(msg.from, templateMessage);
	},
};
