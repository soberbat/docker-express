const protectRoutes = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Don't have access",
    });
  }
  next();
};

module.exports = protectRoutes;
