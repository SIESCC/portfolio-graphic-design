import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ResumePDF() {
    const { data } = useSite();
    const { resume, global } = data;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!resume) return <div className="bg-[var(--color-brand-bg)] min-h-screen"></div>;

    const hasPDF = resume.pdfUrl && resume.pdfUrl.trim() !== "";

    return (
        <main className="bg-[var(--color-brand-bg)] min-h-screen flex flex-col relative pt-12">

            {/* Header / Nav */}
            <div className="w-full px-6 md:px-12 flex items-center justify-between mb-8 z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--color-brand-red)] transition-colors uppercase tracking-widest text-xs font-bold">
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="text-[var(--color-brand-accent)] text-lg font-bold tracking-tight uppercase">
                    {global.navbarLogo}
                </div>
                <div className="w-16"></div> {/* Spacer to center logo */}
            </div>

            {/* PDF Viewer Container */}
            <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 pb-12 flex flex-col items-center justify-center">
                {hasPDF ? (
                    <div className="w-full h-[80vh] border border-white/10 rounded-2xl overflow-hidden bg-white/5 shadow-2xl">
                        <iframe
                            src={resume.pdfUrl}
                            className="w-full h-full"
                            title="Resume PDF"
                        >
                            <p className="text-white text-center p-12">Your browser does not support PDFs. <a href={resume.pdfUrl} className="text-red-400">Download the PDF</a>.</p>
                        </iframe>
                    </div>
                ) : (
                    <div className="text-center p-12 lg:p-24 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
                        <h2 className="text-3xl font-serif text-white tracking-widest uppercase mb-4">PDF Upload Pending</h2>
                        <p className="text-white/60 font-sans max-w-md mx-auto mb-8 leading-relaxed">
                            No PDF resume has been uploaded yet. You can upload your PDF directly from the Admin Panel's `Resume` tab.
                        </p>
                        <Link to="/admin" className="px-8 py-3 bg-[var(--color-brand-red)] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                            Go To Admin Dashboard
                        </Link>
                    </div>
                )}
            </div>

        </main>
    );
}
