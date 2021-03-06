class Api {
  getRepos(username) {
    username = username.toLowerCase().trim();
    let url = `https://api.github.com/users/${username}/repos`;

    return fetch(url).then(res => res.json());
  }

  getBio(username) {
    username = username.toLowerCase().trim();
    let url = `https://api.github.com/users/${username}`;

    return fetch(url).then(res => res.json());
  }
};

export default new Api();
