import { promises as fs } from 'fs'
import path from 'path'
import { emitEventServerUpdate } from '../events/route'

async function readJsonFile (companyId) {
  // Ruta del archivo
  const filePath = path.join(process.cwd(), 'public', `${companyId}-register.json`)
  try {
    // Comprobar si el archivo existe
    await fs.access(filePath)
    // Si existe, leer el contenido del archivo
    const fileContent = await fs.readFile(filePath, 'utf8')
    // Convertir el contenido del archivo a JSON
    const jsonData = JSON.parse(fileContent)
    return jsonData
  } catch (err) {
    // Si el archivo no existe, no hacer nada - data ya está inicializado como []
    console.log('!! fallo al cargar archivo ', `${companyId}-register.json`)
    return undefined
  }
}

async function updateJsonFile (arr, id) {
  // Ruta del archivo
  const filePath = path.join(process.cwd(), 'public', `${id}-register.json`)

  let data = []

  try {
    // Comprobar si el archivo existe
    await fs.access(filePath)
    // Si existe, leer el contenido del archivo
    const fileContent = await fs.readFile(filePath, 'utf8')
    // Convertir el contenido del archivo a JSON
    data = JSON.parse(fileContent)
    if (!Array.isArray(data)) {
      data = [data]
    }
  } catch (err) {
    // Si el archivo no existe, no hacer nada - data ya está inicializado como []
    console.log('!! Creando el archivo ', `${id}-register.json`)
  }

  // Si el campo 'email' existe en el nuevo objeto y no está en blanco
  if (arr.email && arr.email.trim() !== '') {
    const existingIndex = data.findIndex(item => item.email === arr.email)
    if (existingIndex !== -1) {
      // Si el objeto con el mismo email existe, lo sobreescribe
      data[existingIndex] = arr
    } else {
      // Si no existe, simplemente añade el nuevo objeto al array
      data.push(arr)
    }
  } else {
    // Si el campo 'email' está en blanco o no existe, no añade el nuevo objeto al array
    console.log('Campo de correo electrónico está en blanco o ausente, no se añadirá al archivo')
    return false
  }

  try {
    // Escribir el objeto al archivo
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    // Informar al cliente de que se ha habido cambios en el servidor
    emitEventServerUpdate()
    // Devuelve true si se completa con éxito
    return true
  } catch (err) {
    console.error(err)
    // Devuelve false si ocurre un error
    return false
  }
}

/**
 * @param {Request} request
 */
export async function POST (request) {
  const formData = await request.formData()
  // Convertir formData a un objeto regular
  const formObj = {}
  for (const pair of formData.entries()) {
    formObj[pair[0]] = pair[1]
  }
  const writeJsonStatus = await updateJsonFile(formObj, formData.get('companyId'))
  if (!writeJsonStatus) {
    return new Response('No se ha podido escribir el JSON', { status: 500 })
  }
  return Response.redirect(process.env.DOMAIN_URL, 302)
}

/**
 * @param {Request} request
 */
export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const companyId = searchParams.get('companyId')
  const jsonData = await readJsonFile(companyId)
  if (!jsonData) {
    return new Response('No se ha podido leer el JSON', { status: 500 })
  }
  return new Response(JSON.stringify(jsonData), { status: 200 })
}
