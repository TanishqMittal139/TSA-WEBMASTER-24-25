
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// A backup access token for demo purposes - users should replace with their own
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsbzQwbmd4dzAxcncycnM5enRxdzY2bWsifQ.DnT4dS9lUvMxOGI9OmnFKA';

// Set the access token
mapboxgl.accessToken = MAPBOX_TOKEN;

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
  interactive = true,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
        attributionControl: true
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setLoading(false);
        
        // Add markers for each location
        if (locations.length > 0) {
          locations.forEach(location => {
            const isActive = activeLocationId === location.id;
            
            // Create a popup for the marker
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="font-family: Inter, sans-serif;">
                <strong>${location.name}</strong>
                ${location.address ? `<p>${location.address}</p>` : ''}
                ${location.phone ? `<p>${location.phone}</p>` : ''}
              </div>
            `);
            
            // Create the marker
            const marker = new mapboxgl.Marker({
              color: isActive ? '#ef4444' : '#4b5563'
            })
              .setLngLat(location.coordinates)
              .setPopup(popup)
              .addTo(map.current!);
            
            markers.current.push(marker);
          });
          
          // If there's an active location, fly to it
          if (activeLocationId) {
            const activeLocation = locations.find(loc => loc.id === activeLocationId);
            if (activeLocation) {
              map.current!.flyTo({
                center: activeLocation.coordinates,
                zoom: 15,
                essential: true
              });
            }
          }
        }
      });
    }

    // Clean up on unmount
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, locations, activeLocationId]);

  // Update markers when active location changes
  useEffect(() => {
    if (!map.current || markers.current.length === 0) return;
    
    markers.current.forEach((marker, index) => {
      marker.remove();
      
      const location = locations[index];
      const isActive = activeLocationId === location.id;
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="font-family: Inter, sans-serif;">
          <strong>${location.name}</strong>
          ${location.address ? `<p>${location.address}</p>` : ''}
          ${location.phone ? `<p>${location.phone}</p>` : ''}
        </div>
      `);
      
      const newMarker = new mapboxgl.Marker({ 
        color: isActive ? '#ef4444' : '#4b5563'
      })
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
      
      markers.current[index] = newMarker;
    });
    
    // If there's an active location, fly to it
    if (activeLocationId && map.current) {
      const activeLocation = locations.find(loc => loc.id === activeLocationId);
      if (activeLocation) {
        map.current.flyTo({
          center: activeLocation.coordinates,
          zoom: 15,
          essential: true
        });
      }
    }
  }, [activeLocationId, locations]);

  return (
    <div className={`relative w-full h-full min-h-[400px] rounded-lg overflow-hidden bg-muted/30 ${className}`}>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0" />
      )}
    </div>
  );
};

export default LocationMap;
