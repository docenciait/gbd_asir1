### Ejemplos de paso de ERD  a Relacional

### JERARQUÍAS/ESPECIALIZACIÓN/GENERALIDADES

![image-20201129203426436](/home/user22/.config/Typora/typora-user-images/image-20201129203426436.png)

OPCIÓN 1: TODAS LAS JERARQUÍAS

​	EMPLEADO (N_EMPLE (PK), NOMBRE, DIRECCION, FECHA_NAC, SALARIO, PUESTO, TIPO, COMISIONES, NUM_PROYECTOS, NIVEL, PULSACIONES, ESPECILIDAD, ANIOS_EXPERIENCIA)



OPCIÓN 2: ESTA OPCIÓN SÓLO PARA JERARQUÍAS EXCLUSIVAS TOTALES

ARQUITECTO (N_EMPLE(PK), NOMBRE, DIRECCION, FECHA_NAC, SALARIO, PUESTO, COMISIONES, NUM_PROYECTOS)

ADMINISTRATIVO ((N_EMPLE(PK), NOMBRE, DIRECCION, FECHA_NAC, SALARIO, PUESTO, NIVEL, PULSACIONES)

INGENIERO (N_EMPLE(PK), NOMBRE, DIRECCION, FECHA_NAC, SALARIO, PUESTO,  ESPECIALIDAD, ANIOS_EXPERIENCIA )



OPCIÓN 3: TODAS LAS JERARQUÍAS

EMPLEADO ( N_EMPLE (PK), NOMBRE, DIRECCION, FECHA_NAC, SALARIO, PUESTO)

ARQUITECTO (N_EMPLE(PK)(FK), COMISIONES, NUM_PROYECTOS)

ADMINISTRATIVO ( N_EMPLE(PK) (FK), NIVEL, PULSACIONES)

INGENIERO (N_EMPLE(PK) (FK), ESPECIALIDAD, ANIOS_EXPERIENCIA)
