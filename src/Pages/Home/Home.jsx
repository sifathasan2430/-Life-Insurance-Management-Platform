import React from 'react';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import PopularPolicies from '../../Components/Policiessection/PopularPolicies';
import BenefitsSection from '../../Components/Benefits/BenefitsSection';
import BlogSection from '../../LandingPageBlogs/Blogsection';
import ReviewSection from '../../Components/ReviewCard/ReviewSection/ReviewSection';
import FeaturedAgentsSection from '../../Components/Agents/AgentSection/FeaturedAgentsSection';
import NewsletterSubscription from '../../Components/NewsLatter/NewsletterSubscription';

const Home = () => {
    return (
        <div>
               <HeroSlider/>
               <PopularPolicies/>
               <BenefitsSection/>
               <BlogSection/>
               <ReviewSection/>
               <FeaturedAgentsSection/>
              
        </div>
    );
};

export default Home;