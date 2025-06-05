import type { Partner } from "@hero/types/dto"

export const getPartners = async (): Promise<Array<Partner>> => {
  try {
    return [
      {
        id: 1,
        name: 'Steps',
        logoname: '/partners/steps-px1.svg',
        description:
          'Steps is a leading provider of digital solutions, helping businesses streamline their operations and enhance productivity.',
      },
      {
        id: 2,
        name: 'Mango',
        logoname: '/partners/mango-px2.svg',
        description:
          'Mango specializes in innovative marketing strategies, empowering brands to reach wider audiences effectively.',
      },
      {
        id: 3,
        name: 'Food Co UK',
        logoname: '/partners/food-co-uk-px4.svg',
        description:
          'Food Co UK delivers high-quality food products and services, supporting communities with fresh and sustainable options.',
      },
      {
        id: 4,
        name: 'G Series',
        logoname: '/partners/g-series-px6.svg',
        description:
          'G Series is a global leader in technology solutions, providing cutting-edge products and services to enhance business performance.',
      },
      {
        id: 5,
        name: 'Food Network',
        logoname: '/partners/food-network-px3.svg',
        description:
          'Food Network is a premier destination for food enthusiasts, offering a wide range of culinary content and resources.',
      },
      {
        id: 6,
        name: 'Book off',
        logoname: '/partners/bookoff-px5.svg',
        description:
          'Book off is a trusted name in the book industry, providing a platform for readers to discover and purchase books.',
      },
    ]
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}
