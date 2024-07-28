import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const BodyParticle = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded", container);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Particles
        id="tsparticles"
        className="particles-container"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: false,
              },
            },
            shape: {
              type: "image",
              options: {
                image: [
                  {
                    src: "https://i.ibb.co/7R0qsg5/channels4-profile-1.jpg",
                    width: 100,
                    height: 100,
                  },
                  {
                    src: "https://i.ibb.co/C8DtVGG/channels4-profile.jpg",
                    width: 100,
                    height: 100,
                  },
                  {
                    src: "https://i.ibb.co/mGD6dZG/pngtree-sticker-halloween-cute-ghost-png-image-9236596.png",
                    width: 100,
                    height: 100,
                  },
                ],
              },
            },
            size: {
              value: 30,
              random: true,
              anim: {
                enable: true,
                speed: 10,
                size_min: 10,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
            },
            opacity: {
              value: 0.8,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.5,
                sync: false,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BodyParticle;
