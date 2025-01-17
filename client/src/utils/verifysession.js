const verifysession = async () => {
    let response = await fetch("http://localhost:3000/api/auth/verifysession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: localStorage.getItem("token")})
    });

    let result = await response.json();
    if (result.success) {
      if (result.data.isAdmin) {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/student-dashboard";
      }
    }
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("student");
    }
  };

  export default verifysession;

// const verifysession = async () => {
//   let response = await fetch("http://localhost:3000/api/auth/verifysession", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ token: localStorage.getItem("token") })
//   });

//   let result = await response.json();
//   if (result.success) {
//     // Handle success case without redirection
//     console.log("Session verified:", result.data);
//   } else {
//     // Handle failure case without redirection
//     localStorage.removeItem("token");
//     localStorage.removeItem("student");
//     console.log("Session verification failed");
//   }
// };

// export default verifysession;