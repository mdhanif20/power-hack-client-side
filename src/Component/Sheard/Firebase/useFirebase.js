import { getAuth, createUserWithEmailAndPassword ,signOut, onAuthStateChanged,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useState, useEffect } from 'react';
import firebaseInitialization from './Firebase.init';


firebaseInitialization();

const useFirebase = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [isLogin,setIsLogin] = useState(false);
    const [users,setUser] = useState({});
    const [authError, setError] = useState("");
    const auth = getAuth();


    const singnInUser = (email,password) =>{
      setIsLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
          alert("Login Successfully!")
          setIsLogin(true);
          setError("")
          })
          .catch((error) => {
            setError(error.message)
          })
          .finally(()=>setIsLoading(false))
    }

 

  const registerUser = (email,password,name) =>{
    setIsLoading(true);
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        setError("");
        const newUser = {email, displayName:name};
        setUser(newUser)
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
        }).catch((error) => {
        });
        })
        .catch((error) => {
          setError(error.message)
        })
        .finally(()=>setIsLoading(false))
  }

 //observe user state
    useEffect(()=>{ 
       const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
          });
          return () => unsubscribe;
    },[])



    const logOut = () =>{
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=>setIsLoading(false))
    }
    return{
        users,
        isLoading,
        authError ,
        isLogin,
        registerUser,
        logOut,
        singnInUser,
    }

}
export default useFirebase;