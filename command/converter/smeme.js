// module
const FormData = require("form-data");
const { default: Axios } = require("axios");
const fs = require("fs");
const filetype = require("file-type");
const { sticker } = require("../../lib/convert");
//end module

//function upload file
const uploadFile = (path) =>
	new Promise((resolve, reject) => {
		const fd = new FormData();
		fd.append("file", fs.createReadStream(path));
		Axios({
			method: "POST",
			url: "https://uploader.caliph.my.id/upload",
			data: fd,
			headers: {
				"user-agent": "MRHRTZ-ZONE :D",
				"content-type": `multipart/form-data; boundary=${fd._boundary}`,
			},
		})
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
	
	//const axios = require("axios");
  exports.getBuffer = getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await Axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}
	
// end function

module.exports = {
	name: "smeme",
	alias: ["smeme"],
	desc: "Convert media to sticker",
	use: "text | text",
	category: "converter",
	query: "enter text",
	isSpam: true,
	isLimit: true,
	wait: true,
	async run({ msg, conn }, { q }) {
	  const { quoted, type } = msg;
  	const content = JSON.stringify(quoted);
		const isMedia = type === "imageMessage" || type === "videoMessage";
		const isQImg = type === "extendedTextMessage" && content.includes("imageMessage");
		const isQStic = type === "extendedTextMessage" && content.includes("stickerMessage");
		//if ( !isMedia && !isQStic && !isQImg) return msg.reply('Please reply *Image/Sticker*')
		try {
		  if (isQStic) {
		let filename = `./temp/${Date.now()}.${type.ext}`;
		fs.writeFileSync(filename, await msg.quoted.download());
		let file = await uploadFile(filename);
		let anu = q.split('|')
		a = anu[0] !== "" ? anu[0] : ' ';
    b = typeof anu[1] !== "undefined" ? anu[1] : ' ';
	//	let depan = teks ? teks : ''
	//	let belakang = teks2 ? teks2 = ''
		let wasted = `https://api.memegen.link/images/custom/${a}/${b}.png?background=${file.result.url}`
		let final = await getBuffer(wasted) 
		//await msg.reply(file.result.url);
		const packInfo = {
			packname: config.packInfo.packname,
			author: config.packInfo.author,
		}; 
		stickerBuff = await sticker(final, { isSticker: true, withPackInfo: true, packInfo, cmdType: "1" });
		await conn.sendMessage(msg.from, { sticker: stickerBuff }, { quoted: msg });
		delete filename
		  } else if ((isMedia && !msg.message.videoMessage) || isQImg) {
		    buffer = isQImg ? await quoted.download() : await msg.download();
		    let filename = `./temp/${Date.now()}.${type.ext}`;
		fs.writeFileSync(filename, buffer);
		let file = await uploadFile(filename);
		let anu = q.split('|')
		a = anu[0] !== "" ? anu[0] : ' ';
    b = typeof anu[1] !== "undefined" ? anu[1] : ' ';
	//	let depan = teks ? teks : ''
	//	let belakang = teks2 ? teks2 = ''
		let wasted = `https://api.memegen.link/images/custom/${a}/${b}.png?background=${file.result.url}`
		let final = await getBuffer(wasted) 
		//await msg.reply(file.result.url);
		const packInfo = {
			packname: config.packInfo.packname,
			author: config.packInfo.author,
		}; 
		stickerBuff = await sticker(final, { isSticker: true, withPackInfo: true, packInfo, cmdType: "1" });
		await conn.sendMessage(msg.from, { sticker: stickerBuff }, { quoted: msg });
		delete filename
		  } else {
		    msg.reply('Please reply *Image/Sticker*')
		  }
	  } catch (e) {
	    console.log(e)
	  }
	},
};


