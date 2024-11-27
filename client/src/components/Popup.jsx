import React, { useContext, useEffect, useRef } from "react";
import { MapContext } from "../context/MapContext";
import mapboxgl from "mapbox-gl";

export const Popup = ({ children, lngLat, onClose }) => {
  const { map } = useContext(MapContext);
  const popupRef = useRef();

  useEffect(() => {
    const popup = new mapboxgl.Popup({})
      .setLngLat(lngLat)
      .setDOMContent(popupRef.current)
      .addTo(map);

    popup.on("close", onClose);

    return popup.remove;
  }, [children, lngLat]);

  return (
    <div style={{ display: "none" }}>
      <div ref={popupRef}>{children}</div>
    </div>
  );
};

export default Popup;
