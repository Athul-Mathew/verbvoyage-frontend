import React from 'react';


const PremiumMemberPage = () => {
    const premiumImage1="https://www.bing.com/th/id/OGC.708a9dd5e9ef01b029aa736b71222103?pid=1.7&rurl=https%3a%2f%2fimg.izismile.com%2fimg%2fimg4%2f20110201%2f1000%2fstunning_animated_gifs_29.gif&ehk=QLiT2UJtI0gO5f0FBpt42fHj%2fzcd1D%2bBpvElleKm5c4%3d"
    const premiumImage2="https://www.bing.com/th/id/OGC.708a9dd5e9ef01b029aa736b71222103?pid=1.7&rurl=https%3a%2f%2fimg.izismile.com%2fimg%2fimg4%2f20110201%2f1000%2fstunning_animated_gifs_29.gif&ehk=QLiT2UJtI0gO5f0FBpt42fHj%2fzcd1D%2bBpvElleKm5c4%3d"
  return (

    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://www.bing.com/th/id/OGC.fc5d27af443795886ce7c5d488833eba?pid=1.7&rurl=http%3a%2f%2fimg.izismile.com%2fimg%2fimg4%2f20110201%2f1000%2fstunning_animated_gifs_03.gif&ehk=pVeiNwE2VIY8f17Tph8Sm2Hb9sKAGu5l3o%2ffyMo56CM%3d")' }}>
      <div className="flex justify-between items-center h-full p-8">
        <div className="w-1/2">
          <img src={premiumImage1} alt="Premium Image 1" className="rounded-lg shadow-lg" />
        </div>
        <div className="w-1/2 text-white">
          <h1 className="text-4xl font-bold mb-4">You are a Premium Member!</h1>
          <p className="text-lg mb-8">You now have access to mentors and premium courses.</p>
          <Link to='/mentor-list'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Explore Mentors</button>
          </Link>
          <Link to='/userhome'>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-4">Explore Home</button>
          </Link>
        </div>
        <div className="w-1/2">
          <img src={premiumImage2} alt="Premium Image 2" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default PremiumMemberPage;
