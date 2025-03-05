import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section
      id="contact"
      className="p-12 text-center dark:bg-slate-900 bg-white"
    >
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
          Seek the Night Fury
        </h2>
        <p className="mt-6 dark:text-slate-300 text-slate-700 text-lg mx-auto">
          Dare to explore the realm of these legendary beasts? Send your message
          through the winds to{" "}
          <a
            href="mailto:contact@nightfury.com"
            className="dark:text-emerald-400 text-emerald-600 hover:underline"
          >
            contact@nightfury.com
          </a>. Join the Night Fury Chronicles and uncover the mysteries of the
          skies!
        </p>
      </div>
    </section>
  );
}
