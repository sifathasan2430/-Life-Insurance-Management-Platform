import React from 'react';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import PopularPolicies from '../../Components/Policiessection/PopularPolicies';
import BenefitsSection from '../../Components/Benefits/BenefitsSection';
import BlogSection from '../../LandingPageBlogs/Blogsection';
import ReviewSection from '../../Components/ReviewCard/ReviewSection/ReviewSection';
import FeaturedAgentsSection from "../../Components/Agents/AgentSection/FeaturedAgentsSection";
import Newsletter from '../../Components/NewsLatter/Newsletter';
import Herobanner from '../../Components/HeroSlider/Herobanner';
import SalesPromotion from '../../Components/SalesPromotion/SalesPromotion';

const Home = () => {
    return (
        
        <div className="">
               
               <Herobanner/>
               <PopularPolicies className=''/>
               <SalesPromotion/>
               <BenefitsSection className=''/>
               <BlogSection className=''/>
               <ReviewSection className=''/>
               <FeaturedAgentsSection className='' />
               <Newsletter />
              
        </div>
    );
};

export default Home;