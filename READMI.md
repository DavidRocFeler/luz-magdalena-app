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

### **Cuarto Azotea (Especial)**

-   NO tiene medidor de luz propio\
-   Paga **10 soles fijos** siempre que esté activo\
    Estos 10 soles **YA incluyen gastos compartidos + consumo estimado**

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
