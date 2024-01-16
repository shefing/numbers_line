const Axis = ({ labels }) => {
    return (
        <div className="flex justify-between border-t-2 border-gray-200 pt-0 mx-4">
            {labels.map((label, index) => (
                <div key={index} className="text-sm text-gray-500 flex flex-col items-center">
                    <div className="h-2 border-l-2 border-gray-200 w-px"></div>
                    {label}
                </div>
            ))}
        </div>
    );
};

export default Axis;
