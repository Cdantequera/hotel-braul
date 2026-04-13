import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Tu Nombre Completo", // Cambiar aquí
      role: "Fundador / CEO",
      bio: "Descripción sobre tu rol y experiencia en la industria hotelera.",
      image: "https://via.placeholder.com/250?text=Tu+Foto", // Reemplazar con tu foto
      socials: {
        linkedin: "https://linkedin.com/in/tu-perfil",
        github: "https://github.com/tu-usuario",
        twitter: "https://twitter.com/tu-usuario",
        instagram: "https://instagram.com/tu-usuario",
      },
    },
  ];

  const values = [
    {
      icon: "🏡",
      title: "Comodidad",
      description: "Ofrecemos espacios diseñados para tu máximo confort y relajación.",
    },
    {
      icon: "👥",
      title: "Atención al Cliente",
      description: "Nuestro equipo está disponible 24/7 para ayudarte con cualquier necesidad.",
    },
    {
      icon: "✨",
      title: "Calidad",
      description: "Mantenemos los más altos estándares en cada aspecto del servicio.",
    },
    {
      icon: "🌍",
      title: "Sostenibilidad",
      description: "Comprometidos con prácticas amigables con el medio ambiente.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      {/* Header */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#C5A572] mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubre la historia y la misión detrás de nuestro hotel de lujo
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#C5A572] mb-6">Nuestra Historia</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Con más de una década de experiencia en la industria hotelera, nuestro hotel se ha
              establecido como un referente de lujo y excelencia en atención al cliente.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Nuestro compromiso es brindar experiencias inolvidables, combinando elegancia moderna
              con la calidez de un servicio personalizado. Cada detalle ha sido cuidadosamente
              diseñado para asegurar tu máxima satisfacción.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Nos enorgullece ser parte de tus momentos especiales, ya sea un viaje de negocios,
              vacaciones románticas o una celebración familiar.
            </p>
          </div>
          <div className="bg-linear-to-br from-[#C5A572]/20 to-transparent rounded-2xl p-8 border border-[#C5A572]/30">
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
              <img
                src="https://via.placeholder.com/500?text=Foto+del+Hotel"
                alt="Nuestro Hotel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-[#C5A572] mb-12 text-center">Nuestros Valores</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-linear-to-b from-[#C5A572]/10 to-transparent p-6 rounded-xl border border-[#C5A572]/20 hover:border-[#C5A572]/50 transition-colors"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-[#C5A572] mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-[#C5A572] mb-12 text-center">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-linear-to-b from-[#C5A572]/10 to-transparent rounded-2xl overflow-hidden border border-[#C5A572]/30 hover:border-[#C5A572]/60 transition-all hover:shadow-lg hover:shadow-[#C5A572]/20"
            >
              {/* Foto */}
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#C5A572] mb-1">{member.name}</h3>
                <p className="text-[#C5A572]/70 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{member.bio}</p>

                {/* Redes Sociales */}
                <div className="flex gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#C5A572]/20 hover:bg-[#C5A572]/40 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#C5A572]/20 hover:bg-[#C5A572]/40 transition-colors"
                      title="GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#C5A572]/20 hover:bg-[#C5A572]/40 transition-colors"
                      title="Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#C5A572]/20 hover:bg-[#C5A572]/40 transition-colors"
                      title="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-linear-to-r from-[#C5A572]/10 to-transparent rounded-2xl border border-[#C5A572]/30 p-12">
          <h2 className="text-3xl font-bold text-[#C5A572] mb-8 text-center">Contáctanos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Phone className="text-[#C5A572] mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Teléfono</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Mail className="text-[#C5A572] mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-400">info@ourhotel.com</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="text-[#C5A572] mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-2">Ubicación</h3>
              <p className="text-gray-400">Tu dirección aquí</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
