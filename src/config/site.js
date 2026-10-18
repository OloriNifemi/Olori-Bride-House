// ============================================================
// OLÓRI BRIDE HOUSE — BUSINESS DETAILS & PACKAGES
// Change prices, inclusions or contact details here only.
// ============================================================

export const SITE = {
  name: 'Olóri Bride House',
  parentBrand: 'Luxury By Olori Concept',
  city: 'Lagos',

  // Your business email. Shown to visitors as a backup if a form fails to send.
  email: '',

  // Web3Forms access key (from web3forms.com). Form submissions are emailed to the
  // address you registered with Web3Forms.
  formAccessKey: '',
}

export const SERVICES = [
  {
    title: 'Before the Wedding',
    photo: 'Fitting photo',
    text: 'Personal coordination of your fittings, beauty appointments and bridal checklist, so nothing about your own preparation falls on you.',
  },
  {
    title: 'On the Wedding Day',
    photo: 'Wedding day photo',
    text: 'A dedicated concierge by your side all day: dressing, outfit changes, touch-ups, timing and any last-minute needs.',
  },
  {
    title: 'Full Bridal Concierge',
    photo: 'Bride with concierge',
    text: 'Complete care from the first fitting to the last dance, with one point of contact who knows exactly what you need.',
  },
]

// price: a number in naira, or null when the package is quoted individually.
export const PACKAGES = [
  {
    id: 'd-day',
    name: 'D-Day Bridal Concierge',
    price: 100000,
    duration: '1 day',
    bestFor: 'Best for brides who need support on their wedding day.',
    intro: null,
    includes: [
      'Personal bridal assistance',
      'Timeline support',
      'Vendor communication',
      'Personal item management',
      'Outfit-change assistance',
      'Bridal suite organisation',
      'Hydration and meal reminders',
      'Gift handling',
      'Emergency support and emergency kit',
    ],
    addOns: ['Additional hours', 'Second assistant', 'Errands', 'Transportation'],
    summary: [
      'Personal bridal assistance on the day',
      'Timeline and vendor support',
      'Emergency kit included',
    ],
  },
  {
    id: '3-days',
    name: '3-Days Bridal Concierge',
    price: 220000,
    duration: '3 days',
    bestFor: 'Best for brides who want support before and during the wedding.',
    intro: 'Everything in D-Day, plus:',
    includes: [
      'Pre-wedding coordination',
      'Vendor confirmations',
      'Personal preparation support',
      'Wedding-week errands',
      'Schedule management',
    ],
    addOns: ['Additional hours', 'Second assistant', 'Transportation'],
    summary: [
      'Everything in D-Day',
      'Pre-wedding coordination',
      'Wedding-week errands and scheduling',
    ],
  },
  {
    id: '7-days',
    name: '7-Days Bridal Concierge',
    price: 350000,
    duration: '7 days',
    bestFor: 'Best for brides who want full wedding-week support.',
    intro: 'Everything in 3-Days, plus:',
    includes: [
      'Wedding-week personal assistance',
      'Appointments',
      'Packing support',
      'Errands',
      'Vendor coordination',
      'Transportation',
      'Continuous bridal support',
    ],
    addOns: ['Second assistant'],
    summary: [
      'Everything in 3-Days',
      'Full wedding-week personal assistance',
      'Transportation and continuous support',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Olóri Experience',
    price: null,
    priceLabel: 'On request',
    duration: 'Custom duration',
    bestFor: 'Best for brides who want a personalised experience.',
    intro: null,
    premium: true,
    includes: ['Fully customised bridal concierge service built around your needs'],
    addOns: ['Custom services'],
    summary: [],
  },
]

// ₦100,000 style formatting
export function formatNaira(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG')
}