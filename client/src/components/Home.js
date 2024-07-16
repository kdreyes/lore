import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">Welcome to Lore</h2>
      <p className="text-muted mb-4">
        Lore is a mentor-mentee matching platform designed to connect individuals seeking mentorship
        with experienced professionals across various industries. Our platform combines elements of
        dating apps, BetterHelp, Bumble BFF, and LinkedIn to create a dynamic, engaging, and
        personalized user experience.
      </p>
      <p className="text-muted">
        Get started by registering as a mentor or mentee today!
      </p>
    </div>
  );
};

export default Home;
