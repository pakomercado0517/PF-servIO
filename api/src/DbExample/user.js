const axios = require("axios");

const { User } = require("../db");

let userObj = [];

const url = `https://randomuser.me/api/?nat=es&results=50`;
const users = async () => {
    let user_uri;
    try {
        const uri = await axios.get(url);
        user_uri = uri.data.results;
        const result = user_uri.map((el) => {
      return {
        user_name: el.login.username,
        first_name: el.name.first,
        last_name: el.name.last,
        email: el.email,
        // phone: el.phone,
        city: el.location.city,
        state: el.location.state,
        photo: el.picture.thumbnail,
        dni_front: el.picture.thumbnail,
        dni_back: el.picture.thumbnail,
        password: el.login.password,
        verified: false,
        professional: true,
      };
    });
    userObj = result.slice(0, result.length);
    // console.log("userObj", userObj);
    await User.bulkCreate(userObj);
  } catch (error) {
    console.log(error.message);
  }
};

const users2 = async () => {
  let user_uri;
  try {
    const uri = await axios.get(url);
    user_uri = uri.data.results;
    const result = user_uri.map((el) => {
      return {
        user_name: el.login.username,
        first_name: el.name.first,
        last_name: el.name.last,
        email: el.email,
        // phone: el.phone,
        city: el.location.city,
        state: el.location.state,
        photo: el.picture.thumbnail,
        dni_front: el.picture.thumbnail,
        dni_back: el.picture.thumbnail,
        password: el.login.password,
        verified: false,
        professional: false,
      };
    });
    userObj = result.slice(0, result.length);
    // console.log("userObj", userObj);
    await User.bulkCreate(userObj);
  } catch (error) {
    console.log(error.message);
  }
};

const initialFunction = async () => {
  await users();
  await users2();
};

// initialFunction()
module.exports = { initialFunction };
