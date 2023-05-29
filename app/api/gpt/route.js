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

  // const data = `[
  //   {
  //     "id": "1",
  //     "question": "¿Cómo describirías tus habilidades de colaboración y espíritu de equipo?",
  //     "answer": "Considero que tengo habilidades sólidas de colaboración y trabajo en equipo. Me gusta trabajar en conjunto con mis colegas y utilizar todas las habilidades y conocimientos que cada uno tiene para llegar a una solución óptima. Creo que el éxito de un proyecto radica en la capacidad de las personas para trabajar juntas, y esta es una habilidad que valoro y trato de fomentar en mi entorno laboral."
  //   },
  //   {
  //     "id": "2",
  //     "question": "¿Podrías explicar cómo has afrontado situaciones complejas en tu trabajo anterior?",
  //     "answer": "En mi último trabajo, me enfrenté a una situación compleja cuando tuvimos que implementar una nueva tecnología para nuestro equipo. Trabajé en equipo con los demás miembros del equipo y utilicé mi conocimiento y experiencia para encontrar soluciones creativas y efectivas. Mi enfoque fue proactivo y planifiqué cuidadosamente mi trabajo para evitar errores y garantizar el éxito del proyecto. Aprendí mucho de esa situación y me di cuenta de que la planificación cuidadosa y el enfoque en equipo pueden llevar a grandes resultados."
  //   },
  //   {
  //     "id": "3",
  //     "question": "¿Cómo describirías tu compromiso y confianza en las personas?",
  //     "answer": "Para mí, el compromiso y la confianza en las personas son fundamentales en cualquier entorno laboral. Soy una persona que cree y apoya a sus compañeros de trabajo. Me esfuerzo por establecer relaciones sólidas y confiables en el trabajo, lo que lleva a un mejor desempeño del equipo y del individuo. Me gusta trabajar en equipo ya que creo que todos tenemos algo valioso que aportar. Me gusta ser un apoyo para mis colegas y ayudarlos a crecer en su rol."
  //   },
  //   {
  //     "id": "4",
  //     "question": "¿Podrías describir una situación en la que aplicaste tus conocimientos y experiencia para perseguir la excelencia?",
  //     "answer": "Una situación memorable en la que pude aplicar mis conocimientos y experiencia fue cuando lideré un proyecto para una campaña publicitaria. Como tenía experiencia previa en proyectos similares, pude aportar un enfoque creativo al equipo y sugirieron algunas ideas innovadoras. Por ser líder, también trabajé en colaboración con mis colegas para que pudieran aplicar sus habilidades de la manera más efectiva posible. Trabajamos incansablemente en este proyecto, y a través de nuestro esfuerzo y dedicación, logramos superar las expectativas del cliente."
  //   },
  //   {
  //     "id": "5",
  //     "question": "¿Podrías comentar brevemente cómo has llevado a cabo un proyecto de transformación digital?",
  //     "answer": "Lleve a cabo un proyecto de transformación digital en mi último trabajo, que enfocado en la implementación de una nueva plataforma de software. Me aseguré de trabajar en equipo con varios departamentos de la empresa y de que todos los usuarios fueran debidamente capacitados. Como resultado, nuestros procesos se mejoraron notablemente y se aceleró el tiempo de respuesta. Tuve que estar en sintonía con el resto del equipo en todo momento para garantizar un proyecto fluido y exitoso."
  //   }
  // ]`

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
  try {
    return NextResponse.json(data)
  } catch {
    return new Response('No se ha podido transformar el JSON de GPT', { status: 500 })
  }
}
