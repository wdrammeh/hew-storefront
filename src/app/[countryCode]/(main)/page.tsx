import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import { Button, Heading, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "HEW Groceires",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      {/* No Collection? */}
      {collections.length == 0 && (
        <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
          {/* <Heading
            level="h1"
            className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
          >
            Welcome to HEW Groceries!
          </Heading> */}
          <Text className="text-base-regular mb-3 max-w-[32rem]">
            Use the link below to start browsing our products.
          </Text>
          <div>
            {/* <LocalizedClientLink href="/store">
              <>
                <span className="sr-only">Go to all products page</span>
                <Button variant="primary" size="large">Explore products</Button>
              </>
            </LocalizedClientLink> */}
            <InteractiveLink href="/store">Explore products</InteractiveLink>
          </div>
        </div>
      )}

      {/* Collections? */}
      {collections.length > 0 && (
        <div className="py-">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}
    </>
  )
}
