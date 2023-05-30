import { TransformStream } from 'stream/web'

// Muy importante para que funcione el build
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Permite informar a los clientes que se ha actualizado el servidor
export function emitEventServerUpdate () {
  process.emit('eventServerUpdate')
}

// Permite a los clientes escuchar los eventos del servidor
export async function GET () {
  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  // Escuchar los eventos del EventEmitter y enviarlos al cliente
  const listener = () => {
    const msg = 'Server Update ' + Date.now()
    writer.write(encoder.encode(`data: ${msg}\n\n`))
  }

  // Solo permitir un listener por instancia de proceso
  process.removeAllListeners('eventServerUpdate')
  process.on('eventServerUpdate', listener)

  // Enviar un mensaje al cliente cuando se conecte
  writer.ready.then(() => {
    const msg = 'Conexion abierta para escuchar cambios en el servidor'
    writer.write(encoder.encode(`data: ${msg}\n\n`))
  })

  // Limpiar el listener cuando el cliente se desconecte
  writer.closed.then(() => {
    process.removeListener('eventServerUpdate')
  })

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform'
    }
  })
}
