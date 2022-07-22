module.exports = {
	name: "speedtest",
	alias: ["speedtest"],
	category: "info",
	desc: "display download speed information",
	use: "",
	wait: true,
	isSpam: true,
	async run({ msg, conn }, { q }) {
	  let cp = require('child_process')
	  let { promisify } = require('util')
	  let exec = promisify(cp.exec).bind(cp)
	  let o
    try {
        o = await exec('python speed.py')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) msg.reply(stdout)
        if (stderr.trim()) msg.reply(stderr)
    }
	},
}