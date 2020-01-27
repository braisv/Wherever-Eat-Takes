module.exports = function() {
    this.validateUsername = function(username) {
      let usernameFormat = /^\w{3,12}$/;
      if (username.match(usernameFormat)) {
        return true;
      }
      console.log("You have entered an invalid username!");
      return false;
    },
    this.validatePassword = function(password) {
      let passFormat = /^(?=.*[0-9])(?=.*[a-zA-Z])\w{8,16}$/;
      if (password.match(passFormat)) {
        return true;
      }
      console.log("You have entered an invalid password!");
      return false;
    };
  };  