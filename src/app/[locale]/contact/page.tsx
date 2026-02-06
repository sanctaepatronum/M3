"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";
import SectionDivider from "@/components/ui/SectionDivider";
import { SITE_CONFIG } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/20 to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-magenta)_0%,_transparent_60%)] opacity-[0.06]" />
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

      <SectionDivider variant="curve" from="fill-primary" to="fill-neutral-50" />

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
                    className="flex flex-col items-center justify-center rounded-sm border border-sage/20 bg-sage/5 p-12 text-center"
                  >
                    <CheckCircle size={48} className="text-sage" />
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
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-accent"
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
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-accent"
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
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-accent"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <select
                        {...register("subject")}
                        defaultValue=""
                        className="w-full border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 transition-colors focus:border-accent"
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
                        className="w-full resize-none border-b-2 border-neutral-200 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-accent"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-error">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-sm bg-gradient-to-r from-magenta to-accent py-4 text-[15px] font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50"
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
                <div className="h-[3px] w-16 bg-gradient-to-r from-magenta to-accent" />

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-accent/10 p-2.5 text-accent">
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
                    <div className="mt-1 rounded-sm bg-accent/10 p-2.5 text-accent">
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
                            className="block text-neutral-400 transition-colors hover:text-accent"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-accent/10 p-2.5 text-accent">
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
                            className="block text-neutral-400 transition-colors hover:text-accent"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-sm bg-accent/10 p-2.5 text-accent">
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

                {/* Map placeholder */}
                <div className="mt-8 aspect-[4/3] rounded-sm bg-neutral-200/50" />
              </div>
            </SlideIn>
          </div>
        </Container>
      </section>
    </>
  );
}
