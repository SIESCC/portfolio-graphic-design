import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useSite, defaultData } from '../context/SiteContext';
import { Toaster, toast } from 'react-hot-toast';

export default function Admin() {
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Tabs state
    const sections = Object.keys(defaultData);
    const allTabs = [...sections, 'Inbox'];
    const [activeTab, setActiveTab] = useState(allTabs[0]);

    // Inbox state
    const [inboxMessages, setInboxMessages] = useState([]);
    const [inboxLoading, setInboxLoading] = useState(false);

    // Data State for forms
    const { data: siteData, setData: setSiteData } = useSite();
    const [formData, setFormData] = useState(siteData);
    // Store JSON input drafts to prevent UI freezing on bad syntax
    const [jsonDraft, setJsonDraft] = useState({});

    useEffect(() => {
        if (supabase) {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
            });

            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });
        }
    }, []);

    useEffect(() => {
        if (siteData) setFormData(siteData);
    }, [siteData]);

    useEffect(() => {
        if (activeTab === 'Inbox' && session) {
            fetchInbox();
        }
    }, [activeTab, session]);

    const fetchInbox = async () => {
        if (!supabase) return;
        setInboxLoading(true);
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setInboxMessages(data || []);
        } catch (err) {
            toast.error("Failed to load inbox: " + err.message);
        } finally {
            setInboxLoading(false);
        }
    };

    const deleteMessage = async (id) => {
        if (!confirm("Are you sure you want to delete this message permanently?")) return;
        try {
            const { error } = await supabase.from('contact_messages').delete().eq('id', id);
            if (error) throw error;
            setInboxMessages(prev => prev.filter(m => m.id !== id));
            toast.success("Message deleted");
        } catch (err) {
            toast.error("Failed to delete message: " + err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!supabase) return toast.error("Supabase config not found.");

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) toast.error(error.message);
        else toast.success("Logged in");
        setLoading(false);
    };

    const handleLogout = () => {
        if (supabase) supabase.auth.signOut();
    };

    const handleDeepUpdate = (path, newValue) => {
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = newValue;
            return newData;
        });
    };

    const handleArrayAdd = (path) => {
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }

            // Traverse defaultData dynamically using path
            let templateCurrent = defaultData;
            for (let i = 0; i < path.length; i++) {
                if (!isNaN(path[i])) {
                    // For array indices in path, assume defaultData has the template at index 0
                    templateCurrent = templateCurrent[0];
                } else {
                    templateCurrent = templateCurrent[path[i]];
                }
            }

            let templateItem = null;
            if (templateCurrent && Array.isArray(templateCurrent) && templateCurrent.length > 0) {
                templateItem = templateCurrent[0];
            }

            if (templateItem !== undefined && templateItem !== null) {
                if (typeof templateItem === 'string') {
                    current.push('');
                } else if (typeof templateItem === 'object') {
                    const emptyItem = Object.fromEntries(
                        Object.entries(templateItem).map(([k, v]) => [k, Array.isArray(v) ? [] : typeof v === 'string' ? '' : v])
                    );
                    current.push(emptyItem);
                } else {
                    current.push(templateItem); // fallback
                }
            }
            return newData;
        });
    };

    const handleArrayRemove = (path, index) => {
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }
            current.splice(index, 1);
            return newData;
        });
    };

    const handleFileUpload = async (path, e) => {
        const file = e.target.files[0];
        if (!file) return;

        toast.loading("Uploading to 'portfolio-media' bucket...", { id: 'upload' });

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-media')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage.from('portfolio-media').getPublicUrl(fileName);
            handleDeepUpdate(path, data.publicUrl);

            toast.success("Upload successful!", { id: 'upload' });
        } catch (error) {
            toast.error(error.message, { id: 'upload' });
        }
    };

    const handleMultiFileUpload = async (path, currentArray, e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        toast.loading("Uploading multiple files to 'portfolio-media' bucket...", { id: 'upload-multi' });

        try {
            const newUrls = [];
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio-media')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('portfolio-media').getPublicUrl(fileName);
                newUrls.push(data.publicUrl);
            }

            const cleanCurrent = (currentArray || []).filter(v => typeof v === 'string' && v.trim() !== '');
            const updatedArray = [...cleanCurrent, ...newUrls];
            handleDeepUpdate(path, updatedArray);

            toast.success("Upload successful!", { id: 'upload-multi' });
        } catch (error) {
            toast.error(error.message, { id: 'upload-multi' });
        }
    };

    const renderField = (key, value, path) => {
        const isArray = Array.isArray(value);
        const isObject = typeof value === 'object' && value !== null && !isArray;
        const isTextArea = !isArray && !isObject && (String(value).length > 60 || String(value).includes('\n'));

        const isMediaField = Boolean(key.toLowerCase().match(/(image|video|media|file|url|placeholder|cover|logo|visual)/i));

        if (isArray) {
            const isStringArray = (value.length > 0 && typeof value[0] === 'string') || key === 'categories' || key === 'mediaList';
            if (isStringArray) {
                return (
                    <div key={path.join('-')} className="mb-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] text-[var(--color-brand-accent)]/80 uppercase tracking-widest block font-bold">
                                {key} (Comma Separated)
                            </label>
                            {isMediaField && (
                                <label className="cursor-pointer text-[10px] bg-white/10 border border-white/20 px-3 py-1 rounded text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-colors">
                                    Upload Multiple
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*,video/*"
                                        multiple
                                        onChange={(e) => handleMultiFileUpload(path, value, e)}
                                    />
                                </label>
                            )}
                        </div>
                        <textarea
                            value={value.join(', ')}
                            onChange={(e) => handleDeepUpdate(path, e.target.value.split(',').map(s => s.trim()))}
                            className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors min-h-[80px]"
                        />
                    </div>
                );
            } else {
                return (
                    <div key={path.join('-')} className="mb-6 border-l-2 border-white/20 pl-4 py-2">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm text-[var(--color-brand-accent)] uppercase tracking-widest block font-bold">{key} List</label>
                            <button
                                onClick={() => handleArrayAdd(path)}
                                className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold uppercase tracking-widest hover:bg-white/80"
                            >
                                + Add Item
                            </button>
                        </div>
                        {value.map((item, index) => (
                            <div key={index} className="p-4 border border-white/10 rounded-xl bg-black/40 my-4 shadow-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-xs uppercase tracking-widest text-[var(--color-brand-accent)] font-black bg-white/10 w-fit px-3 py-1 rounded-full">{key} Item {index + 1}</h4>
                                    <button
                                        onClick={() => {
                                            if (confirm("Are you sure you want to remove this item?")) {
                                                handleArrayRemove(path, index);
                                            }
                                        }}
                                        className="text-xs text-red-400 hover:text-red-300 uppercase tracking-widest px-3 py-1 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="pl-2">
                                    {Object.entries(item).map(([subKey, subVal]) =>
                                        renderField(subKey, subVal, [...path, index, subKey])
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        } else if (isObject) {
            return (
                <div key={path.join('-')} className="mb-6 p-4 border border-white/10 rounded-xl bg-black/40 shadow-xl">
                    <label className="text-sm text-[var(--color-brand-accent)] uppercase tracking-widest mb-6 block font-bold">{key}</label>
                    <div className="pl-2">
                        {Object.entries(value).map(([subKey, subVal]) =>
                            renderField(subKey, subVal, [...path, subKey])
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div key={path.join('-')} className="mb-4">
                    <label className="text-[10px] text-white/60 uppercase tracking-widest mb-1 block">
                        {key}
                    </label>
                    {isTextArea ? (
                        <textarea
                            value={value}
                            onChange={(e) => handleDeepUpdate(path, e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors min-h-[100px]"
                        />
                    ) : (
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleDeepUpdate(path, e.target.value)}
                                className="flex-1 bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors text-sm"
                            />
                            {/* Upload Button */}
                            {isMediaField && (
                                <label className="cursor-pointer bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors whitespace-nowrap">
                                    Upload Media
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*,video/*"
                                        onChange={(e) => handleFileUpload(path, e)}
                                    />
                                </label>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    };

    const saveChanges = async (section) => {
        if (!supabase) return toast.error("Supabase config offline! (Preview mode allowed)");

        setLoading(true);
        try {
            const { error } = await supabase
                .from('site_content')
                .upsert({ section, content: formData[section] });

            if (error) throw error;

            setSiteData(prev => ({ ...prev, [section]: formData[section] }));
            toast.success(`${section} section updated successfully!`);

        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!supabase) {
        return (
            <div className="min-h-screen bg-[var(--color-brand-bg)] text-white flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-3xl font-bold mb-4 uppercase">Admin Panel Offline</h1>
                <p className="max-w-md text-white/70">
                    Supabase is not configured. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a .env file and create the "site_content" table to enable the admin panel.
                </p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-[var(--color-brand-bg)] text-white flex flex-col items-center justify-center p-8">
                <Toaster />
                <div className="w-full max-w-sm glass-panel p-8 rounded-2xl">
                    <h1 className="text-2xl font-bold uppercase tracking-widest mb-6">Admin Login</h1>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm text-white/60 uppercase tracking-widest mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 uppercase tracking-widest mb-2 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white transition-colors"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full bg-white text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Enter Console'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-brand-bg)] text-white flex flex-col md:flex-row">
            <Toaster />

            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter mb-8">Admin</h1>
                    <nav className="flex flex-col gap-2">
                        {allTabs.map(sec => (
                            <button
                                key={sec}
                                onClick={() => setActiveTab(sec)}
                                className={`text-left px-4 py-2 rounded-lg text-sm uppercase tracking-widest transition-colors ${activeTab === sec ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                {sec}
                            </button>
                        ))}
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-red-400 text-sm uppercase tracking-widest hover:bg-red-400/10 rounded-lg transition-colors mt-8 md:mt-0"
                >
                    Logout
                </button>
            </div>

            {/* Editor Main */}
            <div className="flex-1 p-6 md:p-12 max-w-4xl h-screen overflow-y-auto">
                <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8">
                    {activeTab === 'Inbox' ? 'Inbox Messages' : `Edit ${activeTab}`}
                </h2>

                {activeTab === 'Inbox' ? (
                    <div className="flex flex-col gap-4 pb-20">
                        {inboxLoading && <p className="text-white/50">Loading messages...</p>}
                        {inboxMessages.length === 0 && !inboxLoading && (
                            <div className="p-8 border border-white/5 bg-black/40 text-center rounded-2xl">
                                <p className="text-white/40 uppercase tracking-widest text-sm">No messages received yet.</p>
                            </div>
                        )}
                        {inboxMessages.map(msg => (
                            <div key={msg.id} className="p-6 border border-white/10 rounded-xl bg-black/40 shadow-xl relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-1">{msg.name}</h3>
                                        <a href={`mailto:${msg.email}`} className="text-[var(--color-brand-red)] hover:underline text-sm uppercase tracking-wider font-bold">{msg.email}</a>
                                        <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">{new Date(msg.created_at).toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteMessage(msg.id)}
                                        className="text-xs text-red-400 hover:text-red-300 uppercase tracking-widest px-3 py-1 border border-red-500/30 rounded-full hover:bg-red-500/10 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-white/80 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {formData[activeTab] && Object.keys(formData[activeTab]).map(field =>
                            renderField(field, formData[activeTab][field], [activeTab, field])
                        )}

                        <button
                            onClick={() => saveChanges(activeTab)}
                            disabled={loading}
                            className="mt-6 bg-white text-black font-bold uppercase tracking-widest py-3 px-8 rounded-lg hover:bg-white/90 transition-colors self-start sticky bottom-6"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
