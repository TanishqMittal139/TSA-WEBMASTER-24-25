
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
}

// Comprehensive list of locations across the US
export const locations: Location[] = [
  // Virginia Locations
  {
    id: 'va-glenallen',
    name: 'Glen Allen - Virginia',
    address: '4350 Pouncey Tract Rd, Glen Allen, VA 23060',
    phone: '(804) 555-7821',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-77.6082, 37.6651],
    popular: true,
    region: 'East Coast',
    state: 'Virginia'
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
    state: 'Virginia'
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
    state: 'Virginia'
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
    state: 'Virginia'
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
    state: 'Virginia'
  },
  // California Locations
  {
    id: 'ca-sf-downtown',
    name: 'San Francisco - Downtown',
    address: '123 Market Street, San Francisco, CA 94105',
    phone: '(415) 555-1234',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.4194, 37.7749],
    popular: true,
    region: 'West Coast',
    state: 'California'
  },
  {
    id: 'ca-sf-marina',
    name: 'San Francisco - Marina',
    address: '2108 Chestnut St, San Francisco, CA 94123',
    phone: '(415) 555-9876',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.4367, 37.8008],
    popular: false,
    region: 'West Coast',
    state: 'California'
  },
  {
    id: 'ca-la-venice',
    name: 'Los Angeles - Venice',
    address: '456 Abbot Kinney Blvd, Venice, CA 90291',
    phone: '(310) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-118.4695, 33.9850],
    popular: false,
    region: 'West Coast',
    state: 'California'
  },
  {
    id: 'ca-la-dtla',
    name: 'Los Angeles - Downtown',
    address: '735 S Figueroa St, Los Angeles, CA 90017',
    phone: '(213) 555-3456',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-118.2606, 34.0522],
    popular: true,
    region: 'West Coast',
    state: 'California'
  },
  {
    id: 'ca-sandiego',
    name: 'San Diego - Gaslamp',
    address: '789 5th Ave, San Diego, CA 92101',
    phone: '(619) 555-7890',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-117.1611, 32.7157],
    popular: true,
    region: 'West Coast',
    state: 'California'
  },
  // New York Locations
  {
    id: 'ny-soho',
    name: 'New York - SoHo',
    address: '789 Broadway, New York, NY 10003',
    phone: '(212) 555-9012',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-73.9845, 40.7238],
    popular: true,
    region: 'East Coast',
    state: 'New York'
  },
  {
    id: 'ny-midtown',
    name: 'New York - Midtown',
    address: '350 5th Ave, New York, NY 10118',
    phone: '(212) 555-4567',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-73.9857, 40.7484],
    popular: true,
    region: 'East Coast',
    state: 'New York'
  },
  {
    id: 'ny-brooklyn',
    name: 'Brooklyn - Williamsburg',
    address: '240 Bedford Ave, Brooklyn, NY 11249',
    phone: '(718) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-73.9590, 40.7140],
    popular: false,
    region: 'East Coast',
    state: 'New York'
  },
  // Texas Locations
  {
    id: 'tx-austin',
    name: 'Austin - Downtown',
    address: '360 Nueces St, Austin, TX 78701',
    phone: '(512) 555-2345',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-97.7431, 30.2672],
    popular: true,
    region: 'South',
    state: 'Texas'
  },
  {
    id: 'tx-dallas',
    name: 'Dallas - Uptown',
    address: '2520 Cedar Springs Rd, Dallas, TX 75201',
    phone: '(214) 555-7890',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-96.8066, 32.7767],
    popular: false,
    region: 'South',
    state: 'Texas'
  },
  {
    id: 'tx-houston',
    name: 'Houston - Montrose',
    address: '1423 Westheimer Rd, Houston, TX 77006',
    phone: '(713) 555-3456',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-95.3698, 29.7604],
    popular: false,
    region: 'South',
    state: 'Texas'
  },
  // Florida Locations
  {
    id: 'fl-miami',
    name: 'Miami - Wynwood',
    address: '250 NW 24th St, Miami, FL 33127',
    phone: '(305) 555-8901',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-80.1918, 25.7617],
    popular: true,
    region: 'South',
    state: 'Florida'
  },
  {
    id: 'fl-orlando',
    name: 'Orlando - Winter Park',
    address: '460 N Orlando Ave, Winter Park, FL 32789',
    phone: '(407) 555-5678',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-81.3792, 28.5383],
    popular: false,
    region: 'South',
    state: 'Florida'
  },
  // Illinois Locations
  {
    id: 'il-chicago-loop',
    name: 'Chicago - The Loop',
    address: '131 S Dearborn St, Chicago, IL 60603',
    phone: '(312) 555-9012',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-87.6298, 41.8781],
    popular: true,
    region: 'Midwest',
    state: 'Illinois'
  },
  {
    id: 'il-chicago-wicker',
    name: 'Chicago - Wicker Park',
    address: '1572 N Milwaukee Ave, Chicago, IL 60622',
    phone: '(312) 555-3456',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-87.6730, 41.9088],
    popular: false,
    region: 'Midwest',
    state: 'Illinois'
  },
  // Washington Locations
  {
    id: 'wa-seattle-capitol',
    name: 'Seattle - Capitol Hill',
    address: '1521 10th Ave, Seattle, WA 98122',
    phone: '(206) 555-7890',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.3321, 47.6062],
    popular: true,
    region: 'West Coast',
    state: 'Washington'
  },
  {
    id: 'wa-seattle-downtown',
    name: 'Seattle - Downtown',
    address: '1124 Pike St, Seattle, WA 98101',
    phone: '(206) 555-2345',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.3321, 47.6088],
    popular: false,
    region: 'West Coast',
    state: 'Washington'
  },
  // Massachusetts Locations
  {
    id: 'ma-boston-backbay',
    name: 'Boston - Back Bay',
    address: '100 Newbury St, Boston, MA 02116',
    phone: '(617) 555-8901',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-71.0589, 42.3601],
    popular: true,
    region: 'East Coast',
    state: 'Massachusetts'
  },
  {
    id: 'ma-cambridge',
    name: 'Cambridge - Harvard Square',
    address: '1 Brattle Square, Cambridge, MA 02138',
    phone: '(617) 555-4567',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-71.1198, 42.3736],
    popular: false,
    region: 'East Coast',
    state: 'Massachusetts'
  },
  // Pennsylvania Locations
  {
    id: 'pa-philly-center',
    name: 'Philadelphia - Center City',
    address: '1700 Market St, Philadelphia, PA 19103',
    phone: '(215) 555-2345',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-75.1652, 39.9526],
    popular: false,
    region: 'East Coast',
    state: 'Pennsylvania'
  },
  {
    id: 'pa-pittsburgh',
    name: 'Pittsburgh - Shadyside',
    address: '5527 Walnut St, Pittsburgh, PA 15232',
    phone: '(412) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-79.9959, 40.4406],
    popular: false,
    region: 'East Coast',
    state: 'Pennsylvania'
  },
  // Colorado Locations
  {
    id: 'co-denver-lodo',
    name: 'Denver - LoDo',
    address: '1650 Wewatta St, Denver, CO 80202',
    phone: '(303) 555-4567',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-104.9903, 39.7392],
    popular: true,
    region: 'Mountain',
    state: 'Colorado'
  },
  {
    id: 'co-boulder',
    name: 'Boulder - Pearl Street',
    address: '1221 Pearl St, Boulder, CO 80302',
    phone: '(303) 555-8901',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-105.2705, 40.0150],
    popular: false,
    region: 'Mountain',
    state: 'Colorado'
  },
  // Georgia Locations
  {
    id: 'ga-atlanta-midtown',
    name: 'Atlanta - Midtown',
    address: '855 Peachtree St NE, Atlanta, GA 30308',
    phone: '(404) 555-3456',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-84.3873, 33.7490],
    popular: true,
    region: 'South',
    state: 'Georgia'
  },
  {
    id: 'ga-atlanta-buckhead',
    name: 'Atlanta - Buckhead',
    address: '3035 Peachtree Rd NE, Atlanta, GA 30305',
    phone: '(404) 555-7890',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-84.3800, 33.8300],
    popular: false,
    region: 'South',
    state: 'Georgia'
  },
  // Arizona Locations
  {
    id: 'az-phoenix',
    name: 'Phoenix - Biltmore',
    address: '2402 E Camelback Rd, Phoenix, AZ 85016',
    phone: '(602) 555-2345',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-112.0740, 33.4484],
    popular: false,
    region: 'Southwest',
    state: 'Arizona'
  },
  {
    id: 'az-tucson',
    name: 'Tucson - University',
    address: '800 E University Blvd, Tucson, AZ 85719',
    phone: '(520) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-110.9470, 32.2226],
    popular: false,
    region: 'Southwest',
    state: 'Arizona'
  },
  // Oregon Locations
  {
    id: 'or-portland-pearl',
    name: 'Portland - Pearl District',
    address: '937 NW Glisan St, Portland, OR 97209',
    phone: '(503) 555-8901',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.6784, 45.5051],
    popular: true,
    region: 'West Coast',
    state: 'Oregon'
  },
  {
    id: 'or-portland-hawthorne',
    name: 'Portland - Hawthorne',
    address: '3590 SE Hawthorne Blvd, Portland, OR 97214',
    phone: '(503) 555-4567',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-122.6269, 45.5120],
    popular: false,
    region: 'West Coast',
    state: 'Oregon'
  },
  // Michigan Locations
  {
    id: 'mi-detroit',
    name: 'Detroit - Midtown',
    address: '4240 Cass Ave, Detroit, MI 48201',
    phone: '(313) 555-3456',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-83.0458, 42.3314],
    popular: false,
    region: 'Midwest',
    state: 'Michigan'
  },
  {
    id: 'mi-annarbor',
    name: 'Ann Arbor - Main Street',
    address: '312 S Main St, Ann Arbor, MI 48104',
    phone: '(734) 555-7890',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-83.7430, 42.2808],
    popular: false,
    region: 'Midwest',
    state: 'Michigan'
  },
  // Minnesota Locations
  {
    id: 'mn-minneapolis',
    name: 'Minneapolis - Uptown',
    address: '1420 W Lake St, Minneapolis, MN 55408',
    phone: '(612) 555-2345',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-93.2650, 44.9778],
    popular: false,
    region: 'Midwest',
    state: 'Minnesota'
  },
  // North Carolina Locations
  {
    id: 'nc-charlotte',
    name: 'Charlotte - Uptown',
    address: '210 E Trade St, Charlotte, NC 28202',
    phone: '(704) 555-6789',
    hours: 'Mon-Fri: 7:00 AM - 9:00 PM | Sat-Sun: 8:30 AM - 10:00 PM',
    coordinates: [-80.8431, 35.2271],
    popular: false,
    region: 'South',
    state: 'North Carolina'
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
