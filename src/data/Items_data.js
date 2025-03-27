import React from 'react';
import dc from '../images/dualcontroller.jpg';
import xboxelite from '../images/xboxelite.jpg';
import gh from '../images/gamingheadset.jpg';
import hc from '../images/hypercharge.jpg';
import mgk from '../images/keyboard.jpg';
import gm from '../images/mouse.jpg';
import rws from '../images/racingwheel.jpg';

const initialItems = {
  featuredItems: [
    { 
      id: 1, 
      title: 'DualSense Wireless Controller', 
      price: 69.99, 
      brand: 'Sony', 
      compatibility: 'PlayStation 5', 
      rating: 4.8, 
      category: 'Controller',
      image: dc
    },
    { 
      id: 2, 
      title: 'Xbox Elite Wireless Controller Series 2', 
      price: 179.99, 
      brand: 'Microsoft', 
      compatibility: 'Xbox Series X/S', 
      rating: 4.9, 
      category: 'Controller',
      image: xboxelite
    },
    { 
      id: 3, 
      title: 'Gaming Headset Pro', 
      price: 129.99, 
      brand: 'SoundMax', 
      compatibility: 'Multi-Platform', 
      rating: 4.7, 
      category: 'Accessories',
      image: gh
    },
    { 
      id: 4, 
      title: 'Charging Station Duo', 
      price: 39.99, 
      brand: 'PowerUp', 
      compatibility: 'PlayStation 5', 
      rating: 4.5, 
      category: 'Accessories',
      image: hc
    }
  ],
  newArrivals: [
    { 
      id: 5, 
      title: 'Mechanical Gaming Keyboard', 
      price: 89.99, 
      brand: 'TechPro', 
      compatibility: 'PC', 
      rating: 4.6, 
      category: 'Peripherals',
      image: mgk
    },
    { 
      id: 6, 
      title: 'Gaming Mouse Wireless', 
      price: 59.99, 
      brand: 'LogiTech', 
      compatibility: 'Multi-Platform', 
      rating: 4.4, 
      category: 'Peripherals',
      image: gm
    },
    { 
      id: 7, 
      title: 'Racing Wheel Simulator', 
      price: 249.99, 
      brand: 'SpeedMaster', 
      compatibility: 'PC, PS4, PS5, Xbox', 
      rating: 4.3, 
      category: 'Accessories',
      image: rws
    }
  ],
  categories: ['All', 'Controller', 'Accessories', 'Peripherals']
};

export default initialItems;