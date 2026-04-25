import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Linkedin,
  Mail,
  Send,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createActor } from "../backend";
import { isOk } from "../lib/api";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "ashwinsingh26061992@gmail.com",
    href: "mailto:ashwinsingh26061992@gmail.com",
    color: "cyan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "ashwin-singh-chouhan",
    href: "https://linkedin.com/in/ashwin-singh-chouhan-abba34161",
    color: "fuchsia",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "@ashwinsinghchouhan5221",
    href: "https://www.youtube.com/@ashwinsinghchouhan5221",
    color: "cyan",
  },
];

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const { actor } = useActor(createActor);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (!actor) return;
    setSubmitState("loading");
    setErrorMessage("");
    try {
      const result = await actor.submitContact(
        data.name,
        data.email,
        data.message,
      );
      if (isOk(result)) {
        setSubmitState("success");
        reset();
      } else {
        setSubmitState("error");
        setErrorMessage(result.err ?? "Submission failed. Please try again.");
      }
    } catch {
      setSubmitState("error");
      setErrorMessage("Unable to reach server. Please try again later.");
    }
  };

  return (
    <Layout>
      <section className="relative min-h-screen py-20 px-4 overflow-hidden">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[80px]" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
            data-ocid="contact.section"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-foreground">Contact </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <motion.div
              className="mx-auto mt-3 h-1 w-24 rounded-full gradient-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            <p className="mt-5 text-muted-foreground font-body text-lg max-w-xl mx-auto">
              Have a question, collaboration idea, or just want to connect?
              Reach out below.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LEFT — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card neon-border-cyan rounded-2xl p-8"
              data-ocid="contact.form.panel"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Send a Message
              </h2>

              {submitState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle className="w-16 h-16 text-primary" />
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Thank you!
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Your message has been received. We'll get back to you soon.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitState("idle")}
                    className="mt-4 border-primary/50 text-primary hover:bg-primary/10"
                    data-ocid="contact.send_another_button"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-6"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-foreground font-body font-medium"
                    >
                      Name <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Dr. Jane Smith"
                      className="bg-card/50 border-border/50 focus:border-primary focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-smooth"
                      data-ocid="contact.name_input"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p
                        className="text-destructive text-sm font-body"
                        data-ocid="contact.name_field_error"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-foreground font-body font-medium"
                    >
                      Email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="bg-card/50 border-border/50 focus:border-primary focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-smooth"
                      data-ocid="contact.email_input"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p
                        className="text-destructive text-sm font-body"
                        data-ocid="contact.email_field_error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-foreground font-body font-medium"
                    >
                      Message <span className="text-accent">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Write your message here…"
                      className="bg-card/50 border-border/50 focus:border-primary focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-smooth resize-none"
                      data-ocid="contact.message_textarea"
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <p
                        className="text-destructive text-sm font-body"
                        data-ocid="contact.message_field_error"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submission error */}
                  {submitState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3"
                      data-ocid="contact.error_state"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                      <p className="text-destructive text-sm font-body">
                        {errorMessage}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={submitState === "loading"}
                    className="w-full font-display font-semibold text-base py-3 glow-cyan transition-smooth disabled:opacity-60"
                    data-ocid="contact.submit_button"
                  >
                    {submitState === "loading" ? (
                      <span
                        className="flex items-center gap-2"
                        data-ocid="contact.loading_state"
                      >
                        <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* RIGHT — Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-8"
              data-ocid="contact.info.panel"
            >
              {/* About card */}
              <div className="glass-card rounded-2xl p-8 border border-accent/30">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Dr. Ashwin Singh Chouhan
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Pharmacologist &amp; Researcher. Feel free to reach out for
                  academic collaborations, research inquiries, or general
                  correspondence.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-4" data-ocid="contact.social.list">
                {SOCIAL_LINKS.map((link, idx) => {
                  const Icon = link.icon;
                  const isCyan = link.color === "cyan";
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className={`group flex items-center gap-4 glass-card rounded-xl p-4 border transition-smooth cursor-pointer no-underline ${
                        isCyan
                          ? "border-primary/20 hover:border-primary/60 hover:glow-cyan"
                          : "border-accent/20 hover:border-accent/60 hover:glow-fuchsia"
                      }`}
                      data-ocid={`contact.social.item.${idx + 1}`}
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-smooth ${
                          isCyan
                            ? "bg-primary/15 text-primary group-hover:bg-primary/25"
                            : "bg-accent/15 text-accent group-hover:bg-accent/25"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-muted-foreground font-body text-xs uppercase tracking-widest mb-0.5">
                          {link.label}
                        </p>
                        <p
                          className={`font-body font-medium text-sm truncate ${
                            isCyan ? "text-primary" : "text-accent"
                          }`}
                        >
                          {link.value}
                        </p>
                      </div>
                      <ExternalLink
                        className={`w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-smooth ${
                          isCyan ? "text-primary" : "text-accent"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* Availability note */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                  <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                    Available for Collaborations
                  </p>
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Open to research partnerships, academic discussions, and guest
                  lectures in pharmacology and drug discovery.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
