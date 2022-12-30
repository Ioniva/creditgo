<script>
	import { AccordionGroup, AccordionItem } from "@skeletonlabs/skeleton";
</script>
<div class="container h-full mx-auto">
    <div class="flex m-12">
        <div class="flex flex-col w-1/2">
            <h1 class="my-12 pb-6">Preguntas frecuentes</h1>
            <p class="unstyled text-2xl mb-4 pb-4">¿Buscas toda la información sobre CredGo y lo relacionado con créditos inmediatos?</p>
            <p class="unstyled text-2xl mb-4 pb-4">Revisa a continuación las preguntas más frecuentes y, si le queda alguna duda, póngase en contacto con nosotros.</p>
        </div>
        <div class="w-1/2">
            <img class="flex mx-auto h-96 float-right" src="src/lib/img/faq-bubbles.svg" alt="faq representation">
        </div>
    </div>
    <div class="m-12">
        <AccordionGroup>
            <AccordionItem open>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Qué servicios ofrece Credy?</span></svelte:fragment>
                <svelte:fragment slot="content">Credy es un buscador de préstamos rápidos a través de Internet. Realizaremos su estudio   entre varios proveedores de préstamos escogiendo de forma totalmente independiente el que mejor se adapte a sus necesidades. Credy no cobra por la mediación. No tendrá ninguna obligación de cerrar un contrato con ninguna empresa que nosotros hayamos seleccionado para usted.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Cuánto tardan los trámites de un préstamo?</span></svelte:fragment>
                <svelte:fragment slot="content">Solicitar un crédito a través de Credy es rápido y fácil. Solo debe seleccionar la cantidad que desea pedir prestada, indicar en cuánto tiempo desea pagarla y elegir usted mismo entre las opciones que le ofrecemos. Una vez elegida, debe confirmar su identidad. Tras la confirmación recibirá el dinero.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Qué cantidad puede pedirse?</span></svelte:fragment>
                <svelte:fragment slot="content">Credy tramita préstamos de entre 50€ y 750€.  Dentro de estos rangos,usted puede seleccionar la cantidad que mejor se adapte a sus necesidades.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Cuáles son las condiciones de un préstamo?</span></svelte:fragment>
                <svelte:fragment slot="content">Los términos y condiciones variarán según el proveedor elegido para el préstamo. Es obligatorio en todos los casos, ser mayor de edad, tener una cuenta bancaria y recibir un ingreso de manera estable.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Revisan mi historial bancario?</span></svelte:fragment>
                <svelte:fragment slot="content">Credy no comprueba el fichero de Morosos, ni evalúa el historial de pagos. Según la política propia de cada operador, lo controlan o no. Cada caso es individual y las reglas pueden variar.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Cuánto tardan en ingresar el dinero?</span></svelte:fragment>
                <svelte:fragment slot="content">Si la solicitud ha sido aprobada antes de las 15:00 horas, el dinero le será ingresado esa misma noche. Tan solo si hay dificultades técnicas o se solicita en días festivos podría retrasarse el pago. En caso de solicitar el préstamo un sábado por la tarde, el dinero lo recibiría la mañana del lunes.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Cómo recibiré mi dinero?</span></svelte:fragment>
                <svelte:fragment slot="content">El prestamista le ingresará directamente el dinero en la cuenta bancaria que haya confirmado en la solicitud.</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary"><span class="text-lg font-bold">¿Qué ocurre si no puedo pagar mi préstamo?</span></svelte:fragment>
                <svelte:fragment slot="content">En caso de tener dificultades para abonar el pago del préstamo durante el periodo de devolución, informe inmediatamente a la empresa proveedora del préstamo. El prestamista podrá ofrecer formas de pago para evitar el impago de las cuotas. Estos casos implican el devengo de comisiones e intereses adicionales. En caso de no abonar todos los pagos, la entidad crediticia tiene el derecho de transferir su deuda a una agencia de cobros.</svelte:fragment>
            </AccordionItem>
        </AccordionGroup>
    </div>
</div>
