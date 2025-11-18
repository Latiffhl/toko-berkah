import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// --- UTILITY FUNCTIONS ---

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
} as const;

// Mengubah number menjadi string CSS (misal: 100 -> '100px')
const toCssLength = (value?: number | string): string | undefined => (typeof value === 'number' ? `${value}px` : value ?? undefined);

// Menggabungkan classNames (utility mirip clsx/tailwind-merge)
const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

// --- TYPES ---

export interface RunningTextMarqueeProps {
  /** Array of promotion strings to display in the marquee. */
  promos: string[];
  /** Animation speed in pixels per second. Default is 60. */
  speed?: number;
  /** Direction of the animation. Default is 'left'. */
  direction?: 'left' | 'right' | 'up' | 'down';
  /** Width of the marquee container. Default is '100%'. */
  width?: number | string;
  /** Height of each text item. Default is 32. */
  itemHeight?: number;
  /** Gap between each text item. Default is 48. */
  gap?: number;
  /** Pauses the animation when hovered. Default is true. */
  pauseOnHover?: boolean;
  /** Speed when hovered (only active if pauseOnHover is false or undefined). */
  hoverSpeed?: number;
  /** Aria label for accessibility. */
  ariaLabel?: string;
  /** Custom Tailwind CSS class names. */
  className?: string;
  /** Custom inline styles. */
  style?: React.CSSProperties;
}

// --- UTILITY HOOKS (WITH DEPENDENCY FIXES) ---

// Mengamati perubahan ukuran container
const useResizeObserver = (callback: () => void, elements: Array<React.RefObject<Element | null>>, dependencies: React.DependencyList) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      // ResizeObserver callback sudah terbungkus dalam useCallback di komponen utama
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [callback, ...dependencies]); // FIX: Tambahkan 'callback' ke dependency array
};

// Hook Pemuat Gambar (Dibiarkan untuk kesamaan struktur, tapi tidak relevan untuk teks)
const useImageLoader = (seqRef: React.RefObject<HTMLUListElement | null>, onLoad: () => void, dependencies: React.DependencyList) => {
  useEffect(() => {
    // Logic pemuatan gambar dihilangkan/disederhanakan karena hanya berisi teks
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    // ... (logic pemuatan gambar asli) ...

    return () => {
      // ... (cleanup pemuatan gambar asli) ...
    };
  }, [onLoad, ...dependencies]); // FIX: Tambahkan 'onLoad' ke dependency array
};

// Loop Animasi menggunakan requestAnimationFrame
const useAnimationLoop = (trackRef: React.RefObject<HTMLDivElement | null>, targetVelocity: number, seqWidth: number, seqHeight: number, isHovered: boolean, hoverSpeed: number | undefined, isVertical: boolean) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    if (prefersReduced) {
      track.style.transform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]); // FIX: Tambahkan 'trackRef'
};

// --- MARQUEE COMPONENT ---

export const RunningTextMarquee = React.memo<RunningTextMarqueeProps>(
  ({ promos, speed = 60, direction = 'left', width = '100%', itemHeight = 32, gap = 48, pauseOnHover = true, hoverSpeed, ariaLabel = 'Teks Promosi Toko Berkah Jaya', className, style }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null); // Ref ke ul pertama

    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [seqHeight, setSeqHeight] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier: number;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    // Menggunakan useCallback untuk menghindari warning dependency di useResizeObserver
    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;

      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          // Set tinggi container jika mode vertikal
          if (containerRef.current.style.height !== `${targetHeight}px`) containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]); // Dependency array ok

    // Memperbaiki dependency array
    useResizeObserver(updateDimensions, [containerRef, seqRef], [promos, gap, itemHeight, isVertical]);
    useImageLoader(seqRef, updateDimensions, [promos, gap, itemHeight, isVertical]);
    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

    const cssVariables = useMemo(
      () =>
        ({
          '--marquee-gap': `${gap}px`,
          '--marquee-itemHeight': `${itemHeight}px`,
        } as React.CSSProperties),
      [gap, itemHeight]
    );

    const rootClasses = useMemo(
      () => cx('relative group font-semibold text-lg whitespace-nowrap', isVertical ? 'overflow-hidden h-full inline-block' : 'overflow-x-hidden', '[--marquee-gap:48px]', '[--marquee-itemHeight:32px]', className),
      [isVertical, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    // LOGIC RENDERING ITEM TEKS BARU
    const renderPromoItem = useCallback(
      (promoText: string, key: React.Key) => {
        return (
          <li className={cx('flex-none flex items-center justify-center h-[var(--marquee-itemHeight)]', isVertical ? 'mb-[var(--marquee-gap)]' : 'mr-[var(--marquee-gap)]')} key={key} role="listitem">
            {promoText}
            {/* Pemisah visual */}
            <span className="mx-4 text-primary">|</span>
          </li>
        );
      },
      [isVertical]
    );

    const promoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul className={cx('flex items-center', isVertical && 'flex-col')} key={`copy-${copyIndex}`} role="list" aria-hidden={copyIndex > 0} ref={copyIndex === 0 ? seqRef : undefined}>
            {promos.map((promoText, itemIndex) => renderPromoItem(promoText, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, promos, renderPromoItem, isVertical]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div ref={containerRef} className={rootClasses} style={containerStyle} role="region" aria-label={ariaLabel}>
        <div
          className={cx('flex will-change-transform select-none relative z-0', 'motion-reduce:transform-none', isVertical ? 'flex-col h-max w-full' : 'flex-row w-max')}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {promoLists}
        </div>
      </div>
    );
  }
);

RunningTextMarquee.displayName = 'RunningTextMarquee';

export default RunningTextMarquee;
