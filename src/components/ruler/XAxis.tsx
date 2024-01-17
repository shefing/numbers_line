interface IProps {
  labels: number[];
}
const XAxis = ({ labels }: IProps) => {
  return (
    <>
      <div className="flex justify-between border-t-2 border-gray-900 pt-0 mx-0 pl-8 pr-8">
        {labels.map((label) => (
          <div key={label} className={`text-xl text-color flex flex-col items-center ${label % 5 == 0 && "font-bold"}`}>
            <div className="h-3 border-l-2 border-gray-900 w-px" />
            {label}
          </div>
        ))}
      </div>
    </>
  );
};

export default XAxis;
// import { useState, useRef, useEffect } from "react";

// interface IProps {
//   labels: number[];
// }

// const XAxis = ({ labels }: IProps) => {
//   const [startIndex, setStartIndex] = useState(0);
//   const containerRef = useRef(null);

//   // useEffect(() => {
//   //   const handleWheel = (event) => {
//   //     const step = 1;
//   //     if (event.deltaY < 0) {
//   //       // Scrolling up
//   //       setStartIndex(Math.max(0, startIndex - step));
//   //     } else if (event.deltaY > 0) {
//   //       // Scrolling down
//   //       setStartIndex(Math.min(labels.length - 21, startIndex + step));
//   //     }
//   //   };

//   //   const containerElement = containerRef.current;
//   //   if (containerElement) {
//   //     containerElement.addEventListener("wheel", handleWheel);

//   //     return () => {
//   //       containerElement.removeEventListener("wheel", handleWheel);
//   //     };
//   //   }
//   // }, [startIndex, labels]);

//   const handleArrowClick = (direction: "left" | "right") => {
//     const step = 1;
//     if (direction === "left") {
//       setStartIndex(Math.max(0, startIndex - step));
//     } else {
//       setStartIndex(Math.min(labels.length - 21, startIndex + step));
//     }
//   };

//   return (
//     <div className="flex flex-col bottom-0 left-0 right-0 ">
//       <div className="flex justify-between">
//         {startIndex > 0 && (
//           <div className="right-0 mr-2 cursor-pointer" onClick={() => handleArrowClick("left")}>
//             &lt; {/* Left arrow */}
//             rachel
//           </div>
//         )}
//         {startIndex < labels.length - 21 && (
//           <div className="text-xl ml-2 cursor-pointer" onClick={() => handleArrowClick("right")}>
//             &gt; {/* Right arrow */}
//           </div>
//         )}
//       </div>
//       <div ref={containerRef} className="fixed bottom-20 left-0 right-0 flex justify-between border-t-2 border-gray-900 pt-0 mx-0 items-center">
//         <div className={`lex-none w-1/${labels.length == 11 ? "20" : "40"}`}></div>
//         {labels.slice(startIndex, startIndex + 21).map((label) => (
//           <div key={label} className={`text-xl text-color flex flex-col items-center ${label % 5 === 0 && "font-bold"}`}>
//             <div className="h-3 border-l-2 border-gray-900 w-px" />
//             {label}
//           </div>
//         ))}
//         <div className={`lex-none w-1/${labels.length == 11 ? "20" : "40"}`}></div>
//       </div>
//     </div>
//   );
// };

// export default XAxis;
