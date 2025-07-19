import { Pencil } from  'lucide-react'

interface ScheduleCardProps {
    date: string;
    title: string;
    description: string;
    schedule: Array<{
        time: string;
        event: string;
    }>;
    onEdit: any;
    item: ScheduleCardProps;
}

const AdminScheduleCard: React.FC<ScheduleCardProps> = ({ item ,date, title, description, schedule , onEdit}) => {

    return (
        <div className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                    <div className="space-x-4 mb-4">
                        <div className="inline-flex w-full justify-center items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-sm">
                            {date}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 py-2">{title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <div className="flex flex-col gap-2">
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
            <div onClick={onEdit} className="absolute top-2 left-2 hover:scale-110 hover:text-blue-700 w-6 h-6 text-blue-500">
                <Pencil />
            </div>
        </div>
    );
};

export default AdminScheduleCard;