import { PropsWithChildren, useEffect, useState } from "react";
import { AUTH } from "../hooks";
import { authService, db } from "../../lib/firebase";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(AUTH.initialState.user);

  const [initialized, setInitialized] = useState(false);

  const fetchUser = async (uid: string) => {
    const snap = await db.collection("users").doc(uid).get();

    const data = snap.data() as null | AUTH.User;

    if (!data) {
      return;
    }
    setUser(data);
    console.log(data, "fetched");
  };

  useEffect(() => {
    const subscribe = authService.onAuthStateChanged((fbUser) => {
      if (!fbUser) {
        console.log("no user loggend in");
        setUser(null);
      } else {
        console.log(fbUser.uid, "fetch data from db");
        fetchUser(fbUser.uid);
      }
      //앱이 준비 끝남.
      setTimeout(() => setInitialized(true), 1000);
    });
    subscribe;

    return subscribe;
  }, []);

  const signout = async (): PromiseResult => {
    try {
      authService.signOut();
      return { success: true };
    } catch (error: any) {
      return { message: error.message };
    }
  };

  const signin = async (email: string, password: string): PromiseResult => {
    try {
      await authService.signInWithEmailAndPassword(email, password);
      return { success: true };
    } catch (error: any) {
      if (
        error.message ===
        "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential)."
      ) {
        const snap = await db
          .collection("users")
          .where("email", "==", email)
          .get();
        const data = snap.docs.map((doc) => ({ ...doc.data() }));
        if (!data) {
          ("존재하지 않는 유저입니다.");
        }
      }
      return { message: error.message };
    }
  };

  const signup = async ({
    email,
    jobDesc,
    name,
    password,
  }: {
    email: string;
    password: string;
    jobDesc: AUTH.UserJob;
    name: string;
  }): PromiseResult => {
    try {
      const { user } = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!user) {
        return { message: "존재하지않는 유저입니다." };
      }
      const newUser: AUTH.User = {
        email,
        password,
        jobDesc,
        name,
        uid: user.uid,
      };
      await db.collection("users").doc(user.uid).set(newUser);
      setUser();
      return { success: true };
    } catch (error: any) {
      return { message: error.message };
    }
  };

  return (
    <AUTH.Context.Provider
      value={{ initialized, signin, signup, signout, user }}
    >
      {children}
    </AUTH.Context.Provider>
  );
}
