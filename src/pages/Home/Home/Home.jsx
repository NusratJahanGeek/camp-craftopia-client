import { Helmet } from 'react-helmet-async';
import Hero from "../Hero/Hero";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import CountdownTimer from '../CountdownTimer/CountDownTimer';
import Events from './Events/Events';

const Home = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>Camp Craftopia | Home</title>
      </Helmet>
      <div className="container">
        <Hero />
        <PopularClasses />
        <PopularInstructors />
        <CountdownTimer />
        <Events />
      </div>
    </div>
  );
};

export default Home;
