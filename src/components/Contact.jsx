import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import { supabase } from '../lib/supabase';
import MagneticButton from './MagneticButton';

export default function Contact() {
    const { data } = useSite();
    const { contact } = data;

    const [isHovered, setIsHovered] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supabase) {
            alert("Database offline. Message not sent.");
            return;
        }

        setStatus('submitting');
        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000); // Reset after 4s
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus('error');
            alert("Failed to send message: " + error.message);
        }
    };

    return (
        <section id="contact" className="w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">

            <div className="z-10 text-center flex flex-col items-center max-w-5xl">
                <motion.p
                    className="text-[var(--color-brand-red)] uppercase tracking-[0.3em] font-bold text-sm mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {contact.prompt}
                </motion.p>

                <motion.h2
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-serif tracking-tight text-white mb-16 leading-[0.9]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    dangerouslySetInnerHTML={{ __html: contact.title }}
                />

                <MagneticButton strength={0.05} className="mb-16 md:mb-32">
                    <motion.a
                        href={`mailto:${contact.email}`}
                        className="relative group text-lg sm:text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-brand-accent)] inline-block break-all md:break-normal"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {/* Main Text */}
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">{contact.email}</span>

                        {/* Hover Glow / Background Fill */}
                        <motion.div
                            className="absolute inset-x-[-2%] inset-y-[-10%] bg-[var(--color-brand-red)] rounded-none -z-0 origin-bottom"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />

                        {/* Underline for non-hover state */}
                        <div className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-white/30 transition-opacity duration-300 group-hover:opacity-0" />
                    </motion.a>
                </MagneticButton>

                <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center mt-8 mb-24">
                    {[
                        { name: data.global.social1, url: data.global.socialUrl1 },
                        { name: data.global.social2, url: data.global.socialUrl2 },
                        { name: data.global.social3, url: data.global.socialUrl3 },
                        { name: data.global.social4, url: data.global.socialUrl4 }
                    ].filter(s => s.name && s.name.trim() !== '').map((social, index) => (
                        <motion.a
                            key={social.name + index}
                            href={social.url || "#"}
                            target={social.url ? "_blank" : "_self"}
                            rel={social.url ? "noopener noreferrer" : ""}
                            className="text-white/60 hover:text-white uppercase tracking-widest text-sm font-medium transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                        >
                            {social.name}
                        </motion.a>
                    ))}
                </div>

                <motion.form
                    className="w-full max-w-2xl flex flex-col gap-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="flex-1 bg-white/5 border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[var(--color-brand-red)] transition-colors placeholder:text-white/30 backdrop-blur-md"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="flex-1 bg-white/5 border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[var(--color-brand-red)] transition-colors placeholder:text-white/30 backdrop-blur-md"
                        />
                    </div>
                    <textarea
                        rows={5}
                        placeholder="Project Details or Message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[var(--color-brand-red)] transition-colors placeholder:text-white/30 backdrop-blur-md resize-y"
                    />
                    <MagneticButton strength={0.1} className="w-full mt-2">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full py-4 bg-[var(--color-brand-red)] text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-white hover:text-black transition-all disabled:opacity-50"
                        >
                            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        </button>
                    </MagneticButton>
                </motion.form>
            </div>

            {/* Sharp minimal background accent */}
            <div className="absolute left-0 bottom-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-red-900/30 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        </section>
    );
}
