//packages
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import { v5 as uuidv5 } from "uuid";

//components
import Navbar from "../components/Navbar";

function Bookings() {
  const session = useSession();

  useEffect(() => {
    // console.log(session.data.user.name);
    if (session.data != null) {
      //make a post request

      console.log(session.data.user);

      const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";
      let collectionName = uuidv5(
        session.data.user.name + session.data.user.email,
        MY_NAMESPACE
      );
      console.log(collectionName);

      axios
        .post("/api/get-bookings/", {
          collectionName: session.data.user.email,
        })
        .then((result) => console.log("Result --> ", result.data))
        .catch((err) => console.log(err));
    }
  }, [session.data?.user.name]);

  function handleClick() {
    if (session.data != null) {
      const MY_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";
      let collectionName = uuidv5(
        session.data.user.name + session.data.user.email,
        MY_NAMESPACE
      );

      axios
        .post("/api/create-booking/", {
          collectionName: collectionName,
          destination: document.querySelector("#destination").value,
          price: document.querySelector("#price").value,
        })
        .then((result) => console.log("booking created"))
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <Navbar />
      {session.data == null ? (
        <div>
          <h1>Sign In Please!</h1>
        </div>
      ) : (
        <div>
          <h1>Hello World</h1>
          <input type="text" id="destination" placeholder="destination" />
          <input type="number" id="price" placeholder="price" />
          <button onClick={handleClick}>Create JSON</button>
        </div>
      )}
    </>
  );
}

export default Bookings;
