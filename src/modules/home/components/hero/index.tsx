import Image from "next/image"
import hewLogo from "/public/hew-logo.jpeg"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import baseImg from "/public/base.png"

const Hero = () => {
  return (
    <div className="">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="place-self-center col-span-6">
          <h1 className="max-w-2xl mb-4 text-4xl tracking-tight leading-none md:text-5xl xl:text-6xl">
            HEW Online Grocery
          </h1>
          <div className="max-w-2xl mb-6 font-light text-gray-500 mb-8 md:text-lg text-xl">
            Enjoy a wide selection of quality groceries, from farm-fresh
            produce to pantry essentials, delivered right to your doorstep.
          </div>
          <div className="flex gap-4">
            <LocalizedClientLink href="/store" passHref>
              <Button size="large" className="px-8">
                Browse
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="#!" passHref>
              <Button variant="secondary" size="large" className="">
                Talk to Sales
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
        <div className="flex col-span-6">
          <Image
            className="rounded"
            // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            src={baseImg}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
