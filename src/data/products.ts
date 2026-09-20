import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'cathy-doll-white-cushion-face-wash',
    name: 'White Cushion Facial Foam Cleanser 120ml Cathy Doll Face Wash (Made In Korea)',
    brand: 'Cathy Doll',
    shortDescription: 'Gentle cushion foam face wash with Snail Mucin & Berry Extracts for deep cleansing, radiance & dark spot reduction.',
    description: 'Experience Korean skincare excellence with Cathy Doll White Cushion Facial Foam Cleanser (120ml). Formulated with dense, plush cushion foam, this gentle facial cleanser penetrates deep into pores to lift away stubborn makeup, dirt, excess sebum, and daily urban pollutants without stripping your skin\'s natural moisture barrier. Enriched with Snail Mucin, Raspberry, Blueberry, and Redcurrant extracts, it actively brightens dull skin tones, fades dark spots, and restores a youthful, glowing complexion.',
    price: 790,
    originalPrice: 990,
    rating: 4.9,
    reviewCount: 218,
    category: 'Face Wash',
    image: '/cathy_doll_cushion.jpg',
    gallery: [
      '/cathy_doll_cushion.jpg',
      '/cathy_doll_foam.jpg'
    ],
    isBestSeller: true,
    isNew: true,
    stockStatus: 'In Stock',
    benefits: [
      'Deeply removes makeup, impurities & daily urban pollutants',
      'Infused with Snail Mucin & Antioxidant Berry Complex',
      'Cleanses & revives dull skin for a radiant, glowing finish',
      'Dullness & dark spot reduction with gentle non-drying cushion foam',
      '100% Genuine formulation — Made In Korea'
    ],
    howToUse: 'Squeeze an appropriate amount (about 1-2 cm) onto wet palms. Work into a rich, dense cushion lather with a little water. Gently massage over face in circular motions for 30-60 seconds. Rinse thoroughly with lukewarm water.',
    ingredients: 'Water, Myristic Acid, Glycerin, Potassium Hydroxide, Lauric Acid, Stearic Acid, Snail Secretion Filtrate, Rubus Idaeus (Raspberry) Fruit Extract, Vaccinium Angustifolium (Blueberry) Fruit Extract, Ribes Rubrum (Redcurrant) Fruit Extract, Niacinamide, Collagen Extract, Fragrance.',
    skinType: ['All Skin Types', 'Dull Skin', 'Oily', 'Combination', 'Sensitive'],
    volume: '120ml / 4.23 fl. oz.'
  },
  {
    id: 'osufi-collagen-face-serum-300ml',
    name: 'Osufi Collagen Face Serum - 300ml Made In Korea',
    brand: 'Osufi',
    shortDescription: 'Deeply hydrating & firming collagen face serum for radiant skin elasticity and anti-aging care (300ml).',
    description: 'Transform your daily skincare routine with Osufi Collagen Face Serum (300ml), imported directly from South Korea. Enriched with high-concentration Hydrolyzed Collagen, Hyaluronic Acid, and Niacinamide, this jumbo-sized luxury facial serum deeply hydrates, tightens sagging skin, restores elasticity, and visibly fades fine lines and dark spots for a glowing glass-skin finish.',
    price: 1250,
    originalPrice: 1650,
    rating: 5.0,
    reviewCount: 94,
    category: 'Skincare',
    image: '/osufi_collagen_serum.jpg',
    gallery: [
      '/osufi_collagen_serum.jpg',
      '/cathy_doll_foam.jpg'
    ],
    isBestSeller: true,
    isNew: true,
    stockStatus: 'In Stock',
    benefits: [
      'Deep hydration & intense collagen boost for firm, youthful skin',
      'Restores skin elasticity and smoothes fine lines & wrinkles',
      'Jumbo 300ml size for face, neck and full body moisture care',
      'Niacinamide enriched for dark spot reduction & natural radiance',
      '100% Genuine imported formulation — Made In Korea'
    ],
    howToUse: 'After cleansing and toning, apply 3-4 drops of Osufi Collagen Serum to face and neck. Gently pat until fully absorbed. Follow with your favorite moisturizer morning and night.',
    ingredients: 'Water, Hydrolyzed Collagen (300,000ppm), Glycerin, Niacinamide, Sodium Hyaluronate, Centella Asiatica Extract, Adenosine, Carbomer, Triethanolamine, Ethylhexylglycerin, Fragrance.',
    skinType: ['All Skin Types', 'Dry Skin', 'Aging Skin', 'Dull Skin', 'Sensitive'],
    volume: '300ml / 10.14 fl. oz.'
  }
];

export const CATEGORIES = [
  {
    id: 'Face Wash',
    name: 'Face Wash',
    description: 'Deep makeup removal & plush cushion foam cleansing',
    image: '/cathy_doll_cushion.jpg',
    itemCount: '1 Exclusive Item'
  },
  {
    id: 'Cleanser & Brightening',
    name: 'Cleanser & Brightening',
    description: 'Formulated with Snail Mucin & Berries to reduce dark spots',
    image: '/cathy_doll_foam.jpg',
    itemCount: 'Korean Formula'
  },
  {
    id: 'Made In Korea',
    name: 'Made In Korea',
    description: '100% Authentic imported Korean facial foam cleanser',
    image: '/cathy_doll_cushion.jpg',
    itemCount: '100% Original'
  }
];

