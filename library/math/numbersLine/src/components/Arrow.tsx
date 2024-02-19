const Arrow = () => {
  return (
    // <svg>
    //   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 128 49" fill="none">
    //     <path d="M0 24.5C42 24.5 86 0 128 0" stroke="#009FDE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10" />
    //   </svg>
    //   <svg style={{ overflow: "visible", color: "#009FDE" }} x="100%" y="0">
    //     <polygon points="-20,0 0,10 -20,20" classNameName="bg-[#009FDE] light-fill" stroke="#009FDE" />
    //   </svg>
    // </svg>
    <div className="container-fluid d-flex align-items-center">
      <div className="flex-fill">
        <svg>
          <line
            x1="0%"
            y1="95%"
            x2="100%"
            y2="95%"
            stroke-width="5"
            className="light-stroke"
            stroke-linecap="round"
            stroke="#009FDE"
            stroke-dasharray="15 15"
          />

          <svg style={{ overflow: "visible" }} x="100%" y="88%" stroke="#009FDE">
            <polygon points="-20,0 0,10 -20,20" />
          </svg>
        </svg>
      </div>
    </div>
  );
};

export default Arrow;
