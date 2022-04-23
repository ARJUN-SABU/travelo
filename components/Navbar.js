import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

//components
import Logo from "./Logo";
import DatePicker from "./DatePicker";

//icons
import { FaSearch } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";

function Navbar() {
  const [destinationName, setDestinationName] = useState("");
  const [adultCount, setAdultCount] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const router = useRouter();
  const session = useSession();
  // console.log(session);

  // document.addEventListener('click',(event)=>{
  //   if(event.target.contains)
  // })

  //passed as props to the datePicker component
  function getDates(startDate, endDate) {
    let sDate = "";
    let eDate = "";
    if (startDate != null) {
      sDate = `${startDate?.year}-${
        startDate?.month + 1 < 10
          ? `0${startDate?.month + 1}`
          : startDate?.month + 1
      }-${startDate?.date < 10 ? `0${startDate?.date}` : startDate?.date}`;
    } else {
      sDate = null;
    }

    if (endDate != null) {
      eDate = `${endDate?.year}-${
        endDate?.month + 1 < 10 ? `0${endDate?.month + 1}` : endDate?.month + 1
      }-${endDate?.date < 10 ? `0${endDate?.date}` : endDate?.date}`;
    } else {
      eDate = null;
    }

    setArrivalDate(sDate);
    setDepartureDate(eDate);
  }

  return (
    <div className="flex justify-between items-center w-full bg-sky-200">
      {/* Logo */}
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <Logo />
      </div>

      <div className="relative">
        {/* Searching */}
        <div className="flex items-center py-4">
          <input
            type="text"
            className="border-r-2 outline-none px-3 py-2"
            placeholder="Destination"
            onChange={(e) => {
              setDestinationName(e.target.value);
            }}
          ></input>
          <input
            type="number"
            className="border-none outline-none px-3 py-2"
            placeholder="Number of Adults"
            onChange={(e) => {
              setAdultCount(e.target.value);
            }}
            min={1}
          ></input>
          <div
            className="p-3 bg-sky-400 cursor-pointer"
            onClick={() => {
              if (
                adultCount !== "" &&
                destinationName !== "" &&
                arrivalDate != null &&
                departureDate != null
              ) {
                document
                  .querySelectorAll("input")
                  .forEach((inputField) => (inputField.value = ""));

                let dName = destinationName;
                let aCount = adultCount;
                let aDate = arrivalDate;
                let dDate = departureDate;

                setDestinationName("");
                setAdultCount("");
                setArrivalDate("");
                setDepartureDate("");
                router.push(
                  // `/hotels/${destinationName}/${adultCount}/${arrivalDate}/${departureDate}`
                  `/hotels/${dName}/${aCount}/${aDate}/${dDate}`
                );
              }
            }}
          >
            <FaSearch />
          </div>
        </div>
        {adultCount !== "" || destinationName !== "" ? (
          <div className="absolute left-0 right-0 mx-auto flex justify-center z-10">
            <DatePicker sendDates={getDates} />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* User Options -> Previous Bookings, Login/Logout, Name + Circle_icon */}
      <div>
        {session.data == null ? (
          <p onClick={signIn}>Sign In</p>
        ) : (
          <div className="relative mx-4">
            <p
              onClick={() => {
                document
                  .querySelector(".user_options")
                  .classList.toggle("hidden");
              }}
              className="cursor-pointer flex px-4 bg-red-100 items-center"
            >
              <span>{session.data?.user?.name}</span>
              <span className="pl-2">
                <AiFillCaretDown />
              </span>
            </p>
            <div className="user_options absolute z-10 w-[max-content] px-4 bg-white hidden">
              <p className="cursor-pointer py-2 px-2">Your Bookings</p>
              <p className="cursor-pointer py-2 px-2" onClick={signOut}>
                Sign Out
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
