//packages
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { v5 as uuidv5 } from "uuid";

//components
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

function Bookings() {
  const session = useSession();
  const [myBookings, setMyBookings] = useState([]);

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
        .then((result) => {
          console.log("Result --> ", result.data);
          setMyBookings(result.data.bookings);
        })
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
        <div className="absolute top-0 bottom-0 left-0 right-0 z-[-1] flex justify-center items-center">
          <button
            className="font-semibold text-xl bg-sky-500 shadow-xl px-6 py-2 rounded-lg"
            onClick={signIn}
          >
            Sign In Please!
          </button>
        </div>
      ) : (
        <div>
          <h1 className="font-semibold text-2xl pl-4 py-6 lg:px-40">
            My Bookings
          </h1>
          <div className="lg:mx-36">
            {myBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                hotel_name={booking.hotel_name}
                amount={booking.amount}
                id={booking._id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Bookings;
