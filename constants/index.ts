import icon_1 from "@/public/linear/icon-1.svg";
import icon_2 from "@/public/linear/icon-2.svg";
import icon_3 from "@/public/linear/icon-3.svg";
import icon_4 from "@/public/linear/icon-4.svg";
import icon_5 from "@/public/linear/icon-5.svg";
import icon_6 from "@/public/linear/icon-6.svg";
import nav_logo_1 from "@/public/navbar-features/nav-icon-1.svg";
import nav_logo_2 from "@/public/navbar-features/nav-icon-2.svg";
import nav_logo_3 from "@/public/navbar-features/nav-icon-3.svg";
import nav_logo_4 from "@/public/navbar-features/nav-icon-4.svg";
import placeholder from "@/public/placeholder-man.png";
import createCampaign from "@/public/slide/create-campaign.png";
import deafaultScreen from "@/public/slide/default-screen.png";
import searchCampaign from "@/public/slide/search-campaign.png";
import shareCampaign from "@/public/slide/share-campaign.png";
import { StaticImageData } from "next/image";

/**NAVBAR */

export const NavbarItemList = [
  {
    name: "Why LOQO ai",
    link: "#",
    id: "why-LOQO ai",
  },
  {
    name: "Our Products",
    link: "#",
    id: "our-products",
  },
  {
    name: "Customer Feedback",
    link: "#",
    id: "customer-feedback",
  },
  {
    name: "Blogs",
    link: "/blogs",
    id: "blogs",
  },
];
export const HeroSectionFeatures = [
  {
    name: "Tech Solutions",
    icon: nav_logo_1,
  },
  {
    name: "Automation",
    icon: nav_logo_2,
  },
  {
    name: "Custom Tools",
    icon: nav_logo_3,
  },
  {
    name: "Agency Automation",
    icon: nav_logo_4,
  },
];

/** */
export const SocialLinks = [
  {
    title: "Company",
    links: [
      { title: "Home", id: "navbar", href: "#", isValid: true },
      { title: "About us", id: "our-products", href: "#our-products", isValid: true },
      { title: "Services", id: "why-LOQO ai", href: "#why-LOQO ai", isValid: true },
      { title: "Resources", id: "", href: "#", isValid: false },
      { title: "Reviews", id: "customer-feedback", href: "#customer-feedback", isValid: true },
    ],
  },
  {
    title: "Our Services",
    links: [
      { title: "Agency automation", id: "", href: "#", isValid: false },
      { title: "Custom tools", id: "", href: "#", isValid: false },
      { title: "Reporting tools", id: "", href: "#", isValid: false },
      { title: "Marketing lead", id: "", href: "#", isValid: false },
    ],
  },
];

export const ContactInfo = [
  "Nimbus The Golden Palm Sector 168",
  "Noida, Uttar Pradesh 201301",
  "(+91) 77959-83243",
];

/**WHY LOQO ai */

export type WhySuperbioListProps = {
  title: string;
  icon: string;
  text: string;
};
export const WhySuperbioList: WhySuperbioListProps[] = [
  {
    title: "Campaign Performance Reporting",
    icon: icon_1,
    text: "Track and analyze campaign performance. Gain insights to optimize strategies.",
  },
  {
    title: "Creator Communication in Bulk",
    icon: icon_2,
    text: "Streamline communication with creators. Save time and effort.",
  },
  {
    title: "Creator Profile Selection",
    icon: icon_3,
    text: "Find and select creators easily. Make informed decisions.",
  },
  {
    title: "Campaign History Management",
    icon: icon_4,
    text: "Manage campaign history effortlessly. Keep track of past campaigns.",
  },
  {
    title: "Automatic Invoicing and Payments",
    icon: icon_5,
    text: "Simplify billing with automatic payments. Ensure timely payments.",
  },
  {
    title: "AI medias Plan Generation",
    icon: icon_6,
    text: "Generate optimized medias plans with AI. Enhance campaign effectiveness.",
  },
];

/**FEATURE_CARD */
export const FEATURES = [
  {
    title: "Feature 1",
    description: `Campaign performance Reporting + Client Dashboard.`,
    image: deafaultScreen,
  },
  {
    title: "Feature 2",
    description: `Creator Communication in bulk - Talk to 1000 creators at once using whatsapp business API.`,
    image: searchCampaign,
  },
  {
    title: "Feature 3",
    description: `Creator profile selection - AI enabled profile selection trained with large datasets. `,
    image: createCampaign,
  },
  {
    title: "Feature 4",
    description: `Campaigns history management - Track all campaigns (current or past) in a single dashboard.`,
    image: shareCampaign,
  },
];

/**FEEDBACK */
export type CustomerFeedbackListProps = {
  image: StaticImageData;
  text: string;
  name: string;
  position: string;
};
export const CustomerFeedbackList = [
  {
    image: placeholder,
    text: "I am managing all of my large and small clients on Superbio along with the data stored.",
    name: "Saksham, Young Gun",
    position: "creative agency, founder",
  },
  {
    image: placeholder,
    text: "Superbio is indispensable for client management. Intuitive interface, robust features.",
    name: "Aarav Patel",
    position: "Freelance Graphic Designer",
  },
  {
    image: placeholder,
    text: "Superbio simplifies client management. User-friendly platform, comprehensive features.",
    name: "Priya Gupta",
    position: "Digital Marketing Consultant",
  },
  {
    image: placeholder,
    text: "Superbio streamlines client management. Seamless integration, powerful capabilities.",
    name: "Rajesh Sharma",
    position: "Small Business Owner",
  },
];

/**BLOGS */
import getInstaVerify1 from "@/public/blogs/get-insta-verify/image1.png";
import getInstaVerify2 from "@/public/blogs/get-insta-verify/image2.png";

import instaStarsKaMantra1 from "@/public/blogs/insta-stars-ka-mantra/image1.png";
import instaStarsKaMantra2 from "@/public/blogs/insta-stars-ka-mantra/image2.png";

import getYourContentSeen1 from "@/public/blogs/get-your-content-seen/image1.png";
import getYourContentSeen2 from "@/public/blogs/get-your-content-seen/image2.png";

import buildingFam1 from "@/public/blogs/building-fam/image1.png";
import buildingFam2 from "@/public/blogs/building-fam/image2.png";

import instaAdsKaTadka1 from "@/public/blogs/insta-ads-ka-tadka/image1.png";
import instaAdsKaTadka2 from "@/public/blogs/insta-ads-ka-tadka/image2.png";

import instaConsistency1 from "@/public/blogs/insta-consistency/image1.png";
import instaConsistency2 from "@/public/blogs/insta-consistency/image2.png";

import instaContent1 from "@/public/blogs/insta-content/image1.png";
import instaContent2 from "@/public/blogs/insta-content/image2.png";

import instaContentTrend1 from "@/public/blogs/insta-content-trend/image1.png";
import instaContentTrend2 from "@/public/blogs/insta-content-trend/image2.png";

import instaDmAndMessageMarketing1 from "@/public/blogs/insta-dm-and-message-marketing/image1.png";
import instaDmAndMessageMarketing2 from "@/public/blogs/insta-dm-and-message-marketing/image2.png";

import instaContentStacking1 from "@/public/blogs/insta-content-stacking/image1.png";
import instaContentStacking2 from "@/public/blogs/insta-content-stacking/image2.png";

import instaHashtagExposure1 from "@/public/blogs/insta-hashtag-exposure/image1.png";
import instaHashtagExposure2 from "@/public/blogs/insta-hashtag-exposure/image2.png";

import instaImageOwnership1 from "@/public/blogs/insta-image-ownership/image1.png";
import instaImageOwnership2 from "@/public/blogs/insta-image-ownership/image2.png";

import instaInsightsAndTracking1 from "@/public/blogs/insta-insights-and-tracking/image1.png";
import instaInsightsAndTracking2 from "@/public/blogs/insta-insights-and-tracking/image2.png";

import instaLive1 from "@/public/blogs/insta-live/image1.png";
import instaLive2 from "@/public/blogs/insta-live/image2.png";

import instaMessenger1 from "@/public/blogs/insta-messenger/image1.png";
import instaMessenger2 from "@/public/blogs/insta-messenger/image2.png";

import instaMonetization1 from "@/public/blogs/insta-monetization/image1.png";
import instaMonetization2 from "@/public/blogs/insta-monetization/image2.png";

import instaPerfectContent1 from "@/public/blogs/insta-perfect-content/image1.png";
import instaPerfectContent2 from "@/public/blogs/insta-perfect-content/image2.png";

import instaProfilehighlight1 from "@/public/blogs/insta-profile-highlight/image1.png";
import instaProfilehighlight2 from "@/public/blogs/insta-profile-highlight/image2.png";

import instaQualityContent1 from "@/public/blogs/insta-quality-content/image1.png";
import instaQualityContent2 from "@/public/blogs/insta-quality-content/image2.png";

import instaReachOurToInfluencer1 from "@/public/blogs/insta-reach-our-to-influencer/image1.png";
import instaReachOurToInfluencer2 from "@/public/blogs/insta-reach-our-to-influencer/image2.png";

import instaSellingProductsAndServices1 from "@/public/blogs/insta-selling-products-and-services/image1.png";
import instaSellingProductsAndServices2 from "@/public/blogs/insta-selling-products-and-services/image2.png";

import instaShoutoutContent1 from "@/public/blogs/insta-shoutout-content/image1.png";
import instaShoutoutContent2 from "@/public/blogs/insta-shoutout-content/image2.png";

import instaShoutouts1 from "@/public/blogs/insta-shoutouts/image1.png";
import instaShoutouts2 from "@/public/blogs/insta-shoutouts/image2.png";

import instaShoutoutsAndBrandDeals1 from "@/public/blogs/insta-shoutouts-and-brand-deals/image1.png";
import instaShoutoutsAndBrandDeals2 from "@/public/blogs/insta-shoutouts-and-brand-deals/image2.png";

import instaStoryhighlightCreation1 from "@/public/blogs/insta-story-highlight-creation/image1.png";
import instaStoryhighlightCreation2 from "@/public/blogs/insta-story-highlight-creation/image2.png";

import instaVerify1 from "@/public/blogs/insta-verify/image1.png";
import instaVerify2 from "@/public/blogs/insta-verify/image2.png";

import instagramAlgorithm1 from "@/public/blogs/instagram-algorithm/image1.png";
import instagramAlgorithm2 from "@/public/blogs/instagram-algorithm/image2.png";

import instagramExplorePage1 from "@/public/blogs/instagram-explore-page/image1.png";
import instagramExplorePage2 from "@/public/blogs/instagram-explore-page/image2.png";

import instagramReelSkyrocket1 from "@/public/blogs/instagram-reel-skyrocket/image1.png";
import instagramReelSkyrocket2 from "@/public/blogs/instagram-reel-skyrocket/image2.png";

import instagramShoutouts1 from "@/public/blogs/instagram-shoutouts/image1.png";
import instagramShoutouts2 from "@/public/blogs/instagram-shoutouts/image2.png";

import instaContentTrendDiscovery1 from "@/public/blogs/insta-content-trend-discovery/image1.png";
import instaContentTrendDiscovery2 from "@/public/blogs/insta-content-trend-discovery/image2.png";

import instaFameKaRasta1 from "@/public/blogs/insta-fame-ka-rasta/image1.png";
import instaFameKaRasta2 from "@/public/blogs/insta-fame-ka-rasta/image2.png";

import instaMaximiseEngagement1 from "@/public/blogs/insta-maximise-engagement/image1.png";
import instaMaximiseEngagement2 from "@/public/blogs/insta-maximise-engagement/image2.png";

import instaMaximizingEarnings1 from "@/public/blogs/insta-maximizing-earnings/image1.png";
import instaMaximizingEarnings2 from "@/public/blogs/insta-maximizing-earnings/image2.png";

import instaPowerfulTools1 from "@/public/blogs/insta-powerful-tools/image1.png";
import instaPowerfulTools2 from "@/public/blogs/insta-powerful-tools/image2.png";

import instaTrendingMarketStories1 from "@/public/blogs/insta-trending-market-stories/image1.png";
import instaTrendingMarketStories2 from "@/public/blogs/insta-trending-market-stories/image2.png";

export type BlogProps = {
  path: string;
  title: string;
  author?: string;
  designation?: string;
  tags?: string[];
  images: StaticImageData[];
};
export const BlogList: BlogProps[] = [
  {
    path: "get-insta-verify",
    title: "Get Verified, Get Recognized: A Walkthrough for Indian Instagram Influencers!",
    tags: [
      "#BrandRecognition",
      "#FollowerTrust",
      "#IdentityVerified",
      "#PatiencePays",
      "#StayVerified",
    ],
    images: [getInstaVerify1, getInstaVerify2],
  },
  {
    path: "insta-stars-ka-mantra",
    title: "Insta Stars ka Mantra: Finding and Modeling Perfect Contentt!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaStarsKaMantra1, instaStarsKaMantra2],
  },
  {
    path: "get-your-content-seen",
    title: "Tips for Working with the Instagram Algorithm (and Getting Your Content Seen)",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [getYourContentSeen1, getYourContentSeen2],
  },
  {
    path: "building-fam",
    title: "Insta Fam: Building Strong Instagram Relationships Like a Pro!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [buildingFam1, buildingFam2],
  },
  {
    path: "insta-ads-ka-tadka",
    title: "Insta Ads ka Tadka: Top 5 Instagram Ad Keys for Indian Instagram Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaAdsKaTadka1, instaAdsKaTadka2],
  },
  {
    path: "insta-consistency",
    title: "Dum Hai to Dikhao: Unlocking the Power of Consistency on Instagram!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaConsistency1, instaConsistency2],
  },
  {
    path: "insta-content",
    title: "Unleashing Brilliance: Elevating the Quality of Your Instagram Content, Desi Style!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaContent1, instaContent2],
  },
  {
    path: "insta-content-trend",
    title: "Content Trends for Discovery",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaContentTrend1, instaContentTrend2],
  },
  {
    path: "insta-dm-and-message-marketing",
    title: "Instagram DM & Messenger Marketing: The Ultimate Guide for Indian Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaDmAndMessageMarketing1, instaDmAndMessageMarketing2],
  },
  {
    path: "insta-content-stacking",
    title: "Content Stacking: The Ultimate Hack for Indian Instagram Influencers",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaContentStacking1, instaContentStacking2],
  },
  {
    path: "insta-hashtag-exposure",
    title: "Hashtags for Exposure: Unlocking the Power of Hashtags, Desi Style!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaHashtagExposure1, instaHashtagExposure2],
  },
  {
    path: "insta-image-ownership",
    title: "Dil Se Dil Tak: Image Ownership for Indian Instagram Influencers",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaImageOwnership1, instaImageOwnership2],
  },
  {
    path: "insta-insights-and-tracking",
    title:
      "Unlocking the Power of Insights and Tracking: A Guide for Indian Instagram Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaInsightsAndTracking1, instaInsightsAndTracking2],
  },
  {
    path: "insta-live",
    title: "Lights, Camera, Insta Action! An Instagram Live Walkthrough for Indian Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaLive1, instaLive2],
  },
  {
    path: "insta-messenger",
    title: "Instagram Messenger Walkthrough: Stay Connected 'One-on-One' with Your Insta Fam!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaMessenger1, instaMessenger2],
  },
  {
    path: "insta-monetization",
    title: "Instagram Pe Paisa: Types of Monetization for Indian Insta Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaMonetization1, instaMonetization2],
  },
  {
    path: "insta-perfect-content",
    title: "Perfect Content Dhoondhne Aur Banane Ka Raaz: Indian Instagram Influencer Ke Liye!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaPerfectContent1, instaPerfectContent2],
  },
  {
    path: "insta-profile-highlight",
    title: "Hashtags for Exposure: Unlocking the Power of Hashtags, Desi Style!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaProfilehighlight1, instaProfilehighlight2],
  },
  {
    path: "insta-quality-content",
    title: "Dhamakedar Content: The Magic Ingredient for Indian Instagram Stars!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaQualityContent1, instaQualityContent2],
  },
  {
    path: "insta-reach-our-to-influencer",
    title: "Dil Se Dosti: A Guide to Reaching Out to Influencers on Instagram!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaReachOurToInfluencer1, instaReachOurToInfluencer2],
  },
  {
    path: "insta-selling-products-and-services",
    title:
      "Insta Selling 101: Ace the Game of Selling Products and Services as an Indian Instagram Influencer!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaSellingProductsAndServices1, instaSellingProductsAndServices2],
  },
  {
    path: "insta-shoutout-content",
    title: "Shoutout Content: Boosting Visibility and Spreading Love on Instagram!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaShoutoutContent1, instaShoutoutContent2],
  },
  {
    path: "insta-shoutouts",
    title: "Shoutout Swag: Exploring the Different Types of Shoutouts on Instagram!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaShoutouts1, instaShoutouts2],
  },
  {
    path: "insta-shoutouts-and-brand-deals",
    title: "Shoutouts and Brand Deals: The Power Duo of Earnings for Indian Instagram Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaShoutoutsAndBrandDeals1, instaShoutoutsAndBrandDeals2],
  },
  {
    path: "insta-story-highlight-creation",
    title:
      "Insta Stories That Stay Forever: A Story Highlights Creation Walkthrough for Indian Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaStoryhighlightCreation1, instaStoryhighlightCreation2],
  },
  {
    path: "insta-verify",
    title: "Insta Swag: The Lowdown on Instagram Verification for Indian Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaVerify1, instaVerify2],
  },
  {
    path: "instagram-algorithm",
    title: "The most important ranking factors of the 2023 to dominate Instagram algorithm",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instagramAlgorithm1, instagramAlgorithm2],
  },
  {
    path: "instagram-explore-page",
    title: "How to Master the 2023 Explore Page Algorithm and Reach New Audiences!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instagramExplorePage1, instagramExplorePage2],
  },
  {
    path: "instagram-reel-skyrocket",
    title: "Mastering the 2023 Instagram Reel Algorithm to Skyrocket Your Views and Engagement",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instagramReelSkyrocket1, instagramReelSkyrocket2],
  },
  {
    path: "instagram-shoutouts",
    title: "Desi Shoutout Swag: Unleashing the Power of Shoutouts for Indian Instagram Stars!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instagramShoutouts1, instagramShoutouts2],
  },
  // ADDITIONAL
  {
    path: "insta-content-trend-discovery",
    title: "Content Trends for Instagram Discovery: Apna Swag, Apna Style!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaContentTrendDiscovery1, instaContentTrendDiscovery2],
  },
  {
    path: "insta-fame-ka-rasta",
    title: "Insta Fame Ka Raasta: Types of Content Walkthrough for Indian Instagram Influencers!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaFameKaRasta1, instaFameKaRasta2],
  },
  {
    path: "insta-maximise-engagement",
    title: "Insta Clock: Decoding the Best Times to Post for Maximum Engagement!",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaMaximiseEngagement1, instaMaximiseEngagement2],
  },
  {
    path: "insta-maximizing-earnings",
    title:
      "Cracking the Code: Unleashing the Potent Strategies for Instagram Influencers to Maximize Their Earnings",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaMaximizingEarnings1, instaMaximizingEarnings2],
  },
  {
    path: "insta-powerful-tools",
    title: "Empowering Your Instagram Journey: Unleashing the Power of Essential Tools",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaPowerfulTools1, instaPowerfulTools2],
  },
  {
    path: "insta-trending-market-stories",
    title: "Riding the Social medias Wave: Trending Marketing Strategies in 2023",
    tags: [
      "#WanderlustDiaries",
      "#FoodieInspo",
      "#JewelryPhotography",
      "#DoodleArt",
      "#AudienceLove",
    ],
    images: [instaTrendingMarketStories1, instaTrendingMarketStories2],
  },
];
