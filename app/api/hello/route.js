import { NextResponse } from 'next/server'

export async function helloApi () {
  return { message: 'Hello from the API!' }
}

export async function GET (request) {
  return NextResponse.json(await helloApi())
}
