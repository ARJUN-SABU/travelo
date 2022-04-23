import React, { useEffect, useState } from "react";

//icons
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

//styling
import styles from "../styles/DatePicker.module.css";

function DatePicker(props) {
  const [currDate, setCurrDate] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(null);

  const [checkOutDate, setCheckOutDate] = useState(null);

  const [minDate, setMinDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [checkSelected, setCheckSelected] = useState("check-in");

  // currDate.setFullYear(2023);
  // currDate.setMonth(6);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [month, setMonth] = useState(currDate.getMonth());
  const [year, setYear] = useState(currDate.getFullYear());

  const [checkInString, setCheckInString] = useState("Select Date");
  const [checkOutString, setCheckOutString] = useState("Select Date");

  useEffect(() => {
    let days = document.querySelector(".datePicker__dates");
    //new Date(current_year, current_month, 0) => gives the last date of previous month
    //new Date(current_year, current_month, 1) => gives the 1st date of current month
    //new Date(current_year, current_month + 1, 0) => gives the last date of current_month, i.e why we did current_month + 1

    //set the days of the previous month
    let dateString = "";
    let prevLastDate = new Date(year, month, 0).getDate();
    //Index if its Sun -> 0, Mon -> 1
    //that means if we are getting 2 => Tue,
    //so our current month starts from Tue,
    //so, we need 2 days Sun, Mon of the previous month
    let d = new Date(currDate); //copy the currDate
    d.setDate(1); //set the date to 1st of the month
    let prevDays = d.getDay();
    for (let x = prevDays; x > 0; x--) {
      // dateString +=
      //   "<p class='text-slate-500 cursor-auto border-2 border-transparent text-center rounded-xl py-3 text-base'>" +
      //   `<span>${prevLastDate - x + 1}</span></p>`;
      //we don't want to show the previous dates as the user say clicks 4th of Feb
      //in the next days of January, and then opens the month of Feb, then, 4th of Feb
      //was already clicked in January, so this ambiguity can be avoided. So, we just show
      //the space for previous dates and not the acutal numbers.
      dateString +=
        "<p class='text-slate-500 cursor-auto border-2 border-transparent text-center rounded-xl py-3 text-base'>" +
        `<span></span></p>`;
    }

    //set the days of the current month
    let lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      if (
        year == new Date().getFullYear() &&
        month == new Date().getMonth() &&
        i == new Date().getDate()
      ) {
        //current day
        if (
          year < minDate.year ||
          (year == minDate.year && month < minDate.month) ||
          (year == minDate.year && month == minDate.month && i < minDate.date)
        ) {
          dateString += `<p class='text-gray-400 cursor-pointer border-2 border-transparent hover:border-sky-500 text-center rounded-xl py-3 text-base pointer-events-none'><span class="border-b-2 pb-1 border-sky-500">${i}</span></p>`;
        } else {
          if (
            (i == checkInDate?.date &&
              month == checkInDate?.month &&
              year == checkInDate?.year) ||
            (i == checkOutDate?.date &&
              month == checkOutDate?.month &&
              year == checkOutDate?.year)
          ) {
            dateString += `<p class='text-white cursor-pointer border-2 border-transparent hover:border-sky-500 text-center rounded-xl py-3 text-base bg-sky-500'><span class="border-b-2 pb-1 border-white">${i}</span></p>`;
          } else {
            dateString += `<p class='text-white cursor-pointer border-2 border-transparent hover:border-sky-500 text-center rounded-xl py-3 text-base'><span class="border-b-2 pb-1 border-sky-500">${i}</span></p>`;
          }
        }
      } else if (
        year < minDate.year ||
        (year == minDate.year && month < minDate.month) ||
        (year == minDate.year && month == minDate.month && i < minDate.date)
      ) {
        //block the days previous to the currentDay
        if (
          (i == checkInDate?.date &&
            month == checkInDate?.month &&
            year == checkInDate?.year) ||
          (i == checkOutDate?.date &&
            month == checkOutDate?.month &&
            year == checkOutDate?.year)
        ) {
          dateString += `<p class='text-gray-400 cursor-not-allowed border-2 border-transparent text-center rounded-xl py-3 text-base pointer-events-none bg-sky-500'><span class="">${i}</span></p>`;
        } else {
          dateString += `<p class='text-gray-400 cursor-not-allowed border-2 border-transparent text-center rounded-xl py-3 text-base pointer-events-none'><span class="">${i}</span></p>`;
        }
      } else {
        //future days
        if (
          (i == checkInDate?.date &&
            month == checkInDate?.month &&
            year == checkInDate?.year) ||
          (i == checkOutDate?.date &&
            month == checkOutDate?.month &&
            year == checkOutDate?.year)
        ) {
          dateString += `<p class='text-white cursor-pointer border-2 border-transparent  hover:border-sky-500 text-center rounded-xl py-3 text-base bg-sky-500'><span>${i}</span></p>`;
        } else {
          dateString += `<p class='text-white cursor-pointer border-2 border-transparent  hover:border-sky-500 text-center rounded-xl py-3 text-base'><span>${i}</span></p>`;
        }
      }
    }

    //We DOn't have to show the next month's dates as the user might click this next month's day
    //in the current month itself and the same dates are visible in the next month and are clickable
    //so there is double clickable ambiguity here.
    //set the days of the next month
    //get the first day of the next month
    // let nextMonthDay = new Date(year, month + 1, 1).getDay();
    // // let k = 1;
    // for (let x = nextMonthDay; x <= 6; x++) {
    //   // dateString += `<p class='text-sky-300 cursor-pointer border-2 border-transparent hover:border-sky-500 text-center rounded-xl py-3 text-base'><span>${k}</span></p>`;
    //   // k++;
    //   //Similar to previous dates, we are just showing the space for the next dates
    //   //instead of showing the actual numbers.
    //   dateString += `<p class='text-sky-300 cursor-pointer border-2 border-transparent hover:border-sky-500 text-center rounded-xl py-3 text-base'><span></span></p>`;
    // }

    days.innerHTML = dateString;
  }, [currDate, minDate, checkInDate, checkOutDate]);

  useEffect(() => {
    //when each date is clicked
    window.document
      .querySelectorAll(".datePicker__dates p")
      .forEach((date_item) =>
        date_item.addEventListener("click", (event) => {
          let newMinDate = {
            date: parseInt(
              event.target.innerHTML
                .replace("<span>", "")
                .replace("</span>", "")
                .replace('<span class="border-b-2 pb-1 border-sky-500">', "")
                .replace('<span class="border-b-2 pb-1 border-white">2', "")
            ),
            month: month,
            year: year,
          };

          if (checkSelected === "check-in") {
            // event.target.classList.add("bg-green-500");
            setCheckInDate(newMinDate);
            setCheckInString(
              `${newMinDate.date} ${months[newMinDate.month]} ${
                newMinDate.year
              }`
            );
            if (
              checkOutDate?.year < newMinDate.year ||
              (checkOutDate?.year == newMinDate.year &&
                checkOutDate?.month < newMinDate.month) ||
              (checkOutDate?.year == newMinDate.year &&
                checkOutDate?.month == newMinDate.month &&
                checkOutDate?.date < newMinDate.date)
            ) {
              setCheckOutDate(null);
              setCheckOutString("Select Date");
            }
          } else {
            // event.target.classList.add("bg-red-500");
            setCheckOutDate(newMinDate);
            setCheckOutString(
              `${newMinDate.date} ${months[newMinDate.month]} ${
                newMinDate.year
              }`
            );
          }
        })
      );
  }, [currDate, minDate, checkInDate, checkOutDate]);

  useEffect(() => {
    if (checkSelected === "check-in") {
      setMinDate({
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      });
    } else {
      if (checkInDate != null) {
        setMinDate(checkInDate);
      }
    }
  }, [checkSelected]);

  useEffect(() => {
    props.sendDates(checkInDate, checkOutDate);
  }, [checkInDate, checkOutDate]);

  return (
    <div className="w-[400px]">
      <div className="flex w-full justify-around bg-slate-800 text-white pt-6 pb-3 px-4">
        <div className="flex-1 mr-4 flex flex-col items-center">
          <button
            className={
              checkSelected === "check-in"
                ? `border-2 border-slate-300 px-2 py-1 rounded w-full ${styles.checkButton}`
                : `border-2 border-transparent px-2 py-1 rounded w-full ${styles.checkButton}`
            }
            onClick={() => {
              setCheckSelected("check-in");
            }}
          >
            Check In
          </button>
          <p className="text-gray-300 text-sm pt-2">{checkInString}</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <button
            className={
              checkSelected === "check-out"
                ? `border-2 border-slate-300 px-2 py-1 rounded w-full ${styles.checkButton}`
                : `border-2 border-transparent px-2 py-1 rounded w-full ${styles.checkButton}`
            }
            onClick={() => {
              setCheckSelected("check-out");
            }}
          >
            Check Out
          </button>
          <p className="text-gray-300 text-sm pt-2">{checkOutString}</p>
        </div>
      </div>
      <div className={`bg-slate-900 shadow-2xl ${styles.datePicker}`}>
        <div className="flex justify-between items-center w-full py-6 px-4">
          <div
            className="cursor-pointer"
            onClick={() => {
              let d = new Date(year, month);
              d.setMonth(month - 1);
              setCurrDate(d);
              setMonth(d.getMonth());
              setYear(d.getFullYear());
            }}
          >
            <AiFillCaretLeft />
          </div>
          <div className="text-xl font-semibold">
            <h1>
              {months[month]} {year}
            </h1>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              let d = new Date(year, month);
              d.setMonth(month + 1);
              setCurrDate(d);
              setMonth(d.getMonth());
              setYear(d.getFullYear());
            }}
          >
            <AiFillCaretRight />
          </div>
        </div>

        <div className={`flex py-2 ${styles.datePicker__middle}`}>
          <p className="text-sm text-sky-500 text-center font-semibold">Sun</p>
          <p className="text-sm text-sky-500 text-center font-semibold">Mon</p>
          <p className="text-sm text-sky-500 text-center font-semibold">Tue</p>
          <p className="text-sm text-sky-500 text-center font-semibold">Wed</p>
          <p className="text-sm text-sky-500 text-center font-semibold">Thu</p>
          <p className="text-sm text-sky-500 text-center font-semibold">Fri</p>
          <p className="text-sm text-sky-500 text-center font-semibold">Sat</p>
        </div>

        <div
          className={`flex flex-wrap w-full datePicker__dates ${styles.datePicker__bottom}`}
        ></div>
      </div>
    </div>
  );
}

export default DatePicker;
