import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const adminToken = request.cookies.get('admin_token')?.value
  const voterToken = request.cookies.get('voter_token')?.value

  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login') &&
    !adminToken
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (pathname.startsWith('/dashboard') && !voterToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/admin/login') && adminToken) {
    return NextResponse.redirect(new URL('/admin/voters', request.url))
  }

  if (pathname === '/login' && voterToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)'],
}
