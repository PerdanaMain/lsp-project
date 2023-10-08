import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest)=>{

  const token = req.cookies.get("token");

  if(token){
    return NextResponse.next();
  }else{
    return NextResponse.redirect(new URL("/",req.url));
  }

}

export const config = {
  // halaman yg mau apply middleware
  matcher:["/medkits","/admin"]
}