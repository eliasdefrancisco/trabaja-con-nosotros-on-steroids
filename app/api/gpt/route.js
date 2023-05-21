import { NextResponse } from 'next/server'
import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'
import { gptSystemPrompt, gptUserPrompt } from '@/app/context/gptPrompt'
import { companiesMock } from '@/app/context/companiesMock'

const openaiToken = process.env.OPENAI_TOKEN
const configuration = new Configuration({ apiKey: openaiToken })
const openai = new OpenAIApi(configuration)

export async function getGptJson (companyId) {
  const companyDescription = companiesMock.find(company => company.companyId === companyId)?.description
  if (!companyDescription) {
    console.log('!! api getGptJson() companyDescription not found. companyId: ', companyId)
    return ''
  }
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: gptSystemPrompt + companyDescription
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: gptUserPrompt
      }
    ]
  })
  const data = completion.data.choices[0].message?.content
  console.log('!! api getGptJson()', data)

  //   const data = `
  // [
  //   {
  //     pregunta: "¿Cómo podrías describir tus habilidades para trabajar en equipo?",
  //     respuesta: "Considero que tengo habilidades para trabajar en equipo, me gusta colaborar y compartir ideas con mis compañeros. Creo que la COLABORACIÓN es clave para alcanzar metas ambiciosas y me gusta fomentar el espíritu de equipo en mi entorno laboral".
  //   },
  //   {
  //     pregunta: "¿Cómo te defines en cuanto a compromiso y confianza?",
  //     respuesta: "Considero que el COMPROMISO y la CONFIANZA son fundamentales en mi desempeño laboral. Me gusta cumplir con mis responsabilidades y trabajar duro para lograr mis objetivos, y siempre busco establecer relaciones de confianza con mis compañeros y superiores".
  //   },
  //   {
  //     pregunta: "¿Cómo describirías tu capacidad para resolver problemas complejos?",
  //     respuesta: "Creo que tengo una capacidad destacable para resolver problemas complejos. Me gusta analizar los diferentes elementos de una situación y considerar múltiples perspectivas para encontrar la mejor solución. Además, disfruto de los retos cargados de ilusión y DIVERSIÓN y trato de mantener una actitud positiva ante situaciones difíciles".
  //   },
  //   {
  //     pregunta: "¿Cómo te adaptas a la innovación y a las nuevas tecnologías?",
  //     respuesta: "Soy una persona curiosa y abierta a nuevas ideas y tecnologías. Me gusta mantenerme actualizado en cuanto a las novedades en mi sector y estar al tanto de las tendencias. Además, considero que la innovación es clave para la transformación digital y me encanta formar parte de ella".
  //   },
  //   {
  //     pregunta: "¿Cómo describirías tu capacidad para enfrentar retos de negocio?",
  //     respuesta: "Soy una persona ambiciosa y perseverante que siempre está dispuesta a enfrentar retos de negocio. Combinando mi especialización en tecnologías de vanguardia con mi amplio conocimiento de los retos de negocio, me considero capaz de tomar decisiones sensatas y estratégicas con el objetivo de alcanzar los objetivos de mi empresa y de ofrecer soluciones innovadoras a sus clientes".
  //   }
  // ]
  // `

  return data
}

/**
 * @param {Request} request
 */
export async function POST (request) {
  const { companyId } = await request.json()
  if (!companyId) {
    return new Response('No se ha especificado una descripción', { status: 400 })
  }
  const data = await getGptJson(companyId)
  console.log('!! api gpt/route.js POST()', data)
  try {
    return NextResponse.json(data)
  } catch {
    return new Response('No se ha podido transformar el JSON de GPT', { status: 500 })
  }
}
