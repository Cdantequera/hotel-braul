import { useState, useEffect } from 'react';
import { getSiteConfigService } from '../services/siteConfig.service';

// Hook reutilizable - úsalo en Footer, Contact, o donde necesites la config
const useSiteConfig = () => {
    const [config, setConfig] = useState({
        phone: '',
        whatsapp: '',
        email: '',
        instagram: '',
        facebook: '',
        twitter: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await getSiteConfigService();
                if (res.ok) setConfig(res.config);
            } catch (error) {
                console.error('Error cargando config del sitio:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    return { config, loading };
};

export default useSiteConfig;