'use client';
import React from 'react';

const calculateTimeLeft = (endDate: Date): { days: number; hours: number; minutes: number } => {
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();

    if (difference < 0) {
        return { days: 0, hours: 0, minutes: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60)
    };
};

const useCountdown = (endYear: number, endMonth: number, endDay: number, endHour: number = 0) => {
    const [timeLeft, setTimeLeft] = React.useState(() =>
        calculateTimeLeft(new Date(endYear, endMonth - 1, endDay, endHour))
    );

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(new Date(endYear, endMonth - 1, endDay, endHour)));
        }, 60000);

        return () => clearInterval(timer);
    }, [endYear, endMonth, endDay, endHour]);

    return timeLeft;
};

const HERO_CONTENT = {
    title: {
        main: 'AGILA',
        highlight: 'CARNIVAL'
    },
    subtitle: 'Celebrating Idoma Unity, Culture & Heritage in the Heart of Nigeria'
};

const CARNIVAL_INFO = {
    date: 'December 23-28, 2025',
    location: 'Otukpo, Benue State'
};

const COUNTDOWN_UNITS = [
    { label: 'Days', getValue: (time: { days: number }) => time.days },
    { label: 'Hours', getValue: (time: { hours: number }) => time.hours },
    { label: 'Minutes', getValue: (time: { minutes: number }) => time.minutes }
];

const ACTION_BUTTONS = [
    {
        label: 'Explore Gallery',
        link: '#media',
        className: 'bg-background border-2 text-white hover:bg-white hover:text-black'
    },
    {
        label: 'View Schedule',
        link: '#schedule',
        className: 'bg-background border-2 text-white hover:bg-white hover:text-black'
    }
];

const HeroInfo = () => {
    const timeLeft = useCountdown(2025, 12, 23, 9);

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-white mt-24 md:mt-10 ">
            <div className="max-w-3xl w-full text-center py-10 md:py-16">

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
                        Next Carnival
                    </p>
                    <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 flex-wrap text-center">
                        {COUNTDOWN_UNITS.map((unit, index) => (
                            <div key={index} className="group min-w-[60px]">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-black block mb-2 bg-white/10 rounded-xl py-3 px-4 sm:px-5 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 shadow-inner">
                                    {unit.getValue(timeLeft)}
                                </span>
                                <span className="text-xs uppercase tracking-wide font-medium text-white/70">
                                    {unit.label}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs sm:text-sm mt-6 text-white/90 font-medium bg-black/20 py-2 px-4 rounded-full inline-block backdrop-blur-sm">
                        {CARNIVAL_INFO.date} • {CARNIVAL_INFO.location}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    {ACTION_BUTTONS.map((button, index) => (
                        <a href={button.link}
                            key={index}
                            className={`block w-full sm:w-auto px-6 py-3 text-sm font-bold tracking-wider uppercase rounded-full border border-pink-500 bg-black/70 text-white hover:bg-pink-500 hover:text-black transition duration-300 cursor-pointer ${button.className}`}
                        >
                            {button.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroInfo;
