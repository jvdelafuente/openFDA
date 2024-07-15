#FETCHING openFDA api

Este "proyecto" viene a raíz de una prueba técnica que realicé, en el que pedian recoger datos de medicamentos de EE.UU directamente desde la api.
lo dejo aqui ya que me el resultado no me disgusta pese a ser una api que no me entusiasmó como presenta la documentación.



Datos relevantes:

=> Consiste en filtrar por (medicinalproduct, brand_name, generic_name) y el resultado filtrarlo de nuevo para obtener los de "EEUU".

=> Se puede cambiar el numero máximo de resultados: Search.jsx linea 43, está en = (30 resultados).

=> Está puesto a 30 resultados como máximo para que tarde menos en cargar en el caso de que haya muchos.

=> La cantidad de datos que se pueden extraer de la api es mayor, pero escogí los mas "importantes" poniéndome en el lugar de un "usuario promedio".

=> He dejado los (console.log) para facilitar la información que no muestro en el endpoint (/details).

=> Decidí no usar el Español para ir en sintonía con la api.

=> El texto mostrado en (/details) es solo para darle mas aspecto de prospecto, con tal de que la sensación y la estética sean más serias.

=> (reportercountry) Para el filtro de "EEUU". No sé si exactamente es (reportercountry) pero se podria cambiar la lógica al "parámetro" o "path" que se requiera.

##Desarrollado con React + Vite.
