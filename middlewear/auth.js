// jwt chahiye hai verify krne ke liye token ko
const jwt = require("jsonwebtoken");

// config chahiye hai secret ke liye ko hmara default mein hai
const config = require("config");

const auth = (req, res, next) => {
  // yh key hai axiom-auth-token jo ke hmne absolute krdi hai iske through hm JWT ki value ko access krleinge apne pass
  const token = req.header("axiom-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ msg: "Authorisation Denied! Token is Missing" });

  try {
    // Payload return krdega hmein yh token
    // Jis id pe hmne yh token bnaya tha wo hmein yh send krdega aur wo payload ke andar hai
    const payload = jwt.verify(token, config.get("jwtSecret"));
    // req.user ke andar hmne payload ka user dedia hai jhn pe id hai aur yh hm use kreinge
    // User.findById mein hm yh use krleinge apne pass aur phr hm iski madad se user nikal leinge
    req.user = payload.user;
    next();
  } catch (err) {
    console.log("Error", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
