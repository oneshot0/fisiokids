import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-24 bg-brand-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Visítanos
          </h2>
          <p className="mt-4 text-lg text-brand-700">
            Estamos en {site.address}. Escríbenos y te ayudamos a elegir la terapia
            adecuada para tu peque.
          </p>

          <dl className="mt-8 space-y-4 text-brand-800">
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-brand-600">
                Horarios
              </dt>
              <dd>{site.schedule}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-brand-600">
                Teléfono
              </dt>
              <dd>
                <a className="hover:underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-brand-600">
                Correo
              </dt>
              <dd>
                <a className="hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white p-2 shadow-sm">
          <div className="grid h-72 place-items-center rounded-2xl bg-brand-100 text-center text-brand-700 md:h-full">
            <div className="px-6">
              <p className="font-bold">Mapa de la sede</p>
              <p className="mt-1 text-sm">
                Aquí va el mapa embebido cuando confirmemos la dirección exacta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
