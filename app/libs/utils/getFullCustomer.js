import Apis from '@/app/libs/apis';

export default async function getFullCustomer(uid) {
  try {
    const res = await Apis.customers.GetCustomer(uid)
    if ( res ) {
      return res.customer
    } else {
      return null
    }
  } catch (error) {
    console.error('getFullCustomer: error al obtener data del cliente')
    throw error
  }
}
