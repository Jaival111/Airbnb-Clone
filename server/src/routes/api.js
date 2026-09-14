import express from 'express';
import { listing, similarStays } from '../data/listing.js';

const router = express.Router();

// Initial sample mock data
let items = [
    {
        id: '1',
        title: 'Modern Minimalist Villa',
        location: 'Kyoto, Japan',
        price: 240,
        rating: 4.95,
        tag: 'Trending',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        description: 'Serene mountain villa with zen garden and panoramic forest views.'
    },
    {
        id: '2',
        title: 'Cliffside Oceanfront Loft',
        location: 'Santorini, Greece',
        price: 320,
        rating: 4.98,
        tag: 'Superhost',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        description: 'Breathtaking sunset views overlooking the Aegean caldera.'
    },
    {
        id: '3',
        title: 'Scandinavian Forest Cabin',
        location: 'Tromsø, Norway',
        price: 195,
        rating: 4.88,
        tag: 'Guest favorite',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
        description: 'Cozy timber lodge equipped with sauna, ideal for viewing the Northern Lights.'
    },
    {
        id: '4',
        title: 'Architectural Desert Oasis',
        location: 'Joshua Tree, California',
        price: 285,
        rating: 4.92,
        tag: 'New',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        description: 'Striking modern eco-home set against the tranquil desert landscape.'
    }
];

// Health Check Endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'online',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: 'Express API Server'
    });
});

router.get('/listing', (_req, res) => {
    res.json({ success: true, data: listing });
});

router.get('/similar', (_req, res) => {
    res.json({ success: true, count: similarStays.length, data: similarStays });
});

// GET all items (with optional search query)
router.get('/items', (req, res) => {
    const { query } = req.query;
    if (query) {
        const q = query.toLowerCase();
        const filtered = items.filter(
            item =>
                item.title.toLowerCase().includes(q) ||
                item.location.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q)
        );
        return res.json({ success: true, count: filtered.length, data: filtered });
    }

    res.json({ success: true, count: items.length, data: items });
});

// GET single item by ID
router.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
});

// POST new item
router.post('/items', (req, res) => {
    const { title, location, price, description, tag, imageUrl } = req.body;

    if (!title || !location || !price) {
        return res.status(400).json({
            success: false,
            message: 'Title, location, and price are required fields'
        });
    }

    const newItem = {
        id: String(Date.now()),
        title: title.trim(),
        location: location.trim(),
        price: Number(price),
        rating: 5.0,
        tag: tag ? tag.trim() : 'New',
        imageUrl: imageUrl?.trim() || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
        description: description ? description.trim() : 'Delightful place to stay.'
    };

    items.unshift(newItem);

    res.status(201).json({
        success: true,
        message: 'Item created successfully',
        data: newItem
    });
});

// DELETE item by ID
router.delete('/items/:id', (req, res) => {
    const initialLength = items.length;
    items = items.filter(i => i.id !== req.params.id);

    if (items.length === initialLength) {
        return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: 'Item deleted successfully' });
});

export default router;
