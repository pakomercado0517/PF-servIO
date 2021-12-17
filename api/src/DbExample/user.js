const axios = require("axios");

const { User } = require("../db");

let userObj = [];

const url = `https://randomuser.me/api/?nat=es&results=25`;

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
        phone: el.phone,
        city: el.location.city,
        state: el.location.state,
        photo: el.picture.thumbnail,
        // dni_front: el.picture.thumbnail,
        // dni_back: el.picture.thumbnail,
        password: el.login.password,
        verified: false,
        professional: true,
      };
    });
    userObj = result.slice(0, result.length);
    // console.log("userObj", userObj);
    await User.bulkCreate(userObj);
    console.log("|---Professional not verified---| Created");
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
        phone: el.phone,
        city: el.location.city,
        state: el.location.state,
        photo: el.picture.thumbnail,
        dni_front: el.picture.thumbnail,
        dni_back: el.picture.thumbnail,
        password: el.login.password,
        verified: true,
        professional: true,
      };
    });
    userObj = result.slice(0, result.length);
    // console.log("userObj", userObj);
    await User.bulkCreate(userObj);
    console.log("|---Professional verified---| created");
  } catch (error) {
    console.log(error.message);
  }
};
const users3 = async () => {
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
        phone: el.phone,
        city: el.location.city,
        state: el.location.state,
        photo: el.picture.thumbnail,
        dni_front: el.picture.thumbnail,
        dni_back: el.picture.thumbnail,
        password: el.login.password,
        verified: true,
        professional: false,
      };
    });
    userObj = result.slice(0, result.length);
    // console.log("userObj", userObj);
    await User.bulkCreate(userObj);
    console.log("|---User verified---| Created");
  } catch (error) {
    console.log(error.message);
  }
};
const users4 = async () => {
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
        phone: el.phone,
        city: el.location.city,
        state: el.location.state,
        photo: el.picture.thumbnail,
        // dni_front: el.picture.thumbnail,
        // dni_back: el.picture.thumbnail,
        password: el.login.password,
        verified: false,
        professional: false,
      };
    });
    userObj = result.slice(0, result.length);
    // console.log("userObj", userObj);
    await User.bulkCreate(userObj);
    console.log("|---User not verified---| Created");
  } catch (error) {
    console.log(error.message);
  }
};

const initialFunction = async () => {
  await users();
  await users2();
  await users3();
  await users4();
};

// initialFunction()
module.exports = { initialFunction };
