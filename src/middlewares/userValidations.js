const postUserValid = (req, res, next) => {
  const validEmail = (eml) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(eml);
  const { displayName, email, password } = req.body;
  
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  if (!validEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

module.exports = {
  postUserValid,
};