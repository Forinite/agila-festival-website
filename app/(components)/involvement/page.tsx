import { Users, Briefcase, Calendar } from 'lucide-react';
import InvolvementCard from "@/app/components/ui/involvementCard";
import ImpactStat from "@/app/components/ui/impactStat";

const involvementData = [
    {
        title: "Volunteer",
        value: "volunteer",
        description: "Join our team of dedicated volunteers and help make the carnival a success. No experience required, just passion for Idoma culture.",
        icon: Users,
        bulletPoints: [
            "Event coordination assistance",
            "Cultural display setup",
            "Visitor guidance and hospitality",
            "Media and documentation"
        ],
        buttonText: "Sign Up to Volunteer"
    },
    {
        title: "Partner/Sponsor",
        value: "partnership",
        description: "Support Idoma cultural preservation while gaining valuable brand exposure to thousands of festival attendees and media coverage.",
        icon: Briefcase,
        bulletPoints: [
            "Brand visibility opportunities",
            "Cultural CSR alignment",
            "Community engagement",
            "Media and digital presence"
        ],
        buttonText: "Partnership Packages"
    },
    {
        title: "Planning Committee",
        value: "other",
        description: "Join the core team that plans and executes the carnival. Ideal for experienced event organizers and passionate community leaders.",
        icon: Calendar,
        bulletPoints: [
            "Strategic event planning",
            "Cultural program development",
            "Community outreach",
            "Year-round involvement"
        ],
        buttonText: "Join Planning Committee"
    }
];

const impactStats = [
    { value: "150+", label: "Active Volunteers" },
    { value: "25,000+", label: "Annual Attendees" },
    { value: "50+", label: "Participating Communities" },
    { value: "12", label: "Years of Celebration" }
];

const InvolvementSection = () => {
    return (
        <section id="involvement" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Get <span className="text-red-500">Involved</span>
                    </h2>
                    <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
                        Join us in celebrating and preserving Idoma culture. Whether as a volunteer, partner, or planning committee member, your contribution makes a difference.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {involvementData.map((data, index) => (
                        <InvolvementCard key={index} {...data} />
                    ))}
                </div>

                <div className="bg-black text-white rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4">Community Impact</h3>
                        <p className="md:text-lg text-base opacity-90">
                            See how your involvement contributes to preserving and promoting Idoma culture
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {impactStats.map((stat, index) => (
                            <ImpactStat key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvolvementSection;
