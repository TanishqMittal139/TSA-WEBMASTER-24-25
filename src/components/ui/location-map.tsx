
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

interface LocationMapProps {
  center?: [number, number];
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({
  center = [-98.5795, 39.8283], // Default center of US
  zoom = 4
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This simulates a map loading - in a real scenario, 
    // we would use an actual map service like Mapbox or Google Maps
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
        <div ref={mapContainer} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?q=80&w=2531&auto=format&fit=crop')] bg-cover bg-center">
          {/* Map placeholder - in a real implementation, this would be replaced by an actual map */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
          
          {/* Store markers */}
          <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="absolute top-2/3 left-2/3 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
