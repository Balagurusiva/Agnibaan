import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import NavBar from './components/NavBar';
import rocketImage from '/rocket-1.8a3f3800.png'; // Make sure to have a rocket image in your project

function App() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const container2Ref = useRef(null);
    const c2HeaderRef = useRef(null);
    const [container2Opacity, setContainer2Opacity] = useState(0);

    const container3Ref = useRef(null);
    const c3HeaderRef = useRef(null);
    const [container3Opacity, setContainer3Opacity] = useState(0);
    
    const rocketRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            if (container2Ref.current && c2HeaderRef.current && rocketRef.current) {
                const c2HeaderTop = c2HeaderRef.current.getBoundingClientRect().bottom -150  ;
                const rocketBottom = rocketRef.current.getBoundingClientRect().bottom ;

                let opacity2 = 0;
                if (c2HeaderTop <= rocketBottom) {
                    opacity2 = Math.min(1, (rocketBottom + c2HeaderTop ) / rocketRef.current.offsetHeight);
                }

                setContainer2Opacity(opacity2);
            }
            if (container3Ref.current && c3HeaderRef.current && rocketRef.current) {
                const c3HeaderTop = c3HeaderRef.current.getBoundingClientRect().bottom  - 100;
                const rocketBottom = rocketRef.current.getBoundingClientRect().top ;

                let opacity3 = 0;
                if (c3HeaderTop <= rocketBottom) {
                    opacity3 = Math.min(1, (rocketBottom + c3HeaderTop ) / rocketRef.current.offsetHeight);
                }

                setContainer3Opacity(opacity3);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const screenHeight = window.innerHeight;
    const rocketCenterPosition = screenHeight / 2;
    const maxLeftPosition = 35;  // This represents the maximum left position as a percentage of the viewport width
    const minLeftPosition = 5;  // This represents the minimum left position as a percentage of the viewport width

    let rocketLeft, rocketHeadOpacity, rocketBodyOpacity, rocketTailOpacity;

    // Rocket moves right until container2Opacity reaches 1
    if (container2Opacity < 1) {
        rocketLeft = minLeftPosition + (scrollPosition / rocketCenterPosition) * (maxLeftPosition - minLeftPosition);
        rocketHeadOpacity = 1; // Full opacity while moving right
        rocketBodyOpacity = Math.max(0.5, 1 - 0.5 * (scrollPosition / rocketCenterPosition)); // Decrease to 0.5 as it moves right
        rocketTailOpacity = Math.max(0.5, 1 - 0.5 * (scrollPosition / rocketCenterPosition)); // Decrease to 0.5 as it moves right
    } else if (container3Opacity < 1) {
        // Stop moving right when container2Opacity is 1 and wait for container3Opacity to reach 1
        rocketLeft = maxLeftPosition;
        rocketHeadOpacity = 1;
        rocketBodyOpacity = 0.5;
        rocketTailOpacity = 0.5;
    } else {
        // Start moving left only after container3Opacity reaches 1
        if (scrollPosition > rocketCenterPosition) {
            rocketLeft = maxLeftPosition - ((scrollPosition - rocketCenterPosition) / rocketCenterPosition) * (maxLeftPosition - minLeftPosition);
            rocketLeft = Math.max(minLeftPosition, rocketLeft); // Ensure it doesn't go beyond the starting point

            // Calculate opacities based on how far the rocket has moved left
            let progress = (scrollPosition - rocketCenterPosition) / rocketCenterPosition;
            rocketHeadOpacity = Math.max(0.5, 1 - 0.5 * progress); // Smooth decrease to 0.5 as it moves left
            rocketBodyOpacity = Math.max(0.5, 0.5 + 0.5 * progress); // Smooth increase to 1 as it moves left
            rocketTailOpacity = 0.5; // Maintain at 0.5 as it moves left
        } else {
            // Maintain position and opacity until scroll passes the center
            rocketLeft = maxLeftPosition;
            rocketHeadOpacity = 1;
            rocketBodyOpacity = 0.5;
            rocketTailOpacity = 0.5;
        }
    }

    // Constrain rocketLeft to ensure only 50% of the rocket can go out of the viewport
    rocketLeft = Math.max(0, Math.min(100, rocketLeft));

    const opacity = Math.max(1 - scrollPosition / 20, 0);


    let zoomSpeed = 1500;
    let max_scale = 1.4777777913411458;
    let min_scale = 1 + scrollPosition / zoomSpeed;

    let scale = min_scale < max_scale ? min_scale : max_scale;
    console.log(scale)

    return (
        <div>
            <NavBar />
            <div className="container-1 relative flex flex-col justify-between h-[100vh]">
                <div className='hero-text fixed flex items-center justify-center flex-col xl:px-[215px] text-center  mt-16' style={{ opacity: opacity }}>
                    <p className='font-poppins font-semibold text-[#5b5b5b] text-[18px] tracking-[12px]'>A CONFIGURABLE DESIGN</p>
                    <p className='font-poppins text-[rgba(33,56,66,.6)] text-[12px]'>Agnibaan is a customizable vehicle. When we were at the drawing board, we carefully analyzed what our customers really needed. We then engineered enough flexibility into the vehicle
                        while carefully designing to ensure reliability. Removing a few engines and flying is more involved than it sounds. We had to ensure vehicle controllability,
                        stability, lift off thrust-to-weight ratio (&amp; many other parameters) made sense for
                        each of these versions.<br /><span className='italic font-'>("Agnibaan" is a Sanksrit word that translates to mean "an arrow of fire".)</span>
                    </p>
                </div>

                <div className="rocket fixed top-[50%] h-[117px] w-[80%] object-contain flex justify-center items-center" ref={rocketRef} style={{ left: `${rocketLeft}%`, transform: `scale(${scale})` }}>
                    <img src="public/rocket-1.8a3f3800.png" alt="Rocket Head" className='h-[117px] w-[23%]' style={{ marginLeft: '0px', opacity: rocketHeadOpacity }} />
                    <img src="public/rocket-2.98105b45.png" alt="Rocket Body" className='h-[117px] w-[33%]' style={{ marginLeft: '-4.6%', opacity: rocketBodyOpacity }} />
                    <img src="public/rocket-3.0a209845.png" alt="Rocket Tail" className='h-[117px] w-[43%]' style={{ marginLeft: '-10%', opacity: rocketTailOpacity }} />
                </div>

                <div className='specificaton fixed bottom-[10%] w-[80%] mx-[10%] items-center flex justify-around' style={{ opacity: opacity }}>
                    <div>
                        <img src="/payload.png" alt="payload" />
                        <p className='specification-name'>MAX PAYLOAD</p>
                        <p className='specification'>100Kg to 700 Km LEO</p>
                    </div>

                    <div>
                        <img src="/height.png" alt="height" />
                        <p className='specification-name'>HEIGHT</p>
                        <p className='specification'>18m</p>
                    </div>

                    <div>
                        <img src="/diameter.png" alt="diameter" />
                        <p className='specification-name'>DIAMETER</p>
                        <p className='specification'>1.3m</p>
                    </div>

                    <div>
                        <img src="/mass.png" alt="mass" />
                        <p className='specification-name'>MASS</p>
                        <p className='specification'>1400Kg</p>
                    </div>
                </div>
            </div>

             <div className="container-2 flex flex-col justify-around items-center  h-[80vh]" ref={container2Ref} style={{ opacity: container2Opacity }}>
                <div className="c2-header flex flex-row justify-between w-[90%]  " ref={c2HeaderRef}>
                    <div>
                        <p className='font-poppins text-[24px] font-[900] leading-[1.17] tracking-[2px] text-[#4d8c52] mb-[2%]'>03</p>
                        <p className='font-poppins font-semibold text-[20px] tracking-[6px] text-[#5b5b5b]'>BABY STAGE</p>
                    </div>

                    <div>
                        <p className='font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>An optional baby stage sits inside the payload fairing with an envelope large enough for almost all small satellite needs.</p>
                    </div>
                </div>


                <div className='specificaton  w-[80%]  mb-[-100px]  flex items-center justify-around' ref={c2HeaderRef}>
                    <div>
                        <img src="/s3payload.png" alt="payload" />
                        <p className='specification-name'>PAYLOAD ENVELOPE</p>
                        <p className='specification font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>2  m X 1.5 m envelope with the ability to take one or many satellite</p>
                    </div>

                    <div>
                        <img src="/kg.png" alt="height" />
                        <p className='specification-name'>1 - 100kg</p>
                        <p className='specification font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>Flat costing for any payload between 25 - 100kg</p>
                    </div>

                    <div>
                        <img src="/guide.png" alt="diameter" />
                        <p className='specification-name uppercase'>Payload Guide</p>
                        <p className='specification font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>For more information please request our payload guide.( payloadpeople@agnikul.in)</p>
                    </div>


                </div>
            </div> 


            <div className="container-3 flex flex-col justify-around items-center h-[100vh]" ref={container3Ref} style={{ opacity: container3Opacity }}>
                <div className="c2-header flex flex-row justify-between w-[90%]  " ref={c3HeaderRef}>
                    <div>
                        <p className='font-poppins text-[24px] font-[900] leading-[1.17] tracking-[2px] text-[#4d8c52] mb-[2%]'>04</p>
                        <p className='font-poppins font-semibold text-[20px] tracking-[6px] text-[#5b5b5b]'>BABY STAGE</p>
                    </div>

                    <div>
                        <p className='font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>An optional baby stage sits inside the payload fairing with an envelope large enough for almost all small satellite needs.</p>
                    </div>
                </div>


                <div className='specificaton  w-[80%]    flex items-center justify-around'>
                    <div>
                        <img src="/s3payload.png" alt="payload" />
                        <p className='specification-name'>PAYLOAD ENVELOPE</p>
                        <p className='specification font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>2  m X 1.5 m envelope with the ability to take one or many satellite</p>
                    </div>

                    <div>
                        <img src="/kg.png" alt="height" />
                        <p className='specification-name'>1 - 100kg</p>
                        <p className='specification font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>Flat costing for any payload between 25 - 100kg</p>
                    </div>

                    <div>
                        <img src="/guide.png" alt="diameter" />
                        <p className='specification-name uppercase'>Payload Guide</p>
                        <p className='specification font-poppins text-[16px] font-[300] leading-[1.4]  text-[rgba(33,56,66,.6)] text-justify'>For more information please request our payload guide.( payloadpeople@agnikul.in)</p>
                    </div>


                </div>
            </div>
 

            
        </div >
    );
}

export default App;

