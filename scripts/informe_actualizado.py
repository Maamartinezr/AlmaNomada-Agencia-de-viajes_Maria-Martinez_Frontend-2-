from pathlib import Path
import json, html as escape_html
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.section import WD_SECTION_START, WD_ORIENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from PIL import Image

root=Path(__file__).resolve().parents[1]
out=root/'docs/Informe de evidencias Alma Nomada.docx'
destinations=json.loads((root/'backend/data/destinos.json').read_text(encoding='utf-8'))
doc=Document(); doc.core_properties.title='Informe de evidencias de Alma Nómada';doc.core_properties.author='Alma Nómada'
normal=doc.styles['Normal'];normal.font.name='Arial';normal.font.size=Pt(10.5);normal.paragraph_format.space_after=Pt(7);normal.paragraph_format.line_spacing=1.1
for name,size in [('Title',25),('Subtitle',12),('Heading 1',16),('Heading 2',12)]:
 style=doc.styles[name];style.font.name='Arial';style.font.size=Pt(size);style.font.color.rgb=RGBColor(0,0,0);style.paragraph_format.space_after=Pt(8)
doc.styles['Caption'].font.size=Pt(9);doc.styles['Caption'].font.color.rgb=RGBColor.from_string('404040')
web=[]
def setup(section,landscape=False):
 section.orientation=WD_ORIENT.LANDSCAPE if landscape else WD_ORIENT.PORTRAIT;section.page_width=Cm(29.7 if landscape else 21);section.page_height=Cm(21 if landscape else 29.7)
 section.top_margin=section.bottom_margin=Cm(1.8);section.left_margin=section.right_margin=Cm(2);section.footer_distance=Cm(.8)
 if not section.footer.paragraphs[0].text:
  p=section.footer.paragraphs[0];p.alignment=WD_ALIGN_PARAGRAPH.RIGHT;r=p.add_run('Alma Nómada  |  ');r.font.size=Pt(8);f=OxmlElement('w:fldSimple');f.set(qn('w:instr'),'PAGE');p._p.append(f)
setup(doc.sections[0])
def para(text):doc.add_paragraph(text);web.append('<p>'+escape_html.escape(text)+'</p>')
def heading(text,level=1):doc.add_heading(text,level=level);web.append(f'<h{level+1}>{escape_html.escape(text)}</h{level+1}>')
def table(headers,rows,widths,size=9):
 t=doc.add_table(rows=1,cols=len(headers));t.autofit=False
 for col,width in zip(t.columns,widths):col.width=Cm(width)
 for cell,title in zip(t.rows[0].cells,headers):cell.text=title
 repeat=OxmlElement('w:tblHeader');t.rows[0]._tr.get_or_add_trPr().append(repeat)
 for row in rows:
  cells=t.add_row().cells
  for cell,text in zip(cells,row):cell.text=str(text)
 borders=OxmlElement('w:tblBorders')
 for side in ['top','left','bottom','right','insideH','insideV']:
  node=OxmlElement('w:'+side);node.set(qn('w:val'),'single');node.set(qn('w:color'),'D9D9D9');node.set(qn('w:sz'),'4');borders.append(node)
 t._tbl.tblPr.append(borders)
 for n,row in enumerate(t.rows):
  row._tr.get_or_add_trPr().append(OxmlElement('w:cantSplit'))
  for i,cell in enumerate(row.cells):
   cell.width=Cm(widths[i]);cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
   margins=OxmlElement('w:tcMar')
   for side in ['top','left','bottom','right']:
    m=OxmlElement('w:'+side);m.set(qn('w:w'),'85');m.set(qn('w:type'),'dxa');margins.append(m)
   cell._tc.get_or_add_tcPr().append(margins)
   shade=OxmlElement('w:shd');shade.set(qn('w:fill'),'DCE6EF' if n==0 else ('F5F7F9' if n%2==0 else 'FFFFFF'));cell._tc.get_or_add_tcPr().append(shade)
   for p in cell.paragraphs:
    p.paragraph_format.space_after=Pt(2);p.paragraph_format.line_spacing=1.05
    for r in p.runs:r.font.size=Pt(size);r.bold=n==0
 web.append('<table><tr>'+''.join('<th>'+escape_html.escape(x)+'</th>' for x in headers)+'</tr>'+''.join('<tr>'+''.join('<td>'+escape_html.escape(str(x))+'</td>' for x in row)+'</tr>' for row in rows)+'</table>')

doc.add_paragraph('Informe de evidencias de Alma Nómada',style='Title');web.append('<h1>Informe de evidencias de Alma Nómada</h1>')
doc.add_paragraph('Frontend II  |  Sumativa semana 5  |  Noveno bimestre',style='Subtitle')
para('Integrando nuestro frontend con backend. Versión actualizada al 23 de noviembre de 2026.')
heading('Introducción')
para('Alma Nómada es una aplicación académica de viajes para mujeres. Integra un catálogo REST con consultas reales HTTP a GraphQL para vuelos y hoteles. Esta versión amplía la planificación con fechas seleccionables, clases de vuelo, equipaje, ida y vuelta, habitaciones, servicios y una solicitud de reserva simulada.')
para('La ejecución local está comprobada y la suite contiene 33 pruebas aprobadas. La publicación en GitHub Pages con backend público y las pruebas específicas de Chrome, Firefox y Edge continúan pendientes. Las capturas de este informe corresponden a la versión ampliada y sustituyen las imágenes anteriores del documento.')
heading('Funcionalidades implementadas')
para('Inicio incluye cinco enlaces individuales: Explorar Alma Solo, Explorar Alma Friends, Explorar Alma Club, Explorar Alma Plenitud y Explorar Alma Wellness. Cada uno abre su detalle mediante una ruta de React Router. La página de Experiencias presenta para quién es cada modalidad y sus dos beneficios; desde allí se accede al catálogo filtrado por modalidad.')
para('El menú principal se organiza en este orden: Inicio, Nosotras, Experiencias, Servicios adicionales, Contacto y Explorar destinos. El orden es el mismo en escritorio y móvil. El encabezado permanece visible al desplazarse y el eslogan repetido de la portada sigue eliminado.')
para('Los accesos del pie de página muestran los logos de TikTok, Instagram y YouTube dentro de botones circulares en color arena, con iconos verde oscuro y respuesta visual terracota. Conservan los enlaces de inicio de sesión, los nombres accesibles y la apertura en una pestaña nueva.')
for text in [
 'Nueve destinos y dieciocho salidas con fechas de regreso y noches. Cada botón de fecha selecciona el destino y lleva directamente a sus vuelos.',
 'Cuatro alternativas por fecha y 72 vuelos en total. Los nombres de aerolíneas son referenciales; rutas, horarios, disponibilidad y tarifas son demostrativos.',
 'Económico, Ejecutivo y Primera Clase disponibles como configuraciones de todos los vuelos. Bolso de mano, carry-on de 10 kg y maleta facturada de 23 kg modifican el precio.',
 'Solo ida o ida y vuelta, con regreso en la fecha elegida. El equipaje se calcula para uno o ambos tramos. Los asientos se escogen al hacer Check-In.',
 'Vuelos y hoteles se ordenan por precio ascendente, descendente o popularidad de demostración. Los vuelos también se filtran por mañana, tarde o noche.',
 'Habitación doble o Suite Deluxe. Se recomiendan habitaciones para dos viajeras por unidad y se permite ajustar entre una y veinticinco con botones de incremento y disminución.',
 'El recorrido tiene cinco etapas: Destino, Vuelo, Hotel, Servicios y Tu viaje. El menú Servicios adicionales presenta un catálogo informativo sin casillas ni total. La selección se realiza después del hotel y ofrece un botón destacado Continuar sin servicios adicionales. Agregar servicios y ver resumen confirma las opciones elegidas.',
 'El resumen permite eliminar destino, vuelo, hotel, servicios individuales o todos los servicios. El total se recalcula y, si faltan elementos obligatorios, se conserva el subtotal y se deshabilita la reserva hasta completar los pasos pendientes.',
 'Reserva mediante ventana modal accesible, validación compartida y confirmación de simulación. Pagos comerciales no habilitados; redes enlazadas a páginas de inicio de sesión.'
]:doc.add_paragraph(text,style='List Bullet');web.append('<p>'+escape_html.escape(text)+'</p>')

doc.add_page_break();heading('Calendario de salidas')
rows=[]
for d in destinations:
 for s in d['fechasDisponibles']:rows.append([d['nombre']+', '+d['pais'],'/'.join(reversed(s['salida'].split('-'))),'/'.join(reversed(s['regreso'].split('-'))),str(s['noches'])+' noches'])
table(['Destino','Salida','Regreso','Duración'],rows,[7,3.3,3.3,3.4],9.5)
para('En ida y vuelta, las noches corresponden a este calendario. En solo ida se permite ajustar el alojamiento entre una y catorce noches. La noche del checkout no se cobra como noche adicional.')
heading('Disponibilidad de Refugio Nómada')
para('Refugio Nómada de San Pedro de Atacama estaba deshabilitado porque el dato disponible era falso y no tenía fechas. Ese bloqueo no era una exigencia particular de la evaluación. Ahora sus fechas están habilitadas, admite hasta 25 habitaciones y pudo seleccionarse durante la prueba de navegador. Se conservan estados de disponibilidad para impedir selecciones incompatibles.')

setup(doc.add_section(WD_SECTION_START.NEW_PAGE),True);heading('Matriz de los ocho criterios de evaluación')
matrix=[
 ['Interfaz responsive','Header, páginas, planning.css','Menú fijo, formularios, controles y modal','Flujo y servicios a 390 por 844','Capturas 1 a 9','Implementado; navegador integrado'],
 ['REST mock','destinosRoutes.js y destinosService.js','9 destinos y fechas por HTTP','Listado, detalle, CORS y 404','Catálogo y rest-actual.json','Aprobado localmente'],
 ['GraphQL mock','schema.js y resolvers.js','Vuelos, tarifas, equipajes y tipos de habitación','Consultas, variables, relaciones y errores','Vuelos, hoteles y graphql-actual.json','Aprobado localmente'],
 ['React Router','App.jsx y NavigationEffects.jsx','Rutas dinámicas, servicios y recuperación','Fecha a vuelos, hoteles y resumen','Rutas visibles en las capturas','Aprobado localmente'],
 ['Modularidad','components, services, context, utils','UI, transporte, validación y cálculo separados','Compilación y revisión de módulos','Código y estructura del repositorio','Implementado'],
 ['Manejo de estado','TravelContext y useRemote','Selecciones, persistencia, filtros y costos','Precios dinámicos y recarga del resumen','Resumen de 2.621.880 CLP','Aprobado localmente'],
 ['GitHub y Pages','README, pages.yml y Vite','Build, HashRouter y URL de API configurable','Compilación local; sin despliegue público','URL real y ejecución del workflow','Publicación pendiente'],
 ['Compatibilidad','Registro de pruebas','Plan para Chrome, Firefox y Edge','Navegador integrado y revisión móvil','Capturas por navegador y versión','Pruebas específicas pendientes'],
]
table(['Criterio','Archivos','Funcionalidad','Prueba','Evidencia','Estado'],matrix,[3.3,4.2,4.2,4.5,4.3,5.2],9)

setup(doc.add_section(WD_SECTION_START.NEW_PAGE),False);heading('Arquitectura y organización')
para('El catálogo principal y sus fechas residen en backend/data/destinos.json. React obtiene esos datos mediante destinosService.js. Vuelos y hoteles proceden de JSON separados del backend y se entregan mediante el esquema y los resolvers de GraphQL; el frontend envía consultas POST con variables.')
para('TravelContext conserva las selecciones con useState y sessionStorage. useRemote ejecuta consultas con useEffect y cancela solicitudes anteriores. La navegación utiliza React Router y referencias de React para enfocar el contenido. Las reglas de formulario se centralizan en formValidation.js. El cálculo y el ordenamiento se encuentran en utils/travel.js. Los servicios adicionales comparten un catálogo de demostración común.')
heading('Cálculo comprobado')
para('El costo del vuelo se calcula por persona según clase, equipaje y tramos. El alojamiento se calcula con la tarifa de habitación seleccionada multiplicada por noches y número de habitaciones. Se agregan únicamente los servicios elegidos; todo se expresa en CLP.')
table(['Concepto','Cálculo','Importe CLP'],[
 ['Vuelo LATAM Primera Clase','945.840 por persona por 2 viajeras','1.891.680'],
 ['Refugio Nómada Suite Deluxe','156.550 por 4 noches por 1 habitación','626.200'],
 ['Traslado estándar ida y vuelta','1 vehículo','60.000'],
 ['Centro histórico y City Tour','22.000 por 2 viajeras','44.000'],
 ['Total estimado','Suma de los componentes seleccionados','2.621.880'],
],[5.2,7.5,4.3],9.5)
para('Salida 10 de diciembre de 2026 y regreso 14 de diciembre de 2026. El vuelo incluye bolso, carry-on de 10 kg y maleta facturada de 23 kg en ambos tramos. El total fue observado en el navegador y se conservó después de recargar.')
heading('Pruebas realizadas')
para('La compilación Vite pasó. Las 33 pruebas cubren REST, GraphQL, relaciones de los nueve destinos, calendarios y duración, cuatro vuelos por salida, clases y equipajes, regreso, ordenamiento sin mutación, filtros horarios, disponibilidad, habitaciones, servicios y validación de contacto y reserva.')
para('En el navegador integrado se verificaron fechas cliqueables, precios, ordenamiento, horario nocturno, Suite Deluxe, límite de 25 habitaciones, selección de Refugio Nómada, servicios, total, persistencia y confirmación modal. No se ejecutaron reservas comerciales ni sesiones personales en redes.')

def picture(name,caption,max_width=17,max_height=19,crop_height=None):
 path=root/'docs/evidencias'/name
 with Image.open(path) as im:w,h=im.size
 width=min(max_width,max_height*w/h) if crop_height is None else max_width
 p=doc.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER
 shape=p.add_run().add_picture(str(path),width=Cm(width))
 if crop_height:
  full=width*h/w;visible=min(full,crop_height);node=OxmlElement('a:srcRect');node.set('b',str(round((1-visible/full)*100000)));shape._inline.graphic.graphicData.pic.blipFill.insert(1,node);shape.height=Cm(visible);shape._inline.graphic.graphicData.pic.spPr.xfrm.ext.cy=Cm(visible)
 p.paragraph_format.space_after=Pt(4);doc.add_paragraph(caption,style='Caption')
 web.append(f'<figure><img src="evidencias/{name}" alt="{escape_html.escape(caption)}"><figcaption>{escape_html.escape(caption)}</figcaption></figure>')

doc.add_page_break();heading('Inicio y presentación móvil')
picture('01-inicio-desktop.jpg','Figura 1  Inicio actual con menú fijo y acceso a Servicios adicionales',17,10)
picture('02-inicio-movil.jpg','Figura 2  Menú móvil en el orden solicitado',4.3,9.5)
for title,name,caption,crop in [
 ('Catálogo y fechas disponibles','03-catalogo.jpg','Figura 3  Parte superior del catálogo actual con salidas cliqueables',17),
 ('Opciones de vuelos','04-vuelos.jpg','Figura 4  Vista de los controles de fecha, categoría y equipaje del vuelo',None),
 ('Alojamientos y habitaciones','05-hoteles.jpg','Figura 5  Vista de Suite Deluxe y configuración del número de habitaciones',None),
 ('Resumen del viaje y total estimado','06-resumen.jpg','Figura 6  Fragmento del resumen con vuelo, alojamiento e importes estimados',None),
 ('Catálogo informativo de servicios','08-servicios.jpg','Figura 7  Página del menú principal sin controles de selección ni total adicional',None),
 ('Detalle de un nuevo destino','11-destino-margarita.jpg','Figura 8  Detalle de Isla de Margarita en la versión actual',None),
]:
 doc.add_page_break();heading(title);picture(name,caption,max_height=20,crop_height=crop)

doc.add_page_break();heading('Fotografías de transporte y alquileres')
para('Servicios adicionales incorpora cinco fotografías ilustrativas: una para transporte desde y hacia el aeropuerto, otra para alquiler de motos, autos y bicicletas, y una para cada uno de los tres paseos. Las imágenes se guardan localmente, se adaptan a pantallas pequeñas y conservan los controles de selección y confirmación del viaje.')
picture('14-transporte-foto.jpg','Transporte aeroportuario con imagen de referencia y opciones seleccionables',17,12)
para('Las fotografías proceden de Pexels. Sus fuentes y licencia se registran en docs/recursos.md. Son imágenes de ambientación y no garantizan un vehículo o lugar concreto para un destino. La compilación y la carga de las cinco imágenes se verificaron en el navegador integrado; la vista móvil no presentó desbordamiento horizontal.')

doc.add_page_break();heading('Servicios opcionales dentro del viaje')
para('Al seleccionar un hotel se abre /mi-viaje/servicios. Esta ruta requiere un destino, un vuelo y un hotel coherentes. La página del menú /servicios sigue siendo informativa incluso cuando existe un viaje seleccionado. Ambos recorridos reutilizan las mismas fotografías, precios y descripciones.')
picture('16-servicios-opcionales.jpg','Paso 4 con botón destacado para continuar sin servicios adicionales',17,9)
picture('17-servicios-movil.jpg','Paso opcional en móvil con cinco etapas y botón visible',4,7.5)
para('Continuar sin servicios adicionales vacía los servicios guardados y cualquier selección provisional, confirma este paso y abre el resumen con cero cargos extra. Agregar servicios y ver resumen guarda únicamente las opciones seleccionadas y abre el resumen con el total actualizado.')

doc.add_page_break();heading('Eliminación de elementos desde el resumen')
picture('18-eliminar-servicios.jpg','Controles para eliminar el hotel, un servicio concreto o todos los servicios',17,11)
para('Eliminar un servicio conserva los demás. Eliminar todos los servicios mantiene el destino, vuelo y hotel. Eliminar el hotel quita también los servicios asociados y conserva el vuelo. Eliminar el vuelo quita hotel y servicios y mantiene el destino. Eliminar el destino vacía la planificación. La interfaz explica estas dependencias y muestra una confirmación tras la acción.')
para('Si se elimina un elemento obligatorio, el resumen muestra los datos restantes, calcula el subtotal seleccionado y ofrece el siguiente paso pendiente. La reserva queda deshabilitada. Las eliminaciones y las selecciones se mantienen al recargar mediante sessionStorage. Las reglas de eliminación están separadas en utils/tripSelection.js.')
para('Verificación adicional: viaje sin servicios de 619.100 CLP; con traslado Estándar y City Tour para una viajera, 701.100 CLP; al quitar el traslado, 641.100 CLP; al quitar todos los servicios, 619.100 CLP; al quitar el hotel, subtotal de 359.100 CLP y reserva deshabilitada. Se verificaron también eliminación de vuelo y destino, y reserva simulada al completar las cinco etapas.')

doc.add_page_break();heading('Enlaces individuales de experiencias en Inicio')
picture('20-experiencias-inicio.jpg','Cinco tarjetas con enlaces propios hacia el detalle de cada modalidad',17,10)
para('Los enlaces conducen a /experiencias/solo, /experiencias/friends, /experiencias/club, /experiencias/plenitud y /experiencias/wellness. Se verificaron los cinco accesos y el filtro de destinos de Alma Wellness. El detalle contempla experiencias inexistentes y ofrece volver al listado completo. El componente ExperienceCard y los datos de experiences.js se reutilizan en Inicio, listado y detalle.')

doc.add_page_break();heading('Información ampliada de las cinco experiencias')
picture('21-experiencias-informacion.jpg','Alma Solo, Alma Friends y Alma Club con público y beneficios',17,9)
picture('22-experiencias-plenitud-wellness.jpg','Alma Plenitud y Alma Wellness con los textos solicitados',17,9)
para('Cada modalidad conserva literalmente el público y los dos beneficios proporcionados por la usuaria. La revisión móvil a 390 por 720 píxeles no mostró desbordamiento horizontal. Los enlaces conservan navegación semántica mediante React Router.')

doc.add_page_break();heading('Logos y botones de redes sociales')
para('TikTok, Instagram y YouTube se identifican mediante sus símbolos vectoriales. Los botones utilizan la paleta de Alma Nómada y mantienen objetivos táctiles de 48 por 48 píxeles. Su interacción con teclado incluye un contorno de foco visible. Los enlaces conducen a las páginas de inicio de sesión de cada plataforma y no publican contenido ni transmiten datos personales del formulario.')
picture('12-redes-sociales.jpg','Figura 9  Logos de redes sociales integrados al pie de página',17,13)
para('Los vectores proceden de Simple Icons y se integran con color heredado del diseño, sin añadir dependencias. Los enlaces conservan rel="noopener noreferrer" y una etiqueta accesible para indicar la apertura en otra pestaña.')
doc.add_page_break();heading('Confirmación de reserva simulada')
picture('09-reserva.jpg','Figura 10  Ventana modal con confirmación de reserva de demostración',17,11)
para('La ventana se abre desde Solicitar reserva. Valida nombre, correo y viajeras; los comentarios son opcionales. La confirmación muestra el mensaje solicitado junto con la aclaración de que no se enviaron correos ni se realizó una reserva comercial.')
heading('Limitaciones y evidencias pendientes')
para('GitHub Pages aloja el frontend estático y requiere un backend público Node.js separado para REST y GraphQL. Esta revisión no acredita todavía publicación pública. Deben completarse las pruebas específicas de Chrome, Firefox y Edge. Las aerolíneas se nombran como referencia; las rutas, clases, popularidad y precios de esta aplicación son ficticios.')
heading('Fuentes y archivos de respaldo')
para('Datos: backend/data. Pruebas: tests/api.test.js, tests/formValidation.test.js, tests/planning.test.js y tests/tripSelection.test.js. Registro actual: docs/pruebas/ampliacion-resultados.md. Evidencia HTTP: rest-actual.json y graphql-actual.json. Fotografías y fuentes de aerolíneas: docs/recursos.md y docs/AMPLIACION.md.')
heading('Conclusión')
para('La ampliación mantiene los requisitos académicos de integración REST y GraphQL y agrega un recorrido más completo de planificación. Las elecciones se reflejan en precios, disponibilidad y resumen, y la reserva permanece identificada como demostración. La ejecución local y las pruebas realizadas respaldan el funcionamiento; la publicación pública y la compatibilidad por navegador deben completarse para cerrar la pauta.')
doc.save(out)
stylesheet='body{font:16px/1.7 Arial,sans-serif;max-width:1200px;margin:40px auto;padding:20px;color:#111}h1,h2,h3{color:black}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #d9d9d9;padding:10px;text-align:left}th{background:#dce6ef}img{max-width:100%;max-height:900px;object-fit:contain}figure{margin:25px 0}figcaption{font-size:14px}'
(root/'docs/informe-academico.html').write_text('<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Informe de evidencias Alma Nómada</title><style>'+stylesheet+'</style>'+''.join(web)+'</html>',encoding='utf-8')
print(out);print('Imágenes',len(doc.inline_shapes),'Filas del calendario',len(rows),'Criterios',len(matrix))
