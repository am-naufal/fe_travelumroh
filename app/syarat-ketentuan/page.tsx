import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan situs luhas.co.id serta ketentuan umum layanan perjalanan ibadah umrah Luhas.",
  path: "/syarat-ketentuan",
});

export default async function SyaratKetentuanPage() {
  const s = await getSettings();
  return (
    <>
      <Breadcrumb items={[{ name: "Syarat & Ketentuan", path: "/syarat-ketentuan" }]} />
      <div className="container-page max-w-2xl py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Syarat &amp; Ketentuan
        </h1>
        <p className="mt-1 text-xs text-brand-muted">Berlaku sejak 29 Agustus 2026</p>

        <div className="prose-luhas mt-6 max-w-none">
          <h2>1. Tentang layanan</h2>
          <p>
            {s.namaLegal} adalah Penyelenggara Perjalanan Ibadah Umrah (PPIU) resmi dengan{" "}
            {s.legalitas.skPpiu}. Situs ini menyajikan informasi paket dan sarana menghubungi tim
            kami. Situs ini tidak memproses pembayaran atau pemesanan otomatis.
          </p>

          <h2>2. Informasi harga</h2>
          <p>
            Harga yang tertera adalah harga per orang sesuai tipe kamar dan dapat berubah sewaktu-
            waktu mengikuti kurs, harga tiket maskapai, dan ketersediaan hotel. Harga dikunci
            setelah pembayaran uang muka (DP) diterima dan dikonfirmasi.
          </p>

          <h2>3. Pendaftaran dan pembayaran</h2>
          <ul>
            <li>Pendaftaran dianggap sah setelah DP diterima dan dokumen dasar dilengkapi.</li>
            <li>
              Pelunasan paling lambat 40 hari sebelum keberangkatan (45 hari untuk keberangkatan
              Ramadhan).
            </li>
            <li>
              Pembayaran hanya melalui rekening resmi atas nama {s.namaLegal}. Luhas tidak pernah
              meminta transfer ke rekening pribadi.
            </li>
            <li>
              Simulasi cicilan pada situs bersifat internal, tanpa bunga, dan bukan produk
              pembiayaan pihak ketiga. Angka final dikonfirmasi tim.
            </li>
          </ul>

          <h2>4. Pembatalan</h2>
          <p>
            Pembatalan sebelum pengurusan visa dikenakan biaya administrasi. Setelah visa terbit
            atau tiket diterbitkan, potongan mengikuti ketentuan maskapai dan penyedia layanan di
            Arab Saudi yang umumnya tidak dapat dikembalikan. Ketentuan spesifik tiap paket
            tercantum pada halaman paket masing-masing.
          </p>

          <h2>5. Tanggung jawab jamaah</h2>
          <ul>
            <li>Menyediakan dokumen yang benar dan tepat waktu.</li>
            <li>Mengikuti manasik dan arahan pembimbing selama perjalanan.</li>
            <li>Mematuhi hukum dan aturan yang berlaku di Arab Saudi.</li>
            <li>Memberi tahu kondisi kesehatan atau kebutuhan khusus sejak pendaftaran.</li>
          </ul>

          <h2>6. Keadaan kahar (force majeure)</h2>
          <p>
            Luhas tidak bertanggung jawab atas keterlambatan atau pembatalan akibat keadaan di
            luar kendali wajar, seperti kebijakan pemerintah, bencana alam, atau gangguan
            penerbangan. Dalam hal ini kami mengupayakan penjadwalan ulang atau pengembalian dana
            sesuai porsi yang masih dapat dikembalikan penyedia.
          </p>

          <h2>7. Kekayaan intelektual</h2>
          <p>
            Seluruh konten situs (teks, logo, foto) adalah milik Luhas atau digunakan atas izin,
            dan tidak boleh digunakan ulang tanpa persetujuan tertulis.
          </p>

          <h2>8. Penggunaan data</h2>
          <p>
            Penggunaan data pribadi diatur dalam{" "}
            <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>.
          </p>

          <h2>9. Hukum yang berlaku</h2>
          <p>
            Ketentuan ini tunduk pada hukum Republik Indonesia. Perselisihan diselesaikan secara
            musyawarah; bila tidak tercapai, melalui pengadilan di wilayah kedudukan {s.namaLegal}.
          </p>

          <h2>10. Kontak</h2>
          <p>
            Pertanyaan tentang ketentuan ini dapat disampaikan ke{" "}
            <a href={`mailto:${s.kontak.email}`}>{s.kontak.email}</a>.
          </p>

          <p className="text-sm text-brand-muted">
            Dokumen ini adalah draf yang perlu ditinjau tim legal sebelum publikasi final (PRD
            §18.9).
          </p>
        </div>
      </div>
    </>
  );
}
