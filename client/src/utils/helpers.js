import axios from 'axios';

function getUserInfo(username) {
  return axios.get('http://api.github.com/users/' + username);
}

var helpers = {
  getUserInfo : function() {
    return axios.all([getUserInfo(username)])
      .then(function(arr) {
        return {
          bio: arr[0].data
        };
      });
  }
};

module.exports = helpers;