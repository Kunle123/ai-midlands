import { useEffect } from "react";
import { Link } from "wouter";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy | AI Midlands";
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/"><span className="font-semibold text-slate-900 cursor-pointer">AI Midlands</span></Link>
          <Link href="/about"><span className="text-sm text-slate-600 hover:text-orange-700 cursor-pointer">About</span></Link>
        </div>
      </header>
      <main className="container py-14 md:py-20">
        <article className="max-w-3xl mx-auto prose prose-slate prose-headings:text-slate-900 prose-a:text-orange-700">
          <p className="text-orange-700 text-sm font-semibold uppercase tracking-widest">Privacy</p>
          <h1>How AI Midlands uses information</h1>
          <p>AI Midlands collects only the information needed to respond to enquiries, understand a process you ask us to assess, arrange meetings, deliver work and understand how the website is being used.</p>

          <h2>Information you choose to provide</h2>
          <p>If you email us, book a call or send us details of a business process, we may receive your name, company, contact details and the information you provide about that process. Please do not submit passwords, confidential records, special-category personal data or personal customer data through the website assessment.</p>

          <h2>Process assessment</h2>
          <p>The instant process assessment currently runs in your browser. The text you enter is used to generate the on-screen first-pass assessment and is not automatically sent to AI Midlands. If you choose “Email it to us”, your email application is opened with the process and assessment pre-filled so you can decide whether to send it.</p>

          <h2>Analytics and advertising measurement</h2>
          <p>With your permission, the site may use analytics and advertising measurement tools to understand page visits, assessment activity and conversion events. You can choose Essential only or Allow measurement through the site’s tracking controls. Attribution parameters such as campaign tags may be retained when measurement is allowed.</p>

          <h2>Calendly and other services</h2>
          <p>If you choose to book a call, you will be taken to Calendly. Calendly processes the information you provide under its own privacy terms. Client delivery may also involve other agreed services depending on the systems used in a project.</p>

          <h2>How information is used</h2>
          <p>Information you send to AI Midlands is used to respond to you, assess whether we can help, prepare proposals, deliver agreed services and maintain appropriate business records. We do not sell your information to advertisers.</p>

          <h2>Retention and your rights</h2>
          <p>Business enquiry information is retained only for as long as reasonably needed for the enquiry, relationship, legal obligations or legitimate business records. If you want to ask what information we hold about you, correct it or request deletion where applicable, contact us.</p>

          <h2>Contact</h2>
          <p><a href="mailto:hello@ai-midlands.co.uk">hello@ai-midlands.co.uk</a></p>
          <p className="text-sm text-slate-500">This notice is intended as a clear website privacy summary and should be reviewed against the final company/legal entity details and production analytics configuration before launch.</p>
        </article>
      </main>
    </div>
  );
}
