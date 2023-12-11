const initApp = () => {
  const error = document.getElementById("error");
  const profilePicture = document.getElementById("user-profile-picture");
  const userName = document.getElementById("username");
  const name = document.getElementById("name");
  const location = document.getElementById("location");
  const publicRepos = document.getElementById("public-repos");
  const bio = document.getElementById("bio");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const email = document.getElementById("email");
  const xUser = document.getElementById("x-username");
  const btnSearch = document.getElementById("btnSearch");
  const userData = document.getElementById("user-data");
  const loadingSpinner = document.getElementById("loading");

  const baseURL = "https://api.github.com/users/";

  function searchUser(username) {
    loadingSpinner.classList.remove("hidden");
    let user;

    if (username) {
      user = username;
    }
    else {
      const query = document.getElementById("query");
      user = query.value;
    }

    try {
      if (user) {
        url = `${baseURL}${user}`;

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error();
            }

            return response.json();
          })
          .then((data) => {
            fillData(data);
            query.value = "";
            loadingSpinner.classList.add("hidden");
          })
          .catch((error) => toggleError())
      } else {
        throw new Error();
      }

    } catch (e) {
      toggleError();
    }
  }

  function toggleError() {
    if (error.classList.contains("hidden")) {
      error.classList.remove("hidden");
    }

    userData.classList.add("hidden")
    loadingSpinner.classList.add("hidden");
  }

  function fillData(data) {
    if (!error.classList.contains("hidden")) {
      error.classList.add("hidden");
    }

    profilePicture.src = data.avatar_url;
    profilePicture.alt = data.login;

    userName.innerText = data.login;
    name.innerText = data.name;

    location.innerText = data.location !== null ? ` ${data.location}` : "Not Available";
    publicRepos.innerText = `Public Repositories ${data.public_repos}`;

    bio.innerText = data.bio !== null ? ` ${data.bio}` : "Not Available ";
    followers.innerText = `Followers: ${data.followers}`;
    following.innerText = `Following: ${data.following}`;

    email.innerText = data.email !== null ? `${data.email}` : "Not Available";
    xUser.innerText = data.twitter_username !== null ? `@${data.twitter_username}` : "Not Available";

    if (userData.classList.contains("hidden")) {
      userData.classList.remove("hidden");
    }
  }

  btnSearch.addEventListener("click", searchUser);
  query.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  });

  searchUser("geekyBoogiepop");
}

document.addEventListener("DOMContentLoaded", initApp);