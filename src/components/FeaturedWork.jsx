import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyPreview from './CaseStudyPreview';
import { useSite } from '../context/SiteContext';

export default function FeaturedWork() {
    const { data } = useSite();
    const { featuredWork } = data;

    return (
        <section id="work" className="w-full py-32 px-6 md:px-12 lg:px-24">

            {/* Header */}
            <div className="mb-24 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-gray-800 pb-8 gap-6">
                <h2
                    className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-tight text-white leading-none break-words w-full md:w-auto"
                    dangerouslySetInnerHTML={{ __html: featuredWork.title }}
                />
                <span className="text-[var(--color-brand-red)] uppercase tracking-widest text-xs md:text-sm md:mb-2 font-bold whitespace-nowrap">{featuredWork.subtitle}</span>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-12">
                {featuredWork.projects.map((project, index) => (
                    <CaseStudyPreview
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </div>

        </section>
    );
}
