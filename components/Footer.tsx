export function Footer() {
  return (
    <footer className="p-6 dark:bg-slate-900 bg-slate-100 text-center border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-full mx-auto">
        <h3 className="text-xl font-bold dark:text-emerald-400 text-emerald-600">
          Night Fury Chronicles
        </h3>
        <p className="mt-2 dark:text-slate-400 text-slate-600 text-sm">
          Forged in the fires of legend, soaring through the ages.
        </p>
        <ul className="mt-4 flex justify-center space-x-6 text-sm">
          {["about", "features", "alphas", "dragons", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 dark:text-slate-500 text-slate-500 text-xs">
          © 2025 Night Fury Chronicles. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
