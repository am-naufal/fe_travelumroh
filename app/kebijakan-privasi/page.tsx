import type { Metadata } from "next";
import { getSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Kebijakan Privasi",
  description:
    "Bagaimana Luhas mengumpulkan, menggunakan, menyimpan, dan menghapus data pribadi Anda, selaras dengan UU Perlindungan Data Pribadi.",
  path: "/kebijakan-privasi",
});

export default async function KebijakanPrivasiPage() {
  const s = await getSettings();
  return (
    <>
      <Breadcrumb items={[{ name: "Kebijakan Privasi", path: "/kebijakan-privasi" }]} />
      <div className="container-page max-w-2xl py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Kebijakan Privasi
        </h1>
        <p className="mt-1 text-xs text-brand-muted">Berlaku sejak 29 Agustus 2026</p>

        <div className="prose-luhas mt-6 max-w-none">
          <p>
            Kebijakan ini menjelaskan bagaimana {s.namaLegal} (&ldquo;Luhas&rdquo;, &ldquo;kami&rdquo;)
            memperlakukan data pribadi yang Anda berikan melalui situs luhas.co.id. Kami memproses
            data sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi.
          </p>

          <h2>Data yang kami kumpulkan</h2>
          <ul>
            <li>
              <strong>Data yang Anda berikan:</strong> nama, nomor WhatsApp, email (opsional), kota
              domisili, paket yang diminati, perkiraan bulan berangkat, jumlah jamaah, rencana
              pembayaran, dan catatan pada formulir minat atau formulir kontak.
            </li>
            <li>
              <strong>Data teknis:</strong> alamat IP, jenis perangkat dan peramban, halaman yang
              dikunjungi, serta parameter kampanye (UTM). Data analitik dan pemasaran hanya
              dikumpulkan setelah Anda menyetujui melalui banner cookie.
            </li>
          </ul>

          <h2>Tujuan penggunaan</h2>
          <ul>
            <li>Menindaklanjuti minat Anda dan memberikan konsultasi paket umroh.</li>
            <li>Mengirim informasi jadwal, harga, dan pengingat pembayaran yang Anda minta.</li>
            <li>Mengukur efektivitas konten dan iklan (dengan persetujuan).</li>
            <li>Memenuhi kewajiban hukum sebagai penyelenggara perjalanan ibadah umrah.</li>
          </ul>

          <h2>Dasar pemrosesan</h2>
          <p>
            Pemrosesan didasarkan pada persetujuan Anda saat mengisi formulir atau menyetujui
            cookie, serta kepentingan sah kami untuk menjalankan layanan yang Anda minta.
          </p>

          <h2>Pembagian data</h2>
          <p>
            Kami membagikan data seperlunya kepada penyedia layanan yang membantu operasional kami,
            misalnya penyedia maskapai, provider visa Arab Saudi, penyedia hotel, serta alat CRM,
            email, dan analitik. Kami tidak menjual data pribadi Anda.
          </p>

          <h2>Penyimpanan dan keamanan</h2>
          <p>
            Data lead disimpan selama diperlukan untuk proses konsultasi dan pemberangkatan, serta
            untuk kewajiban pembukuan dan hukum. Setelahnya data dihapus atau dianonimkan. Kami
            menerapkan pengendalian akses, enkripsi transport (HTTPS), dan pembatasan pihak yang
            dapat mengakses data.
          </p>

          <h2>Hak Anda</h2>
          <ul>
            <li>Meminta akses, koreksi, atau pembaruan data Anda.</li>
            <li>Meminta penghapusan data (&ldquo;hak untuk dilupakan&rdquo;).</li>
            <li>Menarik persetujuan pemasaran kapan saja.</li>
            <li>Mengajukan keberatan atas pemrosesan tertentu.</li>
          </ul>
          <p>
            Untuk menggunakan hak ini, hubungi kami di{" "}
            <a href={`mailto:${s.kontak.email}`}>{s.kontak.email}</a> atau WhatsApp{" "}
            <a href={`https://wa.me/${s.kontak.waUtama}`}>+{s.kontak.waUtama}</a>. Kami menanggapi
            dalam waktu wajar sesuai ketentuan UU PDP.
          </p>

          <h2>Cookie</h2>
          <p>
            Situs ini memakai cookie fungsional yang selalu aktif, serta cookie analitik dan
            pemasaran yang hanya aktif setelah Anda menekan &ldquo;Terima&rdquo; pada banner. Anda
            dapat menolak tanpa memengaruhi fungsi situs, dan dapat mengubah pilihan dengan
            membersihkan data situs pada peramban Anda.
          </p>

          <h2>Perubahan kebijakan</h2>
          <p>
            Kami dapat memperbarui kebijakan ini. Versi terbaru selalu tersedia di halaman ini
            dengan tanggal berlaku yang diperbarui.
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
