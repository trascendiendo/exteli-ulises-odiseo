import { NextResponse } from "next/server"
import { verifyIdToken } from "@/app/libs/utils/firebaseAdmin"

export async function middleware( request ) {
  const { cookies } = request
  const token = cookies.token

  if ( !token ) {
    return NextResponse.redirect('/login')
  }

  try {
    await verifyIdToken(token)
    return NextResponse.next()
  } catch (error) {
    console.error('Falló la verificación del token', error)
    return NextResponse.redirect('/login')
  }
}

export const config = {
  matcher: ['/app/:path*'],
}