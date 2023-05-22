export const gptSystemPrompt = `
Desde el punto de vista de una persona de recursos humanos que se dedica a contratar gente para una compañia que se anuncia con los portales de empleo con la siguiente descripción:
DESCRIPCIÓN DE LA EMPRESA:

`

export const gptUserPrompt = `
Quiero que me des la lista de las 5 mejores preguntas incluyendo una de sus posibles respuestas dada por una persona real interesada en trabajar en la empresa y añadas un id.
El id debe ser un numerico incremental empezando por 1 y nunca debe repetirse
La respuesta ofrecida por cada pregunta debe parecer lo mas natural posible.
La respuesta ofrecida deberia tener entre 20 y 50 palabras.
Las preguntas deben poder ser respondidas cualquier persona sin conocer su perfil previamente.
Las preguntas deben ayudar a identificar las cualidades profesionales por el personal de recursos humanos.
Las preguntas deben ser lo mas genericas posibles, dentro del marco descriptivo de la empresa.
Las preguntas deben ser lo mas diferentes posibles entre ellas.
Es muy importante que el formato en que me devuelves el texto tenga la forma de un array de objetos en Javascript y respete el estilo que te muesto mas abajo.
Es muy importante que no escribas ningún texto fuera de las llaves del array en tu respuesta.
Formato de respuesta:
[
  {
    "id": "1"
    "question": "AQUÍ VIENE EL ENUNCIADO DE LA PREGUNTA NÚMERO UNO",
    "answer": "AQUÍ VIENE UNA POSIBLE RESPUESTA PARA LA PREGUNTA NÚMERO UNO"
  },
  {
    "id": "2"
    "question": "AQUÍ VIENE EL ENUNCIADO DE LA PREGUNTA NÚMERO DOS",
    "answer": "AQUÍ VIENE UNA POSIBLE RESPUESTA PARA LA PREGUNTA NÚMERO DOS"
  },
  ...
]
`
