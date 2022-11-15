const utils = require("../utils/utils");
const tokenConfig = require("../common/tokenConfig");

module.exports = async function (req, res, next) {
	try {
		const token = req.header("Authorization").split(" ")[1];
		if (!token)
			return res.status(403).send({
				message: "No token provided!",
			});
		const decoded = await utils.verifyJwtToken(token, tokenConfig.secret);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({
			message: "Unauthorized access!",
		});
	}
};
