const ocrapi = require("ocr-space-api-wrapper")
// module
const FormData = require("form-data");
const { default: Axios } = require("axios");
const fs = require("fs");
const filetype = require("file-type");
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
// end function

module.exports = {
	name: "ocr",
	alias: ["ocr"],
	desc: "Convert media to text",
	use: "reply media message",
	isMedia: {
		isQDocument: true,
		isQImage: true,
		isQSticker: true,
	},
	category: "tools",
	isSpam: true,
	isLimit: true,
	wait: true,
	async run({ msg, conn }, { q }) {
	  try {
		let type = await filetype.fromBuffer(await msg.quoted.download());
		let filename = `./temp/${Date.now()}.${type.ext}`;
		fs.writeFileSync(filename, await msg.quoted.download());
		let file = await uploadFile(filename);
		//await msg.reply(file.result.url);
		let hasil = await ocrapi.ocrSpace(file.result.url)
    //await m.reply(hasil.ParsedResults[0].ParsedText) 
    const templateButtons = [
    {index: 1, urlButton: {displayText: 'Copy Text', url: 'https://www.whatsapp.com/otp/copy/' + hasil.ParsedResults[0].ParsedText}}
]

const templateMessage = {
    text: hasil.ParsedResults[0].ParsedText,
    footer: 'Optical Character Recognition',
    templateButtons: templateButtons
}
conn.sendMessage(msg.from, templateMessage)
} catch (err) {
			console.log(err);
			await msg.reply(response.error.api);
		}
	},
};
