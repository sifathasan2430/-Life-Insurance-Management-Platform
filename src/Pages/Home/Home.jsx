import React from 'react';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import PopularPolicies from '../../Components/Policiessection/PopularPolicies';
import BenefitsSection from '../../Components/Benefits/BenefitsSection';

const Home = () => {
    return (
        <div>
               <HeroSlider/>
               <PopularPolicies/>
               <BenefitsSection/>
        </div>
    );
};

export default Home;