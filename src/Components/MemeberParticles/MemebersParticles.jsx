import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const MemebersParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded", container);
  }, []);

  return (
    <div
      style={{
        position: "fixed", // Use fixed positioning for full screen
        top: 0,
        left: 0,
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        background: "black", // Background color
        backdropFilter: "blur(10px)", // Blur effect
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
        pointerEvents: "none", // Prevents interaction blocking
        zIndex: -1 // Ensures it's behind other content
      }}
    >
      <Particles
        id="tsparticles"
        className="particles-container"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            number: {
              value: 2,
              density: {
                enable: false
              }
            },
            shape: {
              type: "image",
              image: {
                src: "https://i.ibb.co/bQvXqKk/download-removebg-preview.png",
                width: 1,
                height: 1
              }
            },
            size: {
              value: 40
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 10,
              random: true,
              straight: false
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false
              },
              onclick: {
                enable: false
              }
            }
          }
        }}
      />
    </div>
  );
};

export default MemebersParticles;
