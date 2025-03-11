
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

interface LocationMapProps {
  center?: [number, number];
  zoom?: number;
  locations?: Array<{id: string, name: string, coordinates: [number, number], address?: string, phone?: string, hours?: string, popular?: boolean, image?: string}>;
  activeLocationId?: string;
  interactive?: boolean;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  center = [-77.4360, 37.5407], // Center of Virginia
  zoom = 7,
  locations = [],
  activeLocationId,
  interactive = false,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    // Generate a map URL based on the center coordinates
    const lat = center[1];
    const lng = center[0];
    const mapZoom = zoom;
    
    // Create a more realistic map background with OpenStreetMap
    const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-1}%2C${lat-1}%2C${lng+1}%2C${lat+1}&amp;layer=mapnik&amp;marker=${lat}%2C${lng}`;
    setMapUrl(newMapUrl);

    // This simulates a map loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [center, zoom]);

  return (
    <div className={`relative w-full h-full min-h-[300px] rounded-lg overflow-hidden bg-muted/30 ${className}`}>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0">
          {/* Map background using iframe for OpenStreetMap */}
          {interactive ? (
            <iframe 
              src={mapUrl}
              title="OpenStreetMap"
              className="w-full h-full border-none"
            ></iframe>
          ) : (
            <img 
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${center[0]},${center[1]},${zoom},0/600x400@2x?access_token=pk.mapbox_placeholder`}
              alt="Map background"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://maptiler.com/static/img/maps/osm-bright.png";
              }}
            />
          )}
          
          {/* Store markers */}
          {locations.map(location => (
            <div 
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${activeLocationId === location.id ? 'bg-primary scale-125 z-10' : 'bg-primary/70 hover:scale-110'}`}
              style={{
                // These are approximate mappings for demonstration
                top: `${50 - (location.coordinates[1] - center[1]) * 5}%`,
                left: `${50 + (location.coordinates[0] - center[0]) * 5}%`,
              }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
              
              {/* Tooltip for location details */}
              <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs font-medium py-1 px-2 rounded shadow-md whitespace-nowrap transition-opacity duration-200 ${activeLocationId === location.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="font-bold">{location.name}</div>
                {location.address && <div className="text-xs mt-1">{location.address}</div>}
                {location.phone && <div className="text-xs">{location.phone}</div>}
                {location.hours && <div className="text-xs mt-1 text-muted-foreground">{location.hours}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
