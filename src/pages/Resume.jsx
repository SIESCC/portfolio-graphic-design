import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function Resume() {
    const { data } = useSite();
    const { global, resume, contact } = data;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // A helper to safely split \n into paragraphs/bullets
    const renderBullets = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => (
            <p key={i} className="mb-1">{line}</p>
        ));
    };

    if (!resume) return <div className="bg-[var(--color-brand-bg)] min-h-screen"></div>;

    return (
        <main className="bg-[var(--color-brand-bg)] min-h-screen text-[var(--color-brand-accent)] flex flex-col pt-12">

            <div className="max-w-4xl mx-auto w-full px-6 md:px-12 flex-1">
                {/* Back Navigation */}
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-brand-red)] transition-colors uppercase tracking-widest text-xs font-bold">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>

                <motion.div
                    className="w-full pb-32"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Header */}
                    <div className="border-b border-gray-900 pb-12 mb-12">
                        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter mb-4 uppercase">{global.navbarLogo}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-brand-red)] uppercase tracking-widest font-bold mb-8">
                            <span>Mumbai, India</span>
                            <span>•</span>
                            <span>{resume.phone}</span>
                            <span>•</span>
                            <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                            <span>•</span>
                            <a href={resume.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                        <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-4">Professional Summary</h3>
                        <p className="max-w-3xl text-white/70 font-sans leading-relaxed text-base md:text-lg">{resume.summary}</p>
                    </div>

                    {/* Core Competencies & Tech Skills */}
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-gray-900 pb-12">
                        <div>
                            <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-6">Core Competencies</h3>
                            <div className="text-white/70 leading-relaxed font-sans text-sm md:text-base">
                                {renderBullets(resume.coreCompetencies)}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-6">Technical Skills</h3>
                            <div className="text-white/70 leading-relaxed font-sans text-sm md:text-base">
                                {renderBullets(resume.technicalSkills)}
                            </div>
                        </div>
                    </div>

                    {/* Professional Experience */}
                    <div className="mb-12 border-b border-gray-900 pb-12">
                        <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-8">Professional Experience</h3>
                        <div className="flex flex-col gap-10">
                            {resume.experience.map((exp, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <h4 className="text-2xl font-serif text-[var(--color-brand-red)]">{exp.role}</h4>
                                    <span className="text-white/50 uppercase tracking-widest text-xs mb-3">{exp.company}</span>
                                    <div className="text-white/70 leading-relaxed font-sans text-sm md:text-base">
                                        {renderBullets(exp.description)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="mb-12 border-b border-gray-900 pb-12">
                        <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-8">Project Experience</h3>
                        <div className="flex flex-col gap-10">
                            {resume.projects.map((proj, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <h4 className="text-xl font-serif text-white">{proj.category}</h4>
                                    <div className="text-white/70 leading-relaxed font-sans text-sm md:text-base mt-2">
                                        {renderBullets(proj.description)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="mb-12 border-b border-gray-900 pb-12">
                        <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-8">Education</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {resume.education.map((edu, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <h4 className="text-xl font-serif text-[var(--color-brand-red)]">{edu.degree}</h4>
                                    <span className="text-white/70 font-sans text-sm">{edu.institution}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mb-12">
                        <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-6">Additional Information</h3>
                        <div className="text-white/70 leading-relaxed font-sans text-sm md:text-base">
                            {renderBullets(resume.additionalInfo)}
                        </div>
                    </div>

                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
