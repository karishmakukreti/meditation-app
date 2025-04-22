import { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig"; // Ensure Firebase is configured

const db = getFirestore(app);

const UserProfile = () => {
  const [username, setUsername] = useState("");

  const saveProfile = async () => {
    await setDoc(doc(db, "users", "user1"), { name: username });
    alert("Profile saved!");
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={saveProfile}>Save</button>
    </div>
  );
};

export default UserProfile;
