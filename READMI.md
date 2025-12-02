# Manual de Usuario - Control de Medidores de Luz

## 🎯 ¿Qué hace esta aplicación?

Esta aplicación calcula automáticamente cuánto debe pagar cada cuarto
por el consumo de luz, distribuyendo el costo total del recibo de manera
justa y proporcional según el consumo real de cada uno.

## 📋 Conceptos Importantes

### **Gastos Compartidos (15 soles fijos)**

Estos gastos se dividen entre todos los cuartos activos:

-   **10 soles:** Luz de escalera + Luz de lavadero\
-   **5 soles:** Luz del baño (**NO paga el Cuarto Grande**)

### **Cuarto Azotea (NO TIENE MEDIDOR)**

-   NO tiene medidor de luz propio\
-   Paga **10 soles fijos** siempre que esté activo\
    Estos 10 soles **YA incluyen gastos compartidos + consumo estimado**


### CONSUMO DE LUZ - GASTOS FIJOS = 100% QUE SE USARA PARA IGUALAR AL 100% DE LA SUMA DE MEDIDORES DE LUZ ACTIVOS

### Esta diferencia equivale al 100% del consumo electrico controlado

#### ejmp consumo electricidad: 
- s/71.00 

#### ejmp del monto que equivale al 100%
- 71 - 20 (gasto compartido + consumo cuarto azotea)
- 51 = 100%

#### ejmp de medidores:

-   cuarto vacio = 0klw consumo
-   cuarto pequeño = 5klw consumo
-   cuarto mediano = 8klw consumo
-   cuarto grande = 10klw consumo

#### consumo de la suma total de medidores que equivale al 100% en klw: 0 + 5 + 8 + 10 

#### resultado: 

- 23 klw      = 100%
- 51 soles    = 100% 

#### apartir de esto cada habitacion con medidor paga el porsentage correspondiente

-   cuarto vacio = 0klw consumo = 0/23 = 0% de 51 soles 
-   cuarto pequeño = 5klw consumo = 5/23 = 21.73% de 51 soles = 11.08 soles en total que debe pagar de luz
-   cuarto mediano = 8klw consumo = 8/23 = 34.78% de 51 soles = 17.73 soles en total que debe pagar de luz 
-   cuarto grande = 10klw consumo = 10/23 = 43.47% de 51 soles = 22.17 soles en total que debe pagar de luz 

#### Sumando el total de luz que debe pagar cada cuarto da como resultado el monto total que equivale al 100% 

-   11.08 + 17.73 + 22.17 = 50.98 (por este motivo el consumo siempre sera redondeado al numero siguiente)
-   consumo de la suma de cuartos con medidores = 51 soles 

#### El monto que equivale al 100% + ( gastos compartidos + consumo cuarto azotea) = pago total del consumo general de luz

### **Cuartos Inactivos**

Un cuarto es INACTIVO cuando: - Su switch está desactivado, **o** - Su
consumo es 0 kW (lectura anterior = lectura actual)

Los cuartos inactivos **NO pagan nada** y **NO aparecen en el
resultado**.

------------------------------------------------------------------------

## 🚀 Guía Paso a Paso

### **Paso 1: Configurar Nombres de Cuartos**

-   Ingresa los nombres personalizados\
-   Clic en **"💾 Guardar Nombres"**

### **Paso 2: Seleccionar Período de Consumo**

-   Usa el selector
-   Las fechas se llenan automáticamente (4 del mes anterior → 4 del mes
    elegido)

### **Paso 3: Activar/Desactivar Cuartos**

-   Los switches controlan qué cuartos entran en el cálculo

### **Paso 4: Ingresar Lecturas**

Solo cuartos activos (excepto Azotea).

### **Paso 5: Ingresar Costo Total del Recibo**

Ejemplo: `100.00`

### **Paso 6: Calcular**

-   Clic en **"🧮 Calcular Consumos"**
-   Si falta algo → verás un mensaje de error

### **Paso 7: Descargar PDF**

-   Clic en **"📄 Descargar PDF"**
-   Incluye: período, vencimiento, tabla de consumos

------------------------------------------------------------------------

## 📊 Escenarios de Ejemplo

### 🔹 **Escenario 1: Todos Activos (5/5)**

*(Resumen incluido como ejemplo. El archivo completo conserva todos los
cálculos detallados.)*

### 🔹 **Escenario 2: Un Cuarto Inactivo (4/5)**

### 🔹 **Escenario 3: Dos Cuartos Inactivos (3/5)**

### 🔹 **Escenario 4: Solo Cuarto Grande Activo (1/5)**

Cada escenario muestra cómo cambia la distribución dependiendo de
cuántos cuartos están activos.

------------------------------------------------------------------------

## ✅ Conclusión

Esta herramienta garantiza una **distribución justa, clara y
automática** del consumo eléctrico, adaptándose a distintos escenarios
según habitaciones activas o inactivas.
