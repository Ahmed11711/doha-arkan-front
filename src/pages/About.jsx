import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import hero from "../assets/images/hero.png";

export default function About() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <>
      <section
        className="relative w-full h-[95vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div
          className={`relative z-10 text-white max-w-xl ${
            isArabic ? "ms-5 text-right" : "ms-5 text-left"
          }`}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            About Us
          </span>
          <h3 className="text-4xl md:text-6xl font-bold mb-4 font-[Rubik]">
            {t("Find the best crypto trading rates")}
          </h3>
          <p className="text-lg mb-6 font-[Rubik]">
            {t(
              "Discover competitive rates and seamless transactions with Arkan. Buy and sell cryptocurrencies with ease, anywhere, anytime."
            )}
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 text-gray-900 font-[Rubik]">
        {/* About Section */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              className="text-5xl font-bold mb-6 text-[#1B1664]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              About Us
            </motion.h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in empowering traders and investors worldwide by
              offering secure, innovative, and transparent crypto trading
              solutions. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Voluptatem iusto possimus aut omnis illum sequi. Asperiores
              veritatis iusto fuga, incidunt recusandae modi cumque autem minus.
              Ad esse dolores officiis hic!
            </p>

            <div className="my-10 mx-auto">
              <motion.img
                src={hero}
                alt="Arkan Team"
                className="rounded-2xl shadow-lg"
                whileHover={{ scale: 1.03 }}
              />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Arkan, our mission is to make cryptocurrency trading simple,
              safe, and accessible to everyone. We bring together advanced
              tools, expert insights, and a strong community to empower users to
              trade confidently. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptates dolorem repellat tempore corrupti
              molestias voluptatibus accusamus quam distinctio harum! Soluta
              minus asperiores deleniti dicta natus, corporis eveniet ut ipsam
              beatae.
            </p>
            <button className="bg-[#1B1664] hover:bg-[#15104F] text-white px-6 py-3 rounded-full transition">
              Get in Touch
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto my-16 px-6">
          <div className="bg-gradient-to-r from-[#1B1664] to-[#3A36A1] text-white py-14 px-8 rounded-[3rem] shadow-lg">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
              {[
                { num: "500+", label: "Successful Trades" },
                { num: "600+", label: "Happy Clients" },
                { num: "7+", label: "Years of Experience" },
              ].map((item, i) => (
                <div key={i} className="px-4 py-4">
                  <h3 className="text-4xl font-bold mb-2">{item.num}</h3>
                  <p className="text-gray-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={hero}
              alt="Founder"
              className="rounded-3xl shadow-2xl w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            className="order-1 md:order-2 bg-gradient-to-br from-[#f8f8ff] to-[#ecebff] p-10 rounded-3xl shadow-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1B1664]">
              Our Vision — Message from Founder
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              “At{" "}
              <span className="font-semibold text-[#1B1664]">Arkan</span>, we’re
              redefining digital trading through innovation, transparency, and
              education. Our goal is to help traders grow confidently in the
              evolving crypto world.”
            </p>
            <div className="mt-6">
              <p className="font-semibold text-[#1B1664]">— Ahmed Youssef</p>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto py-24 px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 text-[#1B1664]">Our Team</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {[
              { name: "Ali Ahmed", role: "CEO & Founder", img: hero },
              { name: "Sara Mahmoud", role: "Marketing Director", img: hero },
              { name: "Omar Khaled", role: "Project Manager", img: hero },
              { name: "Laila Hassan", role: "UI/UX Designer", img: hero },
              { name: "Youssef Amr", role: "Frontend Developer", img: hero },
              { name: "Nour Adel", role: "Backend Engineer", img: hero },
            ].map((member, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center bg-gradient-to-b from-[#ffffff] to-[#f5f5ff] rounded-3xl shadow-md p-8 hover:shadow-xl transition"
                whileHover={{ y: -6 }}
              >
                <div className="w-40 h-40 mb-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#1B1664]"
                  />
                </div>
                <h4 className="text-xl font-semibold text-[#1B1664]">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
