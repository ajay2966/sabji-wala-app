import { STORAGE_KEYS } from '../config/constants';
import { getItem, setItem } from '../storage/storage';
import { Product } from '../types/models';

export const seedProducts: Product[] = [
  [
    'Tomato',
    '🍅',
    'Fruit veg',
    30,
    'Juicy, ripe and perfect for everyday cooking.',
  ],
  ['Carrot', '🥕', 'Roots', 45, 'Crunchy carrots, naturally sweet and fresh.'],
  [
    'Onion',
    '🧅',
    'Roots',
    28,
    'Kitchen essential with a clean, sharp flavour.',
  ],
  [
    'Potato',
    '🥔',
    'Roots',
    25,
    'Versatile potatoes for curries, fries and more.',
  ],
  ['Spinach', '🥬', 'Leafy', 40, 'Tender leafy greens packed with goodness.'],
  ['Coriander', '🌿', 'Leafy', 20, 'Fragrant coriander to finish every dish.'],
  ['Cabbage', '🥬', 'Leafy', 35, 'Crisp green cabbage with a fresh crunch.'],
  [
    'Cauliflower',
    '🥦',
    'Others',
    50,
    'Firm, fresh florets for wholesome meals.',
  ],
  [
    'Brinjal',
    '🍆',
    'Fruit veg',
    40,
    'Glossy brinjals with a soft, rich texture.',
  ],
  [
    'Green Chilli',
    '🌶️',
    'Fruit veg',
    60,
    'Bright green chillies for a lively kick.',
  ],
  [
    'Capsicum',
    '🫑',
    'Fruit veg',
    70,
    'Colourful, crisp capsicum for salads and stir-fries.',
  ],
  [
    'Lady Finger',
    '🥒',
    'Others',
    55,
    'Fresh okra with a delicate earthy flavour.',
  ],
].map(([name, emoji, category, pricePerKg, description], index) => ({
  id: `veg-${index + 1}`,
  name: name as string,
  emoji: emoji as string,
  category: category as Product['category'],
  pricePerKg: pricePerKg as number,
  description: description as string,
  inStock: true,
}));

export async function loadProducts(): Promise<Product[]> {
  const products = await getItem<Product[]>(STORAGE_KEYS.products, []);
  if (products.length) return products;
  await setItem(STORAGE_KEYS.products, seedProducts);
  return seedProducts;
}
