async function handleStart() {
  try {
    const res = await fetch("/auth/check");
    const data = await res.json();

    if (data.loggedIn) {
      window.location.href = "/groups";
    } else {
      window.location.href = "/register";
    }
  } catch {
    window.location.href = "/register";
  }
}

function checkGroupSelection(e) {
  e.preventDefault(); // stop immediate redirect
  fetch("/auth/check")
    .then(res => res.json())
    .then(data => {
      if (!data.loggedIn) {
        window.location.href = "/register";
      } else {
        // select first group automatically or redirect to group list
        window.location.href = "/groups";
      }
    });
}

