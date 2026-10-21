export interface ExclusiveClubItem {
  id: string;
  category: string;
  title: string;
  price: string;
  description: string;
  image: string;
  largeImage?: string;
  badge?: string;
}

export const exclusiveClubItems: ExclusiveClubItem[] = [
  {
    id: 'ec-1',
    category: 'GOLD FUSION',
    title: 'SUN GLASS WMN',
    price: '$380.00',
    description:
      'Vintage-inspired round gold wireframes paired with tonal yellow UV-shielding lenses. Lightweight luxury that elevates any look from day to dusk.',
    image: '/images/exclusive-club/sunglass-wmn.jpg',
  },
  {
    id: 'ec-2',
    category: 'RED MODEL',
    title: 'SUIT FOR MEN',
    price: '$890.00',
    description:
      'Meticulously tailored from double-faced Italian wool, this structured overcoat pairs sharp lapels with contemporary streetwear draping. Designed for those who command presence.',
    image: '/images/exclusive-club/suit-for-men.jpg',
  },
  {
    id: 'ec-3',
    category: 'WHITE',
    title: 'SUN GLASS 45VR',
    price: '$450.00',
    description:
      'Step out in confidence with Sun Glass 45VR, crafted for those who love sleek design and superior comfort. Featuring UV400 protection, scratch-resistant lenses, and a lightweight frame, these sunglasses perfectly blend fashion and function.',
    image: '/images/exclusive-club/sunglass-45vr.jpg',
    largeImage: '/images/exclusive-club/sunglass-45vr-large.jpg',
  },
  {
    id: 'ec-4',
    category: 'BRIGHT ORANGE',
    title: 'WINTER JACKET MCX',
    price: '$620.00',
    description:
      'Engineered with high-density thermal ribbing and a sculptural collar, the Winter Jacket MCX blends vibrant streetwear energy with cold-weather performance.',
    image: '/images/exclusive-club/winter-jacket.jpg',
  },
  {
    id: 'ec-5',
    category: 'VIBE YELLOW',
    title: 'RIDING JACKET M',
    price: '$750.00',
    description:
      'A bold silhouette crafted from textured durable twill with ergonomic paneling. Designed for uncompromising individuality and effortless street style.',
    image: '/images/exclusive-club/riding-jacket.jpg',
  },
];
