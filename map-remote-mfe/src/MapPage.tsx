import { useNavigate } from "react-router";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { useProperties } from "@/hooks/useProperties";

const DEFAULT_CENTER: [number, number] = [6.9271, 79.8612];
const DEFAULT_ZOOM = 9;

function createPropertyIcon(image: string, alt: string) {
  return L.divIcon({
    className: "property-marker",
    html: `<img src="${image}" alt="${alt}" />`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    tooltipAnchor: [0, -36],
  });
}

export default function MapPage() {
  const navigate = useNavigate();
  const { data: properties = [], isLoading, isError } = useProperties();

  return (
    <div className="flex flex-col">
      {isError && (
        <div className="px-8 py-10 text-red-400">
          Failed to load properties. Please try again.
        </div>
      )}

      {isLoading && (
        <div className="text-muted-foreground px-8 py-10">Loading map…</div>
      )}

      {!isLoading && !isError && (
        <div className="h-[calc(100vh-180px)] w-full overflow-hidden px-8 pb-8 mt-20">
          <MapContainer
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom
            className="h-full w-full rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={[property.lat, property.lng]}
                icon={createPropertyIcon(property.image, property.title)}
                eventHandlers={{
                  click: () => navigate(`/property-details/${property.id}`),
                }}
              >
                <Tooltip
                  direction="top"
                  className="!w-max !max-w-none !whitespace-nowrap !rounded-lg !p-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-12 w-12 shrink-0 rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{property.title}</span>
                      <span className="text-xs text-gray-500">
                        {property.location}
                      </span>
                      <span className="text-xs">
                        {property.type} · {property.price} · ★ {property.rating}
                      </span>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
