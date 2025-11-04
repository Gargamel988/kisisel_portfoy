
import React from 'react';
import emailjs from '@emailjs/browser';
export const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    try {
      await emailjs.send(serviceID, templateID, e.currentTarget.formData, userID);
      console.log("Mesaj başarıyla gönderildi!"); 

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin.", error.message);
      } else {
        console.log("Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin.", error);
      }
    }
  };
