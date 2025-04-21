// Location data for the app

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: [number, number];
  popular: boolean;
  region: string;
  state: string;
  rating: number;
  image: string;
  reviewCount: number;
}

// Virginia locations only
export const locations: Location[] = [
  {
    id: 'va-glenallen',
    name: 'Glen Allen - Virginia',
    address: '4350 Pouncey Tract Rd, Glen Allen, VA 23060',
    phone: '(804) 555-7821',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-77.6082, 37.6651],
    popular: true,
    region: 'East Coast',
    state: 'Virginia',
    rating: 4.8,
    reviewCount: 1243,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'
  },
  {
    id: 'va-hampton',
    name: 'Hampton - Virginia',
    address: '2150 Cunningham Dr, Hampton, VA 23666',
    phone: '(757) 555-3492',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-76.3968, 37.0311],
    popular: false,
    region: 'East Coast',
    state: 'Virginia',
    rating: 4.6,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop'
  },
  {
    id: 'va-richmond',
    name: 'Richmond - Virginia',
    address: '901 E Cary St, Richmond, VA 23219',
    phone: '(804) 555-9072',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-77.4360, 37.5407],
    popular: true,
    region: 'East Coast',
    state: 'Virginia',
    rating: 4.9,
    reviewCount: 1567,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop'
  },
  {
    id: 'va-norfolk',
    name: 'Norfolk - Virginia',
    address: '300 Monticello Ave, Norfolk, VA 23510',
    phone: '(757) 555-2123',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-76.2859, 36.8508],
    popular: false,
    region: 'East Coast',
    state: 'Virginia',
    rating: 4.7,
    reviewCount: 934,
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&auto=format&fit=crop'
  },
  {
    id: 'va-alexandria',
    name: 'Alexandria - Virginia',
    address: '277 S Washington St, Alexandria, VA 22314',
    phone: '(703) 555-8901',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-77.0469, 38.8048],
    popular: false,
    region: 'East Coast',
    state: 'Virginia',
    rating: 4.5,
    reviewCount: 756,
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop'
  }
];

// Get locations by state
export const getLocationsByState = (state: string): Location[] => {
  return locations.filter(location => location.state.toLowerCase() === state.toLowerCase());
};

// Get locations by region
export const getLocationsByRegion = (region: string): Location[] => {
  return locations.filter(location => location.region.toLowerCase() === region.toLowerCase());
};

// Get popular locations
export const getPopularLocations = (): Location[] => {
  return locations.filter(location => location.popular);
};

// Get location by ID
export const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

// Helper to filter locations by search term
export const filterLocationsBySearch = (searchTerm: string): Location[] => {
  if (!searchTerm.trim()) return locations;
  
  const searchTermLower = searchTerm.toLowerCase();
  return locations.filter(location => 
    location.name.toLowerCase().includes(searchTermLower) ||
    location.address.toLowerCase().includes(searchTermLower) ||
    location.state.toLowerCase().includes(searchTermLower)
  );
};

// Helper to filter locations by ZIP code (3-digit match for demo purposes)
export const filterLocationsByZip = (zipCode: string): Location[] => {
  if (!zipCode.trim()) return [];
  
  // In a real app, this would use geocoding or database lookup
  // For demo, we'll just return locations based on zip codes
  // ZIP code mapping is simplistic for demo purposes
  const zipFirstDigit = zipCode.charAt(0);
  
  const statesByZipPrefix: Record<string, string[]> = {
    "0": ["Massachusetts", "Rhode Island", "New Hampshire", "Maine", "Vermont", "Connecticut"],
    "1": ["New York"],
    "2": ["Virginia", "North Carolina", "South Carolina"],
    "3": ["Florida", "Georgia"],
    "4": ["Michigan", "Indiana", "Ohio"],
    "5": ["Minnesota", "Wisconsin", "Illinois"],
    "6": ["Texas", "Oklahoma"],
    "7": ["Texas", "Louisiana", "Arkansas"],
    "8": ["Colorado", "Arizona", "New Mexico"],
    "9": ["California", "Washington", "Oregon"]
  };
  
  const matchedStates = statesByZipPrefix[zipFirstDigit] || [];
  
  return locations.filter(loc => 
    matchedStates.some(state => loc.state === state)
  );
};

// Helper to check if location delivers to address (demo/simulated)
export const locationDeliversToAddress = (address: string, cityStateZip: string): Location[] => {
  // This is a simulated check - in a real app this would use distance calculation
  const fullAddress = `${address} ${cityStateZip}`.toLowerCase();
  
  // Extract city or state from the address
  let matchedLocations: Location[] = [];
  
  locations.forEach(location => {
    const state = location.state.toLowerCase();
    if (fullAddress.includes(state)) {
      matchedLocations.push(location);
    }
    
    // Also try to match by city
    const city = location.name.split(' - ')[0].toLowerCase();
    if (fullAddress.includes(city)) {
      if (!matchedLocations.includes(location)) {
        matchedLocations.push(location);
      }
    }
  });
  
  // Limit to 3 locations for user experience
  return matchedLocations.slice(0, 3);
};
