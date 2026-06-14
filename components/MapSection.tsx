"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  WEDDING_LAT,
  WEDDING_LNG,
  WEDDING_VENUE,
  WEDDING_ADDRESS_FR,
  WEDDING_ADDRESS_AR,
  WEDDING_MAPS_QUERY,
} from "@/lib/supabase";
import { MosqueSilhouette, ScriptFlourish } from "./DecorativeAssets";
import ZenSection from "./ZenSection";

const goldIcon = L.divIcon({
  className: "custom-gold-marker",
  html: `<div style="
    width: 28px; height: 28px;
    background: #C5A059;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 2px solid white;
    box-shadow: 0 2px 10px rgba(197,160,89,0.5);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export default function MapSection() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.custom-gold-marker { background: transparent !important; border: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(WEDDING_MAPS_QUERY)}`;

  return (
    <ZenSection fullHeight className="text-center">
      <div className="zen-panel mx-auto max-w-sm py-8">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="zen-btn zen-btn--dark mx-auto mb-8 inline-block min-h-[36px] px-5 py-2 text-xs"
        >
          Localisation
        </a>

        <h2 className="font-script text-4xl text-gold-dark md:text-5xl">
          Itinéraire Google Maps
        </h2>

        <ScriptFlourish className="my-5" />

        <div className="mx-auto overflow-hidden rounded-2xl shadow-lg shadow-text-dark/8">
          <MapContainer
            center={[WEDDING_LAT, WEDDING_LNG]}
            zoom={15}
            scrollWheelZoom={true}
            className="aspect-square w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[WEDDING_LAT, WEDDING_LNG]} icon={goldIcon}>
              <Popup>
                <strong>{WEDDING_VENUE}</strong>
                <br />
                {WEDDING_ADDRESS_FR}
                <br />
                <span dir="rtl">{WEDDING_ADDRESS_AR}</span>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-8">
          <MosqueSilhouette />
        </div>
      </div>
    </ZenSection>
  );
}
