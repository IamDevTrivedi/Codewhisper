const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = async (res, userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    if (process.env.NODE_ENV === "production") {
      Object.assign(cookieOptions, {
        secure: true,
        sameSite: "none",
        domain: process.env.COOKIE_DOMAIN || undefined,
      });
    } else {
      Object.assign(cookieOptions, {
        secure: false,
        sameSite: "lax",
      });
    }

    res.cookie("token", token, cookieOptions);

    res.cookie("auth_status", "true", {
      ...cookieOptions,
      httpOnly: false,
    });

    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate authentication token");
  }
};

module.exports = generateTokenAndSetCookie;
