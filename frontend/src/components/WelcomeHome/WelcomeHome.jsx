import React from "react";
import { motion } from "framer-motion";
import bookOpenWhite from "../../assets/bookOpenWhite.jpg";



const WelcomeHome = () => {
  return (
    <div className=" flex flex-col p-2 items-center justify-center">
       <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
          <h1 className=" p-8 font-semibold text-3xl flex justify-center items-center">
            Bienvenue sur Deadline Drive, votre alliè pour rester motivè !
          </h1>
      </motion.div>
      <article className="flex flex-row flex-wrap p-4 m-2 ">
       

        <motion.div 
        className=" space-y-4 ml-6 flex-1 basis-80  text-1xl text-grey-600"
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Slide in to the final position
        transition={{ duration: 1 }} // Add delay for staggered effect
        >
          <div className="bg-cover bg-center h-[60vh] rounded-[45px] max-[800px]" style={{ backgroundImage: `url(${bookOpenWhite})` }}>
            <div className="flex items-center h-full bg-opacity-50">
              <p className="text-custom-black text-xl font-bold m-8 text-center ">
              Ici vous pouvez définir vos deadlines personnelles, accéder à de nombreuses citations inspirantes et participer à la vie de la communauté.     
              <br />     
                Pour commencer à utiliser nos fonctionnalités, inscrivez vous sur notre plateforme !                
              </p>
            </div>
        </div>

     
       
          
        </motion.div>
      </article>

      
    </div>
  );
};

export default WelcomeHome;