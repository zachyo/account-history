import {
  AppConfig,
  connect,
  disconnect,
  isConnected,
  request,
  showConnect,
  type UserData,
  UserSession,  
} from "@stacks/connect";
import { GetAddressesResult } from "@stacks/connect/dist/types/methods";
import { useEffect, useState } from "react";

export function useStacks() {
  // Initially when the user is not logged in, userData is null
  const [userData, setUserData] = useState<GetAddressesResult | null>(null);  

  // create application config that allows
  // storing authentication state in browser's local storage
  const appConfig = new AppConfig(["store_write"]);

  // creating a new user session based on the application config
  const userSession = new UserSession({ appConfig });

  async function connectWallet() {
    const user = await connect()
    console.log(user)
    setUserData(user)
  }
  async function setUserAddresses() {
    const user = await request('getAddresses')
    setUserData(user)
  }
  function disconnectWallet() {
    // sign out the user and close their session
    // also clear out the user data
    // disconnect()
    setUserData(null);
  }

  // When the page first loads, if the user is already signed in,
  // set the userData
  // If the user has a pending sign-in instead, resume the sign-in flow
  useEffect(() => {
    if (isConnected()) {
      // connectWallet()
      setUserAddresses()      
    } 
    // else if (is) {
    //   userSession.handlePendingSignIn().then((userData) => {
    //     setUserData(userData);
    //   });
    // }
  }, []);

  // return the user data, connect wallet function, and disconnect wallet function
  return { userData, connectWallet, disconnectWallet };
}