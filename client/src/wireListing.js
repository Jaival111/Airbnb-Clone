const OPEN = '_PjnNJs';
const STICKY = '_fTQmRt';
const SAVED = '_nfavct';
const LOCK = '_pINcte';
const TOAST = '_fTQmRt';
const CLAMP = '_kfKUOt';

function toast(message) {
    const el = document.getElementById('_HALoyX');
    if (!el) return;
    el.textContent = message;
    el.classList.add(TOAST);
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove(TOAST), 2200);
}

function setOpen(el, on) {
    if (!el) return;
    el.classList.toggle(OPEN, on);
    el.setAttribute('aria-hidden', on ? 'false' : 'true');
}

function lockBody(on) {
    document.body.classList.toggle(LOCK, on);
}

export function wireListing() {
    const sticky = document.getElementById('_JXzroy');
    const photos = document.getElementById('_Zndiww');
    const tour = document.getElementById('_KpcKWX');
    const lightbox = document.getElementById('lightbox');
    const amenModal = document.getElementById('amenModal');
    const saveBtn = document.getElementById('saveBtn');
    const shareBtn = document.getElementById('shareBtn');
    const descText = document.getElementById('descText');
    const descMore = document.getElementById('descMore');
    const simTrack = document.getElementById('simTrack');
    const lbCounter = document.getElementById('lbCounter');
    const lbStage = document.getElementById('lbStage');
    const lbTitle = document.getElementById('lbTitle');

    const heroImgs = [...document.querySelectorAll('#heroGrid img')];
    const tourImgs = [...document.querySelectorAll('#tourRooms img, #tourScroll img')].filter(
        (img) => img.closest('#tourRooms')
    );
    const gallery = (tourImgs.length ? tourImgs : heroImgs).map((img) => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || ''
    }));
    let lbIndex = 0;

    const onScroll = () => {
        if (!sticky || !photos) return;
        const show = photos.getBoundingClientRect().bottom < 72;
        sticky.classList.toggle(STICKY, show);
        sticky.setAttribute('aria-hidden', show ? 'false' : 'true');

        const sections = [
            ['photos', document.getElementById('photos')],
            ['amenities', document.getElementById('amenities')],
            ['reviews', document.getElementById('reviews')],
            ['location', document.getElementById('location')]
        ];
        const links = [...document.querySelectorAll('#_JXzroy [data-target]')];
        let active = 'photos';
        for (const [id, el] of sections) {
            if (el && el.getBoundingClientRect().top < 120) active = id;
        }
        links.forEach((a) => {
            a.classList.toggle('_KOWlKT', a.getAttribute('data-target') === active);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    document.querySelectorAll('[data-target]').forEach((a) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const id = a.getAttribute('data-target');
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const openTour = () => {
        setOpen(tour, true);
        lockBody(true);
        const scroller = document.getElementById('tourScroll');
        if (scroller) scroller.scrollTop = 0;
    };

    const closeTour = () => {
        setOpen(tour, false);
        lockBody(false);
    };

    const renderLightbox = () => {
        if (!gallery.length || !lbStage) return;
        const item = gallery[lbIndex];
        const img = lbStage.querySelector('img') || document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.className = '_SSnzPz';
        if (!img.parentNode) lbStage.appendChild(img);
        if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${gallery.length}`;
        if (lbTitle) lbTitle.textContent = item.alt || 'Photo';
        const prev = document.getElementById('lbPrev');
        const next = document.getElementById('lbNext');
        if (prev) prev.disabled = lbIndex === 0;
        if (next) next.disabled = lbIndex === gallery.length - 1;
    };

    const openLightbox = (index = 0) => {
        lbIndex = Math.max(0, Math.min(index, gallery.length - 1));
        setOpen(lightbox, true);
        lockBody(true);
        renderLightbox();
    };

    const closeLightbox = () => {
        setOpen(lightbox, false);
        if (!tour?.classList.contains(OPEN)) lockBody(false);
    };

    document.getElementById('showAllPhotos')?.addEventListener('click', openTour);
    document.getElementById('tourBack')?.addEventListener('click', closeTour);
    document.querySelectorAll('#heroGrid button').forEach((btn, i) => {
        btn.addEventListener('click', () => openLightbox(i));
    });

    document.querySelectorAll('#tourRooms ._GXrMIo, #tourRooms button').forEach((btn, i) => {
        btn.addEventListener('click', () => openLightbox(i));
    });

    document.querySelectorAll('#tourNav button, #tourNav [data-room]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('aria-label') || btn.textContent || '';
            const map = {
                'Living room 1': 'tour-room-0',
                'Living room 2': 'tour-room-1',
                'Full kitchen': 'tour-room-2',
                Bedroom: 'tour-room-3',
                'Full bathroom': 'tour-room-4',
                Gym: 'tour-room-5',
                Exterior: 'tour-room-6',
                Pool: 'tour-room-7',
                'Additional photos': 'tour-room-8'
            };
            const id = map[name.trim()];
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lbGrid')?.addEventListener('click', () => {
        closeLightbox();
        openTour();
    });
    document.getElementById('lbPrev')?.addEventListener('click', () => {
        if (lbIndex > 0) {
            lbIndex -= 1;
            renderLightbox();
        }
    });
    document.getElementById('lbNext')?.addEventListener('click', () => {
        if (lbIndex < gallery.length - 1) {
            lbIndex += 1;
            renderLightbox();
        }
    });

    document.getElementById('showAmen')?.addEventListener('click', () => {
        setOpen(amenModal, true);
        lockBody(true);
    });
    document.getElementById('amenClose')?.addEventListener('click', () => {
        setOpen(amenModal, false);
        lockBody(false);
    });
    amenModal?.addEventListener('click', (e) => {
        if (e.target === amenModal) {
            setOpen(amenModal, false);
            lockBody(false);
        }
    });

    saveBtn?.addEventListener('click', () => {
        const on = !saveBtn.classList.contains(SAVED);
        saveBtn.classList.toggle(SAVED, on);
        document.getElementById('saveBtn')?.setAttribute('aria-pressed', String(on));
        toast(on ? 'Saved to wishlists' : 'Removed from wishlists');
    });

    shareBtn?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast('Link copied');
        } catch {
            toast('Share this listing');
        }
    });

    descMore?.addEventListener('click', () => {
        const expanded = !descText?.classList.contains(CLAMP);
        descText?.classList.toggle(CLAMP, expanded);
        descMore.textContent = expanded ? 'Show more' : 'Show less';
        if (!expanded) descMore.insertAdjacentHTML('beforeend', '');
        descMore.textContent = descText?.classList.contains(CLAMP) ? 'Show more' : 'Show less';
    });

    document.querySelectorAll('._lQlyVc, #descMore, ._yWwrkC').forEach((btn) => {
        btn.addEventListener('click', () => {
            const wrap = btn.previousElementSibling;
            if (wrap?.classList.contains(CLAMP) || wrap?.classList.contains('_CfRTjD')) {
                wrap.classList.toggle(CLAMP);
                btn.textContent = wrap.classList.contains(CLAMP) ? 'Show more' : 'Show less';
            }
        });
    });

    document.getElementById('simPrev')?.addEventListener('click', () => {
        simTrack?.scrollBy({ left: -simTrack.clientWidth, behavior: 'smooth' });
    });
    document.getElementById('simNext')?.addEventListener('click', () => {
        simTrack?.scrollBy({ left: simTrack.clientWidth, behavior: 'smooth' });
    });

    document.getElementById('reserveBtn')?.addEventListener('click', () => toast("You won't be charged yet"));
    document.querySelectorAll('._NhmiWB').forEach((btn) => {
        btn.addEventListener('click', () => toast("You won't be charged yet"));
    });

    document.querySelectorAll('._Spojam').forEach((btn) => {
        btn.addEventListener('click', () => toast('Offer claimed'));
    });

    document.addEventListener('keydown', (e) => {
        document.body.classList.add('kbd');
        if (e.key === 'Escape') {
            if (lightbox?.classList.contains(OPEN)) closeLightbox();
            else if (amenModal?.classList.contains(OPEN)) {
                setOpen(amenModal, false);
                lockBody(false);
            } else if (tour?.classList.contains(OPEN)) closeTour();
        }
        if (lightbox?.classList.contains(OPEN)) {
            if (e.key === 'ArrowLeft') document.getElementById('lbPrev')?.click();
            if (e.key === 'ArrowRight') document.getElementById('lbNext')?.click();
        }
    });

    return () => window.removeEventListener('scroll', onScroll);
}
