import { prisma } from '@/lib/prisma'

async function createInitialData() {
  await prisma.station.createMany({
    data: [
      {
        id: '15630000',
        name: 'Humaitá',
        latitude: -7.5028,
        longitude: -63.0183,
        geocode: '1301704',
        filecode: '1073',
      },
      {
        id: '15560000',
        name: 'Ji Paraná',
        latitude: -10.8736,
        longitude: -61.9356,
        geocode: '1100122',
        filecode: '938',
      },
    ],
  })
}

createInitialData()
