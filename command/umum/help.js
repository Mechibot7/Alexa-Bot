const hari = moment.tz(config.timezone).format("a");
const ucapanWaktu = hari.charAt(0).toUpperCase() + hari.slice(1);
const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const fs = require("fs");

module.exports = {
	name: "help",
	alias: ["h", "cmd", "menu"],
	category: "umum",
	isLimit: true,
	async run({ msg, conn }, { q, owner, map, args }) {
		if (q) {
			const data = [];
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "hidden" && !config.owner.includes(msg.sender)))
				return await msg.reply("Command not found");
			else data.push(`*Name:* ` + cmd.name);
			if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(", ")}`);
			if (cmd.desc) data.push(`*Deskripsi:* ${cmd.desc}`);
			if (cmd.use)
				data.push(`*Use:* ${prefix}${cmd.name} ${cmd.use}\n\nNote: [] = optional, | = or, <> = must be filled`);

			return await msg.reply(data.join("\n"));
		} else {
			const { pushName, sender } = msg;
			const { prefix, command } = map;
			const cmds = command.keys();
			let category = [];
			const xes = require("parse-ms")(prem.getPremiumExpired(msg.sender, premium) - Date.now());
			dashboard = dashboard.sort(function (a, b) {
				return b.success - a.success;
			});

			for (let cmd of cmds) {
				let info = command.get(cmd);
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "No Category";
				if (info.type == "changelog") continue;
				if (cteg == "hidden") continue;
				if (!cteg || cteg === "private") cteg = "owner command";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			let str = `*${config.namebot}*
❏ ${moment.tz(config.timezone).format("HH:mm:ss")} WIB
❏ Speed ${processTime(msg.messageTimestamp, moment())} s
❏ ${moment.tz(config.timezone).format("dddd, DD/MM/YYYY")}

*INFO USER*
❏ Nomer: ${msg.sender.split("@")[0]} 
❏ Nama: ${conn.getName(msg.sender)}
❏ Status: ${isPremium ? "Premium" : owner ? "Owner" : "Standar"} ${isPremium ? `\n❏ Expired: ${xes.days} D ${xes.hours} H ${xes.minutes} M` : ""}
${readMore}
*FITUR TERPOPULER SAAT INI*
${
	dashboard[0]
		? `1. *${dashboard[0].name.toUpperCase()}* dipakai sebanyak *${dashboard[0].success + dashboard[0].failed}* kali`
		: ``
}
${
	dashboard[1]
		? `2. *${dashboard[1].name.toUpperCase()}* dipakai sebanyak *${dashboard[1].success + dashboard[1].failed}* kali`
		: ``
}
${
	dashboard[2]
		? `3. *${dashboard[2].name.toUpperCase()}* dipakai sebanyak *${dashboard[2].success + dashboard[2].failed}* kali\n\n`
		: ``
}`;
			const keys = Object.keys(category);
			//var a = 1
			for (const key of keys) {
				str += `*${key.toUpperCase()}*\n${category[key]
					.map(
						(cmd, index) =>
							`*${index + 1}.* *${cmd.options.noPrefix ? "" : "/"}${cmd.name}* ${
								cmd.category == "private"
									? ""
									: cmd.use
									? cmd.use.replace(">", "").replace("<", "")
									: ""
							}`
					)
					.join("\n")}\n\n`;
			}
			//str += `typing *${prefix}help sticker* for get the details and example use`;
			reSize = async (image, width, height) => {
			  let jimp = require('jimp')
			  var oyy = await jimp.read(image);
			  var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
			  return kiyomasa
      }
      
      let thumb = fs.readFileSync('../../lexaa.jpg'); 
      let resize = await reSize(thumb, 300, 150)
			
					let buttonn = [
						{ urlButton: { displayText: "WhatsApp Group", url: "https://chat.whatsapp.com/K1olP2T16B76gx1FCoYjsh" } },
						{ urlButton: { displayText: "Instagram", url: "https://www.instagram.com/mrfzvx" } },
						{ quickReplyButton: { displayText: "Owner", id: "#owner" } },
						{ quickReplyButton: { displayText: "Speed", id: "#ping" } },
						{ quickReplyButton: { displayText: "Dashboard", id: "#db" } },
					]
					
					conn.sendMessage(msg.from, { 
					  caption: str, 
					  location: { jpegThumbnail: resize }, 
					  templateButtons: buttonn, 
					  footer: config.namebot + " • " + config.ownername })
		}
	},
};
