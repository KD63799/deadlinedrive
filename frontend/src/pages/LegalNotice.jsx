import React from "react";
import { Link } from "react-router-dom";

export default function LegalNotice() {
  return (
    <div className="container mx-auto p-5">
      {/* Main title */}
      <h1 className="text-3xl font-bold mb-5">Mentions Lègales</h1>

      {/* Section for site editor information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">1. èditeur du site</h2>
        <p className="mt-2">
          Nom de la société : Deadline Drive Inc. <br />
          Adresse : 33 Avenue Victor Hugo 13100 Aix-en-Provence <br />
          Téléphone : +00 00 00 00 00<br />
          Email : DeadlineDrive@mail.com <br />
          Directeur de la publication : Amir NINACH
        </p>
      </section>

      {/* Section for site hosting information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">2. Hèbergement du site</h2>
        <p className="mt-2">
        Nom de l'hébergeur : Render<br />
        Adresse de l'hébergeur : 525 Brannan St Suite 300, San Francisco, CA 94107, United States<br />
        </p>
      </section>

      {/* Section for intellectual property information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">3. Propriètè intellectuelle</h2>
        <p className="mt-2">
          Le contenu du site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est la propriété de Deadline Drive Inc. ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Deadline Drive Inc..
        </p>
      </section>

      {/* Section for limitation of liability information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">4. Limitation de responsabilité</h2>
        <p className="mt-2">
          Deadline Drive Inc. ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
        </p>
        <p className="mt-2">
          Deadline Drive Inc. ne pourra également être tenue responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance) consécutifs à l'utilisation du site.
        </p>
      </section>

      {/* Section for personal data management information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">5. Gestion des données personnelles</h2>
        <p className="mt-2">
          L'utilisateur est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la confiance dans l'Économie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).
        </p>
        <p className="mt-2">
        Pour plus d'informations, veuillez consulter notre <Link to="/privacy-policy" className="text-blue-600 hover:underline">politique de confidentialité</Link>.
        </p>
      </section>

      {/* Section for hyperlinks and cookies information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">6. Liens hypertextes et cookies</h2>
        <p className="mt-2">
          Le site Deadline Drive contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation de Deadline Drive Inc.. Cependant, Deadline Drive Inc. n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.
        </p>
        <p className="mt-2">
          La navigation sur le site Deadline Drive est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation d’un ordinateur sur un site. Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre diverses mesures de fréquentation.
        </p>
      </section>

      {/* Section for applicable law and jurisdiction information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">7. Droit applicable et attribution de juridiction</h2>
        <p className="mt-2">
          Tout litige en relation avec l’utilisation du site Deadline Drive est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Aix-en-Provence.
        </p>
      </section>

      {/* Section for main applicable laws information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">8. Les principales lois concernèes</h2>
        <p className="mt-2">
          Loi n° 78-17 du 6 janvier 1978, notamment modifiée par la loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés.<br />
          Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
        </p>
      </section>

      {/* Section for lexicon information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">9. Lexique</h2>
        <p className="mt-2">
          Utilisateur : Internaute se connectant, utilisant le site susnommé.<br />
          Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
        </p>
      </section>
    </div>
  );
}
