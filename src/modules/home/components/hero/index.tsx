import Image from "next/image"
import hewLogo from "/public/hew-logo.jpeg"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Image
          src={hewLogo}
          width={500}
          height={500}
          alt="HEW Company"
        />
      </div>
    </div>
  )
}

export default Hero
