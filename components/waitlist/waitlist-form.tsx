"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function WaitlistForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [skinGoal, setSkinGoal] = useState("");
  const [sampleConsent, setSampleConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          city,
          postalCode,
          skinGoal,
          sampleConsent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to join waitlist.");
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll send your Bare-X launch access first.");
      setTimeout(() => router.push("/"), 1400);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="Aman Verma"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="+91 98765 43210"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Skin Goal</span>
          <input
            value={skinGoal}
            onChange={(event) => setSkinGoal(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="Acne, glow, oil control..."
          />
        </label>
      </div>
      <label className="space-y-2">
        <span className="text-xs uppercase tracking-[0.24em] text-white/45">Address for future samples</span>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
          placeholder="House / apartment / street"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">City</span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="Mumbai"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Postal Code</span>
          <input
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="400001"
          />
        </label>
      </div>
      <label className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/65">
        <input
          type="checkbox"
          checked={sampleConsent}
          onChange={(event) => setSampleConsent(event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#3A86FF]"
        />
        I’m interested in Bare-X launch updates and possible sample delivery when products are ready.
      </label>
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Saving..." : "Join Sample & Launch List"}
      </Button>
      {message ? <p className="text-sm text-white/70">{message}</p> : null}
    </form>
  );
}
