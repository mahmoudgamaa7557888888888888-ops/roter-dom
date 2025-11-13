import { auth, db } from "../../firebaseConfig";

export const registerUser = async (email, password, role) => {
  
  const userCredential = await auth.createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;
  await db.collection("users").doc(user.email).set({
    email,
    role,
    
  });

  return user;
};



export const loginUser = async (email, password) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  const user = userCredential.user;

  const userDoc = await db.collection("users").doc(user.uid).get();
  const data = userDoc.data();

  return { user, role: data.role };
};
