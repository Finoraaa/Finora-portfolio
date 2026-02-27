"use server"

import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(2),
    message: z.string().min(10),
});

export async function submitContactForm(formData: FormData) {
    const rawData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
    };

    const validatedData = contactSchema.safeParse(rawData);

    if (!validatedData.success) {
        const errors = validatedData.error.flatten().fieldErrors;
        const firstErrorKey = Object.keys(errors)[0] as keyof typeof errors;
        const firstError = errors[firstErrorKey]?.[0];
        return { success: false, error: firstError || "Geçersiz veri girişi." };
    }

    try {
        await db.insert(messages).values({
            name: validatedData.data.name,
            email: validatedData.data.email,
            subject: validatedData.data.subject,
            message: validatedData.data.message,
        });

        return { success: true };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Mesaj gönderilirken bir hata oluştu." };
    }
}
