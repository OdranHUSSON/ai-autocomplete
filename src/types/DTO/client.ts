import { z } from 'zod';

export interface ClientDTO {
    id: string;
    displayName: string;
    name: string;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}

export const ClientDTOSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    name: z.string(),
    isDeleted: z.boolean(),
    createdAt: z.number(),
    updatedAt: z.number(),
});
  
type zClientDTO = z.infer<typeof ClientDTOSchema>;