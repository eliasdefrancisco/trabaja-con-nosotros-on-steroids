import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import ejs from 'ejs'

export async function createHtml (companyId, questionsAndAnswers, companyName, description) {
  try {
    const outputFileName = `${companyId}.html`
    const templatePath = path.join(process.cwd(), 'public', 'template.ejs')
    const outputPath = path.join(process.cwd(), 'public', outputFileName)
    const template = await fs.readFile(templatePath, 'utf-8')
    console.log('!! api generate/route.js createHtml() companyName', companyName)
    // Render the EJS template
    const html = ejs.render(template, { questionsAndAnswers, companyName, description })
    // Write the rendered HTML to a file in the /public folder
    await fs.writeFile(outputPath, html)
    return outputFileName
  } catch (error) {
    console.log('!! api generate/route.js createHtml() error', error)
    return undefined
  }
}

/**
 * @param {Request} request
 */
export async function POST (request) {
  const { companyId, questionsAndAnswers, companyName, description } = await request.json()
  if (!companyId) {
    return new Response('No se ha especificado una descripción', { status: 400 })
  }
  const generatedFileName = await createHtml(companyId, questionsAndAnswers, companyName, description)
  console.log('!! api generate/route.js POST() generatedFileName', generatedFileName)
  if (!generatedFileName) {
    return new Response('No se ha podido generar el HTML', { status: 500 })
  }
  try {
    return NextResponse.json(generatedFileName)
  } catch {
    return new Response('No se ha podido transformar el JSON de GPT', { status: 500 })
  }
}
