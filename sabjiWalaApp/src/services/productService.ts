import { STORAGE_KEYS } from '../config/constants';
import { getItem, setItem } from '../storage/storage';
import { Product } from '../types/models';

const vegetableImages = {
  Tomato: require('../assets/vegetable/tomato.jpg'),
  Carrot: require('../assets/vegetable/carrot.jpg'),
  Onion: require('../assets/vegetable/onion.jpg'),
  Potato: require('../assets/vegetable/potato.jpg'),
  Spinach: require('../assets/vegetable/spinach.jpg'),
  Coriander: require('../assets/vegetable/coriander.jpg'),
  Cabbage: require('../assets/vegetable/cabbage.jpg'),
  Cauliflower: require('../assets/vegetable/Cauliflower.jpg'),
  Brinjal: require('../assets/vegetable/Brinjal.jpg'),
  'Green Chilli': require('../assets/vegetable/Green Chilli.jpg'),
  Capsicum: require('../assets/vegetable/Capsicum.jpg'),
  'Lady Finger': require('../assets/vegetable/Lady Finger.jpg'),
  Cucumber: require('../assets/vegetable/Cucumber.jpg'),
  'Green Peas': require('../assets/vegetable/Green Peas.jpg'),
  Pumpkin: require('../assets/vegetable/Pumpkin.jpg'),
  Apple: require('../assets/vegetable/apple.jpg'),
  Banana: require('../assets/vegetable/banana.jpg'),
  Lemon: require('../assets/vegetable/lemon.jpg'),
};

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
  [
    'Cucumber',
    '🥒',
    'Others',
    35,
    'Cool, crisp cucumbers for salads and raita.',
  ],
  [
    'Green Peas',
    '🫛',
    'Others',
    80,
    'Sweet, tender peas for curries and pulao.',
  ],
  [
    'Pumpkin',
    '🎃',
    'Others',
    32,
    'Naturally sweet pumpkin for comforting home meals.',
  ],
  [
    'Apple',
    '🍎',
    'Fruits',
    140,
    'Crisp, naturally sweet apples for the family.',
  ],
  [
    'Banana',
    '🍌',
    'Fruits',
    55,
    'Ripe, creamy bananas for breakfast and snacks.',
  ],
  ['Lemon', '🍋', 'Fruits', 90, 'Bright, juicy lemons to lift every recipe.'],
].map(([name, emoji, category, pricePerKg, description], index) => ({
  id: `veg-${index + 1}`,
  name: name as string,
  emoji: emoji as string,
  category: category as Product['category'],
  pricePerKg: pricePerKg as number,
  imageSource: vegetableImages[name as keyof typeof vegetableImages],
  description: description as string,
  inStock: true,
}));

export async function loadProducts(): Promise<Product[]> {
  const products = await getItem<Product[]>(STORAGE_KEYS.products, []);
  const catalog = products.length
    ? seedProducts.map(seed => {
        const stored = products.find(product => product.id === seed.id);
        return stored
          ? { ...seed, ...stored, imageSource: seed.imageSource }
          : seed;
      })
    : seedProducts;
  await setItem(STORAGE_KEYS.products, catalog);
  return catalog;
}
