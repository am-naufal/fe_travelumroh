"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Input, Textarea, Label, FieldHint } from "@/components/ui/field";
import { waLink } from "@/lib/wa-link";
import { getPersistedUtm, track } from "@/lib/analytics";

// PRD §7.10: form pesan singkat. Menyusun pesan lalu membuka WhatsApp
// (selaras strategi WA-first, C3) — tidak menahan pengunjung menunggu email.
export function ContactForm() {
  const [nama, setNama] = React.useState("");
  const [pesan, setPesan] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const href = waLink({
      text: `Assalamualaikum, saya ${nama || "(nama)"}.\n\n${pesan}`,
      utm: getPersistedUtm(),
      sourcePath: "/kontak",
    });
    track({ name: "wa_click", params: { source_page: "/kontak", cta_position: "contact-form" } });
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <Label htmlFor="c-nama" required>
          Nama
        </Label>
        <Input id="c-nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="c-pesan" required>
          Pesan
        </Label>
        <Textarea
          id="c-pesan"
          rows={4}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          required
          maxLength={600}
        />
        <FieldHint id="c-hint">
          Menekan tombol akan membuka WhatsApp dengan pesan ini sudah terisi.
        </FieldHint>
      </div>
      <button
        type="submit"
        disabled={!nama || !pesan}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[#25D366] px-5 text-sm font-semibold text-white disabled:opacity-50"
      >
        <MessageCircle className="size-4" aria-hidden />
        Kirim lewat WhatsApp
      </button>
    </form>
  );
}
