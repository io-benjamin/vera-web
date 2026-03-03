/**
 * Lead Finder - Find businesses with Google profiles but no website
 * 
 * Usage: npx ts-node lead-finder.ts "restaurants" "richmond va"
 */

import * as fs from 'fs';

interface Lead {
  name: string;
  category: string;
  location: string;
  phone?: string;
  hasWebsite: boolean;
  googleMapsUrl?: string;
  notes?: string;
  foundAt: string;
}

// Search patterns that indicate no website
const NO_WEBSITE_INDICATORS = [
  'Add website',
  'Suggest an edit',
  'No website listed',
];

/**
 * Manual search instructions (until we set up API)
 */
function printManualInstructions(category: string, location: string) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    LEAD FINDER - MANUAL MODE                   ║
╠════════════════════════════════════════════════════════════════╣

To find businesses WITHOUT websites:

1. Go to Google Maps: https://www.google.com/maps

2. Search: "${category} in ${location}"

3. Look for businesses where:
   - Website button is missing
   - Or shows "Add website" when you click the listing
   - Has phone number but no website link

4. For each lead, note:
   - Business name
   - Phone number
   - Address
   - Category/type

5. Add to leads.csv (created in this folder)

═══════════════════════════════════════════════════════════════════

QUICK FILTERS:
- Sort by "Relevance" to get established businesses
- Look for 4+ star ratings (serious businesses)
- Avoid chains (they have corporate sites)
- Focus on: restaurants, salons, contractors, auto shops, 
  fitness studios, local services

═══════════════════════════════════════════════════════════════════
`);
}

/**
 * Create empty CSV template for leads
 */
function createLeadsTemplate(filename: string = 'leads.csv') {
  const header = 'name,category,location,phone,google_maps_url,notes,found_at\n';
  const exampleRow = 'Example Business,Restaurant,Richmond VA,804-555-1234,https://maps.google.com/...,No website - good reviews,2026-03-03\n';
  
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, header + exampleRow);
    console.log(`Created ${filename} - add your leads here!`);
  } else {
    console.log(`${filename} already exists`);
  }
}

/**
 * Categories that typically need websites but often don't have them
 */
const HIGH_OPPORTUNITY_CATEGORIES = [
  'restaurants',
  'hair salons',
  'barber shops', 
  'auto repair',
  'plumbers',
  'electricians',
  'landscaping',
  'cleaning services',
  'personal trainers',
  'yoga studios',
  'nail salons',
  'tattoo shops',
  'pet groomers',
  'tutoring services',
  'photography',
  'catering',
  'food trucks',
  'bakeries',
  'coffee shops',
  'florists',
];

// Main
const [,, category, location] = process.argv;

if (!category || !location) {
  console.log('Usage: npx ts-node lead-finder.ts "category" "location"');
  console.log('\nHigh opportunity categories:');
  HIGH_OPPORTUNITY_CATEGORIES.forEach(c => console.log(`  - ${c}`));
  process.exit(1);
}

printManualInstructions(category, location);
createLeadsTemplate('prospecting/leads.csv');
