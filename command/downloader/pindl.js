module.exports = {
	name: ["pinterest"],
	alias: ["pinterest", "pindl"],
	use: "<url>",
	category: "downloader",
	desc: "download video from pinterest",
	wait: true,
	isUrl: true,
	isSpam: true,
	async run({ msg, conn }, { q, map, args }) {
	  var teks = args[0];
	  try {
	  var yt = await rzky.downloader.downloaderAll(teks);
	  var mp4 = yt.mp4[yt.mp4.length - 1];
	  delete yt.mp4;
	  await conn.sendMessage(
						msg.from,
						{
							video: {
								url: mp4.url,
							},
							mimetype: "video/mp4",
							caption: '*L Ξ X A*', //result.replace(/downloader_from/gi, "Downloader From"),
							fileName: "pinterest.mp4",
						},
						{
							quoted: msg,
						}
					);
	  } catch (err) {
			console.log(err);
			await msg.reply(response.error.api);
		}
	},
}