import React from 'react';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import PopularPolicies from '../../Components/Policiessection/PopularPolicies';
import BenefitsSection from '../../Components/Benefits/BenefitsSection';
import BlogSection from '../../LandingPageBlogs/Blogsection';

const Home = () => {
    return (
        <div>
               <HeroSlider/>
               <PopularPolicies/>
               <BenefitsSection/>
               <BlogSection/>
        </div>
    );
};

export default Home;