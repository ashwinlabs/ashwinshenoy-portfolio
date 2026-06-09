/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle, Copy, Check, Sparkles } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = [
  "Strategic Quality Engineering Strategy",
  "Modernization & Delivery Transformation",
  "AI-Assisted Engineering Transformation",
  "GTM Solution Consulting / Solution Design",
  "Speaking / Advisory / Advisory Group Involvement",
  "Other Business Inquiries"
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    customTopic: "",
    message: ""
  });
  
  const [useCustomTopic, setUseCustomTopic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please include a message";
    if (useCustomTopic && !formData.customTopic.trim()) {
      newErrors.customTopic = "Please specify a topic";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const finalTopic = useCustomTopic ? formData.customTopic : formData.topic;
    
    // Construct Mailto Link
    const emailRecipient = "ashwinshenoy7@gmail.com";
    const subjectLine = `[Inquiry] ${finalTopic} - from ${formData.name}`;
    const emailBody = `Hi Ashwin,\n\n${formData.message}\n\nClient Contact Details:\nName: ${formData.name}\nEmail: ${formData.email}\n\nSent from ashwinshenoy.me portfolio`;

    const mailtoUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;

    // Open mail Client
    // We run this inside a safe timeout to show the animation
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const copyToClipboard = () => {
    const finalTopic = useCustomTopic ? formData.customTopic : formData.topic;
    const textToCopy = `To: ashwinshenoy7@gmail.com\nSubject: [Inquiry] ${finalTopic} - from ${formData.name}\n\n${formData.message}\n\nSender: ${formData.name} (${formData.email})`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      topic: TOPICS[0],
      customTopic: "",
      message: ""
    });
    setUseCustomTopic(false);
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!isSubmitting) onClose(); }}
            className="absolute inset-0 bg-ink/70 backdrop-blur-md"
            id="modal_backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-paper border border-ink/15 text-ink p-8 md:p-10 rounded-[24px] max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh] z-10 select-none"
            id="modal_container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-6 right-6 p-2 rounded-full text-ink/50 hover:text-ink hover:bg-ink/5 transition-colors"
              aria-label="Close modal"
              id="close_modal_btn"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSend} className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand font-medium flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3" /> Connect & Consult
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none text-ink">
                    Start a Conversation
                  </h3>
                  <p className="text-xs md:text-sm text-ink/65 mt-2 max-w-md">
                    Have an upcoming transformation program, QE advisory need, or strategy initiative? Fill out these details to initiate a connection.
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-[12px] bg-ink/5 border ${errors.name ? 'border-red-500 bg-red-50/5' : 'border-ink/10 focus:border-brand/40'} text-sm focus:outline-none transition-all placeholder:opacity-30 text-ink font-sans`}
                      id="input_name"
                    />
                    {errors.name && <span className="text-red-500 font-mono text-[10px] mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">Your Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. yourname@example.com"
                      className={`w-full px-4 py-3 rounded-[12px] bg-ink/5 border ${errors.email ? 'border-red-500 bg-red-50/5' : 'border-ink/10 focus:border-brand/40'} text-sm focus:outline-none transition-all placeholder:opacity-30 text-ink font-sans`}
                      id="input_email"
                    />
                    {errors.email && <span className="text-red-500 font-mono text-[10px] mt-1 block">{errors.email}</span>}
                  </div>

                  {/* Topic selection */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">Topic of Interest</label>
                    {!useCustomTopic ? (
                      <div className="space-y-2">
                        <select
                          name="topic"
                          value={formData.topic}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-[12px] bg-ink/5 border border-ink/10 focus:border-brand/40 text-sm focus:outline-none transition-all text-ink font-sans"
                          id="select_topic"
                        >
                          {TOPICS.map((topic, idx) => (
                            <option key={idx} value={topic} className="bg-paper text-ink">
                              {topic}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setUseCustomTopic(true)}
                          className="text-[10px] font-mono uppercase text-brand hover:underline flex items-center gap-1 mt-1 font-medium"
                          id="btn_custom_topic"
                        >
                          + Write a custom topic
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="customTopic"
                          value={formData.customTopic}
                          onChange={handleInputChange}
                          placeholder="What is your topic or program?"
                          className={`w-full px-4 py-3 rounded-[12px] bg-ink/5 border ${errors.customTopic ? 'border-red-500' : 'border-brand/40'} text-sm focus:outline-none focus:border-brand transition-all text-ink font-sans`}
                          id="input_custom_topic"
                        />
                        {errors.customTopic && <span className="text-red-500 font-mono text-[10px] mt-1 block">{errors.customTopic}</span>}
                        <button
                          type="button"
                          onClick={() => {
                            setUseCustomTopic(false);
                            setFormData(prev => ({ ...prev, customTopic: "" }));
                          }}
                          className="text-[10px] font-mono uppercase text-ink/50 hover:text-ink hover:underline flex items-center gap-1 font-medium"
                          id="btn_select_topic_back"
                        >
                          Select standard topics instead
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-ink/60 mb-1.5 font-medium">Message / Context Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe briefly what you would like to discuss..."
                      rows={4}
                      className={`w-full px-4 py-3 rounded-[12px] bg-ink/5 border ${errors.message ? 'border-red-500 bg-red-50/5' : 'border-ink/10 focus:border-brand/40'} text-sm focus:outline-none transition-all placeholder:opacity-30 text-ink font-sans resize-none`}
                      id="input_message"
                    />
                    {errors.message && <span className="text-red-500 font-mono text-[10px] mt-1 block">{errors.message}</span>}
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-ink text-paper text-sm uppercase font-display tracking-widest rounded-[16px] hover:bg-brand transition-all disabled:opacity-55 group"
                  id="submit_form_btn"
                >
                  <Send className={`w-4 h-4 transition-transform ${isSubmitting ? "animate-ping" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                  {isSubmitting ? "Opening Email Client..." : "Send Message"}
                </button>
              </form>
            ) : (
              // Success Screen representation (after email triggers)
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 flex flex-col items-center justify-center space-y-6"
                id="success_panel"
              >
                <div className="p-4 bg-brand/10 border border-brand/20 rounded-full text-brand">
                  <CheckCircle className="w-12 h-12" />
                </div>
                
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                    Email Prompt Active!
                  </h3>
                  <p className="text-xs md:text-sm text-ink/65 mt-2 max-w-sm mx-auto">
                    A connection prompt has been successfully configured and sent to your operating system's default email client.
                  </p>
                </div>

                <div className="w-full bg-ink/5 border border-ink/8 text-left rounded-[16px] p-5 space-y-4">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink/50 text-center border-b border-ink/5 pb-2 font-medium">Draft Overview Details</p>
                  <div className="space-y-1.5 text-xs text-ink/80 leading-relaxed font-sans max-h-[120px] overflow-y-auto">
                    <p><span className="font-semibold text-ink/60">Recipient:</span> ashwinshenoy7@gmail.com</p>
                    <p><span className="font-semibold text-ink/60">Subject:</span> [Inquiry] {useCustomTopic ? formData.customTopic : formData.topic}</p>
                    <p className="italic bg-paper/50 p-2.5 rounded-lg text-ink/75 whitespace-pre-wrap select-text">{formData.message}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex-1 py-3 px-4 border border-ink/10 rounded-[14px] font-mono text-[10px] uppercase font-bold text-ink hover:bg-ink/5 transition-all flex items-center justify-center gap-2"
                    id="copy_draft_btn"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-ink/60" />
                        Copy Full Draft Content
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 bg-ink text-paper rounded-[14px] font-mono text-[10px] uppercase font-bold hover:bg-brand transition-all"
                    id="close_success_btn"
                  >
                    Done & Return
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
