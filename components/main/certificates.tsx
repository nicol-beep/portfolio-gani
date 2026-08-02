import Image from "next/image";

import { CERTIFICATES } from "@/constants";

export const Certificates = () => {
  return (
    <section
      id="certificates"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Certificates
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row flex-wrap gap-10 px-10 items-center justify-center">
        {CERTIFICATES.map((certificate) => (
          <div
            key={certificate.title}
            className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]"
          >
            <Image
              src={certificate.image}
              alt={certificate.title}
              width={200}
              height={200}
              className="w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
