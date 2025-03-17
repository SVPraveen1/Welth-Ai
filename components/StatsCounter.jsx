import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function StatsCounter({ value, suffix = '', prefix = '' }) {
    const [hasAnimated, setHasAnimated] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return (
        <span ref={ref}>
            {hasAnimated ? (
                <CountUp
                    start={0}
                    end={value}
                    duration={2}
                    separator=","
                    prefix={prefix}
                    suffix={suffix}
                />
            ) : (
                prefix + '0' + suffix
            )}
        </span>
    );
}
