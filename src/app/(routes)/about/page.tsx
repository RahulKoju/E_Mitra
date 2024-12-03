import React from "react";
import { UtensilsCrossed, ChefHat, Heart, Medal } from "lucide-react";
import Image from "next/image";

const About = () => {
  const valueCards = [
    {
      icon: <Heart className="text-green-600" size={48} />,
      title: "Passion for Tradition",
      description:
        "We preserve the rich culinary heritage of Nepali and Newari cuisines, bringing authentic flavors to your table.",
    },
    {
      icon: <ChefHat className="text-green-600" size={48} />,
      title: "Culinary Expertise",
      description:
        "Our chefs are masters of traditional cooking, trained in the art of creating genuine, flavorful Nepali dishes.",
    },
    {
      icon: <UtensilsCrossed className="text-green-600" size={48} />,
      title: "Fresh Ingredients",
      description:
        "We source local, fresh ingredients to ensure the highest quality and most authentic taste in every dish.",
    },
    {
      icon: <Medal className="text-green-600" size={48} />,
      title: "Quality Commitment",
      description:
        "Our dedication to quality extends from ingredient selection to final presentation, ensuring a memorable dining experience.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Mitra Khaja Ghar
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 leading-relaxed">
            More than just a restaurant, we are storytellers of Nepali and
            Newari culinary traditions. Each dish we serve is a celebration of
            our cultural heritage, crafted with love, respect, and a deep
            connection to our roots.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in the heart of Bhaktapur, Mitra Khaja Ghar began as a small
            family kitchen with a big dream: to share the authentic flavors of
            Nepali and Newari cuisine with the world. What started as a humble
            local eatery has grown into a beloved restaurant that celebrates our
            rich culinary traditions.
          </p>
          <p className="text-gray-600">
            We believe in more than just serving food. We're preserving a
            cultural legacy, one plate at a time. Our recipes are passed down
            through generations, each dish telling a story of family, tradition,
            and the vibrant spirit of Nepal.
          </p>
        </div>
        <div className="bg-green-50 rounded-xl p-8 shadow-lg flex justify-center items-center">
          <Image
            src={
              "https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/335392179_899818247836498_5216767998483309409_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=u3pUqjstEawQ7kNvgFDdJ8i&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=AG6ZLmuRZvKJPv8X6Ed-aTj&oh=00_AYC8EDtB4XFonRH_zMeKJRRh97QyEMqx270p0RDEITfYfA&oe=6754DC4D"
            }
            alt="Mitra Khaja Ghar Restaurant"
            className="rounded-xl object-cover"
            width={650}
            height={400}
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What Drives Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Our commitment goes beyond great food. We're dedicated to quality,
            tradition, and creating memorable dining experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {valueCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center transform transition hover:scale-105"
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
