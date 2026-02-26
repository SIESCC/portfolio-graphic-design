import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { projects as defaultProjects } from '../data/projects';

export const defaultData = {
    global: {
        preloaderText: "Anurag Pandey",
        navbarLogo: "Anurag Pandey",
        navLink1: "Work",
        navLink2: "About",
        navLink3: "Contact",
        copyrightName: "Anurag Pandey",
        freelanceStatus: "Available for freelance",
        social1: "Twitter/X",
        socialUrl1: "https://twitter.com",
        social2: "LinkedIn",
        socialUrl2: "https://linkedin.com",
        social3: "Instagram",
        socialUrl3: "https://instagram.com",
        social4: "Github",
        socialUrl4: "https://github.com"
    },
    hero: {
        headline: "CREATIVE\nDEVELOPER\n& VISUAL DESIGNER",
        subtext: "Crafting immersive digital experiences through design, motion and modern web technologies."
    },
    about: {
        title1: "I Design",
        title2: "With Emotion.",
        title3: "I Build",
        title4: "With Precision.",
        bio1: "Anurag Pandey is an MSc IT student and multidisciplinary designer with expertise in branding, motion graphics, and frontend development.",
        bio2: "As Head of Social Media Technical & Designing at Technobeat, he led creative campaigns, designed 20+ promotional creatives, and produced high-engagement reels."
    },
    featuredWork: {
        title: "Selected<br/>Works",
        subtitle: "2023 — 2024",
        projects: defaultProjects
    },
    skills: {
        title: "Capabilities",
        row1: "DESIGN, BRANDING, SOCIAL MEDIA, MOTION GRAPHICS",
        row2: "FRONTEND DEVELOPMENT, REACT, TAILWIND, SUPABASE"
    },
    motionReel: {
        title: "Selected Motion Work",
        subtitle: "Designer + Video Editor + Creative Director",
        videoPlaceholder: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
    },
    experience: {
        title: "Experience",
        list: [
            {
                year: "2024",
                role: "Head of Social Media Technical & Designing",
                company: "Technobeat",
                description: "Led creative campaigns, designed 20+ promotional creatives, and produced high-engagement reels."
            },
            {
                year: "2024",
                role: "Web Development Intern",
                company: "Computer Solutions",
                description: "Built ecommerce platform with modern UI, optimizing for performance and user retention."
            }
        ]
    },
    contact: {
        title: "Let's Create Something <br /> That Moves.",
        email: "work.anuragapandey@gmail.com",
        prompt: "Have a project in mind?"
    },
    resume: {
        pdfUrl: "",
        phone: "+91-8856959498",
        linkedin: "https://www.linkedin.com/in/anurag-pandey-b29207211",
        summary: "Detail-oriented Graphic Designer with hands-on experience in digital branding, visual communication, social media campaign execution, and video content production. Delivered 80+ digital assets including marketing creatives, promotional banners, and video content. Proficient in Adobe Photoshop, Illustrator, Figma, and Adobe Premiere Pro. Strong expertise in brand guideline adherence, stakeholder collaboration, and engagement-driven content strategy.",
        coreCompetencies: "Graphic Design\nVisual Communication\nBrand Identity and Brand Guidelines\nDigital Marketing Creatives\nSocial Media Campaign Management\nContent Strategy and Planning\nVideo Editing and Post-Production\nUI Design and Prototyping (Figma)\nAsset Creation and Optimization\nCross-Functional Collaboration\nDeadline Management\nCreative Problem Solving",
        technicalSkills: "Adobe Photoshop\nAdobe Illustrator\nAdobe Premiere Pro\nFigma\nCanva\nCorel Draw",
        experience: [
            {
                role: "Head – Social Media Technical and Designing",
                company: "Technobeat, Mulund College of Commerce, Mumbai",
                description: "• Led end-to-end visual communication and branding strategy for annual event campaigns serving 1,000+ audience\n• Designed and delivered 50+ marketing assets including banners, posters, and high-performing social media creatives\n• Conceptualized and executed Instagram reel campaigns aligned with brand positioning and engagement goals\n• Edited promotional videos using Adobe Premiere Pro to support digital marketing initiatives\n• Contributed to approximately 30% increase in social media engagement during campaign period\n• Ensured 100% adherence to defined brand guidelines and visual consistency standards\n• Coordinated with marketing, content, and event teams to ensure timely asset delivery"
            },
            {
                role: "Creative Team Member – Design and Videography",
                company: "Vision, SIES College, Mumbai",
                description: "• Designed 20+ promotional creatives for digital and offline marketing campaigns\n• Supported video production by handling camera operations for promotional shoots\n• Assisted in content planning and execution for social media outreach\n• Maintained structured asset organization for campaign deployment"
            }
        ],
        projects: [
            {
                category: "UI Design and Web Interface Projects",
                description: "• Designed 5+ high-fidelity UI layouts in Figma including wireframes, prototypes, and responsive components\n• Developed structured interface elements including hero sections, banners, and call-to-action components\n• Applied usability, layout hierarchy, and typography principles to enhance user experience"
            },
            {
                category: "Brand Identity and Marketing Design Projects",
                description: "• Created 3 complete brand identity systems including logo design, typography, and color frameworks\n• Delivered 25+ digital creatives aligned with branding and campaign objectives\n• Optimized visual assets for clarity, readability, and performance"
            }
        ],
        education: [
            {
                degree: "M.Sc. in Information Technology",
                institution: "SIES College, Mumbai"
            },
            {
                degree: "B.Sc in Computer Science",
                institution: "Mulund College of Commerce, Mumbai"
            }
        ],
        additionalInfo: "• Strong stakeholder communication skills\n• Ability to manage multiple projects in fast-paced environments\n• High attention to detail and quality assurance\n• Adaptable to corporate branding standards and structured workflows"
    },
    artwork: {
        title: "My Work",
        gallery: [
            {
                title: "Example Design",
                mediaList: [
                    { mediaUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop" }
                ]
            }
        ]
    }
};

const SiteContext = createContext();

export function SiteProvider({ children }) {
    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!supabase) {
                setLoading(false);
                return;
            }

            try {
                const { data: siteData, error } = await supabase
                    .from('site_content')
                    .select('section, content');

                if (error) throw error;

                if (siteData && siteData.length > 0) {
                    const formattedData = { ...defaultData };
                    siteData.forEach(item => {
                        formattedData[item.section] = { ...formattedData[item.section], ...item.content };
                    });
                    setData(formattedData);
                }
            } catch (err) {
                console.error("Error fetching site data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <SiteContext.Provider value={{ data, setData, loading }}>
            {children}
        </SiteContext.Provider>
    );
}

export const useSite = () => useContext(SiteContext);
