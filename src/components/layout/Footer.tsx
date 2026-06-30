export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TesKerja.id. Alat simulasi latihan tes magang & kerja.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Bukan alat diagnosis psikologis resmi.
        </p>
      </div>
    </footer>
  )
}
