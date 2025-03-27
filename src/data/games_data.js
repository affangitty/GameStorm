import React from 'react';
import stellar from "../images/stellar.jpg";
import dragon from "../images/dragon.jpg";
import cyberpunk from "../images/cyberpunk2077.jpg";
import racing from "../images/racing.jpg";
import wilderness from "../images/wilderness.jpg";
import medieval from "../images/medieval.jpg";
import urban from "../images/urban.jpg";
  import space from "../images/space.jpg";
  import mystic from "../images/mystic.jpg";

const initialGames = {
  featuredGames: [
    { 
      id: 1, 
      title: 'Stellar Odyssey', 
      price: 59.99, 
      platform: 'PC, PS5, Xbox', 
      rating: 4.8, 
      discount: 15, 
      category: 'RPG',
      developer: 'Cosmic Games',
      releaseDate: '2024-03-15',
      description: 'An epic space exploration RPG with immersive storytelling and breathtaking graphics.',
      image: stellar
    },
    { 
      id: 2, 
      title: 'Dragon Age: Rebirth', 
      price: 69.99, 
      platform: 'PC, PS5', 
      rating: 4.9, 
      category: 'Adventure',
      developer: 'Fantasy Realms Studio',
      releaseDate: '2024-02-20',
      description: 'A revolutionary adventure game that redefines the fantasy genre with deep narrative choices.',
      image: dragon 
    },
    { 
      id: 3, 
      title: 'Cyberfront 2077', 
      price: 49.99, 
      platform: 'PC, PS5, Xbox', 
      rating: 4.7, 
      discount: 20, 
      category: 'Action',
      developer: 'Neon Interactive',
      releaseDate: '2024-01-10',
      description: 'A high-octane action game set in a futuristic cyberpunk world with intense gameplay.',
      image: cyberpunk
    },
    { 
      id: 4, 
      title: 'Racing Champions', 
      price: 39.99, 
      platform: 'PC, PS5, Xbox, Switch', 
      rating: 4.5, 
      category: 'Sports',
      developer: 'Speed Dynamics',
      releaseDate: '2024-04-05',
      description: 'The ultimate racing simulation with realistic physics and stunning track designs.',
      image: racing
    }
  ],
  newArrivals: [
    { 
      id: 5, 
      title: 'Wilderness Survival', 
      price: 54.99, 
      platform: 'PC, PS5', 
      rating: 4.6, 
      category: 'Simulation',
      developer: 'Nature Quest Studios',
      releaseDate: '2024-03-01',
      description: 'A realistic survival game that challenges players to survive in harsh wilderness conditions.',
      image: wilderness
    },
    { 
      id: 6, 
      title: 'Medieval Knights', 
      price: 49.99, 
      platform: 'PC, Xbox', 
      rating: 4.4, 
      category: 'Strategy',
      developer: 'Castle Siege Games',
      releaseDate: '2024-02-15',
      description: 'A strategic medieval warfare game with intricate kingdom management mechanics.',
      image: medieval
    },
    { 
      id: 7, 
      title: 'Urban Legends', 
      price: 44.99, 
      platform: 'PC, PS5, Xbox', 
      rating: 4.3, 
      category: 'Action',
      developer: 'Myth Entertainment',
      releaseDate: '2024-01-25',
      description: 'An action-packed narrative exploring mysterious urban myths and supernatural encounters.',
      image: urban
    },
    { 
      id: 8, 
      title: 'Space Colony', 
      price: 39.99, 
      platform: 'PC, Switch', 
      rating: 4.5, 
      category: 'Simulation',
      developer: 'Stellar Horizons',
      releaseDate: '2024-04-10',
      description: 'Build and manage your own space colony in this immersive simulation experience.',
      image: space
    },
    { 
      id: 9, 
      title: 'Mystic Realms', 
      price: 59.99, 
      platform: 'PC, PS5, Xbox', 
      rating: 4.7, 
      category: 'RPG',
      developer: 'Enchanted Worlds',
      releaseDate: '2024-03-20',
      description: 'An expansive RPG with a rich magical world and deep character progression system.',
      image: mystic
    }
  ],
  platforms: ['PC', 'PS5', 'Xbox', 'Switch'],
  categories: ['All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation']
};

export default initialGames;