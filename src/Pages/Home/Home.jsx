import React from 'react';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import PopularPolicies from '../../Components/Policiessection/PopularPolicies';
import BenefitsSection from '../../Components/Benefits/BenefitsSection';
import BlogSection from '../../LandingPageBlogs/Blogsection';
import ReviewSection from '../../Components/ReviewCard/ReviewSection/ReviewSection';
import FeaturedAgentsSection from "../../Components/Agents/AgentSection/FeaturedAgentsSection";
import NewsletterSubscription from '../../Components/NewsLatter/NewsletterSubscription';
import Herobanner from '../../Components/HeroSlider/Herobanner';

const Home = () => {
    return (
        
        <div className="pt-10 px-4 md:px-8 lg:px-16">
               
               <Herobanner/>
               <PopularPolicies/>
               <BenefitsSection/>
               <BlogSection/>
               <ReviewSection/>
               <FeaturedAgentsSection />
              
        </div>
    );
};

export default Home;