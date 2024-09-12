import Apis from '@/app/libs/apis';

export default async function getCustomer(uid) {
  try {
    const fullName = await Apis.customers.GetCustomerName(uid)
    if ( fullName ) {
      return fullName
    } else {
      return '-'
    }
  } catch (error) {
    console.error('getCustomer: error al obtener los nombres del cliente')
    throw error
  }
}
