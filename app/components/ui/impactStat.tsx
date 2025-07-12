interface ImpactStatProps {
    value: string;
    label: string;
}

const ImpactStat: React.FC<ImpactStatProps> = ({ value, label }) => (
    <div>
        <div className="md:text-4xl text-2xl font-black text-red-500 mb-2">{value}</div>
        <div className="text-sm opacity-90">{label}</div>
    </div>
);

export default ImpactStat;