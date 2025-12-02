// Cargar nombres guardados y configurar fechas al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cargarNombres();
    actualizarFechas();
});

function cambiarMes() {
    const mesSeleccionado = parseInt(document.getElementById('mes_seleccionado').value);
    actualizarFechas(mesSeleccionado);
}

function cargarNombres() {
    const nombres = {
        nombre_cuarto1: localStorage.getItem('nombre_cuarto1') || 'Cuarto Grande',
        nombre_cuarto2: localStorage.getItem('nombre_cuarto2') || 'Cuarto Mediano',
        nombre_cuarto3: localStorage.getItem('nombre_cuarto3') || 'Cuarto Pequeño',
        nombre_cuarto4: localStorage.getItem('nombre_cuarto4') || 'Cuarto Vacío',
        nombre_cuarto5: localStorage.getItem('nombre_cuarto5') || 'Cuarto Azotea'
    };
    
    // Cargar en los inputs
    Object.keys(nombres).forEach(key => {
        document.getElementById(key).value = nombres[key];
    });
    
    // Actualizar labels
    actualizarLabels();
}

function guardarNombres() {
    // Guardar en localStorage
    for (let i = 1; i <= 5; i++) {
        const nombre = document.getElementById(`nombre_cuarto${i}`).value;
        localStorage.setItem(`nombre_cuarto${i}`, nombre);
    }
    
    // Actualizar labels
    actualizarLabels();
    
    // Mostrar mensaje
    alert('✅ Nombres guardados correctamente');
}

function actualizarLabels() {
    for (let i = 1; i <= 5; i++) {
        const nombre = document.getElementById(`nombre_cuarto${i}`).value || `Cuarto ${i}`;
        document.getElementById(`label_cuarto${i}`).textContent = nombre;
        document.getElementById(`label_cuarto${i}_act`).textContent = nombre;
        
        // Actualizar switch label
        const switchChecked = document.getElementById(`switch_cuarto${i}`).checked;
        let labelText = `${nombre} - ${switchChecked ? 'ACTIVADO' : 'DESACTIVADO'}`;
        
        // Agregar nota especial para Azotea
        if (i === 5) {
            labelText += ' - Sin medidor (10 S/ fijos)';
        }
        
        document.getElementById(`switch_label${i}`).textContent = labelText;
    }
}

function actualizarFechas(mesActual = null) {
    const hoy = new Date();
    
    // Si no se especifica mes, usar el actual
    if (mesActual === null) {
        mesActual = hoy.getMonth(); // 0-11
        // Inicializar el select con el mes actual
        document.getElementById('mes_seleccionado').value = mesActual;
    }
    
    const añoActual = hoy.getFullYear();
    
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    // Calcular mes anterior
    let mesAnterior = mesActual - 1;
    let añoAnterior = añoActual;
    
    if (mesAnterior < 0) {
        mesAnterior = 11;
        añoAnterior = añoActual - 1;
    }
    
    const textoMesAnterior = `4 de ${meses[mesAnterior]}`;
    const textoMesActual = `4 de ${meses[mesActual]}`;
    
    // Actualizar texto del período
    document.getElementById('texto_periodo').textContent = `del ${textoMesAnterior} al ${textoMesActual}`;
    
    // Actualizar todas las etiquetas de fecha
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`fecha_ant_${i}`).textContent = textoMesAnterior;
        document.getElementById(`fecha_act_${i}`).textContent = textoMesActual;
    }
}

function toggleCuarto(num) {
    const switchElement = document.getElementById(`switch_cuarto${num}`);
    const container = document.getElementById(`container_cuarto${num}`);
    const nombre = document.getElementById(`nombre_cuarto${num}`).value || `Cuarto ${num}`;
    
    // Cuarto 5 (Azotea) siempre tiene inputs deshabilitados
    if (num === 5) {
        if (switchElement.checked) {
            container.classList.remove('cuarto-desactivado');
            document.getElementById(`switch_label${num}`).textContent = `${nombre} - ACTIVADO - Sin medidor (10 S/ fijos)`;
        } else {
            container.classList.add('cuarto-desactivado');
            document.getElementById(`switch_label${num}`).textContent = `${nombre} - DESACTIVADO - Sin medidor (10 S/ fijos)`;
        }
        return;
    }
    
    // Para cuartos 1-4
    const inputAnt = document.getElementById(`cuarto${num}_ant`);
    const inputAct = document.getElementById(`cuarto${num}_act`);
    
    if (switchElement.checked) {
        container.classList.remove('cuarto-desactivado');
        document.getElementById(`switch_label${num}`).textContent = `${nombre} - ACTIVADO`;
        inputAnt.disabled = false;
        inputAct.disabled = false;
    } else {
        container.classList.add('cuarto-desactivado');
        document.getElementById(`switch_label${num}`).textContent = `${nombre} - DESACTIVADO`;
        inputAnt.disabled = true;
        inputAct.disabled = true;
        inputAnt.value = '';
        inputAct.value = '';
    }
}

function calcular() {
    // Ocultar alertas
    document.getElementById('alertWarning').style.display = 'none';
    document.getElementById('alertSuccess').style.display = 'none';
    document.getElementById('resultados').style.display = 'none';
    
    // Obtener costo total
    const costo_total = parseFloat(document.getElementById('costo_total').value);
    
    if (!costo_total || costo_total <= 0) {
        mostrarError('Debes ingresar el costo total del recibo.');
        return;
    }
    
    // Obtener nombres actuales
    const nombres = [];
    for (let i = 1; i <= 5; i++) {
        nombres.push(document.getElementById(`nombre_cuarto${i}`).value || `Cuarto ${i}`);
    }
    
    // Obtener switches activos
    const switchesActivos = [];
    for (let i = 1; i <= 5; i++) {
        switchesActivos.push(document.getElementById(`switch_cuarto${i}`).checked);
    }
    
    // Obtener lecturas
    const lecturas_ant = [];
    const lecturas_act = [];
    
    for (let i = 1; i <= 5; i++) {
        if (i === 5) {
            // Azotea no tiene medidor
            lecturas_ant.push(0);
            lecturas_act.push(0);
        } else {
            lecturas_ant.push(parseFloat(document.getElementById(`cuarto${i}_ant`).value) || 0);
            lecturas_act.push(parseFloat(document.getElementById(`cuarto${i}_act`).value) || 0);
        }
    }
    
    // Validar que los cuartos activos (excepto Azotea) tengan lecturas
    for (let i = 0; i < 4; i++) {
        if (switchesActivos[i]) {
            if (!lecturas_ant[i] || !lecturas_act[i]) {
                mostrarError(`Falta ingresar las lecturas del ${nombres[i]}.`);
                return;
            }
            if (lecturas_act[i] < lecturas_ant[i]) {
                mostrarError(`La lectura actual del ${nombres[i]} no puede ser menor que la anterior.`);
                return;
            }
        }
    }
    
    // Calcular consumos
    const consumos = [];
    for (let i = 0; i < 5; i++) {
        consumos.push(lecturas_act[i] - lecturas_ant[i]);
    }
    
    // Determinar cuartos realmente activos (switch ON y consumo > 0, o Azotea con switch ON)
    const cuartosActivos = [];
    for (let i = 0; i < 5; i++) {
        if (i === 4) {
            // Azotea: solo verificar switch
            if (switchesActivos[i]) {
                cuartosActivos.push(i);
            }
        } else {
            // Cuartos 1-4: switch ON y consumo > 0
            if (switchesActivos[i] && consumos[i] > 0) {
                cuartosActivos.push(i);
            }
        }
    }
    
    if (cuartosActivos.length === 0) {
        mostrarError('Debe haber al menos un cuarto activo con consumo.');
        return;
    }
    
    // Constantes
    const LUZ_ESCALERA_LAVADERO = 10.00;
    const LUZ_BANO = 5.00;
    const GASTOS_COMPARTIDOS_TOTAL = LUZ_ESCALERA_LAVADERO + LUZ_BANO;
    const AZOTEA_FIJO = 10.00;
    
    // Calcular distribución de gastos compartidos
    const numCuartosActivos = cuartosActivos.length;
    
    // Escalera + Lavadero: todos los activos pagan
    const pago_escalera_lavadero = LUZ_ESCALERA_LAVADERO / numCuartosActivos;
    
    // Baño: todos los activos EXCEPTO el cuarto 0 (Grande) si está activo
    const cuartosQuePaganBano = cuartosActivos.filter(i => i !== 0);
    const pago_bano = cuartosQuePaganBano.length > 0 ? LUZ_BANO / cuartosQuePaganBano.length : 0;
    
    // Verificar si Azotea está activa
    const azoteaActiva = cuartosActivos.includes(4);
    
    let consumo_azotea = 0;
    if (azoteaActiva) {
        // Calcular cuánto paga Azotea en compartidos
        const compartidos_azotea = pago_escalera_lavadero + pago_bano;
        consumo_azotea = AZOTEA_FIJO - compartidos_azotea;
    }
    
    // Monto disponible para distribuir por consumo
    const monto_disponible = costo_total - GASTOS_COMPARTIDOS_TOTAL - (azoteaActiva ? consumo_azotea : 0);
    
    if (monto_disponible < 0) {
        mostrarError('El costo total es insuficiente para cubrir los gastos fijos.');
        return;
    }
    
    // Calcular total de consumo de cuartos con medidor activos (sin Azotea)
    let total_consumo_medidores = 0;
    for (let i = 0; i < 4; i++) {
        if (cuartosActivos.includes(i)) {
            total_consumo_medidores += consumos[i];
        }
    }
    
    // Distribuir monto proporcional al consumo
    const montos_consumo = [];
    for (let i = 0; i < 5; i++) {
        if (i === 4) {
            // Azotea
            montos_consumo.push(azoteaActiva ? consumo_azotea : 0);
        } else {
            // Cuartos con medidor
            if (cuartosActivos.includes(i) && total_consumo_medidores > 0) {
                montos_consumo.push((consumos[i] / total_consumo_medidores) * monto_disponible);
            } else {
                montos_consumo.push(0);
            }
        }
    }
    
    // Calcular totales
    const resultados = [];
    for (let i = 0; i < 5; i++) {
        if (cuartosActivos.includes(i)) {
            const pagaEscaleraLavadero = pago_escalera_lavadero;
            const pagaBano = cuartosQuePaganBano.includes(i) ? pago_bano : 0;
            const total = montos_consumo[i] + pagaEscaleraLavadero + pagaBano;
            
            resultados.push({
                nombre: nombres[i],
                lectura_ant: lecturas_ant[i],
                lectura_act: lecturas_act[i],
                consumo_kw: consumos[i],
                monto_consumo: montos_consumo[i],
                escalera_lavadero: pagaEscaleraLavadero,
                bano: pagaBano,
                total: total,
                esAzotea: i === 4
            });
        }
    }
    
    // Generar tabla
    generarTabla(resultados);
    
    // Mostrar resultados
    document.getElementById('alertSuccess').style.display = 'block';
    document.getElementById('resultados').style.display = 'block';
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
}

function generarTabla(resultados) {
    const tbody = document.getElementById('tabla-body');
    let filas = '';
    
    resultados.forEach(r => {
        filas += `
            <tr${r.esAzotea ? ' style="background-color: #fef3c7;"' : ''}>
                <td class="nombre-col">${r.nombre}${r.esAzotea ? ' (Sin medidor)' : ''}</td>
                <td>${r.esAzotea ? '-' : r.lectura_ant.toFixed(0)}</td>
                <td>${r.esAzotea ? '-' : r.lectura_act.toFixed(0)}</td>
                <td>${r.esAzotea ? '-' : r.consumo_kw.toFixed(2) + ' kW'}</td>
                <td>${r.monto_consumo.toFixed(2)} S/</td>
                <td>${r.escalera_lavadero.toFixed(2)} S/</td>
                <td>${r.bano > 0 ? r.bano.toFixed(2) + ' S/' : '-'}</td>
                <td class="total-col"><strong>${r.total.toFixed(2)} S/</strong></td>
            </tr>
        `;
    });
    
    // Agregar filas de resumen de gastos compartidos
    const numCuartos = resultados.length;
    const cuartosPaganBano = resultados.filter(r => r.bano > 0);
    
    filas += `
        <tr class="luz-comun">
            <td class="nombre-col" colspan="5"><strong>Gastos Compartidos</strong></td>
            <td colspan="3"></td>
        </tr>
        <tr class="luz-comun">
            <td class="nombre-col">Luz escalera + Luz lavadero</td>
            <td colspan="4">10.00 S/ (${resultados.map(r => r.nombre).join(', ')})</td>
            <td colspan="3">${(10.00 / numCuartos).toFixed(2)} S/ c/u</td>
        </tr>
        <tr class="luz-comun">
            <td class="nombre-col">Luz del baño</td>
            <td colspan="4">5.00 S/ (${cuartosPaganBano.map(r => r.nombre).join(', ')})</td>
            <td colspan="3">${cuartosPaganBano.length > 0 ? (5.00 / cuartosPaganBano.length).toFixed(2) : '0.00'} S/ c/u</td>
        </tr>
    `;
    
    tbody.innerHTML = filas;
}

function mostrarError(mensaje) {
    document.getElementById('mensajeError').textContent = mensaje;
    document.getElementById('alertWarning').style.display = 'block';
    document.getElementById('alertWarning').scrollIntoView({ behavior: 'smooth' });
}

async function descargarPDF() {
    const resultados = document.getElementById('resultados');
    if (resultados.style.display === 'none') {
        alert('⚠️ Primero debes calcular los consumos antes de descargar el PDF');
        return;
    }

    const costoTotal = parseFloat(document.getElementById('costo_total').value) || 0;
    
    const hoy = new Date();
    const mesActual = parseInt(document.getElementById('mes_seleccionado').value);
    const añoActual = hoy.getFullYear();
    
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    // Calcular mes anterior
    let mesAnterior = mesActual - 1;
    let añoAnterior = añoActual;
    
    if (mesAnterior < 0) {
        mesAnterior = 11;
        añoAnterior = añoActual - 1;
    }
    
    const nombreMesAnterior = meses[mesAnterior];
    const nombreMesActual = meses[mesActual];
    const fechaDescarga = hoy.toLocaleDateString('es-PE');

    const pdfElement = document.createElement('div');
    pdfElement.style.padding = '40px';
    pdfElement.style.background = 'white';
    pdfElement.style.position = 'relative';
    pdfElement.innerHTML = `
        <div style="position: absolute; top: 10px; right: 10px; margin-top: 10px; margin-right: 10px; text-align: right;">
            <p style="color: #666; font-size: 12px; margin: 0;">Fecha: ${fechaDescarga}</p>
        </div>
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #667eea; margin-bottom: 10px;">Control de Medidores de Luz</h1>
            <p style="color: #666;">Toma de medidores nmr - 1800464 | Primer Piso</p>
            <p style="color: #666; font-weight: bold;">Consumo del 4 de ${nombreMesAnterior} al 4 de ${nombreMesActual}</p>
            <p style="color: #666; font-weight: bold;">Fecha de vencimiento: 19 de ${nombreMesActual}</p>
            <p style="color: #667eea; font-size: 18px; font-weight: bold; margin-top: 15px;">💰 Costo Total del Recibo: ${costoTotal.toFixed(2)} S/</p>
        </div>
        ${document.getElementById('tabla-pdf').outerHTML}
    `;
    document.body.appendChild(pdfElement);

    const canvas = await html2canvas(pdfElement, {
        scale: 2,
        backgroundColor: '#ffffff'
    });

    document.body.removeChild(pdfElement);

    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('l', 'mm', 'a4');
    
    const imgWidth = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`Control_Medidores_${fechaDescarga.replace(/\//g, '-')}.pdf`);
}

function limpiar() {
    if (confirm('¿Estás seguro de que quieres limpiar todos los datos de lecturas? (Los nombres se mantendrán guardados)')) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`cuarto${i}_ant`).value = '';
            document.getElementById(`cuarto${i}_act`).value = '';
        }
        document.getElementById('costo_total').value = '';
        document.getElementById('resultados').style.display = 'none';
        document.getElementById('alertSuccess').style.display = 'none';
        document.getElementById('alertWarning').style.display = 'none';
    }
}