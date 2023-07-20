import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import GoogleMapReact from "google-map-react";
Geocode.setApiKey("AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM");
const AnyReactComponent = ({ lat, lng }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-geo-alt-fill pin"
        viewBox="0 0 16 16"
        style={{
          position: "absolute",
          top: `${100 - lat * 100}%`,
          left: `${lng * 100}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      </svg>
    </div>
  );
};

const MapComponent = ({ address }) => {
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({ lat, lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  }, [address]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {loading ? (
        <div>Loading map...</div>
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAN_Pb8XbXRMZcpXQXax9GIyIfo0f5odgM" }}
          defaultCenter={center}
          defaultZoom={11}
        >
          <AnyReactComponent lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      )}
    </div>
  );
};

export default MapComponent;
