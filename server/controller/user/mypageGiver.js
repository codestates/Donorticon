module.exports = async (req, res) => {
	try {
			res.json("mypage server being prepared")
	} catch(err) {
		console.log(err)
	}
}