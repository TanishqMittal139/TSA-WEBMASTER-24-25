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

  // Calculate marker positions relative to center
  const getMarkerPosition = (coordinates: [number, number]) => {
    const lonDiff = coordinates[0] - center[0];
    const latDiff = coordinates[1] - center[1];
    
    // Scale factors - adjust these values to make markers appear in correct positions
    const lonScale = 10; // degrees longitude per 100% width
    const latScale = 8;  // degrees latitude per 100% height
    
    const left = 50 + (lonDiff / lonScale) * 100;
    const top = 50 - (latDiff / latScale) * 100;
    
    // Keep markers within visible area
    const clampedLeft = Math.max(5, Math.min(95, left));
    const clampedTop = Math.max(5, Math.min(95, top));
    
    return { left: `${clampedLeft}%`, top: `${clampedTop}%` };
  };

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
              src={`https://tile.openstreetmap.org/${zoom}/53/77.png`}
              alt="Map background"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://cdn.mapful.xyz/tiles/osm-bright/map.webp";
              }}
            />
          )}
          
          {/* Store markers */}
          {locations.map(location => {
            const position = getMarkerPosition(location.coordinates);
            
            return (
              <div 
                key={location.id}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeLocationId === location.id 
                    ? 'bg-primary scale-125 z-10' 
                    : 'bg-primary/70 hover:scale-110'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
                
                {/* Tooltip for location details */}
                <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs font-medium py-1 px-2 rounded shadow-md whitespace-nowrap transition-opacity duration-200 ${
                  activeLocationId === location.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <div className="font-bold">{location.name}</div>
                  {location.address && <div className="text-xs mt-1">{location.address}</div>}
                  {location.phone && <div className="text-xs">{location.phone}</div>}
                  {location.hours && <div className="text-xs mt-1 text-muted-foreground">{location.hours}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
