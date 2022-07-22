function Random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
	name: "siapakah",
	alias: ["siapakah", "siapa"],
	category: "fun",
	desc: "question for magic shells",
	use: "question",
	isSpam: true, 
	isGroup: true,
	async run({ msg, conn }, { q }) {
	  if (!q) return msg.reply('enter question')
    const { isGroup } = msg;
    const groupMetadata = isGroup ? await conn.groupMetadata(msg.from) : "";
    const groupMembers = isGroup ? groupMetadata.participants : '';
 let member = groupMembers.map(u => u.id)
    siapa = Random(member)
    capt = '*Question* : Siapakah ' + q
    capt += '\n*Answer* : @' + siapa.split('@')[0]
    msg.reply(capt, {withTag: true})
	},
}