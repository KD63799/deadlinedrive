import { useState, useEffect } from "react";
import anime from "animejs/lib/anime.es.js"; // Importing animejs for animations
import Formik from "@components/Contact/Formik"; // Importing Formik component

function Contact() {
  const [animation, setAnimation] = useState(null); // State to hold animation instance

  // Function to handle fade animation using animejs
  const handleAnimation = () => {
    const anim = anime({
      targets: ".fade-animation",
      opacity: [0, 1],
      duration: 2000,
      easing: "easeInOutQuad",
      autoplay: true,
      translateY: 30, // Translate animation in Y direction
    });
    setAnimation(anim);
  };

  // Function to handle reappearance animation for ServiceCard
  const handleReappearanceAnimation = () => {
    anime({
      targets: ".appear-animation",
      translateX: ["100%", "0%"],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutQuad", // Easing function for smooth animation
    });
  };

  // Function to handle reappearance animation for Y direction
  const handleReappearanceAnimationY = () => {
    anime({
      targets: ".appear-animationY",
      translateY: ["100%", "0%"],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutQuad", // Easing function for smooth animation
    });
  };

  // Function to reverse the animation
  const reverseAnimation = () => {
      handleReappearanceAnimation(); 
      handleReappearanceAnimationY();
  };

  // Effect hook to handle initial animation setup
  useEffect(() => {
    try {
      handleAnimation();
      reverseAnimation();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // JSX structure for the Contact component
  return (
    <>
      <section className="relative overflow-hidden py-20 dark:bg-dark lg:py-[120px] text-black p-12 max-lg:flex max-lg:justify-center">
        <div className="container">
          <div className="-mx-4 flex flex-wrap lg:justify-center">
            {/* Left Column with Contact Information */}
            <div className="bg-slate-50 pt-10 rounded-2xl w-full px-4 lg:w-1/2 xl:w-6/12 md:justify-center md:flex">
              <div className="mb-12 max-w-[570px] lg:mb-0 appear-animation">
                <h2 className="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  Contactez-nous
                </h2>
                {/* Address Section */}
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Adresse
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      30 rue de la citation 13100 Aix-en-Provence
                    </p>
                  </div>
                </div>
                {/* Email Section */}
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Adresse Email
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      DeadlineDrive@mail.com
                    </p>
                  </div>
                </div>
                {/* Phone Section */}
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">
                      Tèlèphone
                    </h4>
                    <p className="text-base text-body-color dark:text-dark-6">
                      +00 00 00 00 0
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column with Contact Form */}
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12 ">
              <div className="relative rounded-lg bg-white p-8 dark:bg-dark-2 sm:p-12 appear-animationY">
                <Formik /> {/* Rendering Formik component for contact form */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact; // Exporting the Contact component
