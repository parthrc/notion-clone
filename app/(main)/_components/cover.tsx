import Image from "next/image";

export const Cover = () => {
  return (
    <div className=" w-full border relative h-[20vh] group">
      <Image src="/gta-6.webp" alt="cover" fill className=" object-cover" />
    </div>
  );
};
