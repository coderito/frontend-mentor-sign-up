"use client";

import Image from "next/image";
import iconList from "../../public/images/icon-list.svg";
import desktopImage from "../../public/images/desktop-image.svg";
import mobileImagen from "../../public/images/mobile-imagen.svg";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Al cargar el componente, enfocamos automáticamente el campo de entrada
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const validateEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidEmail) {
      // Aquí podrías enviar el correo electrónico al servidor, guardar en la base de datos, etc.
      alert("Email subscribed");
    }

    setEmail("");
  };

  return (
    <section className="h-full md:h-screen flex items-center justify-center">
      <div className="bg-white w-full md:w-3/6 md:p-4 rounded-3xl flex justify-between flex-col-reverse md:flex-row shadow-2xl">
        <div className="flex justify-center items-center">
          <div className="w-full flex flex-col gap-7 md:text-sm px-10 pt-10">
            <h1 className="text-5xl font-black tracking-wide">Stay updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <Image src={iconList} alt="icon-list" />{" "}
                <span>Product discovery and building what matters</span>
              </li>
              <li className="flex items-center gap-3">
                <Image src={iconList} alt="icon-list" />{" "}
                <span>Measuring to ensure updates are a success</span>
              </li>
              <li className="flex items-center gap-3">
                <Image src={iconList} alt="icon-list" />{" "}
                <span>And much more!</span>
              </li>
            </ul>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="emailAddress"
                  className="text-xs font-semibold block"
                >
                  Email address
                </label>
                {!isValidEmail && (
                  <p className="text-red-500 text-xs font-semibold">
                    Valid email requerid
                  </p>
                )}
              </div>
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                ref={emailInputRef} // Utilizamos la referencia para enfocar el campo de entrada
                placeholder="email@company.com"
                className={`w-full px-4 mt-2 py-3 border-2 rounded-md focus:outline-none focus:ring ${
                  isValidEmail ? "focus:border-blue-500" : "border-red-500"
                }`}
                value={email}
                onChange={handleEmailChange}
              />

              <button
                type="submit"
                className="bg-[#242743] mt-4 text-center py-4 text-white rounded-md font-semibold tracking-wide  md:text-sm w-full"
              >
                Subscribe to monthly newsletter
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="hidden lg:block h-full">
            {" "}
            {/* Solo visible en dispositivos medianos y grandes */}
            <Image src={desktopImage} alt="Desktop Image" className="h-full" />
          </div>
          <div className="block md:hidden w-full">
            {" "}
            {/* Solo visible en dispositivos pequeños */}
            <Image src={mobileImagen} alt="Mobile Image" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
