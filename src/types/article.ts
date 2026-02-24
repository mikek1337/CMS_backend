import z from "zod";

export const ArticleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  body: z.coerce.string(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean(),
  authorId: z.string()
});

export const CreateArticleSchema = ArticleSchema.omit({
  authorId: true,
});

export const UpdateArtcleStatusSchema = ArticleSchema.pick({
  isPublished: true,
  title: true,
  body: true,
  tags: true,
});

export const UpdatePublishStatusSchema = ArticleSchema.pick({
  isPublished: true
});

export type UpdatePublishStatusType = z.infer<typeof UpdatePublishStatusSchema>;


export type UpdateArticleStatusType = z.infer<typeof UpdateArtcleStatusSchema>;

export type ArticleType = z.infer<typeof ArticleSchema>;

export type CreateArticleType = z.infer<typeof CreateArticleSchema>;


