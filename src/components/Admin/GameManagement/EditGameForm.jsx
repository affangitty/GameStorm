import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../../../context/GameContext';

const EditGameForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { games, updateGame } = useGameContext();
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    price: '',
    platform: '',
    genre: '',
    image: '',
    trailer: '',
    releaseDate: ''
  });

  useEffect(() => {
    const gameToEdit = games.find(game => game.id === parseInt(id));
    if (gameToEdit) {
      setGameData(gameToEdit);
    }
  }, [id, games]);

  const platforms = ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'];
  const genres = ['Action', 'Adventure', 'RPG', 'Sports', 'Strategy'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGame({
      ...gameData,
      price: parseFloat(gameData.price)
    });
    navigate('/admin/games');
  };

  if (!gameData.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Game</h2>
        <div className="space-x-2">
          <button 
            onClick={() => navigate('/admin/games')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-bold mb-2">Game Title</label>
            <input 
              type="text" 
              name="title"
              value={gameData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2">Price</label>
            <input 
              type="number" 
              name="price"
              value={gameData.price}
              onChange={handleChange}
              step="0.01"
              required
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-2">Description</label>
          <textarea 
            name="description"
            value={gameData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white h-24"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-bold mb-2">Platform</label>
            <select
              name="platform"
              value={gameData.platform}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
            >
              <option value="">Select Platform</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2">Genre</label>
            <select
              name="genre"
              value={gameData.genre}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
            >
              <option value="">Select Genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-bold mb-2">Image URL</label>
            <input 
              type="text" 
              name="image"
              value={gameData.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2">Trailer URL</label>
            <input 
              type="text" 
              name="trailer"
              value={gameData.trailer}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-2">Release Date</label>
          <input 
            type="date" 
            name="releaseDate"
            value={gameData.releaseDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg text-white"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button 
            type="button"
            onClick={() => navigate('/admin/games')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Update Game</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGameForm;