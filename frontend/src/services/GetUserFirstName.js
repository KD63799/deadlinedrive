
  // State to store user data for reference in comments display.
function getUserFirstName (userId, users) {
    const user = users.find(user => user.id === parseInt(userId, 10));
    return user ? user.firstName : "Unknown User";
  };

export default getUserFirstName
