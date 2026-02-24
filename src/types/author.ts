import z from "zod";

export const AuthorSchema = z.object({
  name: z.string().min(3),
  bio: z.string(),
  image: z.file().optional(),
});

export type AuthorType = z.infer<typeof AuthorSchema>;

