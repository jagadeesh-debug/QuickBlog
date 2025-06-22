const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log("Headers:", req.headers);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

const token = authHeader.split(" ").filter(Boolean)[1]; // filters out empty strings
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    console.log(decoded)
    req.userId = decoded.id; // attach userId to request
    next();
  } catch (err) {
    console.error(err);
   return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
