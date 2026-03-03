'use client';
import React, { useEffect } from 'react';

const ChatProvider = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let scriptLoaded = false;

        const loadTawkScript = () => {
            if (scriptLoaded) return;
            scriptLoaded = true;

            const script = document.createElement("script");
            script.async = true;
            script.src = "https://embed.tawk.to/6794f69c3a8427326074c7fe/1iieu6lic";
            script.charset = "UTF-8";
            script.setAttribute("crossorigin", "*");
            document.body.appendChild(script);
        };

        // Load chat script only after user interaction
        const handleUserInteraction = () => {
            loadTawkScript();
            window.removeEventListener("mousemove", handleUserInteraction);
            window.removeEventListener("scroll", handleUserInteraction);
            window.removeEventListener("keydown", handleUserInteraction);
        };

        window.addEventListener("mousemove", handleUserInteraction);
        window.addEventListener("scroll", handleUserInteraction);
        window.addEventListener("keydown", handleUserInteraction);

        return () => {
            window.removeEventListener("mousemove", handleUserInteraction);
            window.removeEventListener("scroll", handleUserInteraction);
            window.removeEventListener("keydown", handleUserInteraction);
        };
    }, []);

    return <>
        {children}
    </>;
};

export default ChatProvider;