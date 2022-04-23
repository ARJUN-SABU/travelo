//packages
import axios from "axios";
import { getCenter } from "geolib";

//components
import Navbar from "../../../../../components/Navbar";
import HotelCard from "../../../../../components/HotelCard";
import MapComponent from "../../../../../components/MapComponent";

function Hotels(props) {
  // console.log(props);

  return (
    <div className="flex flex-col h-screen overflow-y-scroll">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-1 overflow-y-scroll">
        <div className="bg-green-200 flex-1 h-full overflow-y-scroll">
          {/* Hotel Listing */}
          <div>
            <p>{`${props.query_params.checkInDate} to ${props.query_params.checkOutDate} for ${props.query_params.adultCount} guests`}</p>
            <h1>{props.query_params.destination}</h1>
          </div>
          <div>
            {props.hotels_list.slice(0, 10).map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel_img={hotel.optimizedThumbUrls.srpDesktop}
                hotel_name={hotel.name}
                hotel_address={`${hotel.address.streetAddress}, ${hotel.address.locality}, ${hotel.address.postalCode}, ${hotel.address.countryName}`}
                hotel_rating={hotel.starRating}
                hotel_price={hotel.ratePlan.price.current}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 bg-red-200 h-full">
          {/* Hotels on Map */}
          <MapComponent
            hotels={props.hotels_list.slice(0, 10)}
            viewState={{
              ...getCenter(
                props.hotels_list.slice(0, 10).map((hotel) => ({
                  longitude: hotel.coordinate.lon,
                  latitude: hotel.coordinate.lat,
                }))
              ),
              zoom: 8,
            }}
          />
        </div>
      </div>
    </div>
  );
}

async function getData(destination, adultCount, checkInDate, checkOutDate) {
  let response_1 = await axios.get(
    "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search",
    {
      params: { query: destination, currency: "USD", locale: "en_US" },
      headers: {
        "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
        "x-rapidapi-key": "8517eae71fmsh11cb32d41fd9f01p1ec9a7jsnd2c8cd7a73ec",
      },
    }
  );
  let destId = response_1.data.suggestions[0].entities[0].destinationId;
  let response_2 = await axios.get(
    "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search",
    {
      params: {
        checkin_date: checkInDate,
        checkout_date: checkOutDate,
        sort_order: "STAR_RATING_HIGHEST_FIRST",
        destination_id: destId,
        adults_number: adultCount,
        locale: "en_US",
        currency: "INR",
      },
      headers: {
        "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
        "x-rapidapi-key": "8517eae71fmsh11cb32d41fd9f01p1ec9a7jsnd2c8cd7a73ec",
      },
    }
  );

  let hotels_list = response_2.data.searchResults.results;
  return hotels_list;
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
