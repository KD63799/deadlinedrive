export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-5">
      {/* Main title of the privacy policy */}
      <h1 className="text-3xl font-bold mb-5">Politique de confidentialité</h1>

      {/* Section 1: Introduction */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p className="mt-2">
          Bienvenue sur notre application. Nous nous engageons à protéger la confidentialité de nos utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles.
        </p>
      </section>

      {/* Section 2: Information We Collect */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">2. Informations que nous collectons</h2>
        <ul className="list-disc list-inside mt-2">
          <li>Informations que vous nous fournissez directement : nom, adresse e-mail, etc.</li>
          <li>Informations collectées automatiquement : adresse IP, type de navigateur, etc.</li>
          <li>Informations provenant de tiers : données des réseaux sociaux si vous vous connectez via un réseau social.</li>
        </ul>
      </section>

      {/* Section 3: Use of Your Information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">3. Utilisation de vos informations</h2>
        <p className="mt-2">
          Nous utilisons les informations collectées pour :
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Fournir et améliorer notre service</li>
          <li>Personnaliser votre expérience utilisateur</li>
          <li>Communiquer avec vous, y compris pour le support client</li>
          <li>Analyser l'utilisation de notre service pour en améliorer les performances</li>
        </ul>
      </section>

      {/* Section 4: Sharing Your Information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">4. Partage de vos informations</h2>
        <p className="mt-2">
          Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos informations avec des tiers dans les circonstances suivantes :
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Avec votre consentement</li>
          <li>Pour se conformer à une obligation légale</li>
          <li>Pour protéger et défendre nos droits et propriétés</li>
          <li>Avec des fournisseurs de services tiers qui nous aident à opérer notre service</li>
        </ul>
      </section>

      {/* Section 5: Security of Your Information */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">5. Sécurité de vos informations</h2>
        <p className="mt-2">
          Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sécurisée à 100%, et nous ne pouvons pas garantir une sécurité absolue.
        </p>
      </section>

      {/* Section 6: Your Rights */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">6. Vos droits</h2>
        <p className="mt-2">
          Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également vous opposer au traitement de vos données ou demander leur portabilité.
        </p>
      </section>

      {/* Section 7: Changes to This Policy */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">7. Modifications de cette politique</h2>
        <p className="mt-2">
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.
        </p>
      </section>

      {/* Section 8: Contact Us */}
      <section className="mb-5">
        <h2 className="text-2xl font-semibold">8. Nous contacter</h2>
        <p className="mt-2">
          Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter à : DeadlineDrive@mail.com
        </p>
      </section>
    </div>
  );
}
