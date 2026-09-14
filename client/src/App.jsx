import { useEffect } from 'react';
import listingHtml from './listing.html?raw';
import { wireListing } from './wireListing';
import './airbnb.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function App() {
    useEffect(() => {
        fetch(`${API_BASE_URL}/listing`).catch(() => {});
        return wireListing();
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: listingHtml }} />;
}
