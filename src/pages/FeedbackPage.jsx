import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send } from 'lucide-react';
import backgroundImage from '../images/feedback-bg.jpg';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleRatingClick = (currentRating) => {
    setRating(currentRating);
  };

  const showAlertAndNavigate = () => {
    // Custom alert with callback
    const alertContainer = document.createElement('div');
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '0';
    alertContainer.style.left = '0';
    alertContainer.style.width = '100%';
    alertContainer.style.height = '100%';
    alertContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
    alertContainer.style.display = 'flex';
    alertContainer.style.justifyContent = 'center';
    alertContainer.style.alignItems = 'center';
    alertContainer.style.zIndex = '1000';

    const alertBox = document.createElement('div');
    alertBox.style.backgroundColor = 'white';
    alertBox.style.padding = '20px';
    alertBox.style.borderRadius = '10px';
    alertBox.style.textAlign = 'center';
    alertBox.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

    const message = document.createElement('p');
    message.textContent = 'Thank you for your feedback!';
    message.style.marginBottom = '20px';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.backgroundColor = '#4CAF50';
    okButton.style.color = 'white';
    okButton.style.border = 'none';
    okButton.style.padding = '10px 20px';
    okButton.style.borderRadius = '5px';
    okButton.style.cursor = 'pointer';

    okButton.addEventListener('click', () => {
      document.body.removeChild(alertContainer);
      navigate('/');
    });

    alertBox.appendChild(message);
    alertBox.appendChild(okButton);
    alertContainer.appendChild(alertBox);
    document.body.appendChild(alertContainer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const feedbackData = {
      orderNumber,
      rating,
      review: reviewText,
      anonymous
    };

    // TODO: Implement actual feedback submission logic
    console.log('Feedback submitted:', feedbackData);
    
    // Reset form
    setRating(0);
    setReviewText('');
    setAnonymous(false);

    // Show custom alert and navigate
    showAlertAndNavigate();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="w-full max-w-xl">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 relative">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
            Feedback for Order #{orderNumber}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Rating
              </label>
              <div className="flex items-center">
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index} className="cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        value={currentRating}
                        className="hidden"
                        onClick={() => handleRatingClick(currentRating)}
                      />
                      <Star 
                        className={`
                          h-8 w-8 mr-1 transition-colors duration-200
                          ${currentRating <= (hover || rating) 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'}
                        `}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {rating > 0 ? `${rating} out of 5` : 'Select Rating'}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="review" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Review
              </label>
              <textarea
                id="review"
                rows="5"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="Share your detailed feedback about your order..."
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="anonymous"
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
                className="mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="anonymous" 
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Post anonymously
              </label>
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg flex items-center cursor-pointer"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;