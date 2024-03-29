//packages
import Head from "next/head";
import axios from "axios";
import { getCenter } from "geolib";

//components
import Navbar from "../../../../../components/Navbar";
import HotelCard from "../../../../../components/HotelCard";
import MapComponent from "../../../../../components/MapComponent";

function Hotels(props) {
  // console.log(props);
  // console.log(
  //   props.hotels_list.slice(0, 10).map((hotel) => ({
  //     longitude: hotel.coordinate.long,
  //     latitude: hotel.coordinate.lat,
  //   }))
  // );

  return (
    <div className="flex flex-col h-screen overflow-y-scroll bg-indigo-50">
      <Head>
        <title>travelo</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* Navbar */}
      <div className="w-full flex justify-center shadow-lg z-20">
        <Navbar showSearch={false} />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 overflow-y-scroll">
        <div className="absolute z-10 bg-indigo-50 md:relative w-full md:w-3/4 h-full overflow-y-scroll content_container">
          {/* Hotel Listing */}
          <div className="text-slate-900 mx-4 py-4 mb-4 border-b border-b-gray-400">
            {/* <p>{`${props.query_params.checkInDate} to ${props.query_params.checkOutDate} for ${props.query_params.adultCount} guests`}</p> */}
            <div className="flex justify-between">
              <p>
                <span className="font-bold">
                  {props.query_params.checkInDate}
                </span>
                {" to "}
                <span className="font-bold">
                  {props.query_params.checkOutDate}
                </span>
              </p>
              <p>
                <span className="font-bold">
                  {props.query_params.adultCount}
                </span>
                {" Guests "}
              </p>
            </div>
            <h1 className="text-xl mt-1">
              Stays in{" "}
              <span className="font-bold">
                {props.query_params.destination}
              </span>
            </h1>
          </div>
          <div>
            {props.hotels_list.slice(0, 10).map((hotel) => (
              <HotelCard
                key={hotel.id}
                // hotel_img={hotel.optimizedThumbUrls.srpDesktop}
                hotel_img={hotel.img}
                hotel_name={hotel.name}
                // hotel_address={`${hotel.address.streetAddress}, ${hotel.address.locality}, ${hotel.address.postalCode}, ${hotel.address.countryName}`}
                hotel_address={hotel.address}
                hotel_rating={hotel.starRating}
                // hotel_price={hotel.ratePlan.price.current}
                hotel_price={hotel.price}
              />
            ))}
          </div>
        </div>
        <div className="absolute w-full md:relative md:w-2/4 bg-red-200 h-full  md:block map_container">
          {/* Hotels on Map */}
          <MapComponent
            hotels={props.hotels_list.slice(0, 10)}
            viewState={{
              ...getCenter(
                props.hotels_list.slice(0, 10).map((hotel) => ({
                  longitude: hotel.coordinate.long,
                  latitude: hotel.coordinate.lat,
                }))
              ),
              zoom: 8,
            }}
          />
        </div>
      </div>

      <div
        className="absolute z-50 right-0 top-0 bottom-0 flex items-center md:hidden map_button"
        onClick={() => {
          document.querySelector(".map_container").classList.remove("hidden");
          document.querySelector(".content_container").classList.add("hidden");
          document.querySelector(".back_button").classList.remove("hidden");
          document.querySelector(".map_button").classList.add("hidden");
        }}
      >
        <h1 className="bg-indigo-600 text-white px-3 py-3 shadow-xl rounded-l-xl text-sm flex flex-col items-center">
          <span>M</span>
          <span>A</span>
          <span>P</span>
        </h1>
      </div>

      <div
        className="absolute z-50 left-0 top-0 bottom-0 flex hidden items-center md:hidden back_button"
        onClick={() => {
          document.querySelector(".map_container").classList.add("hidden");
          document
            .querySelector(".content_container")
            .classList.remove("hidden");
          document.querySelector(".map_button").classList.remove("hidden");
          document.querySelector(".back_button").classList.add("hidden");
        }}
      >
        <h1 className="bg-indigo-600 text-white px-3 py-3 shadow-3xl rounded-r-xl text-sm flex flex-col items-center">
          <span>B</span>
          <span>A</span>
          <span>C</span>
          <span>K</span>
        </h1>
      </div>
    </div>
  );
}

async function getData(destination, adultCount, checkInDate, checkOutDate) {
  // let response_1 = await axios.get(
  //   "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search",
  //   {
  //     params: { query: destination, currency: "USD", locale: "en_US" },
  //     headers: {
  //       "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
  //       "x-rapidapi-key": "8517eae71fmsh11cb32d41fd9f01p1ec9a7jsnd2c8cd7a73ec",
  //     },
  //   }
  // );
  let response_1 = await axios.get(
    "https://hotels-com-provider.p.rapidapi.com/v2/regions",
    {
      params: { query: destination, locale: "en_IN", domain: "IN" },
      headers: {
        "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
        "X-RapidAPI-Key": "8517eae71fmsh11cb32d41fd9f01p1ec9a7jsnd2c8cd7a73ec",
      },
    }
  );
  // console.log(response_1.data.data[0]);
  // let destId = response_1.data.suggestions[0].entities[0].destinationId;
  let destId = response_1.data.data[0].gaiaId;

  // let response_2 = await axios.get(
  //   "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search",
  //   {
  //     params: {
  //       checkin_date: checkInDate,
  //       checkout_date: checkOutDate,
  //       sort_order: "STAR_RATING_HIGHEST_FIRST",
  //       destination_id: destId,
  //       adults_number: adultCount,
  //       locale: "en_US",
  //       currency: "INR",
  //     },
  //     headers: {
  //       "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
  //       "x-rapidapi-key": "8517eae71fmsh11cb32d41fd9f01p1ec9a7jsnd2c8cd7a73ec",
  //     },
  //   }
  // );

  let response_2 = await axios.get(
    "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search",
    {
      params: {
        domain: "IN",
        sort_order: "RECOMMENDED",
        locale: "en_IN",
        checkin_date: checkInDate,
        checkout_date: checkOutDate,
        region_id: destId,
        adults_number: adultCount,
        currency: "INR",
        star_rating_ids: "3,4,5",
      },
      headers: {
        "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
        "X-RapidAPI-Key": "8517eae71fmsh11cb32d41fd9f01p1ec9a7jsnd2c8cd7a73ec",
      },
    }
  );

  // console.log(response_2.data.properties[0].price.lead.amount);
  // console.log(response_2.data.properties[0].price.lead.currencyInfo.code);
  // console.log(response_2.data.properties[0].mapMarker.latLong.latitude);
  console.log(response_2.data.properties[0]);

  // let hotels_list = response_2.data.searchResults.results;

  let hotels_list = response_2.data.properties.map((property) => ({
    id: property.id,
    name: property.name,
    img: property.propertyImage?.image?.url,
    address: property.destinationInfo.distanceFromMessaging,
    starRating: property.star,
    price: property.price.lead.amount,
    coordinate: {
      lat: property.mapMarker.latLong.latitude,
      long: property.mapMarker.latLong.longitude,
    },
  }));
  // console.log(hotels_list);
  return hotels_list.slice(0, 10);
}

export async function getServerSideProps(context) {
  let query_params = context.params;
  let hotels_list = await getData(
    query_params.destination,
    query_params.adultCount,
    query_params.checkInDate,
    query_params.checkOutDate
  );

  return { props: { query_params: query_params, hotels_list: hotels_list } };
}

export default Hotels;
