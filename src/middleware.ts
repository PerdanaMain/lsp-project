import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: number;
}

const isAdminRoute = (pathname:string) => {
  return pathname.startsWith("/admin");
  
}

export const middleware = (req: NextRequest)=>{
  const token = req.cookies.get("token");
  const {pathname} = req.nextUrl;

  if(!token){
    return NextResponse.redirect(new URL("/",req.url));
  }

  const decode = jwt.decode(token.value) as JwtPayload;

  if(isAdminRoute(pathname) && decode.role !== 1){
    return NextResponse.redirect(new URL("/",req.url));
  }

}

export const config = {
  // halaman yg mau apply middleware
  matcher:["/admin","/admin/products","/admin/orders","/admin/users","/payments/:path*", "/transactions/:path*"]
}