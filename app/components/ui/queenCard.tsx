// components/QueenCard.tsx

interface QueenCardProps {
    name: string;
    year: number;
    role: string;
    imageUrl: string;
}

const QueenCard: React.FC<QueenCardProps> = ({ name, year, role, imageUrl }) => {
    return (
        <div className="text-center group hover:shadow-xl hover:scale-105 transition-all duration-500">
            <img
                src={imageUrl}
                alt={`Leader ${year}`}
                className="rounded-[12px] shadow-lg w-[120px] aspect-square object-cover group-hover:shadow-xl transition-shadow mx-auto"
            />
            <div className="w-full p-4 group shadow hover:shadow-2xl ">
                <h4 className="font-bold text-lg text-gray-900 mt-4 bg-white mx-auto w-fit px-2 py-1 shadow hover:shadow-2xl shadow-b-0">{name}</h4>
                <p className="text-red-500 font-medium  bg-white mx-auto w-fit px-2 py-1 shadow hover:shadow-2xl">Reign {year} - {year + 1}</p>
            </div>
            {/*<p className="text-gray-600 text-sm mt-2">{role}</p>*/}
        </div>
    );
};

export default QueenCard;
