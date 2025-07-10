'use client';

import { useState } from 'react';
import { X, Send, User, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import { Mentor } from '@/types';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  mentor: Mentor;
  onClose: () => void;
}

export default function ContactForm({ mentor, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    playerName: '',
    playerAge: '',
    parentName: '',
    email: '',
    phone: '',
    preferredDate: '',
    sessionType: 'in-person',
    goals: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // EmailJS configuration - replace with your actual values
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_
