if (localStorage.loggedin == "true") {
  sessionStorage = localStorage;
}

// Function to fetch user data from server
async function fetchUserData() {
  try {
    const response = await fetch('/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", async function() {
  const usernameElement = document.getElementById("username");
  const roleElement = document.getElementById("role");
  const uidElement = document.getElementById("uid");
  const passwordElement = document.getElementById("badges");
  const tokensElement = document.getElementById("tokens");


  // Fetching user data
  const userData = await fetchUserData();

  // If user data is found, update the text content of the elements
  if (userData) {
    if (usernameElement) {
      usernameElement.textContent = `Username: ${userData.username}`;
    }
    if (roleElement) {
      roleElement.textContent = `Role: ${userData.role}`;
    }
    if (uidElement) {
      uidElement.textContent = `UID: ${userData.uid}`;
    }
    if (badgesElement) {
      badgesElement.textContent = `Badges: ${userData.badges.length}`;
    }
    if (tokensElement) {
      tokensElement.textContent = `Tokens: ${userData.tokens}`;
    }
  } else {
    // Handle the case where user data could not be fetched
    if (usernameElement) {
      usernameElement.textContent = `Username: Unavailable`;
    }
    if (roleElement) {
      roleElement.textContent = `Role: Unavailable`;
    }
    if (uidElement) {
      uidElement.textContent = `UID: Unavailable`;
    }
    if (badgesElement) {
      badgesElement.textContent = `Badges: Unavailable`;
    }
    if (tokensElement) {
      tokensElement.textContent = `Tokens: Unavailable`;
    }
  }
});

window.onload = () => {
  //document.body.style.pointerEvents = "none";
  fetch("/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json(); // Parse JSON data
      } else if (response.status === 500) {
        return response.text().then((text) => {
          alert(text);
        });
      } else {
        console.error("Unexpected response status:", response.status);
        throw new Error("Unexpected response status");
      }
    })
    .then((data) => {
      document.getElementById("tokens").innerHTML = data.tokens;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const today = new Date();
const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
date.innerHTML = today.toLocaleDateString("en-US", dateOptions);

document.getElementById('notification-toggle').addEventListener('click', function() {
    var currentText = this.textContent;
    if (currentText.includes('ON')) {
        this.textContent = 'Notifications OFF';
        this.style.backgroundColor = 'gray';
        var audio = new Audio('/sounds/discord-leave.mp3');
        audio.play();
    } else {
        this.textContent = 'Notifications ON';
        this.style.backgroundColor = '#800097';
        var audio = new Audio('/sounds/discord-notification.mp3');
        audio.play();
    }
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('/user')  // Adjust this to your actual API endpoint
    .then(response => response.json())
    .then(data => {
      const userRole = data.role;
      const allowedRoles = ['Owner', 'Admin', 'Moderator', 'Helper' , 'Plus'];
      if (allowedRoles.includes(userRole)) {
        document.getElementById('plus-perk').style.display = 'inline';
      }
    })
  .catch(error => {
   console.error('Error fetching user role:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('/user')  // Adjust this to your actual API endpoint
    .then(response => response.json())
    .then(data => {
      const userRole = data.role;
      const allowedRoles = ['Owner', 'Admin', 'Moderator', 'Helper'];
      if (allowedRoles.includes(userRole)) {
        document.getElementById('wrench-icon').style.display = 'inline';
      }
    })
  .catch(error => {
   console.error('Error fetching user role:', error);
    });
});