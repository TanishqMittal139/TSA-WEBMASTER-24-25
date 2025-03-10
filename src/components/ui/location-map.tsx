
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

interface LocationMapProps {
  center?: [number, number];
  zoom?: number;
  locations?: Array<{id: string, name: string, coordinates: [number, number], address?: string, phone?: string, hours?: string, popular?: boolean}>;
  activeLocationId?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  center = [-77.4360, 37.5407], // Center of Virginia
  zoom = 7,
  locations = [],
  activeLocationId
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This simulates a map loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-muted/30">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0 bg-[url('https://maptiler.com/static/img/example-usa-states-county.png')] bg-cover bg-center">
          {/* Map overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Store markers */}
          {locations.map(location => (
            <div 
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${activeLocationId === location.id ? 'bg-primary scale-125' : 'bg-primary/70'}`}
              style={{
                // These are approximate mappings for demonstration
                top: `${50 - (location.coordinates[1] - center[1]) * 10}%`,
                left: `${50 + (location.coordinates[0] - center[0]) * 10}%`,
              }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
