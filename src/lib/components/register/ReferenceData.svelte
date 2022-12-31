<small>* Campos obligatorios</small>
<form action="" class="w-1/2">
    <div class="mb-6 w-1/2 group">
        <label>
            <span>Cédula*</span>
            <input type="text" placeholder="Cédula*">
        </label>
    </div>
    <div class="grid md:grid-cols-2 md:gap-x-6">
        <div class="mb-6 w-full group">
            <label>
                <span>Nombre*</span>
                <input type="text" placeholder="Nombre*">
            </label>
        </div>
        <div class="mb-6 w-full group">
            <label>
                <span>Apellidos*</span>
                <input type="text" placeholder="Apellidos*">
            </label>
        </div>
    </div>

    <div class="grid md:grid-cols-2 md:gap-x-6">
        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Fecha de expedición del documento*</span>
                <input type="date" placeholder="Fecha de expedición del documento*" required />
            </label>
        </div>
        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Lugar de expedición*</span>
                <input type="text" placeholder="Lugar de expedición*" required />
            </label>
        </div>
        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Departamento*</span>
                <input type="text" placeholder="Departamento*" required />
            </label>
        </div>
        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Ciudad*</span>
                <input type="text" placeholder="Ciudad*" required />
            </label>
        </div>
    </div>

    <div class="mb-6 w-1/2 group">
        <label>
            <span>Tipo de trabajador</span>
            <select>
                <option>Tipo de trabajador</option>
                <option>Empleado</option>
                <option>Independiente</option>
                <option>Pensionado</option>
                <option>Desempleado</option>
                <option>Prestador de servicios</option>
            </select>
        </label>
    </div>
</form>
