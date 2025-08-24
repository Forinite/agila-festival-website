'use client';
import React from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number; // Added seconds
}

const calculateTimeLeft = (
    startDate: Date,
    endDate: Date
): { timeLeft: TimeLeft; status: 'before' | 'during' | 'after' } => {
    const now = new Date();
    const startDiff = startDate.getTime() - now.getTime();
    const endDiff = endDate.getTime() - now.getTime();

    if (startDiff <= 0 && endDiff > 0) {
        // Event is ongoing
        return {
            timeLeft: {
                days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((endDiff / (1000 * 60)) % 60),
                seconds: Math.floor((endDiff / 1000) % 60), // Added seconds
            },
            status: 'during',
        };
    } else if (endDiff <= 0) {
        // Event has ended
        return { timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }, status: 'after' };
    }

    // Event is upcoming
    return {
        timeLeft: {
            days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((startDiff / (1000 * 60)) % 60),
            seconds: Math.floor((startDiff / 1000) % 60), // Added seconds
        },
        status: 'before',
    };
};

const useCountdown = (
    startYear: number,
    startMonth: number,
    startDay: number,
    endDay: number,
    startHour: number = 0
) => {
    const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [status, setStatus] = React.useState<'before' | 'during' | 'after'>('before');
    const [targetYear, setTargetYear] = React.useState(startYear);

    React.useEffect(() => {
        const updateCountdown = () => {
            const startDate = new Date(targetYear, startMonth - 1, startDay, startHour);
            const endDate = new Date(targetYear, startMonth - 1, endDay, 23, 59, 59);
            const result = calculateTimeLeft(startDate, endDate);

            setTimeLeft(result.timeLeft);
            setStatus(result.status);

            if (result.status === 'after') {
                // Move to next year and reset countdown
                const nextStartDate = new Date(targetYear + 1, startMonth - 1, startDay, startHour);
                const nextEndDate = new Date(targetYear + 1, startMonth - 1, endDay, 23, 59, 59);
                setTargetYear((prev) => prev + 1);
                setTimeLeft(calculateTimeLeft(nextStartDate, nextEndDate).timeLeft);
                setStatus('before');
            }
        };

        updateCountdown(); // Initial call
        const timer = setInterval(updateCountdown, 1000); // Update every second

        return () => clearInterval(timer);
    }, [targetYear, startMonth, startDay, endDay, startHour]);

    return { timeLeft, status, targetYear };
};

const HERO_CONTENT = {
    title: {
        main: 'ECH’IJA',
        highlight: 'CARNIVAL',
    },
    subtitle: 'Celebrating Idoma Unity, Culture & Heritage in the Heart of Nigeria',
};

const CARNIVAL_INFO = {
    date: 'December 27-28, 2025',
    location: 'Otukpo, Benue State',
};

const COUNTDOWN_UNITS = [
    { label: 'Days', getValue: (time: TimeLeft) => time.days.toString().padStart(2, '0') },
    { label: 'Hours', getValue: (time: TimeLeft) => time.hours.toString().padStart(2, '0') },
    { label: 'Minutes', getValue: (time: TimeLeft) => time.minutes.toString().padStart(2, '0') },
    { label: 'Seconds', getValue: (time: TimeLeft) => time.seconds.toString().padStart(2, '0') }, // Added seconds
];

const HeroInfo = () => {
    const { timeLeft, status, targetYear } = useCountdown(2025, 12, 27, 28, 0);

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-white mt-24 md:mt-10">
            <div className="max-w-3xl w-full text-center pt-10 md:pt-16">
                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-4 sm:mb-6 bg-black/[0.4] backdrop-blur-md">
                    {HERO_CONTENT.title.main}{' '}
                    <span className="bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-600 text-transparent bg-clip-text drop-shadow-[0_0_0.25rem_#f472b6]">
            {HERO_CONTENT.title.highlight}
          </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto text-white/80">
                    {HERO_CONTENT.subtitle}
                </p>

                {/* Countdown */}
                <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-10 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,0,120,0.3)] transition duration-300 max-w-xl mx-auto">
                    <p className="text-[0.7rem] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-white/10 to-white/5 py-2 px-4 sm:px-6 rounded-full inline-block mb-5 text-white/80">
                        {status === 'during' ? 'Time Until Event Ends' : 'Next Carnival'}
                    </p>
                    {status === 'during' || status === 'before' ? (
                        <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 flex-wrap text-center">
                            {COUNTDOWN_UNITS.map((unit, index) => (
                                <div key={index} className="group min-w-[60px]">
                                  <span className="text-2xl sm:text-2xl md:text-3xl font-black block mb-2 bg-white/10 rounded-xl py-3 px-4 sm:px-5 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 shadow-inner">
                                    {unit.getValue(timeLeft)}
                                  </span>
                                    <span className="text-xs uppercase tracking-wide font-medium text-white/70">
                                    {unit.label}
                                    </span>
                 </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-base sm:text-lg font-medium text-white/90 mb-3">
                            The Ech&apos;ija Carnival has ended. See you next year!
                        </p>
                    )}
                    <p className="text-xs sm:text-sm mt-6 text-white/90 font-medium bg-black/20 py-2 px-4 rounded-full inline-block backdrop-blur-sm">
                        {status === 'after'
                            ? `December 27-28, ${targetYear + 1}`
                            : `December 27-28, ${targetYear}`}{' '}
                        • {CARNIVAL_INFO.location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroInfo;