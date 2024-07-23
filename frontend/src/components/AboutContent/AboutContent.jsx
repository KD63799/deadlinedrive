import React from "react"; // Import React to create the component
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import amirProfil from "../../assets/amirProfil.svg"; // Import profile images
import calliProfil from "../../assets/calliProfil.svg";
import jeromeProfil from "../../assets/jeromeProfil.svg";
import faysoilProfil from "../../assets/faysoilProfil.svg";
import history from "../../assets/OurHistory.webp";
import Faq from "@components/Faq/Faq"; // Import the FAQ component
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'; // Import the ScrollToTopButton component

const AboutContent = () => {
  // Define team members data
  const teamMembers = [
    {
      id: 1,
      name: "NINACH Amir",
      role: "Développeur Web Jr.",
      image: amirProfil,
      linkedin: "https://www.linkedin.com/in/amir-ninach-a63ab82a4/",
    },
    {
      id: 2,
      name: "PETER Calli",
      role: "Développeur Web Jr.",
      image: calliProfil,
      linkedin: "https://www.linkedin.com/in/calli-peter-23b079218/",
    },
    {
      id: 3,
      name: "GAVINO Jèrôme",
      role: "Développeur Web Jr.",
      image: jeromeProfil,
      linkedin: "https://www.linkedin.com/in/jérôme-gavino-284a02b8/",
    },
    {
      id: 4,
      name: "CHAAMBANI Faysoil",
      role: "Développeur Web Jr.",
      image: faysoilProfil,
      linkedin: "https://www.linkedin.com/in/faysoil-chaambani-2829b221b/",
    },
  ];

  return (
    <div className="md:min-h-[87vh] mx-auto px-4 sm:px-6 lg:px-8"> {/* Main container with minimum height, centered content */}
      <div className="max-w-6xl mx-auto">
        <section className="my-8 px-2 py-8">
          <div>
          <h1 className="text-4xl text-caramel font-bold text-center mb-4">
            L'Histoire de DeadlineDrive
          </h1>
          </div>
          <div className="flex flex-wrap gap-8 md:items-center">
            <div className="flex-1 basis-80">
              <img
                className="w-full rounded-xl"
                src={history}
                alt="Notre Histoire"
              />
            </div>
            <motion.p
              className="flex-1 basis-80 text-1xl text-grey-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Imaginez quatre étudiants en développement web, entourés de
              livres, de café et de code, se battant contre la procrastination
              comme des chevaliers en quête de motivation. Un jour, alors qu'ils
              étaient sur le point de succomber à la tentation de procrastiner,
              l'un d'eux s'écria : "Pourquoi ne pas créer notre propre antidote
              à la procrastination ?". Et ainsi naquit l'idée de
              <strong className="text-caramel font-bold"> DeadlineDrive </strong>-
              un projet né de leur désir de transformer leur lutte contre la
              procrastination en une aventure motivante et amusante pour tous.
              Avec beaucoup de café et de détermination, ils ont conçu une
              plateforme pour aider les autres à rester motivés, à atteindre
              leurs objectifs et à célébrer chaque petite victoire comme s'ils
              étaient en train de conquérir le Saint Graal du succès. Et voilà
              comment ces quatre étudiants ont transformé leur combat contre la
              procrastination en une quête épique pour la motivation.
            </motion.p>
          </div>
        </section>
        <section className="my-8 px-2 py-8">
          <h2 className="text-4xl text-caramel font-bold text-center mb-2">
            Nos Catègories
          </h2>
          <h3 className="text-2xl text-custom-black font-bold text-center mb-4">
            Auteur, Manga, Sèrie, Film, Animè, Histoire, Poèsie, Personnalitès
            ou encore Sport
          </h3>
          <p className="text-1xl text-grey-600">
            Découvrez l'inspiration à travers une multitude de perspectives avec
            notre fonctionnalité de citations provenant de différentes
            catégories. Que vous soyez passionné par les grands écrivains, les
            mondes fantastiques des mangas et des animés, les intrigues
            captivantes des séries et des films, les leçons de vie tirées de
            l'histoire, les vers envoûtants de la poésie, les enseignements des
            personnalités influentes ou les exploits inspirants du monde du
            sport, vous trouverez une source d'inspiration adaptée à vos goûts
            et à vos intérêts pour nourrir votre esprit et stimuler votre
            motivation chaque jour. Si vous ne trouvez pas votre inspiration, 
            <Link to="/customize-quotes" className="text-blue-500">
             &nbsp;créez votre citation ici
            </Link>
            .
          </p>
        </section>
        <section className="my-8 px-2 py-8">
          <h2 className="text-4xl text-caramel font-bold text-center mb-8">
            Notre Èquipe
          </h2>
          <div className="flex justify-center items-center flex-wrap">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="max-w-xs w-full sm:max-w-[200px] sm:h-[260px] min-h-[140px] bg-white rounded-lg shadow-md p-4 flex flex-col items-center m-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <img
                  src={member.image}
                  alt="Profile"
                  className="rounded-full w-20 h-20 sm:w-24 sm:h-24 mb-2"
                />
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold">
                    {member.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {member.role}
                  </p>
                </div>
                <div className="mt-auto">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="text-blue-600 hover:text-blue-800"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.2c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.2h-3v-5.5c0-1.38-.45-2.33-1.57-2.33-.86 0-1.37.58-1.6 1.14-.08.2-.1.48-.1.76v6h-3s.04-10 0-11h3v1.56c.4-.62 1.1-1.5 2.68-1.5 1.95 0 3.42 1.28 3.42 4.04v6.9z" />
                      </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <Faq /> {/* FAQ component */}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default AboutContent; // Export AboutContent component for use in other parts of the application
