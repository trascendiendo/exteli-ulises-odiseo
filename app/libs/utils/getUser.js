'use client'

import Apis from '@/app/libs/apis';

export default async function getUser(uid) {
  try {
    const res = await Apis.users.GetUser(uid)
    if ( res ) {
      return `${res.firstName} ${res.lastName}`
    } else {
      return '-'
    }
  res.firstName} catch (error) {
    console.error('getUser: error al obtener los nombre del usuario')
    throw error
  }  
}
