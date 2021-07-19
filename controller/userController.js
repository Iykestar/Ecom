const bcrypt = require("bcryptjs");
const users = require("../models/users");

// Query all users
const getUser = (req, res) => {
    res.json({status: "Ok", data: users});
};

// New Users registration
const signup = async (req, res) => {
  try {
    const { email, fullName, password, confirmPassword } = req.body;
  const userPassword = await bcrypt.hash(password, 10);
  console.log(userPassword);
  if (password !== confirmPassword) {
    return res.json({ status: false, msg: "Incorrect Password" });
  }
  let user = users.find((user) => user.email === email);
  if (user) {
    res.json({ status: false, msg: "Email Address Already exists" });
  } else {
    const newUser = { id: users.length + 1, email, fullName, userPassword };
    users.push(newUser);
    res.status(200).json({ msg: `Your Account has been created`, data: newUser });
  } 
}
  catch (err) {
      res.status(400).send(err);
  };
};

// If user already exists
const signIn = async (req, res) => {
  const { email } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.json({ status: "error", error: "invalid email Address" });
  };
  try {
  const validPassword = await bcrypt.compare(req.body.password, user.userPassword);
  if (!validPassword) return res.status(400).send('Invalid Password entered.');

  return res.json({ status: "ok", msg: "logged in", data: users });
} catch (err) {
    res.status(400).send(err);
};
};

module.exports = { signup, signIn, getUser };