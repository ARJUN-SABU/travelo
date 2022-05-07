import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

//components
import Logo from "./Logo";
import DatePicker from "./DatePicker";

//icons
import { FaSearch } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";

function Navbar(props) {
  const [destinationName, setDestinationName] = useState("");
  const [adultCount, setAdultCount] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setScreenWidth(window.outerWidth);
  }, []);

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
    <div className="relative flex justify-between items-center w-full max-w-[1500px] bg-indigo-50 py-6 md:py-8">
      {/* Logo */}
      <div
        className="cursor-pointer ml-4 lg:ml-16"
        onClick={() => {
          router.push("/");
        }}
      >
        <Logo />
      </div>

      {/* Searching */}
      {screenWidth < "768" ? (
        props.showSearch === true ? (
          <div className="absolute top-[90px] left-0 right-0 flex-1 md:relative md:top-0 max-w-[800px] md:px-8 flex flex-col items-center">
            <div className="w-full flex md:flex-row flex-col items-center shadow-md border-t-2 border-sky-600 md:border-none">
              <input
                type="text"
                className="md:border-r-2 md:border-b-0 border-b-2 border-gray-300 outline-none px-4 py-3 text-lg md:flex-1 w-full"
                placeholder="Destination"
                onChange={(e) => {
                  setDestinationName(e.target.value);
                }}
              ></input>
              <div className="flex md:flex-1 w-full">
                <input
                  type="number"
                  className="outline-none px-4 py-3  text-lg w-full"
                  placeholder="Number of Adults"
                  onChange={(e) => {
                    setAdultCount(e.target.value);
                  }}
                  min={1}
                ></input>
                <div
                  className="py-3 px-5 bg-sky-400 cursor-pointer hidden md:flex items-center justify-center"
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
              <button
                className="p-3 w-full bg-sky-400 cursor-pointer md:hidden"
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
                Search
              </button>
            </div>
            {adultCount !== "" || destinationName !== "" ? (
              <div className="absolute top-36 md:top-20 left-0 right-0 mx-auto flex justify-center z-10 scale-90 md:scale-100">
                <DatePicker sendDates={getDates} />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )
      ) : (
        <div className="absolute top-[90px] left-0 right-0 flex-1 md:relative md:top-0 max-w-[800px] md:px-8 flex flex-col items-center">
          <div className="w-full flex md:flex-row flex-col items-center shadow-md border-t-2 border-sky-600 md:border-none">
            <input
              type="text"
              className="md:border-r-2 md:border-b-0 border-b-2 border-gray-300 outline-none px-4 py-3 text-lg md:flex-1 w-full"
              placeholder="Destination"
              onChange={(e) => {
                setDestinationName(e.target.value);
              }}
            ></input>
            <div className="flex md:flex-1 w-full">
              <input
                type="number"
                className="outline-none px-4 py-3  text-lg w-full"
                placeholder="Number of Adults"
                onChange={(e) => {
                  setAdultCount(e.target.value);
                }}
                min={1}
              ></input>
              <div
                className="py-3 px-5 bg-sky-400 cursor-pointer hidden md:flex items-center justify-center"
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
            <button
              className="p-3 w-full bg-sky-400 cursor-pointer md:hidden"
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
              Search
            </button>
          </div>
          {adultCount !== "" || destinationName !== "" ? (
            <div className="absolute top-36 md:top-20 left-0 right-0 mx-auto flex justify-center z-10 scale-90 md:scale-100">
              <DatePicker sendDates={getDates} />
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {/* User Options -> Previous Bookings, Login/Logout, Name + Circle_icon */}
      <div>
        {session.data == null ? (
          <p
            className="mr-4 lg:mr-16 cursor-pointer hover:underline flex flex-col"
            onClick={signIn}
          >
            <span className="font-sm mb-[0px]">
              <span className="mr-1">Hello,</span>
              <span className="font-semibold">Guest</span>
            </span>
            <span className="text-xs mt-[0px]">Sign In</span>
          </p>
        ) : (
          <div className="relative mr-4 lg:mr-16 flex flex-col items-center">
            <p
              onClick={() => {
                document
                  .querySelector(".user_options")
                  .classList.toggle("hidden");
              }}
              className="cursor-pointer flex items-center"
            >
              <span className="mr-1">Hi, </span>
              <span className="font-bold">
                {session.data?.user?.name.substring(
                  0,
                  session.data?.user?.name.indexOf(" ")
                )}
              </span>
              <span className="pl-1 animate-bounce text-sky-800">
                <AiFillCaretDown />
              </span>
            </p>
            <div className="user_options absolute top-8 z-10 w-[max-content] bg-white hidden shadow-md">
              <p
                className="cursor-pointer py-2 px-4 hover:bg-sky-100"
                onClick={() => {
                  router.push("/my-bookings");
                }}
              >
                Your Bookings
              </p>
              <p
                className="cursor-pointer py-2 px-4 hover:bg-sky-100"
                onClick={signOut}
              >
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
