<script>
    import {writable} from "svelte/store";
    export let active = writable(0);
    // Props
    /** Indicates the step index value. Should start with 0 (zero) */
    const index = 3;

    // Context
    /** Provide classes to set the timeline background color. */
    let background = 'bg-secondary-500';
    /** Provide classes to set rounded style of the step index numbers. */
    let rounded = 'rounded-token';

    // Base Classes
    const cBase = 'grid grid-cols-[32px_1fr] gap-4';
    const cLine = 'w-1 h-full';
    const cLineBackground = 'bg-surface-300-600-token';
    const cNumeral = 'font-bold text-base w-8 h-8 rounded-full flex justify-center items-center';
    const cNumeralBackground = 'bg-surface-300-600-token';
    const cDrawer = 'ml-1 space-y-4';
    const cNav = 'flex items-center space-x-2';

    // Reactive
    $: isLastItem = index === length - 1;
    // Base
    $: classesBase = `${cBase} ${$$props.class ?? ''}`;
    // Timeline (line)
    $: classesLineBackgroundColor = index < $active ? `${background}` : `${cLineBackground}`;
    $: classesLine = `${cLine} ${classesLineBackgroundColor}`;
    // Timeline (numeral)
    $: classesNumeralBackground = `${cNumeralBackground}`;
    $: classesNumeral = `${cNumeral} ${classesNumeralBackground} ${rounded}`;
    // Content Drawer
    $: classesDrawerPadding = !isLastItem ? 'pb-10' : '0';
    $: classesDrawer = `${cDrawer} ${classesDrawerPadding}`;
    // Content Nav
    $: classesNav = `${cNav}`;

</script>

<div class="container h-full mx-auto">
    <div class="m-12">
        <!-- Page title -->
        <div class="my-12 pb-6">
            <h1 class="my-12 pb-6">Tasas de interés</h1>
            <p class="unstyled text-2xl">Hemos creado tres niveles diferentes basados en sus inversiones y su historial financiero. Cada nivel ofrece beneficios y recompensas exclusivas, y nos complace premiar a nuestros clientes más leales y financieramente responsables. Continúe invirtiendo con nosotros y aspire a alcanzar nuestro nivel más alto de logro, el Nivel Oro.</p>
        </div>

        <div class="stepper">
            <div class="flex">
                <div class="w-3/4">
                    <div class="step {classesBase}">
                        <!-- Timeline -->
                        <div class="step-timeline flex flex-col items-center">
                            <!-- Numeral -->
                            <button class="step-numeral flex-none {classesNumeral}">1</button>
                            <!-- Line -->
                            <div class="step-line {classesLine}"></div>
                        </div>
                        <!-- Content -->
                        <div class="step-content">
                            <div class="step-header">
                                <h2>Nivel Bronce</h2>
                            </div>
                            <div class="step-body space-y-4">
                                <p> ¡Felicitaciones por alcanzar el Nivel Bronce! Ha demostrado su estabilidad financiera manteniendo al menos 100.000 pesos colombianos en su cuenta. Como recompensa, recibirá un bono en efectivo de [insertar cantidad aquí]. ¡Sigue así y continúa ahorrando!</p>
                            </div>
                        </div>


                        <!-- Timeline -->
                        <div class="step-timeline flex flex-col items-center">
                            <!-- Numeral -->
                            <button class="step-numeral flex-none {classesNumeral}">2</button>
                            <!-- Line -->
                            <div class="step-line {classesLine}"></div>
                        </div>
                        <!-- Content -->
                        <div class="step-content">
                            <div class="step-header">
                                <h2>Nivel Plata</h2>
                            </div>
                            <div class="step-body space-y-4">
                                <p> ¡Ha llegado al Nivel Plata! Esto significa que no solo ha mantenido un saldo de al menos 100.000 pesos colombianos, sino que también ha tomado dos préstamos con nosotros. Como recompensa, recibirá un bono en efectivo de [insertar cantidad aquí]. Agradecemos su confianza en nosotros y esperamos seguir apoyando su camino financiero.</p>
                            </div>
                        </div>

                        <!-- Timeline -->
                        <div class="step-timeline flex flex-col items-center">
                            <!-- Numeral -->
                            <button class="step-numeral flex-none {classesNumeral}">3</button>
                            <!-- Line -->
                            <div class="step-line {classesLine}"></div>
                        </div>
                        <!-- Content -->
                        <div class="step-content">
                            <div class="step-header">
                                <h2>Nivel Oro</h2>
                            </div>
                            <div class="step-body space-y-4">
                                <p>¡Felicitaciones por alcanzar el Nivel Oro! Este es nuestro nivel más alto de logro, reservado para nuestros clientes más consistentes y financieramente responsables que han gastado entre 500.000 y 1 millón de pesos colombianos con una buena puntuación. Como recompensa, recibirá un bono en efectivo de [insertar cantidad aquí]. Valoramos su compromiso con la estabilidad financiera y esperamos seguir trabajando con usted.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content image -->
                <div class="w-1/4">
                    <img
                            class="flex mx-auto h-96 float-right"
                            src="src/lib/img/progress.png"
                            alt="economy interest rate representation"
                    />
                </div>
            </div>
        </div>
    </div>
</div>