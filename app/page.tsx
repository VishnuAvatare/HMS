import Image from 'next/image'
import Link from 'next/link'

const INFRASTRUCTURE = [
  {
    title: 'Main Hospital Building',
    description: 'State-of-the-art facility with 24/7 emergency and outpatient services.',
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
    alt: 'Hospital building',
  },
  {
    title: 'Emergency & Trauma Care',
    description: 'Fully equipped emergency department with round-the-clock critical care.',
    src: 'https://images.unsplash.com/photo-1579684389647-15b5c4a1e5b0?w=600',
    alt: 'Emergency department',
  },
  {
    title: 'Modern Wards & ICU',
    description: 'Comfortable patient wards and advanced intensive care units.',
    src: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600',
    alt: 'Hospital corridor',
  },
]

const SERVICES = [
  {
    title: 'General Medicine',
    description: 'Comprehensive primary care and chronic disease management.',
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    alt: 'General medicine',
  },
  {
    title: 'Surgery & OT',
    description: 'Advanced operation theatres and surgical specialties.',
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
    alt: 'Surgery',
  },
  {
    title: 'Diagnostics & Lab',
    description: 'Full-range pathology, radiology and imaging services.',
    src: 'https://images.unsplash.com/photo-1579684389647-15b5c4a1e5b0?w=400',
    alt: 'Laboratory',
  },
  {
    title: 'Cardiology',
    description: 'Heart care, cath lab and cardiac rehabilitation.',
    src: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400',
    alt: 'Cardiology',
  },
]

// Expert doctors – prototype images (AIIMS Delhi style / representative imagery)
const DOCTORS = [
  { name: 'Dr. Rajesh Kumar', role: 'Director & HOD, General Medicine' },
  { name: 'Dr. Priya Sharma', role: 'Senior Consultant, Cardiology' },
  { name: 'Dr. Amit Patel', role: 'Chief of Surgery' },
  { name: 'Dr. Anjali Nair', role: 'HOD, Paediatrics' },
]

const DOCTOR_IMAGES = [
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Sujit Healthcare Hospitals
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100">
            Trusted care, advanced infrastructure, and expert doctors. Your health is our mission.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-teal-800 hover:bg-teal-50"
            >
              Customer Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg border-2 border-white px-6 py-3 font-semibold hover:bg-white/10"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section id="infrastructure" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-slate-800">Our Infrastructure</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Modern facilities designed for patient comfort and clinical excellence.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {INFRASTRUCTURE.map((item, i) => (
            <article key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:shadow-lg">
              <div className="relative aspect-[4/3] bg-slate-200">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-slate-800">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-slate-800">Our Services</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
            Comprehensive medical care across specialties.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((item, i) => (
              <article key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[4/3] bg-slate-200">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Doctors */}
      <section id="doctors" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-slate-800">Expert Doctors</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Experienced specialists dedicated to your care. (Prototype: representative imagery.)
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((doc, i) => (
            <article key={i} className="text-center">
              <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full border-4 border-teal-100 bg-slate-200">
                <Image
                  src={DOCTOR_IMAGES[i]}
                  alt={doc.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">{doc.name}</h3>
              <p className="text-sm text-teal-600">{doc.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 py-12 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold">Manage your health with us</h2>
          <p className="mt-2 text-teal-100">Login or register to book appointments and access your records.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/login" className="rounded-lg bg-white px-5 py-2 font-medium text-teal-800 hover:bg-teal-50">
              Login
            </Link>
            <Link href="/register" className="rounded-lg border-2 border-white px-5 py-2 font-medium hover:bg-white/10">
              Register
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
