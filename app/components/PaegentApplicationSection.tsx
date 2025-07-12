interface InfoCardProps {
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => (
    <div className="text-center">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <p className="text-sm opacity-90">{description}</p>
    </div>
);

const PageantApplicationSection = () => {
    const infoCards = [
        {
            title: "Eligibility",
            description: "Ages 18-26, Idoma heritage, Single, Minimum OND/NCE"
        },
        {
            title: "Prizes",
            description: "Crown, Cash Prize, Car, 1-Year Ambassadorship"
        },
        {
            title: "Application",
            description: "Opens October 2024, Closes November 2024"
        }
    ];

    return (
        <div className="bg-black text-white rounded-3xl p-8 md:p-12">
            <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">
                    Become Face of Idoma 2024
                </h3>
                <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
                    Are you an intelligent, culturally aware young woman ready to represent the beauty and heritage of Idoma people? Applications for Face of Idoma 2024 open soon.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
                    {infoCards.map((card, index) => (
                        <InfoCard
                            key={index}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>

                <button className=" w-fit text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 cursor-pointer">
                    Get Notified <span className={'md:inline hidden'}>When Applications Open</span>
                </button>
            </div>
        </div>
    );
};

export default PageantApplicationSection;