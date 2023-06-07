import Hero from "../Hero/Hero";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
    return (
        <div className="w-full">
            <Hero></Hero>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;