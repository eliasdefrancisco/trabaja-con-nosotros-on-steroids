# PROYECTO PARA LA HACKATON DE INFOJOBS TRAIDA POR MIDUDEV

## Nombre del proyecto

Trabaja con nosotros On Steroids

## Título

Enlace 'Trabaja con nosotros' asistido por IA

## Descripción

Permite a las empresas que buscan trabajadores en Infojobs, generar el código HTML necesario para incrustar un enlace en sus webs corporativas, el cual llevará a los usuarios a un formulario con preguntas autogeneradas con una IA tipo ChatGPT

Dichas preguntas estarán basadas en la descripción del perfil de la empresa en Infojobs y servirán para que la empresa tenga una primera aproximación del perfil del candidato con un esfuerzo prácticamente nulo, sin necesidad de redactar algo mas especifico como prodría ser una oferta de trabajo

Ademas de las ventajas al usuario, la web de Infojobs quedaría beneficiada de publicidad orgánica gratuita de la mas alta calidad SEO, ya que conseguiría que webs corporativas hiciesen una referencia directa a su dominio infojobs.com

## Decisiones técnicas

- No hará falta conectarse a su api de empresas, ya que no se proporciona acceso a la misma. En su lugar se usara un json mock con informacion de varias empresas
- No hará falta conectarse con su api de clientes, ya que el usuario al inscribirse en la oferta, solamente tendra de dejar su nombre de usuario en la incripción para que la empresa lo contacte
- No se hara CSS en darkmode, ya que InfoJobs no la ofrece en su web
