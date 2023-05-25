import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import ejs from 'ejs'

export async function createButtonHtml (companyId) {
  try {
    const outputFileName = `${companyId}-button.html`
    const templatePath = path.join(process.cwd(), 'public', 'button.ejs')
    const outputPath = path.join(process.cwd(), 'public', outputFileName)
    const template = await fs.readFile(templatePath, 'utf-8')
    // Render the EJS template
    const html = ejs.render(template, { companyId })
    // Write the rendered HTML to a file in the /public folder
    await fs.writeFile(outputPath, html)
    return outputFileName
  } catch (error) {
    console.log('!! api generate/route.js createButton() error', error)
    return undefined
  }
}

export async function createFormHtml (companyId, questionsAndAnswers, companyName, description) {
  try {
    const outputFileName = `${companyId}-form.html`
    const templatePath = path.join(process.cwd(), 'public', 'form.ejs')
    const outputPath = path.join(process.cwd(), 'public', outputFileName)
    const template = await fs.readFile(templatePath, 'utf-8')
    // Render the EJS template
    const html = ejs.render(template, { questionsAndAnswers, companyName, description })
    // Write the rendered HTML to a file in the /public folder
    await fs.writeFile(outputPath, html)
    return outputFileName
  } catch (error) {
    console.log('!! api generate/route.js createFormHtml() error', error)
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
  const generatedFormFileName = await createFormHtml(companyId, questionsAndAnswers, companyName, description)
  if (!generatedFormFileName) {
    return new Response('No se ha podido generar el HTML para el formulario', { status: 500 })
  }
  const generatedButtonFileName = await createButtonHtml(companyId)
  if (!generatedButtonFileName) {
    return new Response('No se ha podido generar el HTML para el boton', { status: 500 })
  }
  try {
    return NextResponse.json('html form and button generated')
  } catch {
    return new Response('No se ha podido transformar el JSON de GPT', { status: 500 })
  }
}
