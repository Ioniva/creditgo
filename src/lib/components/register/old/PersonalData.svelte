<script>

	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";

</script>
<small>* Campos obligatorios</small>
<form action="" class="w-1/2">

    <!-- Nombres -->
    <div class="grid md:grid-cols-2 md:gap-x-6">
        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Nombre*</span>
                <input type="text" placeholder="Nombre*" required />
            </label>
        </div>
        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Apellidos*</span>
                <input type="text" placeholder="Apellidos*" required />
            </label>
        </div>

        <div class="mb-6 w-full group">
            <label>
                <span class="text-base font-bold">Fecha de nacimiento*</span>
                <input type="date" placeholder="Fecha de nacimiento*" required />
            </label>
        </div>
        <div class="mb-6 w-full group">
            <label for="">Genero</label>
            <RadioGroup>
                <RadioItem value="f">Femenino</RadioItem>
                <RadioItem value="M">Másculino</RadioItem>
            </RadioGroup>
        </div>

        <div class="mb-6 w-full group">
            <label for="">
                <span>Estado civil</span>
                <select>
                    <option>Soltero/a</option>
                    <option>Unión Libre</option>
                    <option>Casado/a</option>
                    <option>Divorciado/a</option>
                    <option>Viudo/a</option>
                </select>
            </label>
        </div>
        <div class="mb-6 w-full group">
            <!-- TODO: modificar el maximo -->
            <label for="">
                <span>Número de hijos</span>
                <input type="number" value="0" min="0" max="6">
            </label>
        </div>

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
    </div>

    <!-- Titulo -->
    <p class="my-6 p-4 bg-blue-500 unstyled text-xl font-bold">Información demográfica</p>
    <!-- /Titulo -->

    <div class="grid md:grid-cols-2 md:gap-x-6">
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

</form>
