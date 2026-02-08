"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";
import SectionDivider from "@/components/ui/SectionDivider";
import { SITE_CONFIG } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage(t("form.error"));
    }
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-mesh-dark">
        <Container className="relative z-10 py-32 text-center">
          <TextReveal
            text={t("hero.title")}
            as="h1"
            className="justify-center font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          />
          <FadeIn delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200/80">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider />

      {/* Contact Content */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            {/* Contact Form */}
            <SlideIn from="left">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center rounded-sm border border-accent/20 bg-accent/5 p-12 text-center"
                  >
                    <CheckCircle size={48} className="text-accent" />
                    <p className="mt-4 text-lg font-medium text-neutral-900">
                      {t("form.success")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div>
                      <input
                        {...register("name")}
                        placeholder={t("form.name")}
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-champagne"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder={t("form.email")}
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-champagne"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-error">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder={t("form.phone")}
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-champagne"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <select
                        {...register("subject")}
                        defaultValue=""
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 transition-colors focus:border-champagne"
                      >
                        <option value="" disabled>
                          {t("form.subject")}
                        </option>
                        <option value="hr">
                          {t("form.subject_options.hr")}
                        </option>
                        <option value="recruitment">
                          {t("form.subject_options.recruitment")}
                        </option>
                        <option value="training">
                          {t("form.subject_options.training")}
                        </option>
                        <option value="ip">
                          {t("form.subject_options.ip")}
                        </option>
                        <option value="other">
                          {t("form.subject_options.other")}
                        </option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-error">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder={t("form.message")}
                        className="w-full resize-none border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-champagne"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-error">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {errorMessage && (
                      <p className="text-sm text-error">{errorMessage}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-sm bg-primary py-4 text-[15px] font-semibold tracking-[0.1em] uppercase text-champagne border border-champagne/30 transition-all hover:bg-champagne hover:text-primary hover:shadow-lg hover:shadow-magenta/15 disabled:opacity-50"
                    >
                      {isSubmitting ? "..." : t("form.submit")}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </SlideIn>

            {/* Contact Info */}
            <SlideIn from="right" delay={0.2}>
              <div className="space-y-8">
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  {t("info.heading")}
                </h2>
                <div className="h-px w-16 bg-gradient-to-r from-champagne to-transparent" />

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-champagne/10 p-2.5 text-champagne">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-900">
                        {t("info.address_label")}
                      </h3>
                      <p className="mt-1 text-neutral-400">
                        {SITE_CONFIG.address.street}
                        <br />
                        {SITE_CONFIG.address.city},{" "}
                        {SITE_CONFIG.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-champagne/10 p-2.5 text-champagne">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-900">
                        {t("info.phone_label")}
                      </h3>
                      <div className="mt-1 space-y-1">
                        {SITE_CONFIG.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="block text-neutral-400 transition-colors hover:text-champagne"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-champagne/10 p-2.5 text-champagne">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-900">
                        {t("info.email_label")}
                      </h3>
                      <div className="mt-1 space-y-1">
                        {SITE_CONFIG.emails.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="block text-neutral-400 transition-colors hover:text-champagne"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-champagne/10 p-2.5 text-champagne">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-900">
                        {t("info.hours_label")}
                      </h3>
                      <p className="mt-1 text-neutral-400">
                        {t("info.hours_value")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8 aspect-[4/3] overflow-hidden rounded-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15889.76!2d-3.9800!3d5.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb4e2b10bb0b%3A0x5c2e9a6b1e5f6a0a!2sCocody-Riviera%20III%2C%20Abidjan%2C%20C%C3%B4te%20d&#39;Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="M3 Consultants — Cocody-Riviera III, Abidjan"
                    className="h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
                  />
                </div>
              </div>
            </SlideIn>
          </div>
        </Container>
      </section>
    </>
  );
}
