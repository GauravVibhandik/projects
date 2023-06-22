import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  var role;
  if (currentUser.userRole === "ROLE_AUTHOR") role = "Author";
  if (currentUser.userRole === "ROLE_ADMIN") role = "Admin";
  if (currentUser.userRole === "ROLE_USER") role = "Guest";

  return (
    <div className="container start"  >
      <header >
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div className="jumbotron"  >
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Name:</strong>{" "}
          {currentUser.firstName + " " + currentUser.lastName}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Authority:</strong> {role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
