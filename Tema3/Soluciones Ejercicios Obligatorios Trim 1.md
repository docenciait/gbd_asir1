## Soluciones Ejercicios Obligatorios Trim 1

10.



Pinacoteca(Nombre(PK), Ciudad, Dirección, metrosCuadrados)

Cuadro(CodCuadro(PK), Técnica, Nombre, Dimensiones, FechaCreación)

Guarda(Nombre(FK), CodCuadro(FK)(PK), CodPintar(FK))

Pintor (CodPintar(PK), Nombre, Ciudad, Nación, FechaNac, FechaMuerte)

Escuela( Nombre (PK), FechaCreación, PaísDondeSurgió, CodPintor(FK))

Es_Maestro(CodPintor (FK) (PK), CodPintor_Maestro(FK))

MECENAS (Nombre(PK), FechaNac, Nacionalidad, LugarNacimiento, FechaMuerte)

Tener (CodPintor (PK)(FK), Nombre(PK)FK), relación )

11. 

    JUGADOR (DNI (PK), NombreJugardor, FechaNacimiento, Sueldo, Nacionalidad, NombreEquipo(FK))

    Partido(Código (PK), Fecha, Resultado, NombreEquipo (FK))

    Juega (DNI (PK)(FK), Código (PK)(FK))

    EQUIPO (NombreEquipo(PK), Ciudad, Presidente)

