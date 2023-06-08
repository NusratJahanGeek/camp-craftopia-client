import { Helmet } from 'react-helmet-async';
import Hero from "../Hero/Hero";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    return (
        <div className="w-full">
            <Helmet>
        <title>Camp Craftopia | Home</title>
      </Helmet>
            <Hero></Hero>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;