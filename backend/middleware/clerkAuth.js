const { clerkClient, getAuth } = require("@clerk/express");
const User = require("../models/User");


module.exports = async function clerkAuth(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Unauthenticated — no Clerk session",
      });
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      const email =
        clerkUser.emailAddresses?.[0]?.emailAddress ||
        clerkUser.primaryEmailAddress?.emailAddress ||
        "";

      const name =
        clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : clerkUser.firstName ||
            clerkUser.username ||
            email.split("@")[0] ||
            "User";

     
      const isGoogle = detectGoogleAuth(clerkUser);

      user = await User.create({
        clerkId: userId,
        email,
        name,
        photoURL: clerkUser.imageUrl || "",
        provider: isGoogle ? "google" : "email",
        lastLoginAt: new Date(),
      });

      console.log(`🆕 User created: ${email} (${user.provider})`);
    } else {
      user.lastLoginAt = new Date();
      await user.save();
    }

    req.dbUser = user;
    req.clerkUserId = userId;
    req.authMethod = "clerk";
    next();
  } catch (err) {
    console.error("Clerk auth error:", err.message);
    return res.status(401).json({
      success: false,
      error: "Clerk authentication failed",
    });
  }
};


function detectGoogleAuth(clerkUser) {
  
  const hasGoogleExternal = clerkUser.externalAccounts?.some(
    (a) =>
      a.provider === "oauth_google" ||
      a.provider === "google" ||
      a.provider === "google_oauth"
  );
  if (hasGoogleExternal) return true;

 
  const primaryEmail =
    clerkUser.emailAddresses?.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    ) || clerkUser.emailAddresses?.[0];

  if (primaryEmail?.verification?.strategy === "oauth_google") {
    return true;
  }

  return false;
}