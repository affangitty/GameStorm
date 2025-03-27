import React from 'react';
import ps5 from '../images/ps5.jpg';
import xboxsx from '../images/xboxseriesx.jpg';
import nintendo from '../images/nintendo.jpg';
import steamdeck from '../images/steamdeck.jpg';
import ps5de from '../images/ps5de.jpg';
import xboxss from '../images/xboxss.jpg';
import nintendolite from '../images/nintendolite.jpg';

const initialConsoles = {
  featuredConsoles: [
    { 
      id: 1, 
      title: 'PlayStation 5', 
      price: 499.99, 
      brand: 'Sony', 
      storage: '825GB SSD', 
      rating: 4.8, 
      discount: 10, 
      category: 'Gaming Console',
      image: ps5
    },
    { 
      id: 2, 
      title: 'Xbox Series X', 
      price: 499.99, 
      brand: 'Microsoft', 
      storage: '1TB SSD', 
      rating: 4.7, 
      category: 'Gaming Console',
      image: xboxsx
    },
    { 
      id: 3, 
      title: 'Nintendo Switch OLED', 
      price: 349.99, 
      brand: 'Nintendo', 
      storage: '64GB', 
      rating: 4.6, 
      category: 'Portable Console',
      image: nintendo
    },
    { 
      id: 4, 
      title: 'Steam Deck', 
      price: 399.99, 
      brand: 'Valve', 
      storage: '256GB NVMe SSD', 
      rating: 4.5, 
      category: 'Portable Console',
      image: steamdeck
    }
  ],
  newArrivals: [
    { 
      id: 5, 
      title: 'PlayStation 5 Digital Edition', 
      price: 399.99, 
      brand: 'Sony', 
      storage: '825GB SSD', 
      rating: 4.7, 
      category: 'Gaming Console',
      image: ps5de
    },
    { 
      id: 6, 
      title: 'Xbox Series S', 
      price: 299.99, 
      brand: 'Microsoft', 
      storage: '512GB SSD', 
      rating: 4.4, 
      category: 'Gaming Console',
      image: xboxss
    },
    { 
      id: 7, 
      title: 'Nintendo Switch Lite', 
      price: 199.99, 
      brand: 'Nintendo', 
      storage: '32GB', 
      rating: 4.3, 
      category: 'Portable Console',
      image: nintendolite
    }
  ],
  categories: ['All', 'Gaming Console', 'Portable Console', 'Retro Console']
};

export default initialConsoles;