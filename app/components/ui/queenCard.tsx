// components/QueenCard.tsx
import Image from 'next/image';

interface QueenCardProps {
    name: string;
    year: string;
    role: string;
    imageUrl: string;
}

const QueenCard: React.FC<QueenCardProps> = ({ name, year, role, imageUrl }) => {
    return (
        <div className="text-center group hover:shadow-xl hover:scale-105 transition-all duration-500">
            <Image
                src={imageUrl}
                alt={`Face of Idoma ${year}`}
                width={400}
                height={320}
                className="rounded-xl shadow-lg w-full h-80 object-cover group-hover:shadow-xl transition-shadow"
            />
            <h4 className="font-bold text-lg text-gray-900 mt-4">{name}</h4>
            <p className="text-red-500 font-medium">Face of Idoma {year}</p>
            <p className="text-gray-600 text-sm mt-2">{role}</p>
        </div>
    );
};

export default QueenCard;
