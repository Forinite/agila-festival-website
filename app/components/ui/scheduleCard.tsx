interface ScheduleCardProps {
    date: string;
    title: string;
    description: string;
    schedule: Array<{
        time: string;
        event: string;
    }>;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ date, title, description, schedule }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="inline-flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                            {date}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {schedule.map((item, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                                {`${item.time} - ${item.event}`}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleCard;