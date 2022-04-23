//packages
import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";

function MapComponent(props) {
  const [popLocation, setPopLocation] = useState({});
  const [viewState, setViewState] = useState(props.viewState);

  useEffect(() => {
    setViewState(props.viewState);
  }, [props.viewState]);

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiYXJqdW4xMDI1IiwiYSI6ImNsMXlubXR6MzBlZHEzYnMza2d5MXpkaDgifQ.c3Ko6NeFdgqnFNTFYoSHmA";
  //   const coordinates = props.hotels.map((hotel) => ({
  //     longitude: hotel.coordinate.lon,
  //     latitude: hotel.coordinate.lat,
  //   }));
  //   let center = getCenter(coordinates);

  //   let viewState = {
  //     ...center,
  //     zoom: 8,
  //   };

  return (
    <Map
      //   {...props.viewState}
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/arjun1025/cl216ogd600cf15jq4w1aq3k1"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {props.hotels.map((hotel) => (
        <div key={hotel.id}>
          <Marker
            longitude={hotel.coordinate.lon}
            latitude={hotel.coordinate.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <span
              style={{ fontSize: "30px" }}
              onClick={() => {
                setPopLocation({
                  long: hotel.coordinate.lon,
                  lat: hotel.coordinate.lat,
                });
              }}
            >
              📌
            </span>
          </Marker>

          {popLocation.long == hotel.coordinate.lon &&
          popLocation.lat == hotel.coordinate.lat ? (
            <Popup
              closeOnClick={false}
              longitude={hotel.coordinate.lon}
              latitude={hotel.coordinate.lat}
              closeButton={false}
              style={{ fontSize: "20px" }}
            >
              {hotel.name}
            </Popup>
          ) : (
            ""
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapComponent;
