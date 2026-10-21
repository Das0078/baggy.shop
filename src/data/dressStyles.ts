import { DressStyleItem } from '../types';

export const dressStyles: DressStyleItem[] = [
  {
    id: 'ds-1',
    title: 'Casual',
    image: '/images/dress-style/casual.png',
    gridSpan: 'sm', // md:col-span-4 or ~38% width
  },
  {
    id: 'ds-2',
    title: 'Formal',
    image: '/images/dress-style/formal.png',
    gridSpan: 'lg', // md:col-span-8 or ~62% width
  },
  {
    id: 'ds-3',
    title: 'Party',
    image: '/images/dress-style/party.png',
    gridSpan: 'lg', // md:col-span-8
  },
  {
    id: 'ds-4',
    title: 'Gym',
    image: '/images/dress-style/gym.png',
    gridSpan: 'sm', // md:col-span-4
  },
];
